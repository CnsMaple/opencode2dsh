/**
 * ip-pool settings controller — glues the ip-pool entry-config (the volatile
 * `ipPool` block the Plugins page edits) to the runtime assembly (ip-pool.ts)
 * with live apply, and mounts the status/probe bridge on the host webServer.
 *
 * DSH 0.1.7 reads config through a `Config` schema (see src/index.ts): `ipPool`
 * is a volatile block, edited through `configForms`. Volatile edits are NOT a
 * remount — cordis commits them into the running reference and emits
 * `loader/volatile-update`, which this controller listens to and re-configures
 * the live pool from `getIpPool()`. No restart for any knob, including
 * `enabled` itself.
 *
 * Lifecycle:
 *  - boot: assemble if the committed value is enabled;
 *  - each ipPool volatile change: hot-apply through runtime.reconfigure();
 *  - bridge routes mount once webServer is up, reading the live runtime.
 */

import type { PluginContext } from '../index.ts'
import type { IpPoolConfig, Opencode2dshConfig } from '../config.ts'
import type { IpPoolRuntime } from '../ip-pool.ts'
import { toIpPoolConfig, type IpPoolSettings } from './namespace.ts'
import { IP_POOL_BRIDGE_PREFIX, makeBridgeHandlers, makeBridgeRoutes } from './bridge.ts'

/** Either layer's ip-pool section (settings value or config shape). */
type AnyIpPoolSection = Partial<IpPoolSettings> & {
  subscriptions?: string[]
  free?: Partial<IpPoolSettings['free']>
  subscription?: Partial<IpPoolSettings['subscription']>
}

/** Extract the ip-pool settings value with defaults filled (schema-independent). */
function withDefaults(value: AnyIpPoolSection | undefined): IpPoolSettings {
  const raw = value ?? {}
  const urls = raw.subscription?.urls ?? raw.subscriptions ?? []
  return {
    enabled: raw.enabled ?? false,
    probeModels: raw.probeModels ?? [],
    maxConcurrentProbes: raw.maxConcurrentProbes ?? 3,
    free: {
      enabled: raw.free?.enabled ?? true,
      targetSize: raw.free?.targetSize ?? 20,
      blockedCountries: raw.free?.blockedCountries ?? ['CN'],
    },
    manual: raw.manual ?? [],
    subscription: {
      urls,
      refreshMs: raw.subscription?.refreshMs ?? 30 * 60_000,
    },
    singbox: { path: raw.singbox?.path ?? 'sing-box' },
    pinnedExitId: raw.pinnedExitId ?? '',
    pinnedStrict: raw.pinnedStrict ?? false,
    proxyHosts: raw.proxyHosts ?? [],
    maxRotateAttempts: raw.maxRotateAttempts ?? 3,
  }
}

export interface IpPoolController {
  /** The live runtime (null until enabled and assembled). */
  runtime: IpPoolRuntime | null
  /** Current effective settings value (defaults filled). */
  settings(): IpPoolSettings
  /** The plugin config shape consumed by startIpPool / reconfigure. */
  asConfig(value: IpPoolSettings): Opencode2dshConfig
}

/** Assembly seam (test-injectable); default = the real startIpPool. */
export type AssembleIpPool = (
  config: Opencode2dshConfig,
  logger: PluginContext['logger'],
) => Promise<IpPoolRuntime | null>

const defaultAssemble: AssembleIpPool = async (config, logger) => {
  const { startIpPool } = await import('../ip-pool.ts')
  return startIpPool(config, logger)
}

/**
 * Own the live ip-pool runtime and mount the bridge. Configuration is read live
 * from `getIpPool()` (the volatile `ipPool` entry-config block); every change
 * reaching the running fiber (`loader/volatile-update`) is hot-applied.
 * Returns the controller handle; disposal rides the plugin fiber.
 */
export function applyIpPoolSettings(
  ctx: PluginContext,
  logger: PluginContext['logger'],
  getIpPool: () => IpPoolConfig | undefined,
  deps: { assemble?: AssembleIpPool; listLiveModels?: () => string[] } = {},
): IpPoolController {
  const assemble = deps.assemble ?? defaultAssemble
  const controller: IpPoolController = {
    runtime: null,
    settings: () => withDefaults(getIpPool() as AnyIpPoolSection | undefined),
    asConfig: (value) => ({ ipPool: toIpPoolConfig(value) }),
  }

  /** Assemble on first enable; reuse across later commits (live reconfigure). */
  const ensureRuntime = async (): Promise<void> => {
    if (controller.runtime !== null) return
    controller.runtime = await assemble(controller.asConfig(controller.settings()), logger)
  }

  // Apply a resolved ip-pool value: enable→assemble then reconfigure, or
  // reconfigure the running pool. One path covers boot and every commit.
  const applyCommitted = (value: IpPoolSettings): void => {
    const rt = controller.runtime
    if (value.enabled && rt === null) {
      void ensureRuntime()
        .then(() => controller.runtime?.reconfigure(controller.asConfig(value)))
        .catch((err) => {
          logger.warn(`opencode2dsh: ip pool start failed: ${err instanceof Error ? err.message : String(err)}`)
        })
      return
    }
    if (rt !== null) {
      void rt.reconfigure(controller.asConfig(value)).catch((err) => {
        logger.warn(`opencode2dsh: ip pool live re-apply failed: ${err instanceof Error ? err.message : String(err)}`)
      })
    }
  }

  // Boot: apply the currently committed value (the persisted document is part
  // of it), so a saved enabled:true assembles the pool at start.
  applyCommitted(controller.settings())

  // Hot apply: cordis commits volatile ipPool edits without a remount and emits
  // `loader/volatile-update` with the changed paths. Re-read the live value and
  // reconfigure. A host without the event (older seam) simply stays boot-only.
  const unsubscribe = typeof ctx.on === 'function'
    ? ctx.on('loader/volatile-update', (paths?: readonly (readonly string[])[]) => {
      const touchesIpPool = paths === undefined || paths.length === 0
        || paths.some((path) => path.length === 0 || path[0] === 'ipPool')
      if (touchesIpPool) applyCommitted(withDefaults(getIpPool() as AnyIpPoolSection | undefined))
    })
    : undefined

  // Bridge: mount once webServer is up. The handlers read the live runtime
  // and the current settings value at request time (never stale closures).
  if (typeof ctx.inject === 'function') {
    void Promise.resolve(ctx.inject(['webServer'], (bctx: PluginContext) => {
      if (!bctx.webServer) return
      const handlers = makeBridgeHandlers(
        () => controller.runtime,
        () => ({
          pinnedStrict: controller.settings().pinnedStrict,
          proxyHosts: controller.runtime?.installer && controller.settings().proxyHosts.length > 0
            ? controller.settings().proxyHosts
            : ['opencode.ai'],
        }),
        {
          // Probe-model dropdown rows: the plugin's live Zen catalog when one
          // is running (adapter mode), static S3 list only otherwise.
          listLiveModels: deps.listLiveModels,
        },
      )
      const disposers: Array<() => void> = []
      for (const route of makeBridgeRoutes(handlers)) {
        disposers.push(bctx.webServer.register(route as never))
      }
      logger.info(`opencode2dsh: ip-pool bridge mounted at ${IP_POOL_BRIDGE_PREFIX} (${disposers.length} routes)`)
      const maybeEffect = (bctx as { effect?: PluginContext['effect'] }).effect
      if (typeof maybeEffect === 'function') {
        maybeEffect.call(bctx, () => () => {
          for (const dispose of disposers) dispose()
        })
      }
    })) as unknown as Promise<unknown>
  }

  logger.info('opencode2dsh: ip-pool controller active — live apply via 设置 → 插件 → IP 池')
  const maybeEffect = (ctx as { effect?: PluginContext['effect'] }).effect
  if (typeof maybeEffect === 'function') {
    maybeEffect.call(ctx, () => () => {
      unsubscribe?.()
      void controller.runtime?.dispose()
      controller.runtime = null
    })
  }
  return controller
}
