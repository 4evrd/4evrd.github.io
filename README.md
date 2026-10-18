# 4evrd.github.io

The website for [evrd](https://github.com/4evrd/evrd), the always-connected IRC
bouncer: https://4evrd.github.io/

Plain static HTML, CSS and JavaScript — no build step. Pages share a header and
footer from `assets/site.js`; the styles are `assets/evrd.css` (the evrd web
app's design system) and `assets/site.css`. Preview locally with any static
server, e.g. `python3 -m http.server`. Pushes to `main` deploy with GitHub
Actions (`.github/workflows/pages.yml`).

Content mirrors evrd's [README](https://github.com/4evrd/evrd#readme) and
[docs](https://github.com/4evrd/evrd/tree/main/docs); keep them in step when
evrd changes.
