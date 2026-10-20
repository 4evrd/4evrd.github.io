// Counts evrd installs from the network directory fetches every install makes
// (twice a day, User-Agent "evrd/<version> (+https://evrd.sh)"), and passes
// every request on to GitHub Pages untouched.
//
// For each evrd fetch it keeps one row per install per day: the day, a hash of
// the address mixed with a secret and the day (so it can't be reversed or
// followed from one day to the next) and the version. Rows older than 90 days
// are dropped. /api/stats?key=… shows the counts.

const KEEP_DAYS = 90

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    if (url.pathname === '/api/stats') return stats(url, env)

    const res = await fetch(request) // GitHub Pages, as before
    const ua = request.headers.get('User-Agent') || ''
    const m = ua.match(/^evrd\/(\S+)/)
    if (m && url.pathname.startsWith('/api/networks/')) ctx.waitUntil(record(request, env, m[1]))
    return res
  },

  // daily: drop rows past KEEP_DAYS
  async scheduled(event, env) {
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

async function stats(url, env) {
  if (!env.STATS_KEY || url.searchParams.get('key') !== env.STATS_KEY) return new Response('Not found', { status: 404 })
  const days = (await env.DB.prepare('SELECT day, COUNT(*) AS installs FROM installs WHERE day >= ? GROUP BY day ORDER BY day DESC').bind(day(-30)).all()).results
  const versions = (await env.DB.prepare('SELECT version, COUNT(*) AS installs FROM installs WHERE day = ? GROUP BY version ORDER BY installs DESC').bind(days[0]?.day || day()).all()).results
  const data = { days, versions, versionsDay: days[0]?.day || day() }
  if (url.searchParams.get('format') === 'json') return Response.json(data, { headers: { 'Cache-Control': 'no-store' } })
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c])
  const rows = (list, a, b) => list.map((r) => `<tr><td>${esc(r[a])}</td><td>${esc(r[b])}</td></tr>`).join('') || '<tr><td colspan="2">Nothing yet</td></tr>'
  const html = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>evrd installs</title>
<style>body{font:15px/1.5 system-ui,sans-serif;max-width:640px;margin:32px auto;padding:0 16px;background:#0b0f12;color:#e6edf0}
h1{font-size:22px}h2{font-size:16px;margin-top:28px;color:#9fb3bd}table{border-collapse:collapse;width:100%}
td{padding:6px 8px;border-bottom:1px solid #22303a}td:last-child{text-align:right;font-variant-numeric:tabular-nums}
p{color:#9fb3bd;font-size:13px}</style>
<h1>evrd installs</h1>
<p>Distinct installs that fetched the network directory each day (an install behind a shared address counts once; ones with the directory turned off aren't counted).</p>
<h2>Last 30 days</h2><table>${rows(days, 'day', 'installs')}</table>
<h2>Versions on ${esc(data.versionsDay)}</h2><table>${rows(versions, 'version', 'installs')}</table>`
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } })
}
