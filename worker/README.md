# evrd install count

A Cloudflare Worker on `evrd.sh/api/*`. Every request goes on to GitHub Pages
as before; requests from evrd itself (User-Agent `evrd/<version>`, the network
directory fetch every install makes twice a day) are counted: one row per
install per day in a D1 database, holding the day, a salted per-day hash of the
address (never the address) and the version. Rows are kept 90 days.

`https://evrd.sh/api/stats?key=<STATS_KEY>` shows installs per day and the
version mix (`&format=json` for JSON). Without the right key it's a 404.

It fits Cloudflare's free plan: 100,000 Worker requests and 100,000 D1 row
writes a day (about one write per install per day), cron triggers included.
Past the free limits nothing is billed; the Worker just doesn't run — and with
the route set to fail open (below), requests then go straight to GitHub Pages.

## Deploys

`.github/workflows/worker.yml` deploys on every push to `main` that changes
`worker/` (or by hand: Actions → worker → Run workflow). It creates the table
if it's missing, deploys the Worker and sets its secrets.

## One-time setup (after evrd.sh is on Cloudflare)

1. **Database.** `evrd-installs` exists (its ID is in `wrangler.toml`; it
   isn't secret). The workflow creates the table if it's missing.
2. **API token.** *My profile → API tokens → Create token* → the *Edit
   Cloudflare Workers* template, then add the permission *Account → D1 →
   Edit*; zone resources: `evrd.sh`. Copy the token.
3. **GitHub secrets** (repository → Settings → Secrets and variables →
   Actions): `CLOUDFLARE_API_TOKEN` (step 2), `CLOUDFLARE_ACCOUNT_ID` (the
   dashboard's account overview), `SALT` and `STATS_KEY` (long random
   strings of your own; STATS_KEY is the key for the stats page).
4. **Deploy:** merge to `main`, or run the workflow by hand.
5. **Fail open:** dashboard → `evrd.sh` → *Workers routes* → the
   `evrd.sh/api/*` route → *Request limit failure mode: Fail open (proceed)*.

Check it:

```sh
curl -s -o /dev/null -w '%{http_code}\n' -A 'evrd/0.0.0-test (+https://evrd.sh)' https://evrd.sh/api/networks/v1.json   # 200, and counted
open "https://evrd.sh/api/stats?key=…"
```

Counts are approximate: installs behind one address count once, and ones with
`network_directory off` aren't seen.
