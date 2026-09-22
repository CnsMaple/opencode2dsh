window.__ModuleLoader__.load({ id: "@opencode2dsh/dsh-plugin", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
let react = require("react");
react = __toESM(react);
let __deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
__deepseek_ai_dsh_client_ui_primitives = __toESM(__deepseek_ai_dsh_client_ui_primitives);
let react_jsx_runtime = require("react/jsx-runtime");
react_jsx_runtime = __toESM(react_jsx_runtime);

//#region src/client/locales.ts
/** Simplified Chinese dictionary (the key-set source of truth). */
const zh = {
	nav: "IP 池",
	title: "IP 池（opencode2dsh）",
	description: "多出口调度免费模型的可用性：出口间自动轮换、429 冷却、按出口×模型探活。",
	statusLoading: "加载中…",
	statusUnavailable: "设置服务不可用，无法读写 IP 池配置。",
	enabled: "启用 IP 池（enabled）",
	enabledHint: "关闭后全部流量直连，行为与本插件未装 IP 池时完全一致。",
	poolState: "池状态",
	poolStateHealthy: "健康",
	poolStateWarning: "偏低",
	poolStateCritical: "告急",
	poolStateEmergency: "枯竭",
	poolAvailable: "可用 {available}/{capacity}",
	poolSources: "出口来源：免费 {free} · 手填 {manual} · 订阅 {subscription}",
	pinnedBadge: "固定主力",
	deferredNotice: "路由已退避：{reason}",
	sectionFree: "免费源（free）",
	freeEnabled: "免费源抓取",
	freeEnabledHint: "从公共免费代理清单抓取并准入；关闭后只用下述两类出口。",
	freeTargetSize: "目标容量（targetSize）",
	freeTargetSizeHint: "免费池要补到的可用出口数（1-100，默认 20）。",
	freeBlockedCountries: "地理黑名单（blockedCountries）",
	freeBlockedCountriesHint: "ISO 国家码（逗号分隔），命中的出口不收。默认 CN。",
	refillNow: "立即补充",
	refillRunning: "补充中…",
	refillStageFetch: "① 拉取免费源清单",
	refillStageCoarse: "② 粗筛存活",
	refillStageAdmit: "③ 准入探测",
	refillStageIdle: "完成",
	refillCountSources: "已拉取 {done}/{total} 个源",
	refillCountFetched: "共 {n} 条",
	refillCountCoarse: "已筛 {done}/{total} · 存活 {passed}",
	refillCountAdmit: "已探 {done} · 入池 {admitted}",
	refillSummary: "上轮补充：入池 {admitted} 个（候选 {fetched}）",
	sectionManual: "手填代理（manual）",
	manualHint: "一行一个：http://host:port 或 socks5://host:port。适合自备节点/专线。",
	manualAdd: "添加代理",
	manualPlaceholder: "http://127.0.0.1:7897",
	sectionSubscription: "订阅（subscription）",
	subscriptionHint: "机场/自建 Clash·V2ray 订阅 URL，一行一个；明文节点直拨，加密节点经 sing-box 转换。",
	subscriptionAdd: "添加订阅",
	subscriptionPlaceholder: "https://…",
	subscriptionRefreshMs: "刷新间隔（毫秒）",
	subscriptionRefreshMsHint: "默认 1,800,000（30 分钟）。订阅只低频拉取，绝不并发轰炸。",
	subscriptionRefreshNow: "立即刷新",
	singboxPath: "sing-box 路径（singbox.path）",
	singboxPathHint: "加密节点的转换核心：PATH 名或绝对路径。未装则加密节点停在「待转换」。",
	sectionPinned: "固定主力出口（pinned）",
	pinnedAddress: "主力出口地址",
	pinnedAddressHint: "例如 Clash 混合端口 http://127.0.0.1:7897，或专线 http://host:port。即填即固定。",
	pinnedStrict: "绝对固定（pinnedStrict）",
	pinnedStrictHint: "开启后失败原样透传：不换出口、不直连。适合「这个出口必须用」的场景。",
	pinnedStrictOn: "绝对固定：失败也不换、不直连",
	pinnedStrictOff: "主力+备胎：429/断线自动切换，恢复后回归",
	pinnedUnset: "解除固定",
	sectionProbe: "探活（probe）",
	probeModels: "探活模型（probeModels）",
	probeModelsHint: "从列表选择探活模型；不选 = 默认 big-pickle。同一出口内多模型串行探测。",
	probeModelPick: "选择模型…",
	probeModelUnverified: "未验证",
	probeModelsDefault: "当前使用默认探活模型：big-pickle（S3 已验证清单首个）。",
	probeConcurrency: "并发上限（maxConcurrentProbes）",
	probeConcurrencyHint: "不同出口并发探测的上限（1-8，默认 3）；同一出口永远串行。",
	probeAll: "批量探活",
	probeRunning: "探活中 {done}/{total}…",
	sectionExits: "出口列表",
	exitAddress: "地址",
	exitSource: "来源",
	exitLocation: "位置",
	exitLatency: "延迟",
	exitQuality: "质量",
	exitIp: "出口 IP",
	exitState: "状态",
	exitPassive: "真实流量",
	stateOk: "ok",
	stateCooling: "冷却中",
	stateDead: "dead",
	stateUnknown: "未探活",
	exitProbe: "探测",
	exitPin: "固定为主力",
	exitPinnedMark: "主力",
	sectionBans: "模型封禁列表",
	bansEmpty: "没有已封禁的 (出口 × 模型) 对。",
	banBanned: "已封禁",
	banSuspect: "疑似",
	copyCompliance: "匿名配额受上游限流；多出口不绕过配额，只在出口间调度。固定/订阅节点优先；公共免费代理有安全与合规风险。",
	save: "保存",
	saving: "保存中…",
	saved: "已保存，立即生效",
	reset: "恢复默认",
	saveError: "保存失败",
	formUnavailable: "设置服务当前不可用，暂时无法编辑 IP 池配置。",
	formReadOnly: "当前 profile 的配置为只读，无法在此保存。",
	formSaveFailed: "上次保存未被接受。",
	invalidRange: "数值超出允许范围。",
	invalidProxy: "代理地址格式应为 http://host:port 或 socks5://host:port。",
	invalidUrl: "请填写合法的 http(s) URL。",
	invalidCountry: "国家码应为两个字母（如 CN），逗号分隔。",
	invalidModel: "模型 id 不能为空。",
	refreshError: "状态获取失败",
	expand: "展开",
	collapse: "收起"
};
/** English dictionary, checked complete against the zh key set. */
const en = {
	nav: "IP Pool",
	title: "IP Pool (opencode2dsh)",
	description: "Schedules free-model availability across exit IPs: rotation, 429 cooldown, per-exit×model probes.",
	statusLoading: "Loading…",
	statusUnavailable: "Settings service unavailable; the IP pool configuration cannot be read or written.",
	enabled: "Enable IP pool (enabled)",
	enabledHint: "Off = every request goes direct, exactly as if the pool were not installed.",
	poolState: "Pool state",
	poolStateHealthy: "healthy",
	poolStateWarning: "low",
	poolStateCritical: "critical",
	poolStateEmergency: "depleted",
	poolAvailable: "{available}/{capacity} usable",
	poolSources: "Sources: free {free} · manual {manual} · subscription {subscription}",
	pinnedBadge: "pinned",
	deferredNotice: "Routing deferred: {reason}",
	sectionFree: "Free sources (free)",
	freeEnabled: "Free-source fetching",
	freeEnabledHint: "Fetch public free-proxy lists and admit survivors; off uses only the sources below.",
	freeTargetSize: "Target size (targetSize)",
	freeTargetSizeHint: "Usable free exits the pool refills to (1-100, default 20).",
	freeBlockedCountries: "Geo blocklist (blockedCountries)",
	freeBlockedCountriesHint: "ISO country codes, comma-separated; matching exits are refused. Default CN.",
	refillNow: "Refill now",
	refillRunning: "Refilling…",
	refillStageFetch: "① fetching source lists",
	refillStageCoarse: "② coarse screening",
	refillStageAdmit: "③ admission probes",
	refillStageIdle: "done",
	refillCountSources: "{done}/{total} sources answered",
	refillCountFetched: "{n} rows",
	refillCountCoarse: "screened {done}/{total} · {passed} alive",
	refillCountAdmit: "probed {done} · admitted {admitted}",
	refillSummary: "last round: admitted {admitted} (of {fetched} candidates)",
	sectionManual: "Manual proxies (manual)",
	manualHint: "One per line: http://host:port or socks5://host:port. For your own nodes.",
	manualAdd: "Add proxy",
	manualPlaceholder: "http://127.0.0.1:7897",
	sectionSubscription: "Subscriptions (subscription)",
	subscriptionHint: "Airport/self-hosted Clash·V2ray subscription URLs, one per line; plaintext nodes dial directly, encrypted ones convert via sing-box.",
	subscriptionAdd: "Add subscription",
	subscriptionPlaceholder: "https://…",
	subscriptionRefreshMs: "Refresh interval (ms)",
	subscriptionRefreshMsHint: "Default 1,800,000 (30 min). Subscriptions are pulled gently, never fanned out.",
	subscriptionRefreshNow: "Refresh now",
	singboxPath: "sing-box path (singbox.path)",
	singboxPathHint: "Conversion core for encrypted nodes: PATH name or absolute path. Without it they stay \"pending conversion\".",
	sectionPinned: "Pinned primary exit (pinned)",
	pinnedAddress: "Primary exit address",
	pinnedAddressHint: "e.g. a Clash mixed port http://127.0.0.1:7897, or a leased line. Pins on save.",
	pinnedStrict: "Absolute pinning (pinnedStrict)",
	pinnedStrictHint: "Failures pass through verbatim: no rotation, no direct fallback. For \"this exit must be used\".",
	pinnedStrictOn: "Absolute: never rotate, never direct",
	pinnedStrictOff: "Primary + fallback: rotate on 429/drop, return when recovered",
	pinnedUnset: "Unpin",
	sectionProbe: "Probing (probe)",
	probeModels: "Probe models (probeModels)",
	probeModelsHint: "Pick probe models from the list; none selected = default big-pickle. Multiple models stay serial per exit.",
	probeModelPick: "Pick a model…",
	probeModelUnverified: "unverified",
	probeModelsDefault: "Using the default probe model: big-pickle (first of the S3 verified list).",
	probeConcurrency: "Concurrency cap (maxConcurrentProbes)",
	probeConcurrencyHint: "Cross-exit probe cap (1-8, default 3); one exit is always serial.",
	probeAll: "Probe all",
	probeRunning: "Probing {done}/{total}…",
	sectionExits: "Exits",
	exitAddress: "Address",
	exitSource: "Source",
	exitLocation: "Location",
	exitLatency: "Latency",
	exitQuality: "Quality",
	exitIp: "Exit IP",
	exitState: "State",
	exitPassive: "Live traffic",
	stateOk: "ok",
	stateCooling: "cooling",
	stateDead: "dead",
	stateUnknown: "unprobed",
	exitProbe: "Probe",
	exitPin: "Pin",
	exitPinnedMark: "primary",
	sectionBans: "Model bans",
	bansEmpty: "No banned (exit × model) pairs.",
	banBanned: "banned",
	banSuspect: "suspect",
	copyCompliance: "Anonymous quota is upstream-rate-limited; multiple exits do not bypass quota, they schedule across it. Pinned/subscription nodes first; public free proxies carry security and compliance risk.",
	save: "Save",
	saving: "Saving…",
	saved: "Saved, applied live",
	reset: "Reset to defaults",
	saveError: "Save failed",
	formUnavailable: "The settings service is unavailable; the IP-pool configuration cannot be edited right now.",
	formReadOnly: "This profile’s configuration is read-only; you cannot save from here.",
	formSaveFailed: "The last save was not accepted.",
	invalidRange: "A value is out of range.",
	invalidProxy: "Expected http://host:port or socks5://host:port.",
	invalidUrl: "Enter a valid http(s) URL.",
	invalidCountry: "Country codes are two letters (e.g. CN), comma-separated.",
	invalidModel: "Model id must not be empty.",
	refreshError: "Status fetch failed",
	expand: "Expand",
	collapse: "Collapse"
};
/** The copy the shared SettingsForm frame renders (save bar, read-only, failures). */
function formLabels(t) {
	return {
		unavailable: t("formUnavailable"),
		readOnly: t("formReadOnly"),
		saveFailed: t("formSaveFailed"),
		save: t("save"),
		saving: t("saving")
	};
}

//#endregion
//#region \0dsh-css:D:\Code\temp\normal_chat\opencode2dsh\src\client\ip-pool.module.css.mjs
const css = "._4GGixW_card{border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-3,#fff);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}._4GGixW_card:hover{border-color:var(--dsw-alias-label-dimmed,#8b949e)}._4GGixW_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}._4GGixW_header:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#4f8cff);outline-offset:-2px}._4GGixW_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}._4GGixW_name{color:var(--dsw-alias-label-primary,#1f2329);font-size:15px;font-weight:600;line-height:1.4}._4GGixW_description{color:var(--dsw-alias-label-tertiary,#6b7280);font-size:13px;line-height:1.5}._4GGixW_chevron{color:var(--dsw-alias-label-tertiary,#6b7280);flex:none;transition:transform .16s}._4GGixW_chevronOpen{transform:rotate(180deg)}._4GGixW_body{border-top:1px solid var(--dsw-alias-border-l2,#d0d7de);flex-direction:column;gap:14px;margin:0 16px;padding:14px 0 8px;display:flex}._4GGixW_status{color:var(--dsw-alias-label-tertiary,#6b7280);margin:4px 0;font-size:13px;line-height:1.5}._4GGixW_field{flex-direction:column;gap:4px;display:flex}._4GGixW_fieldRow{gap:10px;display:flex}._4GGixW_fieldRow>._4GGixW_field{flex:1 1 0;min-width:0}._4GGixW_fieldLabel{color:var(--dsw-alias-label-primary,#1f2329);font-size:13px;font-weight:500}._4GGixW_fieldHint{color:var(--dsw-alias-label-tertiary,#6b7280);font-size:12px;line-height:1.45}._4GGixW_input{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-2,#f6f8fa);width:100%;color:var(--dsw-alias-label-primary,#1f2329);color-scheme:light;border-radius:6px;padding:6px 8px;font-size:13px}._4GGixW_input:focus{outline:2px solid var(--dsw-alias-state-business-primary,#4f8cff);outline-offset:-1px}body[data-ds-dark-theme] ._4GGixW_input,body[data-ds-dark-theme] ._4GGixW_select{color-scheme:dark}._4GGixW_textarea{resize:vertical;min-height:56px;font-family:inherit;}._4GGixW_rowList{flex-direction:column;gap:6px;margin:0;padding:0;list-style:none;display:flex}._4GGixW_row{align-items:center;gap:6px;display:flex}._4GGixW_rowLabel{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--dsw-alias-label-primary,#1f2329);flex:1 1 0;font-size:13px;overflow:hidden}._4GGixW_rowInput{flex:1 1 0;}._4GGixW_rowRemove{border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-2,#f6f8fa);color:var(--dsw-alias-label-secondary,#4b5563);cursor:pointer;border-radius:6px;flex:none;padding:4px 8px;font-size:12px}._4GGixW_rowRemove:hover{border-color:var(--dsw-alias-state-error-primary,#d1242f);color:var(--dsw-alias-state-error-primary,#d1242f)}._4GGixW_rowAdd{border:1px dashed var(--dsw-alias-border-l3,#a6adb4);color:var(--dsw-alias-label-secondary,#4b5563);cursor:pointer;background:0 0;border-radius:6px;align-self:flex-start;padding:4px 10px;font-size:12px}._4GGixW_rowAdd:hover{border-color:var(--dsw-alias-state-business-primary,#4f8cff);color:var(--dsw-alias-state-business-primary,#4f8cff)}._4GGixW_footer{align-items:center;gap:10px;margin-top:2px;display:flex}._4GGixW_primaryButton{background:var(--dsw-alias-button-primary-fill,#4f8cff);color:var(--dsw-alias-label-primary-foreground,#fff);cursor:pointer;border:none;border-radius:6px;padding:6px 14px;font-size:13px;font-weight:500}._4GGixW_primaryButton:hover{background:var(--dsw-alias-button-primary-hover,#3b76e0)}._4GGixW_primaryButton:disabled{opacity:.6;cursor:default}._4GGixW_ghostButton{border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-2,#f6f8fa);color:var(--dsw-alias-label-secondary,#4b5563);cursor:pointer;border-radius:6px;padding:6px 12px;font-size:13px}._4GGixW_ghostButton:hover{border-color:var(--dsw-alias-border-l3,#a6adb4)}._4GGixW_saveStatus{font-size:12px;line-height:1.4}._4GGixW_saveStatusOk{color:var(--dsw-alias-state-success-primary,#1a7f37)}._4GGixW_saveStatusError{color:var(--dsw-alias-state-error-primary,#d1242f)}._4GGixW_overviewBar{border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-2,#f6f8fa);color:var(--dsw-alias-label-secondary,#4b5563);border-radius:8px;flex-wrap:wrap;align-items:center;gap:8px 14px;padding:8px 10px;font-size:12px;display:flex}._4GGixW_badge{border:1px solid var(--dsw-alias-border-l2,#d0d7de);color:var(--dsw-alias-label-secondary,#4b5563);white-space:nowrap;border-radius:999px;align-items:center;gap:4px;padding:2px 8px;font-size:11px;line-height:1.5;display:inline-flex}._4GGixW_badgeHealthy{border-color:var(--dsw-alias-state-success-primary,#1a7f37);color:var(--dsw-alias-state-success-primary,#1a7f37)}._4GGixW_badgeWarning{border-color:var(--dsw-alias-state-warning-primary,#9a6700);color:var(--dsw-alias-state-warning-primary,#9a6700)}._4GGixW_badgeCritical,._4GGixW_badgeEmergency{border-color:var(--dsw-alias-state-error-primary,#d1242f);color:var(--dsw-alias-state-error-primary,#d1242f)}._4GGixW_badgePinned{border-color:var(--dsw-alias-state-business-primary,#4f8cff);color:var(--dsw-alias-state-business-primary,#4f8cff)}._4GGixW_table{border:1px solid var(--dsw-alias-border-l2,#d0d7de);border-radius:8px;display:block;overflow-x:auto}._4GGixW_tableGrid{border-collapse:collapse;width:100%;font-size:12px}._4GGixW_tableGrid th,._4GGixW_tableGrid td{border-bottom:1px solid var(--dsw-alias-border-l2,#d0d7de);text-align:left;color:var(--dsw-alias-label-secondary,#4b5563);white-space:nowrap;padding:6px 8px}._4GGixW_tableGrid th{color:var(--dsw-alias-label-primary,#1f2329);background:var(--dsw-alias-bg-layer-2,#f6f8fa);font-weight:600}._4GGixW_tableGrid tr:last-child td{border-bottom:none}._4GGixW_mono{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}._4GGixW_stateOk{color:var(--dsw-alias-state-success-primary,#1a7f37)}._4GGixW_stateCooling{color:var(--dsw-alias-state-warning-primary,#9a6700)}._4GGixW_stateDead{color:var(--dsw-alias-state-error-primary,#d1242f)}._4GGixW_stateUnknown{color:var(--dsw-alias-label-tertiary,#6b7280)}._4GGixW_section{border:1px solid var(--dsw-alias-border-l2,#d0d7de);background:var(--dsw-alias-bg-layer-2,#f6f8fe80);border-radius:8px;flex-direction:column;gap:8px;padding:10px 12px;display:flex}._4GGixW_sectionTitle{color:var(--dsw-alias-label-primary,#1f2329);font-size:13px;font-weight:600}._4GGixW_radio{color:var(--dsw-alias-label-secondary,#4b5563);cursor:pointer;align-items:center;gap:6px;font-size:13px;display:flex}._4GGixW_compliance{color:var(--dsw-alias-label-tertiary,#6b7280);border-top:1px dashed var(--dsw-alias-border-l2,#d0d7de);padding-top:10px;font-size:11px;line-height:1.5}._4GGixW_collapseToggle{color:var(--dsw-alias-state-business-primary,#4f8cff);cursor:pointer;background:0 0;border:none;align-self:flex-start;padding:2px 8px;font-size:12px}";
const tagId = "@opencode2dsh/dsh-plugin/ip-pool.module.css";
if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
	const tag = document.createElement("style");
	tag.dataset.plugin = "@opencode2dsh/dsh-plugin";
	tag.dataset.pluginCss = tagId;
	tag.textContent = css;
	document.head.appendChild(tag);
}
var ip_pool_module_css_default = {
	"row": "_4GGixW_row",
	"radio": "_4GGixW_radio",
	"footer": "_4GGixW_footer",
	"saveStatus": "_4GGixW_saveStatus",
	"overviewBar": "_4GGixW_overviewBar",
	"rowLabel": "_4GGixW_rowLabel",
	"name": "_4GGixW_name",
	"select": "_4GGixW_select",
	"ghostButton": "_4GGixW_ghostButton",
	"section": "_4GGixW_section",
	"mono": "_4GGixW_mono",
	"fieldLabel": "_4GGixW_fieldLabel",
	"field": "_4GGixW_field",
	"chevronOpen": "_4GGixW_chevronOpen",
	"saveStatusOk": "_4GGixW_saveStatusOk",
	"chevron": "_4GGixW_chevron",
	"rowAdd": "_4GGixW_rowAdd",
	"badgeHealthy": "_4GGixW_badgeHealthy",
	"rowInput": "_4GGixW_rowInput",
	"table": "_4GGixW_table",
	"stateOk": "_4GGixW_stateOk",
	"saveStatusError": "_4GGixW_saveStatusError",
	"tableGrid": "_4GGixW_tableGrid",
	"input": "_4GGixW_input",
	"stateDead": "_4GGixW_stateDead",
	"compliance": "_4GGixW_compliance",
	"header": "_4GGixW_header",
	"status": "_4GGixW_status",
	"fieldHint": "_4GGixW_fieldHint",
	"textarea": "_4GGixW_textarea",
	"badgeEmergency": "_4GGixW_badgeEmergency",
	"headText": "_4GGixW_headText",
	"badgeCritical": "_4GGixW_badgeCritical",
	"rowList": "_4GGixW_rowList",
	"stateCooling": "_4GGixW_stateCooling",
	"rowRemove": "_4GGixW_rowRemove",
	"primaryButton": "_4GGixW_primaryButton",
	"badgeWarning": "_4GGixW_badgeWarning",
	"fieldRow": "_4GGixW_fieldRow",
	"collapseToggle": "_4GGixW_collapseToggle",
	"description": "_4GGixW_description",
	"badge": "_4GGixW_badge",
	"body": "_4GGixW_body",
	"badgePinned": "_4GGixW_badgePinned",
	"card": "_4GGixW_card",
	"stateUnknown": "_4GGixW_stateUnknown",
	"sectionTitle": "_4GGixW_sectionTitle"
};

//#endregion
//#region src/client/IpPoolCard.tsx
/** The bridge prefix (same-origin, loopback-only on the host). */
const BRIDGE_PREFIX = "/api/opencode2dsh/ip-pool";
const DEFAULTS = {
	enabled: false,
	probeModels: [],
	maxConcurrentProbes: 3,
	free: {
		enabled: true,
		targetSize: 20,
		blockedCountries: ["CN"]
	},
	manual: [],
	subscription: {
		urls: [],
		refreshMs: 30 * 6e4
	},
	singbox: { path: "sing-box" },
	pinnedExitId: "",
	pinnedStrict: false,
	proxyHosts: []
};
/** Subscription URLs never render in full — the settings doc is the only
*  place they exist in plaintext (docs §5.1 redaction boundary). */
function redactUrl(url) {
	if (url.length <= 24) return url;
	return url.slice(0, 12) + "…" + url.slice(-6);
}
/** JSON deep-equal over the card's plain values. */
function deepEqual(a, b) {
	return JSON.stringify(a) === JSON.stringify(b);
}
function emptyForm() {
	return {
		enabled: DEFAULTS.enabled,
		freeEnabled: DEFAULTS.free.enabled,
		targetSize: String(DEFAULTS.free.targetSize),
		blockedCountries: DEFAULTS.free.blockedCountries.join(","),
		manual: [],
		subscriptionUrls: [],
		refreshMs: String(DEFAULTS.subscription.refreshMs),
		singboxPath: DEFAULTS.singbox.path,
		pinnedExitId: "",
		pinnedStrict: DEFAULTS.pinnedStrict,
		probeModels: [],
		maxConcurrentProbes: String(DEFAULTS.maxConcurrentProbes)
	};
}
function formFromValue(value) {
	return {
		enabled: value.enabled,
		freeEnabled: value.free.enabled,
		targetSize: String(value.free.targetSize),
		blockedCountries: value.free.blockedCountries.join(","),
		manual: [...value.manual],
		subscriptionUrls: [...value.subscription.urls],
		refreshMs: String(value.subscription.refreshMs),
		singboxPath: value.singbox.path,
		pinnedExitId: value.pinnedExitId,
		pinnedStrict: value.pinnedStrict,
		probeModels: [...value.probeModels],
		maxConcurrentProbes: String(value.maxConcurrentProbes)
	};
}
function diffWrites(form, snapshot) {
	const value = snapshot.value;
	const base = snapshot.base;
	const writes = [];
	const push = (field, next, current, baseValue) => {
		if (deepEqual(next, current)) return;
		if (deepEqual(next, baseValue)) return;
		writes.push({
			field,
			op: "set",
			value: next
		});
	};
	push("enabled", form.enabled, value?.enabled, base?.enabled);
	push("free", {
		enabled: form.freeEnabled,
		targetSize: Number(form.targetSize),
		blockedCountries: splitCsv(form.blockedCountries)
	}, value?.free, base?.free);
	push("manual", form.manual, value?.manual, base?.manual);
	push("subscription", {
		urls: form.subscriptionUrls,
		refreshMs: Number(form.refreshMs)
	}, value?.subscription, base?.subscription);
	push("singbox", { path: form.singboxPath }, value?.singbox, base?.singbox);
	push("pinnedExitId", form.pinnedExitId, value?.pinnedExitId, base?.pinnedExitId);
	push("pinnedStrict", form.pinnedStrict, value?.pinnedStrict, base?.pinnedStrict);
	push("probeModels", form.probeModels, value?.probeModels, base?.probeModels);
	push("maxConcurrentProbes", Number(form.maxConcurrentProbes), value?.maxConcurrentProbes, base?.maxConcurrentProbes);
	return writes;
}
function splitCsv(line) {
	return line.split(",").map((part) => part.trim().toUpperCase()).filter((part) => part.length > 0);
}
/** One-line live refill progress: stage + counters (docs §5.3). */
function refillProgressLine(progress, t) {
	const parts = [{
		fetch: t("refillStageFetch"),
		coarse: t("refillStageCoarse"),
		admit: t("refillStageAdmit"),
		idle: t("refillStageIdle")
	}[progress.stage]];
	if (progress.stage === "fetch") {
		const sources = t("refillCountSources").replace("{done}", String(progress.sourcesDone)).replace("{total}", String(progress.sourcesTotal));
		const rows = t("refillCountFetched").replace("{n}", String(progress.fetched));
		parts.push(sources + " · " + rows);
	}
	if (progress.stage === "coarse") parts.push(t("refillCountCoarse").replace("{done}", String(progress.coarseDone)).replace("{total}", String(progress.candidates)).replace("{passed}", String(progress.coarsePassed)));
	if (progress.stage === "admit") parts.push(t("refillCountAdmit").replace("{done}", String(progress.admissions)).replace("{admitted}", String(progress.admitted)));
	return parts.join(" · ");
}
/** One labeled input. */
function TextField(props) {
	const { label, hint, value, onChange, placeholder, testId, type = "text", min, max, step } = props;
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
		className: ip_pool_module_css_default.field,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ip_pool_module_css_default.fieldLabel,
				children: label
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
				className: ip_pool_module_css_default.input,
				type,
				value,
				placeholder,
				min,
				max,
				step,
				"data-testid": testId,
				onChange: (event) => onChange(event.target.value)
			}),
			hint !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ip_pool_module_css_default.fieldHint,
				children: hint
			})
		]
	});
}
/** One editable string-list (manual proxies / subscription URLs / probe models). */
function StringList(props) {
	const { label, hint, values, placeholder, testId, redacted, onChange } = props;
	const [draft, setDraft] = (0, react.useState)("");
	const add = () => {
		const entry = draft.trim();
		if (entry === "" || values.includes(entry)) return;
		onChange([...values, entry]);
		setDraft("");
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: ip_pool_module_css_default.field,
		"data-testid": testId,
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ip_pool_module_css_default.fieldLabel,
				children: label
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ip_pool_module_css_default.fieldHint,
				children: hint
			}),
			values.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
				className: ip_pool_module_css_default.rowList,
				children: values.map((entry) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
					className: ip_pool_module_css_default.row,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: ip_pool_module_css_default.rowLabel,
						title: redacted ? entry : void 0,
						children: redacted ? redactUrl(entry) : entry
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
						type: "button",
						className: ip_pool_module_css_default.rowRemove,
						onClick: () => onChange(values.filter((v) => v !== entry)),
						children: "✕"
					})]
				}, entry))
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: ip_pool_module_css_default.row,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					className: ip_pool_module_css_default.rowInput,
					value: draft,
					placeholder,
					onChange: (event) => setDraft(event.target.value),
					onKeyDown: (event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							add();
						}
					}
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: ip_pool_module_css_default.rowAdd,
					onClick: add,
					children: "+"
				})]
			})
		]
	});
}
/**
* Probe-model multi-select over the bridge /models rows: selected models as
* removable chips above a dropdown of S3-verified + live-catalog options
* (docs §5.2 探活模型). Empty selection = the S3-first default (big-pickle).
*/
function ModelPicker(props) {
	const { value, hint, models, loading, t, onChange } = props;
	const toggle = (id) => {
		onChange(value.includes(id) ? value.filter((entry) => entry !== id) : [...value, id]);
	};
	const options = models.filter((row) => !value.includes(row.id));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: ip_pool_module_css_default.field,
		"data-testid": "field-probeModels",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ip_pool_module_css_default.fieldLabel,
				children: t("probeModels")
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ip_pool_module_css_default.fieldHint,
				children: hint
			}),
			value.length > 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
				className: ip_pool_module_css_default.rowList,
				children: value.map((id) => {
					const row = models.find((m) => m.id === id);
					return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
						className: ip_pool_module_css_default.row,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: ip_pool_module_css_default.rowLabel,
							children: [id, row?.verified === false ? ` · ${t("probeModelUnverified")}` : ""]
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: ip_pool_module_css_default.rowRemove,
							"aria-label": "remove",
							onClick: () => toggle(id),
							children: "✕"
						})]
					}, id);
				})
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: ip_pool_module_css_default.row,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
					className: ip_pool_module_css_default.select,
					"data-testid": "probe-model-select",
					value: "",
					disabled: options.length === 0,
					onChange: (event) => {
						const id = event.target.value;
						if (id !== "") toggle(id);
					},
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
						value: "",
						children: loading ? t("statusLoading") : options.length === 0 ? "—" : t("probeModelPick")
					}), options.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("option", {
						value: row.id,
						children: [row.id, row.verified === false ? ` · ${t("probeModelUnverified")}` : ""]
					}, row.id))]
				})
			}),
			value.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: ip_pool_module_css_default.fieldHint,
				children: t("probeModelsDefault")
			})
		]
	});
}
/** Pool overview strip: four-state badge + counts + pinned badge. */
function OverviewBar(props) {
	const { status, t } = props;
	if (status === null) return null;
	const stateLabel = {
		healthy: t("poolStateHealthy"),
		warning: t("poolStateWarning"),
		critical: t("poolStateCritical"),
		emergency: t("poolStateEmergency")
	};
	const stateClass = {
		healthy: ip_pool_module_css_default.badgeHealthy,
		warning: ip_pool_module_css_default.badgeWarning,
		critical: ip_pool_module_css_default.badgeCritical,
		emergency: ip_pool_module_css_default.badgeEmergency
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: ip_pool_module_css_default.overviewBar,
		"data-testid": "ip-pool-overview",
		children: [
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: `${ip_pool_module_css_default.badge} ${stateClass[status.state]}`,
				children: stateLabel[status.state]
			}),
			status.deferredReason !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: `${ip_pool_module_css_default.badge} ${ip_pool_module_css_default.badgeCritical}`,
				children: t("deferredNotice").replace("{reason}", status.deferredReason)
			}),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("poolAvailable").replace("{available}", String(status.availableFree)).replace("{capacity}", String(status.targetSize)) }),
			/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("poolSources").replace("{free}", String(status.bySource.free)).replace("{manual}", String(status.bySource.manual)).replace("{subscription}", String(status.bySource.subscription)) }),
			status.pinned !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
				className: `${ip_pool_module_css_default.badge} ${ip_pool_module_css_default.badgePinned}`,
				children: [t("pinnedBadge"), status.pinned.strict ? " (" + t("pinnedStrict") + ")" : ""]
			})
		]
	});
}
/** The exit table + ban list. */
function ExitTable(props) {
	const { status, t, onProbe, onPin, busy } = props;
	const [bansOpen, setBansOpen] = (0, react.useState)(false);
	if (status === null) return null;
	const stateCell = (exit) => {
		if (exit.state === "dead") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: ip_pool_module_css_default.stateDead,
			children: t("stateDead")
		});
		if (exit.cooling) return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: ip_pool_module_css_default.stateCooling,
			children: t("stateCooling")
		});
		if (exit.state === "ok") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: ip_pool_module_css_default.stateOk,
			children: t("stateOk")
		});
		return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: ip_pool_module_css_default.stateUnknown,
			children: t("stateUnknown")
		});
	};
	const allBans = status.exits.flatMap((exit) => exit.bannedModels.map((ban) => ({
		exitId: exit.id,
		...ban
	})));
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
		className: ip_pool_module_css_default.table,
		"data-testid": "ip-pool-exits",
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("table", {
			className: ip_pool_module_css_default.tableGrid,
			children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: t("exitAddress") }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: t("exitSource") }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: t("exitLocation") }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: t("exitLatency") }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: t("exitQuality") }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: t("exitIp") }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: t("exitState") }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", { children: t("exitPassive") }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("th", {})
			] }) }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tbody", { children: [status.exits.map((exit) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("td", {
					className: ip_pool_module_css_default.mono,
					children: [exit.id, exit.pinned ? ` · ${t("exitPinnedMark")}` : ""]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: exit.source }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: exit.exitLocation || "—" }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: exit.latencyMs > 0 ? `${exit.latencyMs}ms` : "—" }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: exit.latencyMs > 0 ? exit.quality : "—" }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
					className: ip_pool_module_css_default.mono,
					children: exit.exitIP || "—"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", { children: stateCell(exit) }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
					className: ip_pool_module_css_default.mono,
					children: exit.passive.ok > 0 || exit.passive.limited > 0 || exit.passive.refused > 0 || exit.passive.dead > 0 || exit.passive.transport > 0 ? `✓${exit.passive.ok} 429:${exit.passive.limited} 401/403:${exit.passive.refused} ✗:${exit.passive.dead + exit.passive.transport}` : "—"
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: ip_pool_module_css_default.rowRemove,
					disabled: busy,
					onClick: () => onProbe(exit.id),
					children: t("exitProbe")
				}), !exit.pinned && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					className: ip_pool_module_css_default.rowRemove,
					disabled: busy,
					onClick: () => onPin(exit.id),
					children: t("exitPin")
				})] })
			] }, exit.id)), status.exits.length === 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("td", {
				colSpan: 9,
				className: ip_pool_module_css_default.status,
				children: t("statusUnavailable")
			}) })] })]
		})
	}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: ip_pool_module_css_default.section,
		children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
			type: "button",
			className: ip_pool_module_css_default.collapseToggle,
			onClick: () => setBansOpen((open) => !open),
			children: [
				t(bansOpen ? "collapse" : "expand"),
				" · ",
				t("sectionBans"),
				" (",
				allBans.length,
				")"
			]
		}), bansOpen && (allBans.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
			className: ip_pool_module_css_default.status,
			children: t("bansEmpty")
		}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
			className: ip_pool_module_css_default.rowList,
			children: allBans.map((ban) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("li", {
				className: ip_pool_module_css_default.row,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: ip_pool_module_css_default.rowLabel,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ban.state === "banned" ? ip_pool_module_css_default.stateDead : ip_pool_module_css_default.stateCooling,
							children: ban.state === "banned" ? t("banBanned") : t("banSuspect")
						}),
						" · ",
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ip_pool_module_css_default.mono,
							children: ban.exitId
						}),
						" × ",
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ip_pool_module_css_default.mono,
							children: ban.model
						})
					]
				})
			}, `${ban.exitId}|${ban.model}`))
		}))]
	})] });
}
/** The card body. */
function CardBody(props) {
	const { scope, useSnapshot, t } = props;
	const snapshot = useSnapshot();
	const [form, setForm] = (0, react.useState)(() => emptyForm());
	const [saving, setSaving] = (0, react.useState)(false);
	const [saved, setSaved] = (0, react.useState)(false);
	const [error, setError] = (0, react.useState)(null);
	const [status, setStatus] = (0, react.useState)(null);
	const [statusError, setStatusError] = (0, react.useState)(null);
	const [probeModelRows, setProbeModelRows] = (0, react.useState)([]);
	const [probeModelsLoading, setProbeModelsLoading] = (0, react.useState)(false);
	const [actionBusy, setActionBusy] = (0, react.useState)(false);
	const hydratedRef = (0, react.useRef)(false);
	const formRef = (0, react.useRef)(form);
	formRef.current = form;
	(0, react.useEffect)(() => {
		if (snapshot.status === "ready" && !hydratedRef.current && snapshot.value !== void 0) {
			hydratedRef.current = true;
			setForm(formFromValue(snapshot.value));
		}
	}, [snapshot.status, snapshot.value]);
	(0, react.useEffect)(() => {
		let cancelled = false;
		setProbeModelsLoading(true);
		fetch(`${BRIDGE_PREFIX}/models`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: "{}"
		}).then((response) => response.json()).then((body) => {
			if (!cancelled && body.ok && body.value) setProbeModelRows(body.value.models);
		}).catch(() => {}).finally(() => {
			if (!cancelled) setProbeModelsLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	const probing = status !== null && status.prober.queued + status.prober.inFlight > 0;
	const refilling = status?.refill?.progress.running === true;
	const refreshStatus = (0, react.useCallback)(async () => {
		try {
			const body = await (await fetch(`${BRIDGE_PREFIX}/status`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: "{}"
			})).json();
			if (body.ok && body.value) {
				setStatus(body.value);
				setStatusError(null);
			} else setStatusError(t("refreshError"));
		} catch {
			setStatusError(t("refreshError"));
		}
	}, [t]);
	(0, react.useEffect)(() => {
		if (snapshot.status !== "ready" || !hydratedRef.current || !form.enabled) return;
		refreshStatus();
		const interval = setInterval(() => void refreshStatus(), probing || refilling ? 1e3 : 3e3);
		return () => clearInterval(interval);
	}, [
		snapshot.status,
		form.enabled,
		probing,
		refilling,
		refreshStatus,
		hydratedRef.current
	]);
	if (snapshot.status === "loading") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
		className: ip_pool_module_css_default.status,
		children: t("statusLoading")
	});
	if (snapshot.status === "unavailable") return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
		className: ip_pool_module_css_default.status,
		children: t("statusUnavailable")
	});
	const validate = () => {
		const size = Number(form.targetSize);
		if (!/^\d+$/.test(form.targetSize.trim()) || size < 1 || size > 100) return t("invalidRange");
		const conc = Number(form.maxConcurrentProbes);
		if (!/^\d+$/.test(form.maxConcurrentProbes.trim()) || conc < 1 || conc > 8) return t("invalidRange");
		const refresh = Number(form.refreshMs);
		if (!/^\d+$/.test(form.refreshMs.trim()) || refresh < 6e4) return t("invalidRange");
		for (const entry of form.manual) if (!/^https?:\/\/[^\s:]+:\d{1,5}$|^socks5:\/\/[^\s:]+:\d{1,5}$|^socks5h?:\/\/\[[^\]]+\]:\d{1,5}$/.test(entry)) return t("invalidProxy");
		for (const url of form.subscriptionUrls) if (!/^https?:\/\/.+/.test(url)) return t("invalidUrl");
		for (const country of splitCsv(form.blockedCountries)) if (!/^[A-Z]{2}$/.test(country)) return t("invalidCountry");
		for (const model of form.probeModels) if (model.trim() === "") return t("invalidModel");
		return null;
	};
	const handleSave = async () => {
		const validation = validate();
		if (validation !== null) {
			setSaved(false);
			setError(validation);
			return;
		}
		const writes = diffWrites(formRef.current, snapshot);
		if (writes.length === 0) {
			setSaved(true);
			setError(null);
			return;
		}
		setSaving(true);
		setError(null);
		let firstFailure = null;
		for (const write of writes) try {
			await scope.set(write.field, write.value);
		} catch (err) {
			firstFailure ??= err instanceof Error ? err.message : t("saveError");
		}
		setSaving(false);
		if (firstFailure === null) setSaved(true);
		else {
			setSaved(false);
			setError(firstFailure);
		}
	};
	const handleReset = async () => {
		setSaving(true);
		setError(null);
		let firstFailure = null;
		for (const field of [
			"enabled",
			"free",
			"manual",
			"subscription",
			"singbox",
			"pinnedExitId",
			"pinnedStrict",
			"probeModels",
			"maxConcurrentProbes"
		]) try {
			await scope.mutate([{
				op: "unset",
				path: [field]
			}]);
		} catch (err) {
			firstFailure ??= err instanceof Error ? err.message : t("saveError");
		}
		setSaving(false);
		if (firstFailure === null) {
			setForm(formFromValue({
				...DEFAULTS,
				...snapshot.base
			}));
			setSaved(true);
		} else {
			setSaved(false);
			setError(firstFailure);
		}
	};
	/** One bridge action (/probe). */
	const bridgeAction = async (body) => {
		setActionBusy(true);
		try {
			await fetch(`${BRIDGE_PREFIX}/probe`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(body)
			});
			await refreshStatus();
		} catch {
			setStatusError(t("refreshError"));
		} finally {
			setActionBusy(false);
		}
	};
	/** Pin an exit from the table: writes pinnedExitId and saves immediately. */
	const pinExit = async (exitId) => {
		setActionBusy(true);
		try {
			await scope.set("pinnedExitId", exitId);
			setForm((current) => ({
				...current,
				pinnedExitId: exitId
			}));
		} catch (err) {
			setError(err instanceof Error ? err.message : t("saveError"));
		} finally {
			setActionBusy(false);
		}
	};
	const probeDone = status !== null ? status.prober.completed : 0;
	const probeTotal = status !== null ? status.prober.enqueued : 0;
	const shell = {
		available: true,
		writable: snapshot.writable,
		dirty: diffWrites(form, snapshot).length > 0,
		invalid: validate() !== null,
		saving,
		failed: error !== null
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.SettingsForm, {
		labels: formLabels(t),
		state: shell,
		onSave: () => {
			handleSave();
		},
		onDiscard: () => {},
		children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
			className: ip_pool_module_css_default.body,
			"data-testid": "ip-pool-form",
			children: [
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)(OverviewBar, {
					status: form.enabled ? status : null,
					t
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ip_pool_module_css_default.field,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ip_pool_module_css_default.fieldLabel,
							children: t("enabled")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Switch, {
							checked: form.enabled,
							label: t("enabled"),
							disabled: !snapshot.writable || saving,
							onChange: (next) => {
								setSaved(false);
								setForm({
									...form,
									enabled: next
								});
							}
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ip_pool_module_css_default.fieldHint,
							children: t("enabledHint")
						})
					]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ip_pool_module_css_default.section,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ip_pool_module_css_default.sectionTitle,
							children: t("sectionFree")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: ip_pool_module_css_default.field,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: ip_pool_module_css_default.fieldLabel,
									children: t("freeEnabled")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Switch, {
									checked: form.freeEnabled,
									label: t("freeEnabled"),
									disabled: !snapshot.writable || saving,
									onChange: (next) => {
										setSaved(false);
										setForm({
											...form,
											freeEnabled: next
										});
									}
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: ip_pool_module_css_default.fieldHint,
									children: t("freeEnabledHint")
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: ip_pool_module_css_default.fieldRow,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextField, {
								label: t("freeTargetSize"),
								hint: t("freeTargetSizeHint"),
								value: form.targetSize,
								testId: "field-targetSize",
								type: "number",
								min: 1,
								max: 100,
								step: 1,
								onChange: (value) => {
									setSaved(false);
									setForm({
										...form,
										targetSize: value
									});
								}
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextField, {
								label: t("freeBlockedCountries"),
								hint: t("freeBlockedCountriesHint"),
								value: form.blockedCountries,
								testId: "field-blockedCountries",
								onChange: (value) => {
									setSaved(false);
									setForm({
										...form,
										blockedCountries: value
									});
								}
							})]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: ip_pool_module_css_default.ghostButton,
							"data-testid": "refill-now",
							disabled: actionBusy || !form.enabled || refilling,
							onClick: () => {
								bridgeAction({ scope: "refill" });
							},
							children: refilling ? t("refillRunning") : t("refillNow")
						}),
						refilling && status?.refill?.progress !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ip_pool_module_css_default.status,
							"data-testid": "refill-progress",
							children: refillProgressLine(status.refill.progress, t)
						}),
						!refilling && status?.refill?.progress.stage === "idle" && (status.refill.progress.admitted > 0 || status.refill.progress.admissions > 0) && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ip_pool_module_css_default.status,
							children: t("refillSummary").replace("{admitted}", String(status.refill.progress.admitted)).replace("{fetched}", String(status.refill.progress.candidates))
						})
					]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ip_pool_module_css_default.section,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: ip_pool_module_css_default.sectionTitle,
						children: t("sectionManual")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(StringList, {
						label: t("sectionManual"),
						hint: t("manualHint"),
						values: form.manual,
						placeholder: t("manualPlaceholder"),
						testId: "field-manual",
						onChange: (next) => {
							setSaved(false);
							setForm({
								...form,
								manual: next
							});
						}
					})]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ip_pool_module_css_default.section,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ip_pool_module_css_default.sectionTitle,
							children: t("sectionSubscription")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(StringList, {
							label: t("sectionSubscription"),
							hint: t("subscriptionHint"),
							values: form.subscriptionUrls,
							placeholder: t("subscriptionPlaceholder"),
							testId: "field-subscriptions",
							redacted: true,
							onChange: (next) => {
								setSaved(false);
								setForm({
									...form,
									subscriptionUrls: next
								});
							}
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: ip_pool_module_css_default.fieldRow,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextField, {
								label: t("subscriptionRefreshMs"),
								hint: t("subscriptionRefreshMsHint"),
								value: form.refreshMs,
								testId: "field-refreshMs",
								type: "number",
								min: 6e4,
								step: 1,
								onChange: (value) => {
									setSaved(false);
									setForm({
										...form,
										refreshMs: value
									});
								}
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: ip_pool_module_css_default.field,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: ip_pool_module_css_default.fieldLabel,
									children: " "
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: ip_pool_module_css_default.ghostButton,
									"data-testid": "refresh-subscriptions",
									disabled: actionBusy || !form.enabled,
									onClick: () => {
										bridgeAction({ scope: "refill" });
									},
									children: t("subscriptionRefreshNow")
								})]
							})]
						}),
						status?.subscription !== null && status?.subscription !== void 0 && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: ip_pool_module_css_default.status,
							children: [
								t("sectionSubscription"),
								": ",
								status.subscription.pendingConversion,
								" 待转换 · ",
								status.subscription.convertedAdmitted,
								" 已转换入池",
								status.subscription.lastError !== "" ? ` · ${status.subscription.lastError}` : ""
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextField, {
							label: t("singboxPath"),
							hint: t("singboxPathHint"),
							value: form.singboxPath,
							testId: "field-singboxPath",
							onChange: (value) => {
								setSaved(false);
								setForm({
									...form,
									singboxPath: value
								});
							}
						})
					]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ip_pool_module_css_default.section,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ip_pool_module_css_default.sectionTitle,
							children: t("sectionPinned")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextField, {
							label: t("pinnedAddress"),
							hint: t("pinnedAddressHint"),
							value: form.pinnedExitId,
							placeholder: t("manualPlaceholder"),
							testId: "field-pinnedExitId",
							onChange: (value) => {
								setSaved(false);
								setForm({
									...form,
									pinnedExitId: value
								});
							}
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: ip_pool_module_css_default.field,
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: ip_pool_module_css_default.fieldLabel,
									children: t("pinnedStrict")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(__deepseek_ai_dsh_client_ui_primitives.Switch, {
									checked: form.pinnedStrict,
									label: t("pinnedStrict"),
									disabled: !snapshot.writable || saving,
									onChange: (next) => {
										setSaved(false);
										setForm({
											...form,
											pinnedStrict: next
										});
									}
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: ip_pool_module_css_default.fieldHint,
									children: form.pinnedStrict ? t("pinnedStrictOn") : t("pinnedStrictOff")
								})
							]
						}),
						form.pinnedExitId !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: ip_pool_module_css_default.ghostButton,
							"data-testid": "unpin",
							disabled: saving,
							onClick: () => {
								setSaved(false);
								setForm({
									...form,
									pinnedExitId: ""
								});
							},
							children: t("pinnedUnset")
						})
					]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ip_pool_module_css_default.section,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ip_pool_module_css_default.sectionTitle,
							children: t("sectionProbe")
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ModelPicker, {
							value: form.probeModels,
							hint: t("probeModelsHint"),
							models: probeModelRows,
							loading: probeModelsLoading,
							t,
							onChange: (next) => {
								setSaved(false);
								setForm({
									...form,
									probeModels: next
								});
							}
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)(TextField, {
							label: t("probeConcurrency"),
							hint: t("probeConcurrencyHint"),
							value: form.maxConcurrentProbes,
							testId: "field-maxConcurrentProbes",
							type: "number",
							min: 1,
							max: 8,
							step: 1,
							onChange: (value) => {
								setSaved(false);
								setForm({
									...form,
									maxConcurrentProbes: value
								});
							}
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: ip_pool_module_css_default.ghostButton,
							"data-testid": "probe-all",
							disabled: actionBusy || !form.enabled,
							onClick: () => {
								bridgeAction({ scope: "all" });
							},
							children: probing ? t("probeRunning").replace("{done}", String(probeDone)).replace("{total}", String(probeTotal)) : t("probeAll")
						})
					]
				}),
				form.enabled && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: ip_pool_module_css_default.field,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: ip_pool_module_css_default.fieldLabel,
						children: t("sectionExits")
					})
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ExitTable, {
					status,
					t,
					busy: actionBusy,
					onProbe: (id) => {
						bridgeAction({
							scope: "exit",
							exitId: id
						});
					},
					onPin: (id) => {
						pinExit(id);
					}
				})] }),
				/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: ip_pool_module_css_default.footer,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: ip_pool_module_css_default.ghostButton,
							"data-testid": "reset-ip-pool",
							disabled: saving || !snapshot.writable,
							onClick: () => {
								handleReset();
							},
							children: t("reset")
						}),
						statusError !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: ip_pool_module_css_default.saveStatusError,
							children: statusError
						}),
						saved && !error && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: `${ip_pool_module_css_default.saveStatus} ${ip_pool_module_css_default.saveStatusOk}`,
							children: t("saved")
						}),
						error !== null && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: `${ip_pool_module_css_default.saveStatus} ${ip_pool_module_css_default.saveStatusError}`,
							children: [
								t("saveError"),
								"：",
								error
							]
						})
					]
				}),
				/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: ip_pool_module_css_default.compliance,
					children: t("copyCompliance")
				})
			]
		})
	});
}
/**
* The IP 池 plugin card. The plugins.item slot renders one entry in two views:
* `summary` (a one-liner in the list / page header) and `page` (the full form).
* Render only the matching view so the card is never shown twice; the page view
* is a standard SettingsForm — the same frame the built-in plugin pages use.
*/
function IpPoolCard(props) {
	const { scope, useSnapshot, t, view } = props;
	if (scope === void 0 || useSnapshot === void 0 || t === void 0) return null;
	if (view === "summary") return t("description");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsx)(CardBody, {
		scope,
		useSnapshot,
		t
	});
}

//#endregion
//#region src/client/index.ts
/** Dictionary namespace owned by this plugin. */
const NS = "settings.ip-pool";
/** The Host entry id whose config carries this plugin's settings (volatile ipPool). */
const ENTRY_ID = "opencode2dsh";
/** The card's id within the plugins.item list. */
const SETTINGS_NAMESPACE = "ip-pool";
/** Placement of the card among the Plugins page's official items. */
const CARD_ORDER = 50;
/**
* Project one namespace's shared form down to its `ipPool` subtree, so the card
* keeps reading/writing ip-pool fields at the top level. Writes gain the
* `['ipPool', …]` path prefix; reads lift `.value.ipPool` / `.base.ipPool` up.
*/
function ipPoolScope(form) {
	const rawGet = form.getSnapshot.bind(form);
	const subscribe = form.subscribe.bind(form);
	const mutate = form.mutate.bind(form);
	const section = (value) => value?.ipPool;
	let source;
	let projected;
	return {
		getSnapshot: () => {
			const next = rawGet();
			if (next !== source || projected === void 0) {
				source = next;
				projected = {
					...next,
					value: next.value?.ipPool,
					base: section(next.base),
					user: section(next.user)
				};
			}
			return projected;
		},
		subscribe,
		set: (field, value) => mutate([{
			op: "set",
			path: ["ipPool", field],
			value
		}]),
		unset: (field) => mutate([{
			op: "unset",
			path: ["ipPool", field]
		}]),
		mutate: (ops, expectedRevision) => mutate(ops.map((op) => ({
			...op,
			path: ["ipPool", ...op.path]
		})), expectedRevision)
	};
}
/** Required services (cordis fiber inject). */
const inject = [
	"slots",
	"locale",
	"configForms"
];
/**
* Bind the ip-pool settings form and register the card while the Host serves
* this plugin's entry. The card is contained to this plugin, so any residual
* host mismatch never takes model routing down with it.
* @param ctx - client root context.
*/
function apply(ctx) {
	ctx.effect(() => ctx.locale.register(NS, {
		zh,
		en
	}), "opencode2dsh: copy dictionaries");
	const t = ctx.locale.bind(NS);
	ctx.effect(() => ctx.configForms.whileServed([ENTRY_ID], () => {
		const scope = ipPoolScope(ctx.configForms.get(ENTRY_ID));
		const getSnapshot = scope.getSnapshot.bind(scope);
		const subscribe = scope.subscribe.bind(scope);
		const useSnapshot = () => (0, react.useSyncExternalStore)(subscribe, getSnapshot);
		const injected = () => ({
			scope,
			useSnapshot,
			t
		});
		return ctx.slots.inject("plugins.item", () => ctx.slots.register({
			name: "plugins.item",
			id: SETTINGS_NAMESPACE,
			order: CARD_ORDER,
			label: () => t("title"),
			locale: NS,
			inject: injected
		}, IpPoolCard));
	}), "opencode2dsh: settings card");
}

//#endregion
exports.apply = apply;
exports.inject = inject;
return module.exports; } });
//# sourceMappingURL=client.js.map