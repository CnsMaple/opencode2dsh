/**
 * Live-apply tests: the ip-pool controller over a volatile `ipPool` config,
 * driving boot-time enable, `loader/volatile-update`-reconfigure (enabled flip
 * included) and the section-shape mapping. The real startIpPool is replaced
 * through the assemble seam, so no undici or global dispatcher is installed.
 *
 * DSH 0.1.7 model: config arrives as a volatile reference read via getIpPool();
 * a settings-page edit commits into the running reference and cordis emits
 * loader/volatile-update — the harness below mirrors both.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'

import { applyIpPoolSettings, type AssembleIpPool } from '../src/ip-pool-settings/apply.ts'
import { IpPoolConfigSchema } from '../src/ip-pool-settings/namespace.ts'
import type { PluginContext } from '../src/index.ts'

/** Recorded assembly + reconfigure calls (reset per test). */
let starts: Array<{ config: Record<string, unknown> }> = []
let reconfigures: Array<Record<string, unknown>> = []

function resetCalls(): void {
  starts = []
  reconfigures = []
}

/** Test assembly seam: a runtime face with just what apply.ts touches. */
const assemble: AssembleIpPool = async (config) => {
  const runtime = {
    pool: { snapshot: () => ({ total: 1 }), targetSize: 20, list: () => [], has: () => true },
    installer: { enabled: false, install() { this.enabled = true }, disable() { this.enabled = false }, dispose() {} },
    prober: { stats: { queued: 0, inFlight: 0, enqueued: 0, completed: 0 }, setMaxConcurrent() {} },
    refill: null,
    subscriptions: null,
    reconfigure: async (next: Record<string, unknown>) => { reconfigures.push(next) },
    probeAll: async () => 0,
    probeExit: async () => 1,
    refillNow: async () => {},
    refreshSubscriptions: async () => {},
    dispose: async () => {},
  }
  starts.push({ config: config as Record<string, unknown> })
  return runtime as never
}

/**
 * A host-faithful harness: a live `ipPool` value (the volatile reference) plus a
 * `commit` that updates it and dispatches `loader/volatile-update(['ipPool'])`,
 * exactly as cordis does when the settings page saves an edit.
 */
function harness(initial?: Record<string, unknown>) {
  let value = initial
  const listeners: Array<(paths?: readonly (readonly string[])[]) => void> = []
  const ctx = {
    logger: { info() {}, warn() {}, error() {} },
    on: (_event: string, cb: (paths?: readonly (readonly string[])[]) => void) => {
      listeners.push(cb)
      return () => {}
    },
  } as unknown as PluginContext
  const getIpPool = () => value as never
  const commit = (next: Record<string, unknown>) => {
    value = next
    for (const listener of listeners) listener([['ipPool']])
  }
  return { ctx, logger: ctx.logger, getIpPool, commit }
}

test('disabled at boot: no runtime assembled', async () => {
  resetCalls()
  const h = harness({ enabled: false })
  const controller = applyIpPoolSettings(h.ctx, h.logger, h.getIpPool, { assemble })
  await new Promise((r) => setTimeout(r, 20))
  assert.equal(starts.length, 0)
  assert.equal(controller.runtime, null)
})

test('boot-enabled: runtime assembles once with the entry config', async () => {
  resetCalls()
  const h = harness(IpPoolConfigSchema({ enabled: true, manual: ['http://1.1.1.1:1'] }) as never)
  const controller = applyIpPoolSettings(h.ctx, h.logger, h.getIpPool, { assemble })
  await new Promise((r) => setTimeout(r, 30))
  assert.equal(starts.length, 1)
  assert.ok(controller.runtime !== null)
  const passed = starts[0]!.config as { ipPool?: { manual?: string[] } }
  assert.deepEqual(passed.ipPool?.manual, ['http://1.1.1.1:1'])
})

test('settings-page enable: a volatile commit assembles the runtime, later commits reconfigure live', async () => {
  resetCalls()
  const h = harness({ enabled: false })
  const controller = applyIpPoolSettings(h.ctx, h.logger, h.getIpPool, { assemble })
  await new Promise((r) => setTimeout(r, 10))
  assert.equal(starts.length, 0)

  // flip enabled on (settings-page shape), dispatch a volatile update
  h.commit(IpPoolConfigSchema({ enabled: true, manual: ['http://2.2.2.2:2'], maxConcurrentProbes: 5 }) as never)
  await new Promise((r) => setTimeout(r, 30))
  assert.equal(starts.length, 1, 'enable commit assembles the runtime')
  assert.ok(controller.runtime !== null)

  // a later commit (no enable flip) goes through reconfigure, never re-assembles
  const before = starts.length
  h.commit(IpPoolConfigSchema({ enabled: true, manual: ['http://2.2.2.2:2'], pinnedExitId: 'http://127.0.0.1:7897', pinnedStrict: true }) as never)
  await new Promise((r) => setTimeout(r, 30))
  assert.equal(starts.length, before, 'no re-assembly without an enable flip')
  // one reconfigure per commit: the enable commit's post-assembly apply + this one
  assert.equal(reconfigures.length, 2)
  const applied = reconfigures[1]!.ipPool as Record<string, unknown>
  assert.equal(applied.pinnedExitId, 'http://127.0.0.1:7897')
  assert.equal(applied.pinnedStrict, true)
})

test('subscription urls from the settings shape flow into the config assembly', async () => {
  resetCalls()
  const h = harness(IpPoolConfigSchema({
    enabled: true,
    subscription: { urls: ['https://airport.example/sub'], refreshMs: 60_000 },
  }) as never)
  applyIpPoolSettings(h.ctx, h.logger, h.getIpPool, { assemble })
  await new Promise((r) => setTimeout(r, 30))
  assert.equal(starts.length, 1)
  const passed = starts[0]!.config as { ipPool?: { subscriptions?: string[] } }
  assert.deepEqual(passed.ipPool?.subscriptions, ['https://airport.example/sub'])
})
