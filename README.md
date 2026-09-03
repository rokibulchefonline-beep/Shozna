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
- [] Page markup — blocked on access to the source copy and media
- [ ] Media carried over from the existing build
