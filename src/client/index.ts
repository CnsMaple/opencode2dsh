/**
 * opencode2dsh — browser half. Registers the IP 池 plugin card on the Plugins
 * page via the `plugins.item` slot (declared by
 * @deepseek-ai/dsh-client-ui-plugin-manager), editing the plugin's volatile
 * `ipPool` entry-config block.
 *
 * DSH 0.1.7 exposes each plugin's config as one settings namespace keyed by its
 * entry id ('opencode2dsh'). The card only owns the `ipPool` subtree, so a thin
 * adapter projects that subtree into the `ConfigForm<IpPoolSettingsValue>` face
 * the card already speaks (reads `.value.ipPool` / `.base.ipPool`, writes are
 * prefixed with `['ipPool', field]`). The card registers only while the Host
 * serves the entry (`configForms.whileServed`), so a deployment without the
 * provider shows no trace of the page. Runtime state + probe actions ride the
 * plugin's own bridge.
 *
 * Export discipline: cross-plugin collaboration goes through cordis services
 * (`slots`, `locale`, `configForms`); the bundle purity gate forbids value
 * imports of other @deepseek-ai packages (type-only imports are erased).
 */
import { useSyncExternalStore } from 'react'
import type { Context as ClientContext } from '@deepseek-ai/cordis'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
// Type-only: the ctx.configForms Context merge and the ConfigForm face.
import type { ConfigForm, ConfigFormSnapshot } from '@deepseek-ai/dsh-client-ui-settings/client'
// Type-only: the ctx.slots Context merge (the browser SlotRegistry).
import type {} from '@deepseek-ai/dsh-client-ui-renderer/client'
// Type-only: the Plugins page's SlotMap merge (the 'plugins.item' list entry).
import type {} from '@deepseek-ai/dsh-client-ui-plugin-manager/client'
import { IpPoolCard } from './IpPoolCard.tsx'
import type { IpPoolCardInjected } from './IpPoolCard.tsx'
import type { IpPoolSettingsValue } from './IpPoolCard.tsx'
import { en, zh, type IpPoolKey } from './locales.ts'

export type { IpPoolCardInjected, IpPoolCardProps, IpPoolSettingsValue } from './IpPoolCard.tsx'
export type { IpPoolKey } from './locales.ts'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** The IP 池 card copy. */
    'settings.ip-pool': IpPoolKey
  }
}

/** Dictionary namespace owned by this plugin. */
const NS = 'settings.ip-pool'

/** The Host entry id whose config carries this plugin's settings (volatile ipPool). */
const ENTRY_ID = 'opencode2dsh'

/** The card's id within the plugins.item list. */
const SETTINGS_NAMESPACE = 'ip-pool'

/** Placement of the card among the Plugins page's official items. */
const CARD_ORDER = 50

/** The entry-config shape the card reads through the settings mirror. */
interface EntryConfig {
  ipPool?: IpPoolSettingsValue
}

/**
 * Project one namespace's shared form down to its `ipPool` subtree, so the card
 * keeps reading/writing ip-pool fields at the top level. Writes gain the
 * `['ipPool', …]` path prefix; reads lift `.value.ipPool` / `.base.ipPool` up.
 */
function ipPoolScope(form: ConfigForm<EntryConfig>): ConfigForm<IpPoolSettingsValue> {
  const mutate = form.mutate.bind(form)
  const subscribe = form.subscribe.bind(form)
  const getSnapshot = form.getSnapshot.bind(form)
  const section = (value: unknown): IpPoolSettingsValue | undefined =>
    (value as { ipPool?: IpPoolSettingsValue } | undefined)?.ipPool
  return {
    getSnapshot: () => {
      const snapshot = getSnapshot()
      return { ...snapshot, value: snapshot.value?.ipPool, base: section(snapshot.base), user: section(snapshot.user) }
    },
    subscribe,
    set: (field, value) => mutate([{ op: 'set', path: ['ipPool', field], value }]),
    unset: (field) => mutate([{ op: 'unset', path: ['ipPool', field] }]),
    mutate: (ops, expectedRevision) => mutate(ops.map((op) => ({ ...op, path: ['ipPool', ...op.path] })), expectedRevision),
  }
}

/** Required services (cordis fiber inject). */
export const inject = ['slots', 'locale', 'configForms']

/**
 * Bind the ip-pool settings form and register the card while the Host serves
 * this plugin's entry. The card is contained to this plugin, so any residual
 * host mismatch never takes model routing down with it.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'opencode2dsh: copy dictionaries')
  const t = ctx.locale.bind(NS) as IpPoolCardInjected['t']

  ctx.effect(() => ctx.configForms.whileServed([ENTRY_ID], () => {
    const scope = ipPoolScope(ctx.configForms.get<EntryConfig>(ENTRY_ID))
    // The form's methods are instance methods (this-bound to the controller);
    // uSES receives them as bare functions, so bind explicitly — an unbound
    // getSnapshot reads `this.store` of undefined and crashes the card.
    const getSnapshot = scope.getSnapshot.bind(scope)
    const subscribe = scope.subscribe.bind(scope)
    const useSnapshot = (): ConfigFormSnapshot<IpPoolSettingsValue> =>
      useSyncExternalStore(subscribe, getSnapshot)
    // Registration-time copy and the inject face share one bound translate;
    // copy freshness rides the locale revision.
    const injected = (): IpPoolCardInjected => ({ scope, useSnapshot, t })
    return ctx.slots.inject('plugins.item', () => ctx.slots.register(
      { name: 'plugins.item', id: SETTINGS_NAMESPACE, order: CARD_ORDER, label: () => t('title'), locale: NS, inject: injected },
      IpPoolCard,
    ))
  }), 'opencode2dsh: settings card')
}
