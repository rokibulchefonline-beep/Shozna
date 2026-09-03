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

- [x] Premium type system (Playfair Display + Inter) on the brand gold `#c5a880`
- [x] Single-page `index.html` with the real site content
- [x] Header with Menus dropdown, mobile nav drawer and info drawer
- [x] Video hero, six-dish carousel, award timeline, FAQ, footer
- [x] Restaurant JSON-LD with real address, geo, phones and opening hours
- [ ] Two content gaps remain (below)
- [ ] Assets are hotlinked; localise before go-live

## Content

All copy now comes from the existing build. Two gaps remain:

- **Batera Jolmol** — the source itself says Jay's full description is still to
  be written. Marked `TODO` in `index.html`.
- **Social links** — the source points at bare `facebook.com`, `instagram.com`
  etc. rather than Shozna's own profiles. Marked `TODO` in the footer.

## Key details

| | |
| --- | --- |
| Address | 153 Maidstone Road, Rochester, Kent, ME1 1RR |
| Restaurant | 01634 847 847 / 01634 849 849 |
| Private dining | 01634 846 846 |
| Email | admin@shozna.com |
| Evening | Sun–Thu 5–11pm; Fri–Sat 5pm–12am |
| Lunch | 12:00–1:30pm, takeaway and party bookings only |

## Media

Assets are declared once in `css/media.css` and referenced via `var(--img-*)`,
so localising is one edit per asset with no markup change. They are currently
hotlinked from `srsdraft.co.uk`; run `./tools/fetch-source.sh` and repoint the
manifest before go-live so the site does not depend on the draft server.
