---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Surface brief: home page (index.html)

Mode: Persuade. Extension of the established "Lit Fibre" world (DESIGN.md); no new identity.

## Scope of this round
Add "Run it for a community" after the connection map, with a failover replay as its focal moment; rewrite the hero lead for hosts and solo users; move the traffic chart into the new section. Client terminal, topology, feature grid and other pages stay as they are.

## Audience and proof
Community hosts first (shell/BNC providers, project operators), solo self-hosters second. Proof is evrd's documented behaviour only: cluster_lease 20 s, connect_rate 5/s, shared Postgres + ScyllaDB, roles, per-user limits, suspension, bind hosts, per-user IPv6, OIDC SSO, drain on shutdown (~5 s), connection holder on a single node. Never "no downtime" or "0 lines lost": users see a network reconnect; saved history, settings and nicks carry over.

## Direction contract
THESIS: Show failover happening, not a feature card claiming it. Refuses the "enterprise features" grid of icon tiles.
OWN-WORLD: Graphite glass panel like the client terminal; a load balancer feeding three stacked node rows (rows read better than columns at the panel's width) with user strands: steady strands cyan, takeover strands warming ember→ice→cyan as users land; node-a goes dark (ground, icon and edge dim, text still readable; only its state chip is red); event log in Geist Mono with faint timestamps; settings names in mono, cyan only for the one action.
STORY: A host sees a node die at 09:00:00, its 68 users move to node-b and node-c at 09:00:20, networks reconnect at 5/s until 09:00:27, and the log says plainly what users noticed. They believe evrd is built to host others and open the clustering docs.
FIRST VIEWPORT: Section heading and a short host lead left, short spec list right; below, full-width replay panel: nodes left (~55%), synced log right, footer "Sample failover · cluster_lease 20s"; the Replay ghost button sits in the panel head, where the client terminal has its own, so the two replays work the same way.
FORM: Synced replay (node strands + event log). seed: none (extension of an established surface; no concept roll)
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions
Exact copy drafted at build time; node counts are labelled sample values.
