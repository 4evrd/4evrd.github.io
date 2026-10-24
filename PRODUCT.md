# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, hosts first:

- **Community hosts.** People who run an IRC bouncer for other people: shell and BNC providers, project or community operators. They evaluate evrd on hosting features: roles and per-user limits, suspension, bind hosts and per-user IPv6, single sign-on, clustering with failover, metrics, and upgrades that don't drop anyone off IRC.
- **Solo self-hosters.** IRC regulars who want their own always-on bouncer on a VPS or home machine, often coming from ZNC. To them the hosting story is a larger version of their own setup, not a separate product.

Both arrive wanting to know: does it keep me (or my users) connected, will my clients work with it, and how much effort is it to run?

## Product Purpose

The site is the public home of **evrd**, an always-connected IRC bouncer with a web app. It explains what evrd does, gets people to a running install (Docker, OpenBSD, release archives or source), and documents configuration and operation. Success means a visitor goes from landing to an install, a first network and an attached client, without reading the source.

The site also serves `api/networks/v1.json`, the network directory every evrd instance fetches twice a day for its *Add network* list (also published at https://evrd.sh/api/networks/v1.json). It is a production API, not page content.

## Positioning

One permanent upstream connection per network, shared by every client (irssi, WeeChat, HexChat and the built-in Svelte web app) at once and kept in sync, with backlog replayed with original timestamps. The same binary runs as a single node on SQLite and Pebble, or as a cluster against Postgres and ScyllaDB where users move to another node in about 20 seconds when one dies. ZNC users keep their muscle memory: `*status`, ZNC command names and per-network settings names all carry over.

## Operating Context

- Visitors read on desktop next to a terminal, copying commands and config (`evrd.conf`, `docker-compose.yml`, the OpenBSD one-line installer) into it.
- They compare evrd against ZNC and other bouncers they already run or know.
- Hosts read docs (`docs.html`, `architecture.html`) to judge whether it fits their operations: clustering, SSO, metrics, security.
- Content mirrors evrd's README and `docs/` in the evrd repository and must stay in step when evrd changes.

## Capabilities and Constraints

- Plain static HTML, CSS and JavaScript, no build step. Pages share header and footer from `assets/site.js`; styles are `assets/evrd.css` (the evrd web app's design system) and `assets/site.css`.
- Hosted on GitHub Pages; pushes to `main` deploy via `.github/workflows/pages.yml`.
- Pages: `index.html` (home), `features.html`, `download.html`, `docs.html`, `architecture.html`, `404.html`.
- `api/networks/v1.json` must stay valid against `v1.schema.json` (checked on every pull request), served as `application/json` with an ETag. List a network's TLS servers only when the certificate matches the host name.
- Sample UI on the site (lag figures, networks, channels, clients, chat lines) is illustrative and labelled as sample data.
- Terminology: evrd (always lowercase), evrctl, `*status`, `*buffextras`, network, upstream, attach/detach, backlog, playback, connection holder.

## Brand Commitments

- Name: **evrd**, lowercase. Logo at `assets/logo.svg`.
- evrd is an **independent open-source project**. Do not present it as made by, hosted by or sponsored by IRCForever or any other provider.
- Voice: plain, factual, specific. Claims are backed by concrete defaults and config directive names (e.g. "Kept per channel (default) 2,000 lines", `cluster_lease 20 s`). Short declarative headlines ("Stay on IRC. Forever.", "Close the laptop. Miss nothing.").
- The site uses the web app's own design system, so the site and the product look like one thing.

## Evidence on Hand

- The software itself: source at https://github.com/4evrd/evrd, docs, release artifacts on ghcr.io and GitHub Releases.
- Product screenshots in the evrd repo (`docs/images/overview.png`, `chat.png`, `network.png`); `assets/og-overview.png` here.
- The network directory (`api/networks/v1.json`).
- **Absent, must not be fabricated:** testimonials, user or install counts, named deployments, production-scale claims, benchmarks. evrd is v0.x with no public users to cite.

## Product Principles

1. **Hosting others is the headline; one person is the simple case.** Lead with what makes evrd fit a community, and show the single-node path as the small version of the same thing.
2. **Show, with real names.** Prefer concrete defaults, directive names, commands and real client output over adjectives.
3. **Never mislead about state.** Sample data is labelled; pre-1.0 status is honest; no invented proof.
4. **Copy-paste to running.** Every install path ends in commands that work as written.
5. **Stay in step with evrd.** The site documents the software as it is, not as planned.

## Accessibility & Inclusion

- Motion respects `prefers-reduced-motion` (already in `evrd.css` and `site.css`).
- The product is translated into seven languages (English, Italiano, Español, Türkçe, Deutsch, Bahasa Indonesia, 日本語); the site itself is in English.
