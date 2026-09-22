/**
 * opencode2dsh — browser half. Registers the IP 池 plugin card on the Plugins
 * page via the `plugins.item` slot (declared by
 * @deepseek-ai/dsh-client-ui-plugin-manager), keyed by the `ip-pool` namespace
 * this plugin's Host half registers.
 *
 * Configuration rides the shared settings form service
 * (`ctx.configForms.get('ip-pool')`): the card registers only while the Host
 * actually serves the namespace (`configForms.whileServed`), so a deployment
 * without the provider shows no trace of the page. Runtime state + probe
 * actions ride the plugin's own bridge.
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
import type { ConfigFormSnapshot } from '@deepseek-ai/dsh-client-ui-settings/client'
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

/** The settings namespace this card edits (mirrors the Host half). */
const SETTINGS_NAMESPACE = 'ip-pool'

/** Placement of the card among the Plugins page's official items. */
const CARD_ORDER = 50

/** Required services (cordis fiber inject). */
export const inject = ['slots', 'locale', 'configForms']

/**
 * Bind the ip-pool settings form and register the card while the Host serves
 * that namespace. The card is contained to this plugin, so any residual host
 * mismatch never takes model routing down with it.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'opencode2dsh: copy dictionaries')
  const t = ctx.locale.bind(NS) as IpPoolCardInjected['t']

  const scope = ctx.configForms.get<IpPoolSettingsValue>(SETTINGS_NAMESPACE)
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

  ctx.effect(() => ctx.configForms.whileServed([SETTINGS_NAMESPACE], () => ctx.slots.inject('plugins.item', () => ctx.slots.register(
    { name: 'plugins.item', id: SETTINGS_NAMESPACE, order: CARD_ORDER, label: () => t('title'), locale: NS, inject: injected },
    IpPoolCard,
  ))), 'opencode2dsh: settings card')
}
