import test from 'node:test'
import assert from 'node:assert/strict'
import { ModelCatalog } from '../src/adapter/catalog.ts'
import { isResponsesModel, PROVIDER_ID, ZenAdapter } from '../src/adapter/zen-adapter.ts'

/**
 * The exact method surface dsh-llm touches on a registered adapter. A missing
 * member throws inside registerAdapter and silently drops the provider from
 * the model selector (regression: providerRetryPolicy, index.js:1208).
 */
test('ZenAdapter implements the full dsh-llm adapter surface', () => {
  const adapter = new ZenAdapter(new ModelCatalog())
  for (const method of ['providerInfo', 'providerRetryPolicy', 'listModels', 'resolveModel', 'prepareCall', 'stream']) {
    assert.equal(typeof (adapter as unknown as Record<string, unknown>)[method], 'function', `missing method: ${method}`)
  }
})

test('providerInfo preserves the route id and names the provider', () => {
  const adapter = new ZenAdapter(new ModelCatalog())
  assert.deepEqual(adapter.providerInfo('opencode2dsh'), { id: 'opencode2dsh', name: PROVIDER_ID })
})

test('providerRetryPolicy defers to the host default', () => {
  const adapter = new ZenAdapter(new ModelCatalog())
  assert.equal(adapter.providerRetryPolicy('opencode2dsh'), undefined)
})

test('resolveModel declares text-only input and finite limits', () => {
  const adapter = new ZenAdapter(new ModelCatalog())
  const resolved = adapter.resolveModel('opencode2dsh', 'big-pickle')
  assert.deepEqual(resolved.inputModalities, ['text'])
  assert.equal(resolved.context.contextWindow > 0, true)
  assert.equal(resolved.defaultMaxTokens > 0, true)
  assert.equal(resolved.provider, 'opencode2dsh')
  assert.equal(resolved.id, 'big-pickle')
})

test('prepareCall returns the resolved model and a stream dispatcher', async () => {
  const adapter = new ZenAdapter(new ModelCatalog())
  const call = await adapter.prepareCall('opencode2dsh', 'big-pickle')
  assert.equal(call.model.id, 'big-pickle')
  assert.equal(typeof call.stream, 'function')
})

test('listModels mirrors the catalog without duplicates', () => {
  const adapter = new ZenAdapter({
    list: () => ['big-pickle', 'big-pickle', 'mimo-v2.5-free'],
    decision: () => ({ allowed: true, source: 'test', known: true }),
  })
  const models = adapter.listModels('opencode2dsh')
  assert.deepEqual(models.map((m) => m.id), ['big-pickle', 'mimo-v2.5-free'])
})

test('isResponsesModel routes muse-spark to responses, everything else to chat', () => {
  for (const id of ['muse-spark-1.3-contributor-free', 'muse-spark-1.2-contributor-free', 'muse-spark-1.2', 'MUSE-SPARK-1.3']) {
    assert.equal(isResponsesModel(id), true, id)
  }
  for (const id of ['big-pickle', 'mimo-v2.5-free', 'deepseek-v4-flash', '']) {
    assert.equal(isResponsesModel(id), false, id || '(empty)')
  }
})

test('ZenAdapter constructs the responses provider alongside chat', () => {
  const adapter = new ZenAdapter(new ModelCatalog())
  assert.equal(typeof adapter.stream, 'function')
})

test('responses models use the wider body-idle window, injectable for tests', async () => {
  // A provider that emits `start` immediately, then never speaks again: the
  // stream can only end through the body-idle watchdog, so the surfaced
  // error's arrival time measures the window actually applied per model.
  async function* hangAfterStart(): AsyncGenerator<{ type: string; partial: unknown }> {
    yield { type: 'start', partial: { content: [] } }
    await new Promise(() => {})
  }
  const measure = async (model: string) => {
    const adapter = new ZenAdapter(
      { list: () => [], decision: () => ({ allowed: true, source: 'test', known: true }) },
      { providerOverride: { streamSimple: () => hangAfterStart() }, firstEventMs: 50, bodyIdleMs: 50, responsesBodyIdleMs: 400 },
    )
    const began = Date.now()
    let reason: { kind: string } | undefined
    for await (const chunk of adapter.stream({ provider: 'opencode2dsh', model, messages: [{ role: 'user', content: [{ type: 'text', text: 'hi' }] }] })) {
      if (chunk.type === 'finish') {
        reason = chunk.reason as { kind: string }
        break
      }
    }
    return { reason, elapsed: Date.now() - began }
  }
  const chat = await measure('big-pickle')
  assert.equal(chat.reason?.kind, 'error')
  assert.ok(chat.elapsed < 200, `chat should honor the injected 50ms window, took ${chat.elapsed}ms`)
  const responses = await measure('muse-spark-1.2-contributor-free')
  assert.equal(responses.reason?.kind, 'error')
  assert.ok(responses.elapsed > 350, `responses should honor the injected 400ms window, took ${responses.elapsed}ms`)
})
