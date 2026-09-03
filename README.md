# Shozna — 2026 site

Rebuild of the Shozna Rochester site, carrying over the existing draft's
structure and media with an upgraded typographic system.

## Typography

| Role    | Face                | Notes                                              |
| ------- | ------------------- | -------------------------------------------------- |
| Display | Playfair Display    | Headings only, weight 400 — contrast over weight    |
| Text    | Inter               | Body, UI, eyebrows; tabular figures for numbers     |

Both are served from Google Fonts. `css/type.css` holds the fluid scale,
letter-spacing and figure settings; `css/tokens.css` holds colour and spacing.

## Layout

```
css/tokens.css   colour, spacing, motion tokens
css/type.css     type scale and font rules
css/base.css     reset, layout primitives, buttons, cards
media/           images carried over from the existing build
tools/           build/maintenance scripts
```

## Pulling the source content and media

The existing build lives at `https://www.srsdraft.co.uk/shozna-2026/`.
To mirror its copy and images into this repo:

```bash
./tools/fetch-source.sh
```

The script writes the source HTML to `.source/` and downloads every referenced
image into `media/`. It requires `www.srsdraft.co.uk` to be reachable — in a
sandboxed environment that domain must be on the network allowlist first.

## Status

- [x] Design tokens and premium type system (Playfair Display + Inter)
- [x] Base layout primitives, cards, buttons, focus states
- [x] Single-page `index.html` — all sections from the existing build
- [x] Sticky header, mobile drawer, FAQ accordion, scroll reveal
- [ ] Real copy — placeholders marked `TODO` in `index.html`
- [ ] Media — `media/` is empty; run `./tools/fetch-source.sh`

## Content still to fill in

Every item below is marked with a `TODO` comment in `index.html`. They were
left as placeholders rather than invented, because the source site was not
reachable when the page was built.

| Section        | Needed                                                   |
| -------------- | -------------------------------------------------------- |
| Hero           | Intro paragraph                                          |
| Two floors     | Section intro, both room descriptions                    |
| Menus          | Both menu descriptions, real menu/ordering links         |
| Chef           | Jay Ahmed's biography                                    |
| Awards         | Narrative, and six real year/award timeline rows         |
| Dishes         | Three dish descriptions                                  |
| Venue details  | Addresses, opening hours for both rooms                  |
| FAQ            | All ten answers                                          |
| Footer         | Real social profile URLs                                 |

The phone number `01634 840 646` was read off the design screenshot — please
verify it before the site goes live.

## Media

All assets are declared once in `css/media.css` as custom properties and
referenced from the markup via `var(--img-*)`, so moving between the live draft
server and local files is one edit per asset.

| Slot                | Asset                     |
| ------------------- | ------------------------- |
| Hero background     | `shozna-bg-video.mp4`     |
| Hero poster         | `1N7A8668.jpg`            |
| Dining room upstairs| `1N7A8668.jpg`            |
| Ground floor        | `1N7A8501.jpg`            |
| Chef                | `1N7A8669.jpg`            |
| Dish 1              | `1N7A8531.jpg`            |
| Dish 2              | `1N7A8768.jpg`            |
| Dish 3              | `1N7A8677.jpg`            |
| Gallery             | `1N7A8564/8554/8573.jpg`  |

**The slot mapping needs checking.** The filenames are opaque and the build
environment cannot reach the server to look at them, so they were assigned in
the order supplied. Reshuffle the values in `css/media.css` once you can see
which photo is which — and give the gallery tiles real `aria-label` text
describing what each one shows.

The images are currently hotlinked from `srsdraft.co.uk`. Before go-live, run
`./tools/fetch-source.sh` and repoint the manifest at local `media/` copies.

## Logo

The header and footer use a text wordmark with the tagline from the
restaurant's sign. Supply the actual logo artwork as an SVG or PNG to replace
it — it is a drawn mark and has not been recreated here.
