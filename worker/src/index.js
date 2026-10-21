// Counts evrd installs from the network directory fetches every install makes
// (twice a day, User-Agent "evrd/<version> (+https://evrd.sh)"), and passes
// every request on to GitHub Pages untouched.
//
// For each evrd fetch it keeps one row per install per day: the day, a hash of
// the address mixed with a secret and the day (so it can't be reversed or
// followed from one day to the next) and the version. Each finished day is
// rolled up into daily totals (day, version, count), kept for good; the
// per-install rows are dropped after 90 days. /api/stats?key=… shows them.

const KEEP_DAYS = 90

export default {
  async fetch(request, env, ctx) {
    ctx.passThroughOnException() // a bug here never takes the directory down
    const url = new URL(request.url)
    if (url.pathname === '/api/stats') return stats(url, env)

    const res = await fetch(request) // GitHub Pages, as before
    const ua = request.headers.get('User-Agent') || ''
    const m = ua.match(/^evrd\/(\S+)/)
    if (m && url.pathname.startsWith('/api/networks/')) ctx.waitUntil(record(request, env, m[1]))
    return res
  },

  // daily: roll up finished days, then drop per-install rows past KEEP_DAYS
  async scheduled(event, env) {
    await rollup(env)
    await env.DB.prepare('DELETE FROM installs WHERE day < ?').bind(day(-KEEP_DAYS)).run()
  },
}

function day(offset = 0) {
  return new Date(Date.now() + offset * 86400000).toISOString().slice(0, 10)
}

async function record(request, env, version) {
  const ip = request.headers.get('CF-Connecting-IP') || ''
  if (!ip || !env.SALT) return
  const today = day()
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${env.SALT}|${today}|${ip}`))
  const who = [...new Uint8Array(digest)].slice(0, 16).map((b) => b.toString(16).padStart(2, '0')).join('')
  // the latest version seen for this install today wins
  await env.DB.prepare('INSERT INTO installs (day, who, version) VALUES (?, ?, ?) ON CONFLICT (day, who) DO UPDATE SET version = excluded.version')
    .bind(today, who, version.slice(0, 32)).run()
}

// rollup adds the daily totals of every finished day (before today, UTC) not
// rolled up yet. A finished day doesn't change, so once is enough.
async function rollup(env) {
  await env.DB.prepare('INSERT OR IGNORE INTO daily (day, version, installs) SELECT day, version, COUNT(*) FROM installs WHERE day < ? GROUP BY day, version').bind(day()).run()
}

// RANGES are the stats page's choices: days back, or all.
const RANGES = [['7', '7 days'], ['14', '14 days'], ['30', '30 days'], ['90', '90 days'], ['all', 'All']]

async function stats(url, env) {
  const key = url.searchParams.get('key')
  if (!env.STATS_KEY || key !== env.STATS_KEY) return new Response('Not found', { status: 404 })
  const range = RANGES.some(([r]) => r === url.searchParams.get('range')) ? url.searchParams.get('range') : '30'
  await rollup(env) // a day the cron hasn't reached yet still shows
  // finished days from the totals, today from the per-install rows
  const past = (await env.DB.prepare('SELECT day, SUM(installs) AS installs FROM daily GROUP BY day').all()).results
  const now = (await env.DB.prepare('SELECT COUNT(*) AS installs FROM installs WHERE day = ?').bind(day()).first())?.installs || 0
  const byDay = Object.fromEntries(past.map((r) => [r.day, r.installs]))
  const first = range === 'all' ? (past.map((r) => r.day).sort()[0] || day()) : day(1 - Number(range))
  const n = Math.round((Date.parse(day()) - Date.parse(first)) / 86400000) + 1
  // every day in the range, oldest first, 0 where nobody checked in
  const days = Array.from({ length: n }, (_, i) => day(i - n + 1)).map((d) => ({ day: d, installs: d === day() ? now : byDay[d] || 0 }))
  const latest = [...days].reverse().find((d) => d.installs) || days[days.length - 1]
  const versions = latest.day === day()
    ? (await env.DB.prepare('SELECT version, COUNT(*) AS installs FROM installs WHERE day = ? GROUP BY version ORDER BY installs DESC, version DESC').bind(latest.day).all()).results
    : (await env.DB.prepare('SELECT version, installs FROM daily WHERE day = ? ORDER BY installs DESC, version DESC').bind(latest.day).all()).results
  const data = { range, days, versions, versionsDay: latest.day }
  if (url.searchParams.get('format') === 'json') return Response.json(data, { headers: { 'Cache-Control': 'no-store' } })
  return new Response(page(data, key), { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })
}

// buckets are what the chart draws: days, or past 120 days, weeks (the
// average per day, so a week reads like a day).
function buckets(days) {
  if (days.length <= 120) return days.map((d) => ({ ...d, label: short(d.day) }))
  const out = []
  for (let i = days.length; i > 0; i -= 7) {
    const w = days.slice(Math.max(0, i - 7), i)
    out.unshift({ day: w[0].day, installs: Math.round(w.reduce((a, d) => a + d.installs, 0) / w.length), label: `week of ${short(w[0].day)} (average a day)` })
  }
  return out
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
const short = (d) => new Date(d + 'T00:00:00Z').toLocaleDateString('en', { month: 'short', day: 'numeric', timeZone: 'UTC' })

// niceMax rounds a maximum up to 1, 2 or 5 × a power of ten, for the axis.
function niceMax(v) {
  if (v <= 4) return 4
  const p = 10 ** Math.floor(Math.log10(v))
  return [1, 2, 5, 10].map((m) => m * p).find((n) => n >= v)
}

// daysChart is installs per day as bars: thin, rounded at the top, 2px apart,
// a recessive grid, and a tooltip per day (the hit area is the whole column).
function daysChart(all) {
  const days = buckets(all)
  const W = 640, H = 220, L = 36, R = 8, T = 12, B = 28
  const max = niceMax(Math.max(...days.map((d) => d.installs)))
  const step = (W - L - R) / days.length, bw = Math.max(2, step - 2)
  const y = (v) => T + (H - T - B) * (1 - v / max)
  const ticks = [0, max / 2, max]
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="days-h" class="chart">`
  for (const t of ticks) s += `<line class="grid" x1="${L}" x2="${W - R}" y1="${y(t)}" y2="${y(t)}"/><text class="tick" x="${L - 6}" y="${y(t) + 4}" text-anchor="end">${t}</text>`
  days.forEach((d, i) => {
    const x = L + i * step + (step - bw) / 2
    const h = (H - T - B) - (y(d.installs) - T)
    const r = Math.min(4, bw / 2, h / 2)
    const label = `${d.label}: ${d.installs} install${d.installs === 1 ? '' : 's'}`
    s += `<g class="col" tabindex="0" data-tip="${esc(label)}"><rect class="hit" x="${L + i * step}" y="${T}" width="${step}" height="${H - T - B}"/>`
    if (d.installs) s += `<path class="bar" d="M${x},${y(0)} V${y(d.installs) + r} q0,${-r} ${r},${-r} h${bw - 2 * r} q${r},0 ${r},${r} V${y(0)} Z"/>`
    s += `<title>${esc(label)}</title></g>`
    const every = Math.max(1, Math.round(days.length / 5))
    if ((days.length - 1 - i) % every === 0) s += `<text class="tick" x="${x + bw / 2}" y="${H - 8}" text-anchor="middle">${esc(short(d.day))}</text>`
  })
  return s + `<line class="axis" x1="${L}" x2="${W - R}" y1="${y(0)}" y2="${y(0)}"/></svg>`
}

// versionsChart is the version mix as horizontal bars, counts written on.
function versionsChart(versions) {
  if (!versions.length) return '<p class="muted">Nothing yet.</p>'
  const max = Math.max(...versions.map((v) => v.installs))
  return `<div class="hbars" role="list">${versions.map((v) => `<div class="hrow" role="listitem"><span class="hname">${esc(v.version)}</span><span class="htrack"><span class="hbar" style="width:${(v.installs / max) * 100}%"></span></span><span class="hval">${v.installs}</span></div>`).join('')}</div>`
}

function page(data, key) {
  const { range, days, versions, versionsDay } = data
  const span = RANGES.find(([r]) => r === range)[1].toLowerCase()
  const today = days[days.length - 1].installs
  const peak = Math.max(...days.map((d) => d.installs))
  const rows = (list, a, b) => list.map((r) => `<tr><td>${esc(r[a])}</td><td>${esc(r[b])}</td></tr>`).join('') || '<tr><td colspan="2">Nothing yet</td></tr>'
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>evrd installs</title>
<style>
:root{--surface:#fcfcfb;--text:#0b0b0b;--text2:#52514e;--muted:#8a8984;--grid:#e6e5e1;--series:#2a78d6;--track:#efeeea}
@media (prefers-color-scheme:dark){:root{color-scheme:dark;--surface:#1a1a19;--text:#f0efec;--text2:#c3c2b7;--muted:#8f8e88;--grid:#2c2c2a;--series:#3987e5;--track:#262624}}
body{font:15px/1.5 system-ui,sans-serif;max-width:720px;margin:32px auto;padding:0 16px;background:var(--surface);color:var(--text)}
h1{font-size:22px;margin:0 0 4px}h2{font-size:15px;margin:32px 0 8px;color:var(--text2);font-weight:600}
p,.muted{color:var(--text2);font-size:13px}
.ranges{display:flex;flex-wrap:wrap;gap:4px;margin:16px 0 0}.ranges a{padding:4px 12px;border-radius:999px;border:1px solid var(--grid);color:var(--text2);text-decoration:none;font-size:13px}
.ranges a[aria-current]{background:var(--text);color:var(--surface);border-color:var(--text)}
.tiles{display:flex;gap:24px;margin:20px 0 4px}.tile .n{font-size:30px;font-weight:600;font-variant-numeric:tabular-nums}.tile .l{color:var(--text2);font-size:13px}
.chart{width:100%;height:auto;overflow:visible}.grid{stroke:var(--grid);stroke-width:1}.axis{stroke:var(--muted);stroke-width:1}
.tick{fill:var(--muted);font-size:11px;font-variant-numeric:tabular-nums}.bar{fill:var(--series)}.hit{fill:transparent}
.col:hover .hit,.col:focus .hit{fill:var(--grid);opacity:.5}.col:focus{outline:none}
.tip{position:fixed;pointer-events:none;background:var(--text);color:var(--surface);font-size:12px;padding:4px 8px;border-radius:6px;opacity:0;transition:opacity .1s;white-space:nowrap}
.hbars{display:grid;gap:6px}.hrow{display:grid;grid-template-columns:110px 1fr 40px;gap:10px;align-items:center;font-size:13px}
.hname{font-family:ui-monospace,monospace;color:var(--text2);overflow:hidden;text-overflow:ellipsis}.htrack{height:14px;background:var(--track);border-radius:4px;overflow:hidden}
.hbar{display:block;height:100%;background:var(--series);border-radius:4px}.hval{text-align:right;font-variant-numeric:tabular-nums}
details{margin-top:28px;color:var(--text2);font-size:13px}table{border-collapse:collapse;width:100%;margin-top:8px}td{padding:4px 8px;border-bottom:1px solid var(--grid)}td:last-child{text-align:right;font-variant-numeric:tabular-nums}
</style>
<h1>evrd installs</h1>
<p>Distinct installs that fetched the network directory each day (UTC). Installs behind one shared address count once; ones with the directory turned off aren't counted.</p>
<nav class="ranges" aria-label="Range">${RANGES.map(([r, l]) => `<a href="?key=${encodeURIComponent(key)}&amp;range=${r}"${r === range ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
<div class="tiles"><div class="tile"><div class="n">${today}</div><div class="l">today</div></div><div class="tile"><div class="n">${peak}</div><div class="l">most in a day (${range === 'all' ? 'all time' : span})</div></div></div>
<h2 id="days-h">Installs per ${days.length > 120 ? 'day, by week' : 'day'}, ${range === 'all' ? 'all time' : 'last ' + span}</h2>
${daysChart(days)}
<h2>Versions on ${esc(short(versionsDay))}</h2>
${versionsChart(versions)}
<details><summary>As tables</summary><table>${rows([...days].reverse(), 'day', 'installs')}</table><table>${rows(versions, 'version', 'installs')}</table></details>
<div class="tip" id="tip"></div>
<script>
const tip = document.getElementById('tip')
for (const g of document.querySelectorAll('.col')) {
  const show = (x, y) => { tip.textContent = g.dataset.tip; tip.style.left = (x + 12) + 'px'; tip.style.top = (y - 32) + 'px'; tip.style.opacity = 1 }
  g.addEventListener('mousemove', (e) => show(e.clientX, e.clientY))
  g.addEventListener('focus', () => { const r = g.getBoundingClientRect(); show(r.left, r.top) })
  g.addEventListener('mouseleave', () => (tip.style.opacity = 0))
  g.addEventListener('blur', () => (tip.style.opacity = 0))
}
</script>`
}
