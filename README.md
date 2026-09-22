<div align="center">

# opencode2dsh

**Free OpenCode Zen models, natively inside DSH (DeepSeek Harness).**

No API key. No registration. No extra process.

[![license](https://img.shields.io/npm/l/@opencode2dsh%2Fdsh-plugin)](LICENSE)
[![node](https://img.shields.io/badge/node-%E2%89%A520-brightgreen)](https://nodejs.org)
[![DSH](https://img.shields.io/badge/DSH-0.1.7--alpha.1-blue)](https://github.com/deepseek-ai/deepseek-harness)

English | [简体中文](README.zh-CN.md)

> **Fork note.** This is a maintained fork of
> [`FishBottle7/opencode2dsh`](https://github.com/FishBottle7/opencode2dsh),
> rebased for **DSH 0.1.7-alpha.1** and version-pinned to match the host. It
> is published as a single, ready-to-install package (built `lib/` is committed),
> so you can install straight from git — no build step. See
> [CHANGELOG.md](CHANGELOG.md) for what the fork changed.

</div>

---

opencode2dsh registers a native DSH `LlmAdapter` that streams directly from
[OpenCode Zen](https://opencode.ai/zen)'s **anonymous free lane** — the same
models OpenCode's own CLI uses without an account, served to your DSH model
picker as a regular provider called `opencode2dsh`.

Requests leave your machine looking exactly like traffic from the OpenCode CLI
(same user agent, same correlation headers), and the model catalog stays
fresh through a three-tier fallback chain. There is nothing to log into and
nothing to host.

## Highlights

- **Zero credential, zero setup** — the anonymous lane needs no key; install, restart, chat
- **Native adapter, no sidecar** — a single package, no child process, no binary, no local port (the legacy Go sidecar is not part of the published package; see `legacy/`)
- **CLI-identical disguise** — requests carry the OpenCode CLI user agent and its session/request/project header set, derived per conversation
- **Selectable thinking levels** — reasoning-capable free models expose an effort picker in DSH's model selector; Off sends `reasoning_effort: "none"` upstream to actually stop thinking, and no selection keeps the provider default
- **Live catalog with a fallback chain** — live upstream list ∩ free-by-metadata, falling back to offline cache and a verified static list
- **Self-healing** — fast startup retries, periodic refresh, and a written health snapshot for diagnostics
- **Proper error surfaces** — upstream failures (rate limit, auth, timeout, transport) arrive in DSH as classified finish reasons, and retries stay owned by DSH

## Install

**Straight from git** (recommended — the built bundle is committed, no local build needed):

```sh
dsh plugin --profile web add https://github.com/CnsMaple/opencode2dsh
```

You can also paste the same repository URL into **DSH → Settings → Plugins →
install from git**.

**Upstream npm** (note: this tracks the *original* `FishBottle7` package, which
targets an older DSH and does **not** include the 0.1.7 migration):

```sh
dsh plugin --profile web add @opencode2dsh/dsh-plugin
```

**Verify**: restart `dsh web`, open the model picker, and pick a model from the
**opencode2dsh** group.

Requires **DSH ≥ 0.1.7-alpha.1** with a web profile; Node.js ≥ 20 (already
present if DSH runs); outbound HTTPS to `opencode.ai` and `models.dev`.

## Configuration

Defaults work out of the box. Override via the profile's `cordis.patch.yml`:

```yaml
- id: opencode2dsh
  name: '@opencode2dsh/dsh-plugin'
  config:
    mode: adapter        # adapter (default) | sidecar
    providerId: opencode2dsh
    refreshSeconds: 300  # catalog refresh cadence
```

| Option | Default | Description |
| --- | --- | --- |
| `mode` | `adapter` | `adapter`: native LlmAdapter streaming straight from Zen. `sidecar`: legacy local-agent mode, not bundled — build the agent from `legacy/agent` and pass `agentPath`. |
| `providerId` | `opencode2dsh` | Provider name shown in DSH. |
| `refreshSeconds` | `300` | Live catalog refresh interval. Pricing metadata refreshes every 24 h. |
| `agentPath` | auto-resolved | Sidecar only: path to the agent binary. |
| `agentArgs` | — | Sidecar only: extra CLI args for the agent. |
| `restartDelayMs` / `restartMaxDelayMs` / `maxConsecutiveCrashes` | `1000` / `60000` / `5` | Sidecar only: restart backoff and circuit breaker. |

## How it works

```
DSH session
   │  harness chunks (block-start / text-delta / usage / finish …)
   ▼
ZenAdapter (registered LlmAdapter)
   │  pi-ai openai-completions stream (chat models)
   │  pi-ai openai-responses stream (`muse-spark-*`, Responses-only on Zen)
   ▼
https://opencode.ai/zen/v1        ← Authorization: Bearer public
   with CLI-identical headers:
     user-agent: opencode/…
     x-opencode-client, x-opencode-session, x-session-affinity,
     X-Session-Id, x-opencode-request, x-opencode-project
```

- **Session correlation** — session/project ids are SHA-256 derived from the
  conversation's first user turn (stable per conversation, non-reversible),
  and each request gets a fresh random id, mirroring the CLI.
- **Catalog fallback chain** — S1: live `GET /v1/models`; S2: models.dev
  pricing metadata decides "free"; S3: a compile-time verified static list.
  A disk cache covers upstream outages.
- **Resilience** — the adapter registers immediately at startup; if the first
  catalog fetch races your network, the plugin retries on a short cadence
  (~1 min) before settling into the periodic refresh.
- **Sidecar mode** (`mode: sidecar`, legacy) — spawns a local Go agent (a
  single-tenant port of [opencode2api](https://github.com/jasonxu114514/opencode2api))
  on `127.0.0.1:<random>`, token-authenticated, and registers a standard
  `llm-pi-ai` route. **Not part of the published package**; build it from
  `legacy/agent` (`go build ./cmd/agent`) and point `agentPath` at the binary.

## Optional: exit-IP pool

The anonymous lane is rate-limited per **exit IP**. The plugin ships an opt-in
rotating egress pool (manual proxies, free public sources, subscriptions —
including sing-box-converted encrypted nodes — and a pinned exit) with
two-tier health probing, session-sticky routing and failure rotation. Disabled
by default, the process stays on a direct connection.

## Health & troubleshooting

The plugin writes a health snapshot after every refresh round:

```
~/.opencode2dsh/adapter-status.json
```

| Symptom | Likely cause & fix |
| --- | --- |
| Boot screen: `Failed to load plugins … pending (waiting for service: settingsScope)` | You are running the **upstream** npm package (`@opencode2dsh/dsh-plugin`) on DSH ≥ 0.1.7-alpha.1. `settingsScope` was removed from the host. Install **this fork** (`dsh plugin --profile web add https://github.com/CnsMaple/opencode2dsh`), which uses the `configForms` service and the `plugins.item` slot. |
| Only a few models | Startup fetch raced your network; retries land within ~1 min. Check `adapter-status.json` for `lastError`. |
| `lastError: "fetch failed"` persisting | Outbound HTTPS to `opencode.ai` blocked; check proxy/VPN rules. |
| Rate-limit errors in chat | The anonymous lane is quota-per-IP; switch network node, wait, or enable the exit-IP pool. |
| Connection error to `127.0.0.1:*` | A stale sidecar route shadows the adapter; the plugin removes it at startup. |
| Install fails with `ERR_PNPM_IGNORED_BUILDS` | A transitive dependency of `pi-ai` (`@google/genai`, `protobufjs`) has build scripts not needed at runtime. Approve-or-decline via the plugin market, or set both to `false` under `allowBuilds:` in the profile's `pnpm-workspace.yaml`. |

**IP-pool settings card**: wired to the 0.1.7 `configForms` model — the plugin
declares `export const Config` with a volatile `ipPool` block, edited on
**Settings → Plugins → IP 池**; changes hot-apply through cordis'
`loader/volatile-update` without a restart, and model routing is untouched.

## Security

- No secrets involved: the anonymous lane's key is the literal string `public`; nothing is stored, no telemetry.
- Install paths restricted to `lib/`; no build scripts run from dependencies.
- All requests go directly from your machine to `opencode.ai` / `models.dev`.

## Development

```sh
git clone https://github.com/CnsMaple/opencode2dsh.git
cd opencode2dsh
pnpm install
pnpm typecheck && pnpm test    # 181 unit tests, all portable (no host-specific fixtures)
pnpm build                     # node half  -> lib/index.js
pnpm build:client              # browser half -> lib/client.js
```

The repo is a single package; the built `lib/` is committed so `dsh plugin add`
works without a build. After changing sources, rebuild and commit `lib/`.

The legacy Go sidecar lives in `legacy/agent` (`go test ./...`). Architecture
notes and the porting record live in `docs/`.

## Acknowledgments

- [**FishBottle7/opencode2dsh**](https://github.com/FishBottle7/opencode2dsh) — the upstream project this fork builds on.
- [**opencode2api**](https://github.com/jasonxu114514/opencode2api) by
  [@jasonxu114514](https://github.com/jasonxu114514) — the legacy Go sidecar in
  `legacy/agent` is a port of its anonymous-lane implementation, and the catalog
  fallback chain and request-disguise details are derived from it.
- [OpenCode](https://opencode.ai) — for running the free anonymous Zen lane.
- [@earendil-works/pi-ai](https://www.npmjs.com/package/@earendil-works/pi-ai) — the wire layer used by adapter mode.
- [DeepSeek Harness](https://www.npmjs.com/package/@deepseek-ai/dsh) and the
  [dsh-market](https://github.com/dsh-market/dsh-market) community.

## License

[MIT](./LICENSE) © FishBottle7 (original), maintained as a fork by CnsMaple.
