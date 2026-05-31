# DESIGN.md — Wang Yeul Artist Website

## Identity / Role

This website is not a marketing landing page.

It is:

- an online museum
- an artwork archive
- an exhibition record
- an official contact surface for the artist

Its primary job is to let visitors quietly encounter Wang Yeul's work before they read biography, credentials, or logistics.

Core definition:

`A quiet digital museum for Wang Yeul's utopian landscapes, red mountains, horses, and birds.`

---

## Mood / Tone

The site should feel:

- quiet
- restrained
- warm
- archival
- museum-like
- editorial
- contemplative
- dignified

It should not feel:

- promotional
- sales-driven
- startup-like
- tech-product-like
- overly luxurious
- loud
- animated for attention

Emotional direction:

- The visitor should feel that the work is being presented with care.
- The interface should disappear behind the paintings.
- The atmosphere should suggest an exhibition catalog, not an ad campaign.

---

## Content Priority

Content order must follow this hierarchy:

1. artwork
2. artwork world / series context
3. artist statement
4. artist profile
5. exhibitions / archive
6. collections / institutional context
7. contact

Rules:

- Artwork must appear before biography.
- The first strong impression must come from image, not text.
- Credentials support trust, but they must not lead the experience.
- Contact exists as an official channel, not as a conversion funnel.

---

## Color Tokens

Use a restrained palette.

- `--bg`: warm ivory
- `--bg-soft`: soft paper beige
- `--text`: ink black
- `--text-muted`: warm gray
- `--line`: pale stone
- `--accent`: muted red
- `--accent-soft`: dusty red wash

Rules:

- Background should feel like paper, plaster, or gallery wall.
- Accent color must be used sparingly.
- Red should support Wang Yeul's world, not become a branding gimmick.
- Contrast should be strong enough for reading but never stark like a tech dashboard.

Avoid:

- blue/purple gradients
- neon accents
- glossy black/red luxury ad contrast
- glass effects

---

## Typography Rules

Typography should feel editorial and archival.

Structure:

- display type for major headings may be expressive but must remain restrained
- body type must be highly readable
- metadata may use a simple, quiet secondary style

Rules:

- Headings should feel like catalog titles, not ad headlines.
- Body text should be short, precise, and calm.
- Metadata should read like museum labels.
- Over-styled decorative fonts are not allowed.
- Avoid tech-product typography rhythm.
- Avoid excessive weight contrast and oversized marketing headlines.

Usage guidance:

- Hero line: short and poetic
- Section titles: plain and clear
- Artwork metadata: compact and stable
- Long biography text: broken into readable paragraphs with generous line spacing

---

## Spacing System

Spacing should create calm and dignity.

Rules:

- Use generous outer margins.
- Keep section spacing wide enough to let each block breathe.
- Use tighter spacing inside metadata groups.
- Let image rhythm define the page more than text rhythm.
- Avoid cramped card stacks and dense tile walls.

Principle:

- major sections should feel like rooms
- image groups should feel like curated walls
- metadata should feel like labels beside works

---

## Imagery Rules

Images are the center of the experience.

Rules:

- Paintings must be shown large whenever possible.
- Cropping must protect the integrity of the work.
- Avoid decorative image masks and gimmick frames.
- Backgrounds around artworks should remain quiet.
- Image presentation should feel curated, not algorithmic.
- Representative works should lead each major section.

Do:

- allow vertical and horizontal works to keep their natural proportions
- let negative space support the image
- use a small number of strong images rather than many weak ones

Do not:

- force all works into identical product-card boxes
- over-frame images with shadows, borders, or glow
- use stock imagery aesthetics

---

## Layout Rules

The layout should be content-first and archive-first.

Final main direction:

- The published main site uses `Design A` as the base system.
- `Design C` is borrowed only in limited parts.
- Do not let `Design C` spread a heavy luxury mood across the whole site.

Preferred top-level sequence:

1. Hero
2. Selected Works
3. Series / Artistic World
4. Artist Statement
5. Artist Profile
6. Exhibitions
7. Collections
8. Contact

Rules:

- The page must read like an exhibition path.
- Each section should have a distinct role.
- Layout density should increase only where archive information requires it.
- Navigation should be clear but visually quiet.
- Avoid homepage blocks that compete equally for attention.

Reference logic being adapted:

- editorial hierarchy
- luxury-grade image priority
- archive-style information ordering

Not being adapted:

- newsroom density
- fashion campaign drama
- CMS product storytelling

Applied source logic:

- `Design A`: overall structure, bright tone, low UI density, gallery-minimal behavior
- `Design C`: hero image scale and artwork detail viewing mode only

---

## Hero Rules

Hero is the threshold into Wang Yeul's world.

Rules:

- one strong image or image-led composition
- one short line of copy
- one optional secondary line only if necessary
- no metrics, counters, or credibility stats in hero
- no dual-primary CTA layout
- no startup value-proposition language

Hero should communicate:

- mood first
- world first
- identity second

Hero should not communicate:

- résumé first
- sales first
- feature list first

Recommended content direction:

- poetic world statement
- restrained navigation
- immediate path into selected works

Final implementation rule:

- The representative artwork image must take the first visual priority.
- Text and CTA must remain secondary.
- If the hero feels like an advertising banner, it fails.

---

## Works Gallery Rules

The works gallery is the central browsing experience.

Rules:

- use a quiet masonry or calm grid structure
- filters should feel like archival tabs, not app controls
- thumbnails must preserve artwork proportions
- listing text should stay minimal
- title, year, and a very small series/material label are enough in the main listing
- deeper metadata belongs in detail view

Gallery should feel:

- curated
- breathable
- image-led
- non-commercial

Gallery must not feel:

- like ecommerce
- like a marketplace
- like a dashboard
- like a Pinterest clone

Specific prohibitions:

- no buy-now tone
- no badges
- no pricing emphasis
- no oversized hover theatrics
- no bulky rounded cards
- no dead links that pretend to be navigation
- no button-like helper copy unless it performs a real action

Final implementation rule:

- Gallery must keep an `image first + small wall label` structure.
- It must not read like a product list.

---

## Artwork Detail Rules

Artwork detail should feel like a catalog page.

Structure:

1. large primary image
2. title and year
3. material / size / series
4. short contextual note if available
5. related works or related exhibition
6. discreet contact path

Rules:

- Detail view must privilege the image.
- Metadata must be narrow, clean, and easy to scan.
- Text should support viewing, not interrupt it.
- Contact should remain quiet and secondary.
- Related works should feel curatorial, not algorithmic.
- Previous / Next and Close should read like quiet text navigation, not app buttons.

Avoid:

- ecommerce product detail layout
- crowded sidebar specs
- aggressive inquiry panels

Final implementation rule:

- Detail may borrow the `Design C` side-sheet / wall-label feeling.
- This borrowing is limited to image scale and viewing rhythm.
- It must not become a dark luxury panel or a feature-heavy app drawer.

---

## Artist / Exhibitions / Contact Rules

### Artist

- Artist section comes after meaningful artwork exposure.
- Distinguish clearly between statement and biography.
- Statement should carry worldview and language.
- Biography should carry dates, education, awards, collections, and exhibitions.

### Exhibitions

- Exhibitions should read like an archive.
- Prefer year-led grouping or clean chronological order.
- Each item should include only essential metadata.
- If images or posters exist, they should support the archive without overwhelming it.

### Contact

- Contact should feel official and restrained.
- Reduce friction, but do not use conversion-heavy language.
- Present inquiry types clearly: artwork, exhibition, press, general.
- The contact surface should feel like a museum desk, not a sales funnel.
- Contact must still belong to the same bright, quiet visual language as the rest of the site.

---

## Motion Rules

Motion should be minimal and meaningful.

Allowed:

- gentle fade-in
- subtle stagger for section reveal
- quiet image transition
- restrained hover feedback

Rules:

- Motion must never distract from the paintings.
- Motion should clarify hierarchy or state, not perform personality.
- Transitions should feel slow enough to be calm, but fast enough to stay usable.

Avoid:

- parallax spectacle
- scroll hijacking
- exaggerated zoom
- elastic card motion
- constant ambient animation

---

## Mobile Rules

Mobile experience must remain artwork-first.

Rules:

- hero copy must stay short
- image should appear before long explanatory text
- gallery filters may scroll horizontally
- works should remain legible at one column or loose two-column density
- metadata should stack cleanly
- touch targets should be simple and quiet

Mobile should preserve:

- calm pacing
- strong imagery
- readable archive information

Mobile must avoid:

- text-heavy intros before art
- compressed multi-column archive density
- sticky UI that competes with the work
- headers that visually outweigh the hero image

---

## Header Rules

- On first view, the header must not visually dominate the artwork.
- The header should behave like a quiet gallery sign, not a branded bar.
- White / off-white guidance tone is preferred over heavy dark chrome.
- Scrolled state may become slightly more defined, but must remain calm.

Failure condition:

- If the header becomes the strongest visual object on first load, the design fails.

---

## Empty / Fallback Rules

- If a data-driven section has no content, hide it or show only public-safe language.
- Admin-only language must never remain in the published UI.
- Temporary fallback labels must not look like development placeholders.
- Dead links must not remain in the public build.

Allowed tone:

- quiet
- neutral
- temporary
- public-safe

Examples of acceptable fallback behavior:

- hide the section entirely
- show a short neutral loading line
- show a brief retry-later message

Examples that must not appear in production:

- admin instructions
- "coming soon" filler used as a visual crutch
- fake buttons or links with no destination

---

## Forbidden Patterns

- SaaS landing page style
- dashboard UI
- ecommerce product grid
- startup hero language
- pricing-page logic
- CMS product explanation patterns
- strong gradient backgrounds
- glassmorphism
- excessive rounded cards
- loud CTA buttons
- over-animation
- admin-facing UI language in public pages
- placeholder copy that reads like unfinished development
- dead links used as decorative controls
- black/red luxury ad mood
- news-site tile overload
- interface elements that visually overpower artwork

---

## Acceptance Checklist

A design direction is acceptable only if most of the statements below are true.

- Artwork is the first dominant impression.
- The homepage reads like an exhibition path, not a campaign funnel.
- Hero is short, image-led, and quiet.
- Biography does not appear before meaningful artwork exposure.
- Gallery feels archival rather than commercial.
- Header does not overpower the first artwork impression.
- Artwork detail feels like a catalog page.
- Exhibitions feel chronological and documentary.
- Contact feels official and discreet.
- Color palette stays warm, restrained, and paper-like.
- Empty states are public-safe or hidden.
- Motion is subtle and secondary.
- Mobile preserves the same calm hierarchy.
- The interface never competes with Wang Yeul's paintings.

If any design proposal feels like a startup site, luxury ad, ecommerce page, or CMS marketing page, it fails.
