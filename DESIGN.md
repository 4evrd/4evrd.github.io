---
name: evrd
description: The always-connected IRC bouncer; site and web app share one dark telemetry design system.
colors:
  graphite-teal: "oklch(17% 0.012 215)"
  graphite-raised: "oklch(21% 0.014 215)"
  graphite-deep: "oklch(14% 0.011 215)"
  glass: "oklch(25% 0.015 215 / 0.62)"
  glass-raised: "oklch(29% 0.017 215 / 0.88)"
  row-tint: "oklch(100% 0 0 / 0.035)"
  row-tint-hover: "oklch(100% 0 0 / 0.07)"
  hairline: "oklch(100% 0 0 / 0.10)"
  hairline-strong: "oklch(100% 0 0 / 0.18)"
  hairline-soft: "oklch(100% 0 0 / 0.07)"
  frost-text: "oklch(95% 0.005 215)"
  slate-muted: "oklch(76% 0.015 215)"
  slate-faint: "oklch(66% 0.016 215)"
  fibre-cyan: "oklch(80% 0.10 205)"
  fibre-cyan-bright: "oklch(86% 0.09 205)"
  fibre-cyan-dim: "oklch(66% 0.09 210)"
  fibre-cyan-wash: "oklch(80% 0.10 205 / 0.13)"
  ink-on-cyan: "oklch(20% 0.04 215)"
  ice: "oklch(90% 0.03 215)"
  nick-periwinkle: "oklch(80% 0.07 240)"
  link-mint: "oklch(80% 0.11 170)"
  amber-warn: "oklch(82% 0.13 80)"
  mention-red: "oklch(68% 0.18 27)"
  ink-on-red: "oklch(18% 0.04 27)"
  ember: "oklch(70% 0.16 45)"
typography:
  display:
    fontFamily: "Outfit, ui-sans-serif, -apple-system, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(40px, 6vw, 72px)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Outfit, ui-sans-serif, -apple-system, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(28px, 3.4vw, 40px)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  section-title:
    fontFamily: "Outfit, ui-sans-serif, -apple-system, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(22px, 2.4vw, 28px)"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Outfit, ui-sans-serif, -apple-system, 'Segoe UI', system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.3
  lead:
    fontFamily: "Outfit, ui-sans-serif, -apple-system, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(17px, 1.5vw, 20px)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Outfit, ui-sans-serif, -apple-system, 'Segoe UI', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Outfit, ui-sans-serif, -apple-system, 'Segoe UI', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Outfit, ui-sans-serif, -apple-system, 'Segoe UI', system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.16em"
  mono:
    fontFamily: "'Geist Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  code: "6px"
  field: "10px"
  row: "10px"
  card: "14px"
  panel: "18px"
  pill: "999px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "20px"
  s6: "24px"
  s7: "32px"
  s8: "48px"
  s9: "64px"
  s10: "96px"
  s11: "128px"
components:
  button-primary:
    backgroundColor: "{colors.fibre-cyan}"
    textColor: "{colors.ink-on-cyan}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.fibre-cyan-bright}"
  button-secondary:
    backgroundColor: "{colors.row-tint}"
    textColor: "{colors.frost-text}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "40px"
  button-secondary-hover:
    backgroundColor: "{colors.row-tint-hover}"
  button-ghost:
    textColor: "{colors.slate-muted}"
    rounded: "{rounded.field}"
    padding: "0 16px"
    height: "40px"
  button-lg:
    padding: "0 20px"
    height: "48px"
  chip-ok:
    backgroundColor: "oklch(80% 0.11 170 / 0.13)"
    textColor: "{colors.link-mint}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
    height: "24px"
  chip-warn:
    backgroundColor: "oklch(82% 0.13 80 / 0.13)"
    textColor: "{colors.amber-warn}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
    height: "24px"
  chip-bad:
    backgroundColor: "oklch(68% 0.18 27 / 0.16)"
    textColor: "{colors.mention-red}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
    height: "24px"
  chip-sample:
    backgroundColor: "{colors.row-tint-hover}"
    textColor: "{colors.slate-muted}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
    height: "24px"
  input:
    backgroundColor: "oklch(14% 0.011 215 / 0.7)"
    textColor: "{colors.frost-text}"
    rounded: "{rounded.field}"
    padding: "0 12px"
    height: "44px"
  card:
    backgroundColor: "{colors.glass}"
    rounded: "{rounded.panel}"
    padding: "24px"
  spec-list:
    textColor: "{colors.slate-muted}"
    typography: "{typography.body-sm}"
    padding: "16px 0 0"
  row:
    backgroundColor: "{colors.row-tint}"
    rounded: "{rounded.row}"
    padding: "12px 16px"
  snippet:
    backgroundColor: "{colors.graphite-deep}"
    textColor: "{colors.slate-muted}"
    typography: "{typography.mono}"
    rounded: "{rounded.row}"
    padding: "16px"
  callout:
    backgroundColor: "{colors.fibre-cyan-wash}"
    textColor: "{colors.frost-text}"
    rounded: "{rounded.row}"
    padding: "16px"
  tabs:
    backgroundColor: "oklch(14% 0.011 215 / 0.6)"
    rounded: "{rounded.pill}"
    padding: "4px"
  tab-selected:
    backgroundColor: "{colors.glass-raised}"
    textColor: "{colors.frost-text}"
    rounded: "{rounded.pill}"
    height: "36px"
---

# Design System: evrd

## Overview

**Creative North Star: "The Lit Fibre"**

evrd is drawn as light travelling through dark glass. Every connection the product keeps open (client to bouncer, bouncer to network) is a strand: ember where traffic runs hot, ice in the core, cyan where it lands. The grounds are a deep graphite-teal that reads like a powered-down room. The light shows what's alive and connected, and nothing else gets it.

The public site and the evrd web app are one system. `assets/evrd.css` is the web app's own design system, and `assets/site.css` adds only page structure and a few site-only sizes on top. A screenshot of the console and a section of the site should be indistinguishable in material, type and colour. The site is dark only (`color-scheme: dark`); there is no light theme.

Density is calm. Large light-weight Outfit headlines sit over muted body copy, while the data (lag, line counts, channels, timestamps) is set in Geist Mono and given the brightest colours. Panels are layered glass over an ambient haze, and controls stay quiet and exact: hairline borders, muted at rest, one cyan action per view.

**Key Characteristics:**
- Graphite-teal grounds with one cyan haze top-right and a faint ember glow low-left.
- Cyan is data light and the single action colour; status colours (mint, amber, red, ember) carry state only.
- Layered translucent glass with a 1px top highlight; big shadows only for showpiece panels.
- Light (300) Outfit for display, Geist Mono for anything a machine produced.
- Real, labelled sample data as illustration: terminals, connection and topology maps, the failover replay, strand charts.

## Colors

A near-monochrome graphite-teal field lit by one cyan accent, with a small, strict set of status hues.

### Primary
- **Fibre Cyan** (`fibre-cyan`): the one action and data colour. Primary buttons, links, emphasised words in the display line (`.display em`), active nav dots, selected filter chips, docs active link, numbers in step lists. Also the landing end of every strand gradient.
- **Fibre Cyan Bright** (`fibre-cyan-bright`): primary button hover only.
- **Fibre Cyan Dim** (`fibre-cyan-dim`): focused input borders and the darker end of the brand-mark gradient.
- **Fibre Cyan Wash** (`fibre-cyan-wash`): tinted backgrounds for selected chips, info callouts, icon wells on the docs and download pages, inline code in command tables.
- **Ink on Cyan** (`ink-on-cyan`): text on any solid cyan fill.

### Secondary
- **Ember** (`ember`): the hot end of the strand. Gradient start (`--grad-heat`, `--grad-fiber`), the "while you were away" separator in terminals, the low-left ambient glow, required-field asterisks. As state, it is the colour of a connection that is retrying or being taken over *on a line*: reconnecting strands and line ends in maps, takeover strands in the failover replay, and a chart series across the span it was down. Never a button or link colour.
- **Ice** (`ice`): the pale core of a strand; chart core lines and card sheens.

### Tertiary
- **Nick Periwinkle** (`nick-periwinkle`): IRC nicknames in terminals and member lists, emphasised values (`pre.snippet em`), setting names in spec lists (`dd.set`), and the second series in charts.

### Status
- **Link Mint** (`link-mint`): connected, up, done. Live chips with a pulsing dot, check icons in lists.
- **Amber Warn** (`amber-warn`): reconnecting and backoff *as text*: chips, map row values, warning callouts. On strands and lines the same state is Ember.
- **Mention Red** (`mention-red`): mentions, highlights, errors, destructive buttons (with **Ink on Red** text).

### Neutral
- **Graphite Teal** (`graphite-teal`): the page ground.
- **Graphite Raised** (`graphite-raised`): opaque raised surfaces (mobile nav sheet, drawers, reduced-transparency fallback).
- **Graphite Deep** (`graphite-deep`): wells set *into* the page: terminal bodies, code snippets, icon wells, step numbers.
- **Glass** / **Glass Raised** (`glass`, `glass-raised`): translucent panel fills; raised is used for selected tabs and current nav items.
- **Row Tint** / **Row Tint Hover** (`row-tint`, `row-tint-hover`): white at 3.5% and 7% for list rows, table cells, secondary buttons and hovers.
- **Hairline** / **Hairline Strong** / **Hairline Soft** (`hairline`, `hairline-strong`, `hairline-soft`): white at 10%, 18%, 7% for borders and section dividers.
- **Frost Text** (`frost-text`): headings and primary text.
- **Slate Muted** (`slate-muted`): body copy, descriptions, nav at rest.
- **Slate Faint** (`slate-faint`): captions, timestamps, uppercase labels, footer meta.

### Named Rules
**The One Light Rule.** Fibre Cyan is the only colour that means "act here". A view has one solid cyan button; everything else is secondary or ghost.

**The Status Means State Rule.** Mint, amber, red and ember appear only where they describe a real state (up, retrying, mention, hot). Never use them for decoration or variety, or as a chart series colour: series are cyan, periwinkle, then Slate Muted, and a series turns ember only across the span it was actually down.

**The Strand Order Rule.** Gradients run ember → ice/amber → cyan, left to right, hot to landed. They appear only on strands, wires and heat combs, never on text or buttons. A strand that is steady holds its own colour with an ice core; a strand that is landing (a takeover, a reconnect) warms ember → ice → cyan; a strand to something down is faint Slate and dashed. Chart lines hold one series colour each.

## Typography

**Display Font:** Outfit (with ui-sans-serif, -apple-system, Segoe UI, system-ui)
**Body Font:** Outfit
**Label/Mono Font:** Geist Mono (with ui-monospace, SFMono-Regular, Menlo)

Both are loaded from Google Fonts: Outfit 300/400/500/600, Geist Mono 400/500/700.

**Character:** Outfit at weight 300 gives large headlines a light, engineered calm instead of marketing weight; Geist Mono marks everything a machine said (commands, config, timestamps, host names, nicks, metric names).

### Hierarchy
- **Display** (300, clamp(40px, 6vw, 72px), 1.02, -0.03em): the home hero line only. One emphasised phrase may be Fibre Cyan.
- **Page title** (300, clamp(36px, 4.6vw, 56px), 1.05, -0.03em): docs, download and architecture page heroes.
- **Headline** (300, clamp(28px, 3.4vw, 40px), 1.1, -0.02em): section headings on the site. Docs prose h2 steps down to clamp(24px, 2.4vw, 30px).
- **Section title** (300, clamp(22px, 2.4vw, 28px), 1.2, -0.015em; `.h3-site`): a heading inside a section (feature groups, "Watch every network") and the connection map's heading.
- **Title** (500, 18px, 1.3): panel and card headings (chart, topology), prose h3. Spec-list terms are 500 at 16px.
- **Lead** (400, clamp(17px, 1.5vw, 20px), 1.6, max 56ch): the paragraph under a hero or section headline, in Slate Muted.
- **Body** (400, 16px, 1.55): default. Prose runs at line-height 1.7 and max 72ch; card copy is 14px at 1.6.
- **Label** (500, 11px, 0.16em, uppercase, Slate Faint): column captions ("Clients", "Networks"), table headers and map row labels. Never above a heading.
- **Mono** (400, 13px, 1.7–1.75): terminals and snippets; inline `.code` at 0.9em on a Row Tint Hover chip.

### Named Rules
**The Light Headline Rule.** Headlines are weight 300 with negative tracking. Weight comes from size, not boldness; 500 is the heaviest used for titles and 600 only for labels and primary buttons.

**The Machine Voice Rule.** If a computer printed it (a command, directive, host, port, nick, metric or timestamp), it's set in Geist Mono. Human prose never is.

**The Heading Stands Alone Rule.** No eyebrow or kicker above a heading. A heading carries its own weight; if the visual is a sample, a Sample data chip sits beside the heading instead. On desktop each size step between roles is at least 1.25× (14px body, 18px title, 22–28px section title, 28–40px headline).

## Layout

The site uses a centred 1200px container (`.wrap`) with 24px side padding, dropping to 16px under 768px. A sticky 64px translucent header sits on top. Sections are separated by 96px vertical padding (64px on mobile) and a Hairline Soft rule between consecutive sections. Section intros cap at 680px with a 48px gap before content.

Main compositions:
- **Hero:** copy alone in one column (chip, display line, lead, two buttons). On the home page the connection map stage follows directly and is the hero's visual; its top shows in the first desktop viewport.
- **Split:** copy plus a code snippet or terminal, 1 : 1.1, stacking under 1024px.
- **Spec lists (`dl.specs`):** groups of term, one or two sentences and the real setting name, each item under a Hairline Soft top rule, no card. Two groups side by side at 48px gaps, one column under 1024px. Used for the community-hosting specs and the home page's features, in groups of up to four. Same-size icon cards are not a page structure here.
- **Flow / topology:** clients → hub → networks in three columns, collapsing to one with the hub first.
- **Docs:** 232px nav, prose column (max 72ch), 200px table of contents. The TOC drops under 1280px; the nav becomes a jump menu under 1024px.

Spacing follows a 4px base: 4, 8, 12, 16, 20, 24, 32, 48, then 64, 96, 128 for page rhythm. Breakpoints are 1600, 1280, 1200, 1024, 960, 768 and 640px.

## Elevation & Depth

Depth is layered glass. The ground carries a fixed ambient haze (a cyan radial top-right, a faint ice wash, an ember radial bottom-left). Panels float over it as translucent Glass with a 20px backdrop blur, a hairline border and a 1px inset top highlight (`inset 0 1px 0` at white 8%) that reads as a lit edge. Wells (terminals, snippets, icon tiles) go the other way: Graphite Deep, darker than the ground, set in.

### Shadow Vocabulary
- **Panel lift** (`0 30px 70px oklch(0% 0 0 / 0.45)`): showpiece panels only: the connection map stage, the client terminal and the failover replay.
- **Card lift** (`0 12px 32px oklch(0% 0 0 / 0.32)`): cards, the flow hub, the CTA band.
- **Lit edge** (`inset 0 1px 0 oklch(100% 0 0 / 0.08)`): on every glass surface, with or without a lift.
- **Brand glow** (`0 0 24px oklch(80% 0.10 205 / 0.35)`; dots use `0 0 8px` in Fibre Cyan): the brand mark and active status dots (the live chip dot, the current-page nav dot, the selected-tab dot). The only glows in the system. Map line ends, the hub ring and selected tiles show state with a border or a hairline ring, never a halo.
- **Focus ring** (`0 0 0 2px` ground, then `0 0 0 4px` Fibre Cyan): all keyboard focus.

### Named Rules
**The Lit Edge Rule.** Every glass surface gets the 1px inset top highlight. A panel without it looks pasted on.

**The Glass Has a Floor Rule.** Under `prefers-reduced-transparency: reduce`, blur is removed and glass becomes opaque Graphite Raised. New translucent surfaces must be added to that fallback.

## Shapes

Soft, consistent rounding that grows with the size of the surface: 6px on inline code, 10px on fields, buttons and rows, 14px on cards and tiles, 18px on panels (cards, terminals, the stage, the CTA band), pills (999px) for tabs and chips. Icon wells are rounded squares (10–12px; the brand mark is 11px at 36px). Borders are 1px hairlines, never heavier. The only sharp geometry is in the data: the heat comb's skewed 2px ticks and 1px strand lines. A heat comb shows a real quantity or isn't drawn.

Icons are one outline family on a 24px grid with a 1.6 stroke, round caps and joins, shared with the web app (`ICONS` in `assets/site.js`).

## Components

Quiet and exact: muted at rest, hairline-precise, and only one thing lit per view.

### Buttons
- **Shape:** gently rounded (10px), 40px tall, 16px horizontal padding; 14px weight 500 text.
- **Primary:** solid Fibre Cyan with Ink on Cyan text, weight 600. Hover brightens to Fibre Cyan Bright.
- **Secondary (default `.btn`):** Row Tint fill, Hairline border, Frost Text. Hover raises to Row Tint Hover and Hairline Strong.
- **Ghost:** no fill or border, Slate Muted text; hover gains Row Tint Hover and Frost Text.
- **Danger / Danger ghost:** Mention Red fill with Ink on Red text, or a red outline that fills to the red wash on hover. App-only.
- **Sizes:** `btn-sm` 36px with 12px text; `btn-lg` 48px with 16px text for hero and CTA actions.
- **States:** 150ms transitions on the standard ease-out; 1px press-down on `:active`; disabled at 50% opacity.

### Chips
- **Status chips:** 24px pills, 12px weight 500, tinted wash plus matching text: mint (up), amber (retrying), red (mention), periwinkle (nick), neutral Row Tint Hover. A 6px current-colour dot leads; live chips pulse.
- **Sample chip (`chip sample`):** the neutral chip reading "Sample data", beside the heading of every illustrative visual (connection map, topology, chart). Captions may repeat "Sample …" with specifics, such as the failover replay's timing.
- **Filter chips (`chip-btn`):** 40px, 10px corners, Row Tint with Hairline border. Pressed state switches to Fibre Cyan Wash with cyan text, a cyan hairline and a faint inner glow.

### Cards / Containers
- **Corner Style:** 18px for panels, 14px for download and stat cards.
- **Background:** Glass, with a Fibre Cyan Wash radial in one corner for featured cards (`dl-card.featured`, the flow hub, the CTA band, where an ember wash joins it).
- **Shadow Strategy:** lit edge always; card lift on panels (see Elevation).
- **Border:** Hairline Soft, or Hairline on interactive tiles.
- **Internal Padding:** 24px, 16px for `.tight` and on mobile.

### Inputs / Fields
- **Style:** 44px tall, 10px corners, translucent Graphite Deep fill, Hairline border, 14px text, Slate Faint placeholder.
- **Focus:** border shifts to Fibre Cyan Dim with a 3px Fibre Cyan Wash halo.
- **Error:** Mention Red border with a red wash halo and a red message line; read-only goes Slate Muted on Row Tint.

### Navigation
- **Site header:** sticky, 64px, Graphite Teal at 82% with blur and a Hairline Soft bottom rule. Links are 14px weight 500 Slate Muted, 40px targets; hover adds Row Tint Hover. The current page keeps Frost Text and gains a 5px glowing cyan dot after the label. Under 768px the nav becomes a full-width opaque sheet with 48px targets. The header's "Get evrd" is primary on every page except home, where it is secondary because the hero holds the one cyan action.
- **Docs nav:** 36px links; the active link is Fibre Cyan on Fibre Cyan Wash with a 2px cyan left rule.
- **Segmented tabs:** a pill track in translucent Graphite Deep; the selected tab is Glass Raised with the lit edge.

### Terminal (signature)
A replay of a real client session: an 18px Graphite Deep panel with a Glass header strip (client, network, channel) and a footer of capability notes. The body is Geist Mono 13px at 1.75 in a 44px timestamp column. Nicks are Periwinkle, your own lines Cyan, system lines Faint, mentions Red, success Mint. An ember uppercase separator with fading hairlines divides backlog from live. Lines fade up 4px in sequence, and appear instantly with reduced motion.

### Failover replay (signature)
The community-hosting showpiece, in the terminal's material: a Graphite Deep panel with the panel lift, a header strip (Cluster chip, cluster facts in mono, a ghost Replay button) and a caption with the sample timing and `cluster_lease`. A load balancer feeds three stacked node rows (`dg-node`); a synced event log in Geist Mono with faint timestamps runs beside it. Owner nodes have a mint hairline, nodes taking users an ember one. A **down** node goes dark: Graphite Deep ground, Hairline border, no shadow, icon at 35%, name in Slate Muted, and only its state chip red. It replays once when half of it is in view; with reduced motion or no JavaScript it shows the end state and hides Replay.

### Strand visuals (signature)
The connection map, topology, failover replay and traffic chart draw connections as thin strands (0.8–1.6px, non-scaling) with a soft blurred bloom, following the Strand Order Rule. Highlighted strands reach 95% opacity; dimmed ones drop to 6%. The connection map stage tilts back 6° on wide screens when motion is allowed. Map rows that are off or detached dim their light (tick, strand, timestamp) and keep their text readable; never fade a whole row with opacity. Each visual carries a Sample data chip.

### Code snippets
Graphite Deep wells, 10px corners, Geist Mono at 12–13px in Slate Muted. Directives are Fibre Cyan (`b`), values Periwinkle (`em`), comments Faint. A Glass header strip carries the filename and a 36px copy button.

### Callouts
Grid of icon and text on Fibre Cyan Wash with a cyan hairline at 28%; the warning variant uses the amber wash. Text is Frost Text at 14px.

## Do's and Don'ts

### Do:
- **Do** take every colour, size, radius and duration from the `:root` tokens in `assets/evrd.css`; add site-only sizes to `site.css`'s `:root`, never inline values.
- **Do** keep one solid Fibre Cyan action per view; pair it with a secondary or ghost button.
- **Do** set commands, config, hosts, nicks, timestamps and metric names in Geist Mono.
- **Do** give every glass surface the 1px lit edge and a reduced-transparency fallback.
- **Do** label illustrative data with a Sample data chip beside its heading.
- **Do** keep transitions at 150ms (fast) or 220ms (medium) on `cubic-bezier(0.2, 0.7, 0.2, 1)`, with exits at 140ms ease-in, and honour `prefers-reduced-motion`.

### Don't:
- **Don't** add a light theme or light sections; the system is dark only.
- **Don't** use mint, amber, red or ember for decoration; they mean state.
- **Don't** put gradients on text or buttons; gradients belong to strands.
- **Don't** add glows beyond the brand mark and status dots.
- **Don't** put an eyebrow or kicker above a heading.
- **Don't** build a section from same-size icon cards; group specs in a spec list.
- **Don't** dim text with opacity to show something is off; dim the line or value and keep text at 4.5:1.
- **Don't** set headlines heavier than 300 or add new typefaces.
- **Don't** let the site drift from the web app: a new component starts from an `evrd.css` primitive, not a new look.

## Known drift

Code that predates these rules and should move toward them when it is next touched:
- Eyebrows above headings on `docs.html`, `download.html` and `architecture.html` (architecture's are also numbered 01–07).
- Architecture diagrams fade a down node to 60% with a red hairline (`.dg-node[data-state="down"]`); new work uses the failover replay's dark treatment.
- `.dg-node.is-hl` on the architecture page carries a 24px cyan glow.
- `.arch-nav` is missing from the reduced-transparency fallback.
- `.failover` repeats `.term`'s panel declarations instead of sharing them.
