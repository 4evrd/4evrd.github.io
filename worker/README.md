# evrd install count

A Cloudflare Worker on `evrd.sh/api/*`. Every request goes on to GitHub Pages
as before; requests from evrd itself (User-Agent `evrd/<version>`, the network
directory fetch every install makes twice a day) are counted: one row per
install per day in a D1 database, holding the day, a salted per-day hash of the
address (never the address) and the version. Rows are kept 90 days.

`https://evrd.sh/api/stats?key=<STATS_KEY>` shows installs per day and the
version mix (`&format=json` for JSON). Without the right key it's a 404.

Everything here fits Cloudflare's free plan (Workers, D1, cron triggers).

## Deploy (once, after evrd.sh is on Cloudflare)

```sh
cd worker
npx wrangler login
npx wrangler d1 create evrd-installs          # copy the database_id into wrangler.toml
npx wrangler d1 execute evrd-installs --remote --file schema.sql
npx wrangler secret put SALT                  # any long random string; keep it secret
npx wrangler secret put STATS_KEY             # the key for /api/stats
npx wrangler deploy
```

Check it:

```sh
curl -s -o /dev/null -w '%{http_code}\n' -A 'evrd/0.0.0-test (+https://evrd.sh)' https://evrd.sh/api/networks/v1.json   # 200, and counted
open "https://evrd.sh/api/stats?key=…"
```

Counts are approximate: installs behind one address count once, and ones with
`network_directory off` aren't seen.
