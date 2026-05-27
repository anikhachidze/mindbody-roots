# Hatom-inspired MindBody Roots redesign plan

## Goal

Create a step-by-step plan for evolving the current MindBody Roots website into a more immersive, premium, cinematic experience inspired by https://www.hatom.com/, while keeping MindBody Roots' wellness identity, bilingual English/Georgian support, light/dark theme support, and Strapi-backed content model.

The goal is not to copy Hatom directly. The goal is to translate its strongest patterns into a MindBody Roots-appropriate experience:

- Full-screen atmospheric landing experience
- Phase/chapter-based storytelling
- Minimal navigation with a strong visual identity
- Soft motion, scroll discovery, and symbolic imagery
- Clear calls to action for wellness services/content
- CMS-editable content where practical

## Current context / assumptions

Current project:

- Frontend repo: `/Users/anixachidze/unconscious-mind/mindbody-roots`
- Framework: Next.js 13 app router
- Styling: styled-components plus global CSS
- Current major frontend paths:
  - `src/app/page.js`
  - `src/app/layout.js`
  - `src/app/globals.css`
  - `src/components/Hero.js`
  - `src/components/Header.js`
  - `src/components/Footer.js`
  - `src/components/HomeVideoSection.js`
  - `src/components/SectionTitle.js`
  - `src/context/ContentContext.js`
  - `src/context/PreferencesContext.js`
  - `src/content/siteCopy.js`
  - `src/data/posts.js`
  - `src/data/products.js`
  - `src/data/quotes.js`
- Strapi Cloud is already connected to Vercel through `NEXT_PUBLIC_STRAPI_URL`.
- MindBody Roots currently supports English/Georgian language switching and light/dark theme switching.
- The user prefers to manually test substantial local project changes before committing.

Observed Hatom patterns worth adapting:

- Initial preloader/entry state with small uppercase text, symbolic logo, and “click to enter.”
- “Headphones recommended” cue, implying an immersive sound/audio experience.
- Full-screen dark cinematic hero with a central glowing object and landscape/world-building.
- Chapter/phase structure: “PHASE 01” and progress dots.
- Minimal header: logo, sound toggle, menu button.
- Large stacked headline, compact supporting text, and one CTA.
- “Scroll to discover” prompt.
- Floating trust/stat badge in the corner.
- Strong visual effects: glow, mist, parallax, scroll-driven transitions.

## Proposed creative direction for MindBody Roots

Translate Hatom’s futuristic crypto world into a grounded wellness journey.

### Brand feel

Instead of:

- Neon sci-fi
- Crypto metrics
- Futuristic protocol language
- Intense dark fantasy landscapes

Use:

- Earthy, nervous-system-friendly visuals
- Roots, breath, body, water, forest, soil, sunrise, mist, seed, tree rings
- Soft glow instead of neon
- Calm movement instead of aggressive animation
- Human, therapeutic language

### Possible homepage journey structure

A five-phase homepage could mirror Hatom’s “5 phases” idea:

1. Arrive
   - Visitor lands in a calm immersive environment.
   - Message: “Come home to your body.”

2. Listen
   - Explain unconscious patterns, stress, and body signals.
   - Message: “Your body has been speaking all along.”

3. Ground
   - Introduce the MindBody Roots method.
   - Message: “Small practices, repeated gently, create deep change.”

4. Restore
   - Present services, resources, articles, and recommendations.
   - Message: “Support for mind, body, and daily life.”

5. Begin
   - Strong CTA: book, contact, read, or start with a practice.
   - Message: “Begin with one breath.”

Alternative phase labels:

- Root / Breathe / Release / Restore / Grow
- Discover / Regulate / Embody / Integrate / Begin
- Mind / Body / Roots / Practice / Support

## Step-by-step implementation guide

### Phase 1: Define the desired experience before coding

1. Decide what MindBody Roots is becoming:
   - A content-first wellness blog with a more premium homepage?
   - A practitioner/service site with booking as the main conversion?
   - A guided wellness platform with articles, exercises, and audio?

2. Decide the primary CTA:
   - “Book a Session”
   - “Start Here”
   - “Explore the Method”
   - “Read the Blog”
   - “Begin Your Journey”

3. Decide whether the immersive intro is optional or always shown:
   - Recommended: optional or skippable.
   - Avoid making users wait every visit.
   - Store “intro seen” in localStorage if needed.

4. Decide whether audio is part of the brand experience:
   - If yes, add a sound toggle and one subtle ambient loop.
   - If no, still borrow the visual/phase structure without audio.

Deliverable from this phase:

- One written homepage concept with final phase names, primary CTA, and target emotional tone.

### Phase 2: Create a visual system inspired by Hatom but appropriate for wellness

1. Define color tokens in `src/styles/theme.js`:
   - Deep forest / dark grounding background
   - Warm ivory / sand text surfaces
   - Moss / sage accent
   - Clay or muted rose secondary accent
   - Soft gold glow
   - Optional dusk lavender for depth

2. Define typography direction:
   - Keep readable sans-serif for interface text.
   - Consider adding a warmer display/serif font for hero headlines.
   - Avoid too much all-caps for wellness copy; reserve uppercase for small labels like “PHASE 01.”

3. Define reusable visual motifs:
   - Root lines
   - Breathing orb
   - Seed mark
   - Circular phase symbol
   - Mist or grain texture
   - Organic topographic lines

4. Create a small design reference page or temporary style section before changing the whole site.

Likely files to change:

- `src/styles/theme.js`
- `src/app/globals.css`
- Possibly `src/app/layout.js` if adding fonts or metadata changes

### Phase 3: Build an immersive homepage shell

Create a new homepage structure that supports phase-based storytelling.

Suggested components:

- `src/components/immersive/ImmersiveHome.js`
- `src/components/immersive/IntroGate.js`
- `src/components/immersive/PhaseHero.js`
- `src/components/immersive/PhaseProgress.js`
- `src/components/immersive/ScrollPrompt.js`
- `src/components/immersive/FloatingTrustBadge.js`
- `src/components/immersive/SoundToggle.js`
- `src/components/immersive/ImmersiveMenu.js`

Implementation notes:

1. Replace the current conventional homepage layout in `src/app/page.js` with a composed immersive homepage.
2. Keep existing content cards and article/product/quote content available lower down or inside phases.
3. Ensure the page works without JavaScript-heavy animation first.
4. Add animations after layout/content are stable.

Suggested phase sections:

- Hero / Arrive
- What MindBody Roots helps with
- The method / approach
- Articles and resources
- Recommendations or services
- Final CTA

Likely files to change:

- `src/app/page.js`
- `src/components/Hero.js` or replace with new immersive components
- `src/components/Header.js`
- `src/components/Footer.js`
- `src/context/ContentContext.js` if CMS shape changes

### Phase 4: Add phase navigation and scroll discovery

1. Add a fixed or absolute phase progress indicator:
   - Five dots or small labels.
   - Active phase updates on scroll.
   - Clicking a dot scrolls to the relevant section.

2. Add “Scroll to discover” prompt in the first viewport.

3. Use IntersectionObserver for active phase detection.

4. Keep accessibility in mind:
   - Sections should have headings.
   - Dot controls should have `aria-label` values.
   - Do not rely only on animation or visual indicators.

Likely files to change:

- `src/components/immersive/PhaseProgress.js`
- `src/components/immersive/ScrollPrompt.js`
- `src/app/page.js`

### Phase 5: Add cinematic but gentle visual effects

Start simple, then improve.

Recommended first version:

1. CSS gradients for atmospheric background.
2. One breathing orb or root symbol using CSS/SVG.
3. Soft grain/noise overlay.
4. Slow moving mist layer with CSS animation.
5. Fade/slide section reveals.

Avoid initially:

- Heavy WebGL
- Complex 3D scenes
- Large video backgrounds
- Unoptimized animation libraries

Possible implementation approaches:

- CSS-only first.
- SVG root/seed symbol with line animation.
- Optional `framer-motion` later if needed.
- Optional canvas/WebGL only after performance budget is clear.

Likely files to change:

- `src/app/globals.css`
- `src/components/immersive/Atmosphere.js`
- `src/components/immersive/BreathOrb.js`
- `src/components/immersive/RootSymbol.js`

### Phase 6: Redesign navigation and menu

Inspired by Hatom:

- Logo/mark on the left.
- Sound/theme/language controls kept minimal.
- Menu button on the right.
- Optional “Book” CTA in header if services are important.

MindBody Roots needs more practical navigation than Hatom because it has content and likely service/educational pages.

Menu should include:

- Home
- Blog
- Quotes
- Recommendations
- About
- Health Disclaimer
- Affiliate Disclosure
- Optional future: Services / Book / Contact

Important: preserve existing language and theme controls from:

- `src/context/PreferencesContext.js`
- `src/components/PreferenceControls.js`

Likely files to change:

- `src/components/Header.js`
- `src/components/PreferenceControls.js`
- `src/components/Footer.js`
- New: `src/components/immersive/ImmersiveMenu.js`

### Phase 7: Convert content model for CMS editing

Current content already flows through Strapi/fallbacks. For the Hatom-like phase homepage, the CMS should ideally control:

- Intro/loading text
- Hero badge, headline, lead, CTAs
- Phase labels and phase copy
- Featured article/product/quote selections
- Floating trust badge text
- Optional audio metadata
- Final CTA

Possible Strapi model update:

Update the existing `mbr-homepage` single type to include:

- `introLabelEn`, `introLabelKa`
- `introActionEn`, `introActionKa`
- `headphonesTextEn`, `headphonesTextKa`
- Repeatable `phases` component:
  - phase number/key
  - label EN/KA
  - headline EN/KA
  - body EN/KA
  - CTA label EN/KA
  - CTA URL
  - visual variant key
- Floating trust badge component:
  - value EN/KA
  - label EN/KA
  - icon key
- Optional ambient audio field/media

Keep fallback content in the frontend so the site still works if Strapi is unavailable.

Likely frontend files to change:

- `src/context/ContentContext.js`
- `src/content/siteCopy.js`
- `src/app/page.js`
- New immersive components

Likely Strapi repo files to change later:

- `/Users/anixachidze/unconscious-mind/strapi-cloud-template-blog-30ab41f786/src/api/mbr-homepage/content-types/mbr-homepage/schema.json`
- New or updated component schemas under:
  - `/Users/anixachidze/unconscious-mind/strapi-cloud-template-blog-30ab41f786/src/components/mbr/`
- Seed script:
  - `/Users/anixachidze/unconscious-mind/strapi-cloud-template-blog-30ab41f786/scripts/seed-mindbody.js`

### Phase 8: Add optional sound/audio experience

If wanted, add an audio toggle similar to Hatom, but make it respectful and browser-compliant.

Rules:

- Do not autoplay sound before user interaction.
- Show “Sound” toggle only after intro click or user action.
- Default sound should be off.
- Persist user preference in localStorage.
- Keep file small and loopable.
- Provide captions/text alternative if audio contains narration.

Possible files:

- `public/audio/mindbody-ambient-loop.mp3`
- `src/components/immersive/SoundToggle.js`
- `src/context/PreferencesContext.js` if centralizing audio preference

### Phase 9: Performance and accessibility guardrails

Because Hatom-style sites can become heavy, set constraints early.

Performance targets:

- Keep first load JS reasonable.
- Avoid large uncompressed video backgrounds.
- Lazy-load non-critical visuals.
- Respect `prefers-reduced-motion`.
- Use CSS/SVG before canvas/WebGL.
- Optimize any images with Next Image or carefully sized assets.

Accessibility targets:

- Do not trap users in an intro screen.
- Provide skip/enter button if intro exists.
- Ensure keyboard navigation works.
- Use semantic headings in each phase.
- Maintain contrast in both light and dark themes.
- Make motion optional/reduced.
- Do not require headphones/audio to understand the site.

Likely files:

- `src/app/globals.css`
- Components with animation logic
- `src/components/Header.js`
- `src/components/immersive/*`

### Phase 10: Build, test, then deploy

Local validation commands:

```bash
cd /Users/anixachidze/unconscious-mind/mindbody-roots
npm run build
npm run dev
```

Manual testing checklist:

- Homepage loads without console errors.
- Intro/enter state works, if implemented.
- “Skip” or “Enter” is keyboard accessible.
- Phase dots update on scroll.
- Phase dots are clickable and accessible.
- Theme toggle still works.
- Language toggle still works.
- English and Georgian copy both fit the layout.
- Existing pages still work:
  - `/blog`
  - `/blog/[slug]`
  - `/quotes`
  - `/recommendations`
  - `/about`
  - `/disclaimer`
  - `/affiliate-disclosure`
- Strapi content loads from production URL.
- Fallback content still works when Strapi is unavailable.
- Mobile viewport works well.
- `prefers-reduced-motion` is respected.

Deployment validation:

- Confirm Vercel env var `NEXT_PUBLIC_STRAPI_URL` remains configured.
- Deploy preview first if using a branch.
- Test the preview URL in browser.
- Only deploy/alias to production after manual approval.

## Suggested implementation milestones

### Milestone 1: Concept and wireframe

Deliverables:

- Final phase names.
- Final homepage copy draft in English and Georgian.
- Rough layout/wireframe for desktop and mobile.
- Decision on audio: yes/no.

No code changes except maybe a design note.

### Milestone 2: Static immersive homepage prototype

Deliverables:

- New homepage layout with five phases.
- Atmospheric visual style using CSS/SVG.
- No complex animation yet.
- Existing content still accessible.

Primary files:

- `src/app/page.js`
- `src/components/immersive/*`
- `src/app/globals.css`
- `src/styles/theme.js`

Validation:

- `npm run build`
- Manual desktop/mobile check.

### Milestone 3: Interactive phase navigation

Deliverables:

- Scroll-to-discover prompt.
- Active phase progress dots.
- Smooth scrolling to sections.
- Reduced motion support.

Primary files:

- `src/components/immersive/PhaseProgress.js`
- `src/components/immersive/ScrollPrompt.js`
- `src/app/page.js`

Validation:

- Browser test with mouse, trackpad, and keyboard.

### Milestone 4: Header/menu redesign

Deliverables:

- Minimal immersive header.
- Fullscreen menu or refined dropdown.
- Existing theme/language controls preserved.
- Clear CTA added if desired.

Primary files:

- `src/components/Header.js`
- `src/components/PreferenceControls.js`
- `src/components/immersive/ImmersiveMenu.js`

Validation:

- Menu works on mobile and desktop.
- Language/theme preferences persist.

### Milestone 5: Strapi CMS schema extension

Deliverables:

- Homepage phases editable in Strapi.
- Seed script updated.
- Frontend fallback updated.

Primary frontend files:

- `src/context/ContentContext.js`
- `src/content/siteCopy.js`
- `src/app/page.js`

Primary Strapi files:

- `src/api/mbr-homepage/content-types/mbr-homepage/schema.json`
- `src/components/mbr/*`
- `scripts/seed-mindbody.js`

Validation:

- Local Strapi endpoint returns populated phase content.
- Production/preview frontend renders CMS content.

### Milestone 6: Optional audio and polish

Deliverables:

- Optional ambient sound toggle.
- Final visual polish.
- Floating trust badge.
- Improved CTA section.
- Performance pass.

Primary files:

- `src/components/immersive/SoundToggle.js`
- `public/audio/*`
- `src/components/immersive/FloatingTrustBadge.js`
- `src/app/globals.css`

Validation:

- No autoplay violations.
- Sound starts only after user action.
- Build remains fast.
- Lighthouse/performance acceptable.

## Files likely to change

Frontend:

- `src/app/page.js`
- `src/app/layout.js`
- `src/app/globals.css`
- `src/styles/theme.js`
- `src/components/Header.js`
- `src/components/Footer.js`
- `src/components/PreferenceControls.js`
- `src/context/ContentContext.js`
- `src/context/PreferencesContext.js`
- `src/content/siteCopy.js`
- New directory: `src/components/immersive/`
- Optional: `public/audio/`
- Optional: `public/images/` or `public/visuals/`

Strapi, if making the new homepage CMS-editable:

- `/Users/anixachidze/unconscious-mind/strapi-cloud-template-blog-30ab41f786/src/api/mbr-homepage/content-types/mbr-homepage/schema.json`
- `/Users/anixachidze/unconscious-mind/strapi-cloud-template-blog-30ab41f786/src/components/mbr/*.json`
- `/Users/anixachidze/unconscious-mind/strapi-cloud-template-blog-30ab41f786/scripts/seed-mindbody.js`

## Tests / validation

Automated/local:

```bash
cd /Users/anixachidze/unconscious-mind/mindbody-roots
npm run build
```

If lint remains available:

```bash
npm run lint
```

Manual browser validation:

- Desktop homepage visual check.
- Mobile homepage visual check.
- Theme toggle.
- Language toggle.
- Menu open/close.
- Phase progress click/scroll behavior.
- Reduced motion mode.
- Existing page routing.
- Production Strapi content fetch.
- Fallback behavior when Strapi is unreachable.

Deployment validation:

- Preview deploy first.
- Browser console check.
- Verify Strapi API requests return 200.
- Confirm production deploy only after manual approval.

## Risks and tradeoffs

1. Hatom-like sites can become too heavy.
   - Mitigation: start with CSS/SVG, avoid WebGL/video until necessary.

2. Immersive intro can reduce usability.
   - Mitigation: make it fast, skippable, and remember user preference.

3. Too much motion can feel wrong for a wellness audience.
   - Mitigation: use slow, breath-like motion and support reduced motion.

4. Dark cinematic style may conflict with current calm/light wellness feel.
   - Mitigation: create both light and dark variants; keep warmth and readability.

5. Georgian copy may be longer than English copy.
   - Mitigation: test bilingual layouts early and avoid rigid headline containers.

6. CMS schema changes require Strapi deployment and content seeding.
   - Mitigation: keep frontend fallback first; deploy CMS updates separately.

7. Audio can annoy users or violate browser autoplay rules.
   - Mitigation: sound off by default; start only after click.

## Open questions before implementation

1. Should MindBody Roots become more service/booking-focused, or remain primarily a blog/resources site?
2. What is the main conversion goal?
   - Book a session?
   - Read articles?
   - Join a program?
   - Contact Ani?
3. Do we want an intro screen like Hatom, or should the immersive hero appear immediately?
4. Should audio be included?
5. What are the final five phase names?
6. Should the homepage phases be editable in Strapi from the first version, or should we prototype locally first?
7. Is there existing brand imagery/logo work to use, or should we design a new symbolic mark?

## Recommended next step

Start with Milestone 1 and Milestone 2 only:

1. Choose the five-phase structure and primary CTA.
2. Build a static immersive homepage prototype with CSS/SVG only.
3. Keep all current pages, language switching, theme switching, and Strapi fallback behavior working.
4. Let the user manually test locally before committing.

This gives the site the Hatom-inspired direction without taking on the risk of heavy animation, audio, and CMS schema changes all at once.
