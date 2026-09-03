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

## Changing the fonts

Two edits, always both — a face has to be **loaded** and **named**:

1. **Load** — swap the `fonts.googleapis.com` `<link>` in `index.html` `<head>`
   for the URL below that matches the pair you want.
2. **Name** — in `css/type.css`, change the number on the two ACTIVE PAIR lines:

   ```css
   --font-display: var(--pair-2-display);
   --font-text:    var(--pair-2-text);
   ```

Nothing else in the project hard-codes a font family, so those two lines drive
every heading, paragraph, button and nav item.

| Pair | Display + Text | `<link>` URL |
| --- | --- | --- |
| 1 | Playfair Display + Inter | `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap` |
| 2 | Cormorant Garamond + Jost | `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap` |
| 3 | Marcellus + Lato | `https://fonts.googleapis.com/css2?family=Marcellus&family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap` |
| 4 | Italiana + Karla | `https://fonts.googleapis.com/css2?family=Italiana&family=Karla:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap` |
| 5 | Fraunces + Inter | `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap` |
| 6 | Cinzel + Montserrat | `https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap` |

Only load the pair you are using — every extra family is a real download on
every page view.

Headings are set at weight 400 deliberately; the elegance comes from stroke
contrast, not heft. If you switch to a lower-contrast display face you may want
to raise that in `css/type.css`.

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
