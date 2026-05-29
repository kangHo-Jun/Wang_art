# Wang Art Project Context

## Current State

- This project is a static website intended for GitHub Pages deployment.
- The gallery no longer depends on the old `tables/wy_artworks` API.
- Gallery data is now loaded from `data/artworks.json`.
- Image assets were reorganized for static hosting and normalized filenames.
- Original source images are preserved in `images_backup/`.

## Current Folder Structure

Active image folders under `images/`:

```text
images/
  2026/    # 163 images
  2jung/   # 15 images
  blue/    # 65 images
  ink/     # 94 images
  red/     # 54 images
```

Backup source folders:

```text
images_backup/
  2026해체/
  2중구조/
  Ink/
  Red/
  blue/
```

Important:

- `images_backup/` contains the preserved original files and should not be deleted casually.
- This workspace is not a Git repository.

## Completed Work

### 1. Gallery data source changed to local JSON

- `js/main.js` now fetches `data/artworks.json`.
- The previous API-based gallery loading path is no longer used for the main gallery.

Relevant files:

- `index.html`
- `js/main.js`
- `data/artworks.json`

### 2. Gallery category filter fixed

Visible button labels remain Korean/English:

- `2중구조`
- `2026해체`
- `Blue`
- `Ink`
- `Red`

Actual category values in data and filter logic are:

- `2jung`
- `2026`
- `blue`
- `ink`
- `red`

Important mapping:

```text
UI label       data-filter / category
2중구조        2jung
2026해체       2026
Blue          blue
Ink           ink
Red           red
```

If these values diverge again, clicking a tab will show zero images.

### 3. Image reorganization script added

Script:

- `reorganize.py`

What it does:

- scans source images
- slugifies filenames for static hosting
- preserves original visible title text
- regenerates `data/artworks.json`
- regenerates `data/filename-map.csv`
- supports `--dry-run`
- uses `images_backup/` as source if backup exists

### 4. JSON title behavior corrected

`data/artworks.json` uses:

- `title`: original filename stem, preserved for display
- `image`: slugified normalized path
- `category`: normalized category key

Example:

```json
{
  "title": "02 신무릉도원-동행-천에먹 아크릴140x140cm2011",
  "image": "images/2026/02-sin-mu-reung-do-won-dong-haeng-cheon-e-meok-a-keu-ril-140x140cm2011.jpg",
  "category": "2026"
}
```

### 5. Legacy image folders under `images/` cleaned up

Removed from active `images/`:

- `2026해체/`
- `2중구조/`
- `Ink/`
- `Red/`
- `blue/Blouew/`
- `images/.DS_Store`

## Important Technical Constraints

### 1. GitHub Pages only

- No server-side API should be assumed.
- All production functionality must work as a static site.
- Relative paths must remain valid when hosted on GitHub Pages.

### 2. Category/filter keys must stay aligned

- `index.html` filter button `data-filter`
- `js/main.js` category label/icon mapping
- `data/artworks.json` `category` field

These three must use the same normalized values:

```text
2jung, 2026, blue, ink, red
```

### 3. Case sensitivity matters in deployment

- GitHub Pages is case-sensitive.
- Local macOS filesystem may appear tolerant, but deploys are not.
- Do not mix `Ink` and `ink`, `Red` and `red`, etc.
- Keep active production folders lowercase where intended.

### 4. Title vs filename rule

This must be preserved:

- display text: original title text
- file path: slugified filename

Do not overwrite `title` with slug text again unless explicitly requested.

### 5. Reorganization source of truth

Once backup exists, `reorganize.py` reads from:

- `images_backup/`

This is intentional and prevents rescanning normalized output files.

### 6. macOS case-insensitive filesystem caveat

On this machine, case-only folder renames conflict:

- `Ink` vs `ink`
- `Red` vs `red`

Because of that:

- legacy uppercase folders had to be removed from active `images/`
- lowercase output folders were then recreated from `images_backup/`

Do not reintroduce uppercase active folders.

## Remaining Work

### 1. GitHub upload/deploy

Still needs to be done:

- upload the current project files to GitHub
- ensure `images/`, `images_backup/` decision is intentional before push
- enable GitHub Pages
- test deployed URLs directly

### 2. Deployment verification

Must verify after deploy:

- gallery loads from `data/artworks.json`
- all five category filters work
- `2중구조` and `2026해체` tabs show images
- image paths resolve correctly on GitHub Pages
- no broken links due to case mismatch

### 3. Decide whether to keep `images_backup/` in the published repo

Open decision:

- keep `images_backup/` in repo for safety, larger repo size
- remove it from published repo after external backup is secured

If removing it, do not do so until there is a confirmed external backup.

### 4. Optional cleanup/improvements

Not required for current functionality, but possible next steps:

- clean `title` strings for nicer human-readable captions
- add `caption`, `material`, `year` fields to `artworks.json`
- regenerate `artworks.json` with richer metadata
- verify mobile/desktop rendering after deployment

## Key Files

- `index.html`
- `js/main.js`
- `data/artworks.json`
- `data/filename-map.csv`
- `reorganize.py`
- `images/`
- `images_backup/`

## Safe Next Commands

Useful verification commands:

```bash
ls -la images/
find images/2026 -type f | wc -l
find images/2jung -type f | wc -l
find images/blue -type f | wc -l
find images/ink -type f | wc -l
find images/red -type f | wc -l
head -30 data/artworks.json
python3 reorganize.py --dry-run
```

## Last Known Good Counts

- `2026`: 163
- `2jung`: 15
- `blue`: 65
- `ink`: 94
- `red`: 54
- backup image total: 391
