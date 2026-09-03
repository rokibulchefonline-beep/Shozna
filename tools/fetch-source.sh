#!/usr/bin/env bash
# Mirror the existing Shozna draft build so the clone can reuse its copy and media.
# Run from the repo root once www.srsdraft.co.uk is reachable from this environment.
set -euo pipefail

SRC="https://www.srsdraft.co.uk/shozna-2026/"
OUT="${1:-.source}"

mkdir -p "$OUT"

echo "==> Checking reachability"
if ! curl -sSf -o /dev/null -m 20 "$SRC"; then
  echo "!! $SRC is not reachable from here (egress policy)." >&2
  echo "   Add www.srsdraft.co.uk to the environment's network allowlist, then retry." >&2
  exit 1
fi

echo "==> Fetching page HTML"
curl -sSL -o "$OUT/index.html" "$SRC"

echo "==> Mirroring page assets (images, css, js, fonts)"
wget \
  --quiet --show-progress \
  --page-requisites \
  --adjust-extension \
  --convert-links \
  --span-hosts \
  --domains=www.srsdraft.co.uk,srsdraft.co.uk \
  --no-parent \
  --directory-prefix="$OUT/mirror" \
  "$SRC" || true

echo "==> Collecting image URLs referenced by the page"
grep -oiE '(src|data-src|href|content)="[^"]+\.(jpe?g|png|webp|avif|svg|gif)[^"]*"' "$OUT/index.html" \
  | sed -E 's/^[a-zA-Z-]+="//; s/"$//' \
  | sort -u > "$OUT/image-urls.txt"

grep -oiE 'url\((["'"'"']?)[^)"'"'"']+\.(jpe?g|png|webp|avif|svg|gif)[^)"'"'"']*' "$OUT/index.html" \
  | sed -E 's/^url\(["'"'"']?//' \
  | sort -u >> "$OUT/image-urls.txt"

sort -u -o "$OUT/image-urls.txt" "$OUT/image-urls.txt"
echo "    $(wc -l < "$OUT/image-urls.txt") unique image URLs"

echo "==> Downloading images into media/"
mkdir -p media
while read -r u; do
  [ -z "$u" ] && continue
  case "$u" in
    //*)  u="https:$u" ;;
    /*)   u="https://www.srsdraft.co.uk$u" ;;
    http*) ;;
    *)    u="https://www.srsdraft.co.uk/shozna-2026/$u" ;;
  esac
  f="media/$(basename "${u%%\?*}")"
  [ -f "$f" ] && continue
  curl -sSL -m 60 -o "$f" "$u" && echo "    $f"
done < "$OUT/image-urls.txt"

echo "==> Done. Source HTML in $OUT/index.html, media in media/"
