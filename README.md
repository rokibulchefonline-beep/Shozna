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

## Images

Sections reference `media/` files through a `--media-src` custom property, so a
missing image degrades to a brass gradient rather than a broken image icon.
Expected filenames:

```
media/hero.jpg
media/dining-room-upstairs.jpg
media/restaurant-ground-floor.jpg
media/chef-jay-ahmed.jpg
media/dish-bengal-bemisal.jpg
media/dish-karachi-mughal-special.jpg
media/dish-jaipuri-lamb.jpg
```
