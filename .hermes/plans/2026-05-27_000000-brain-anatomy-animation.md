# Brain Anatomy Animation Feature Plan

## Goal

Add an interactive 3D brain anatomy animation that displays when users visit the MindBody Roots homepage for the first time (or after a hard reload). The animation should allow users to rotate and explore the brain before proceeding to the main content, inspired by hatom.com's immersive 3D experience.

## Current Context / Assumptions

**Project State:**
- Branch: `TestAnimation` (up to date with origin)
- Stack: Next.js 13.5, React 18, styled-components v6
- Current home page: Uses `ImmersiveHome` component with sophisticated CSS animations (orbs, gradients, keyframes)
- No 3D libraries currently installed

**Reference Analysis (hatom.com):**
- Uses three.js r165 for 3D rendering
- Implements canvas-based animations with custom cursor interactions
- Built with Nuxt.js but animation approach is transferable

**Existing Intro System:**
- `ImmersiveHome.js` already has an intro overlay system with `introSeenKey = "mindbody-roots-intro-seen"` in localStorage
- Uses localStorage to track if user has seen the intro before
- Current intro shows a breathing seed animation before revealing main content

**Theme Support:**
- Light/dark theme toggle exists via `PreferencesContext`
- Need to ensure brain animation respects theme preferences

## Proposed Approach

Use **react-three-fiber** (@react-three/fiber) and **@react-three/drei** for declarative Three.js integration with React. This provides:
- Better React integration than vanilla three.js
- Easier state management
- Built-in helpers for common 3D patterns (OrbitControls, loaders, etc.)

The brain animation will appear as a **full-screen overlay** on first visit, similar to the existing intro system but with an interactive 3D brain model instead of the seed animation.

## Step-by-Step Plan

### Phase 1: Dependencies & Setup

1. **Install 3D libraries:**
   ```bash
   npm install three @react-three/fiber @react-three/drei
   ```

2. **Source a brain 3D model:**
   - Option A: Use a free brain model from Sketchfab (CC-licensed, GLB/GLTF format)
   - Option B: Use a simplified brain model from public domain medical datasets
   - Recommended: Find a stylized/low-poly brain model for better performance
   - Place model in `public/models/brain.glb`

### Phase 2: Create Brain Animation Component

3. **Create `src/components/BrainIntro.js`:**
   - Full-screen overlay component with Canvas from @react-three/fiber
   - Load brain model using `useGLTF` from drei
   - Implement auto-rotation (slow spin) with user-controlled OrbitControls
   - Add soft lighting (ambient + directional) for anatomical visibility
   - Include labels/hotspots for brain regions (optional enhancement)
   - Respect theme: adjust background/lighting based on light/dark mode
   - Add "Enter Site" button to dismiss overlay

4. **Create `src/components/BrainScene.js`:**
   - Separate scene component for the 3D brain
   - Handle model loading, positioning, and materials
   - Implement smooth camera transitions
   - Add subtle particle effects or neural network visualization around brain

### Phase 3: Integration with Home Page

5. **Modify `ImmersiveHome.js`:**
   - Replace or augment existing intro overlay with `BrainIntro` component
   - Use same `introSeenKey` localStorage pattern to show only on first visit
   - Add smooth fade-out transition when user clicks "Enter Site"
   - Ensure overlay appears above header (z-index management)

6. **Update `src/app/page.js`** (if needed):
   - May need to wrap ImmersiveHome in Suspense for 3D loading

### Phase 4: Polish & Performance

7. **Add loading states:**
   - Show elegant loading indicator while brain model downloads
   - Implement progressive loading (low-res preview → full model)
   - Add fallback for devices without WebGL support

8. **Optimize for performance:**
   - Lazy-load the 3D libraries (dynamic import)
   - Implement LOD (Level of Detail) for mobile devices
   - Use `useFrame` for smooth 60fps animation
   - Compress GLB model with Draco compression
   - Limit polygon count to <50k triangles for mobile

9. **Add interactivity:**
   - Click on brain regions to show labels (frontal lobe, temporal lobe, etc.)
   - Hover effects with subtle glow
   - Smooth zoom on scroll or pinch gesture
   - Reset button to return to default view

### Phase 5: Accessibility & Fallbacks

10. **Accessibility considerations:**
    - Provide keyboard navigation (Tab to "Enter Site", Enter to dismiss)
    - Add ARIA labels for screen readers
    - Respect `prefers-reduced-motion` - show static brain image instead
    - Ensure sufficient color contrast for labels

11. **Mobile optimization:**
    - Touch controls for rotation (already handled by OrbitControls)
    - Simplified model or lower quality on mobile
    - Test on iOS Safari and Android Chrome
    - Consider orientation changes

## Files Likely to Change

**New Files:**
- `src/components/BrainIntro.js` - Main overlay component
- `src/components/BrainScene.js` - 3D scene with brain model
- `public/models/brain.glb` - 3D brain model file
- `public/images/brain-fallback.jpg` - Static fallback image

**Modified Files:**
- `src/components/immersive/ImmersiveHome.js` - Integrate brain intro
- `src/app/page.js` - May need Suspense wrapper
- `package.json` - Add three.js dependencies
- `src/app/globals.css` - Add overlay styles

## Tests / Validation

**Manual Testing Checklist:**
- [ ] Animation appears on first visit only
- [ ] User can rotate brain with mouse/touch
- [ ] "Enter Site" button dismisses overlay smoothly
- [ ] Light/dark theme affects brain lighting appropriately
- [ ] Works on Chrome, Firefox, Safari (desktop)
- [ ] Works on iOS Safari, Android Chrome (mobile)
- [ ] Loading state shows while model downloads
- [ ] Fallback image appears if WebGL unavailable
- [ ] `prefers-reduced-motion` shows static version
- [ ] Keyboard accessible (Tab, Enter to dismiss)
- [ ] Performance: 60fps on mid-range devices
- [ ] No console errors during interaction

**Automated Tests:**
- [ ] Unit test: BrainIntro component renders without crashing
- [ ] Unit test: localStorage correctly tracks "seen" state
- [ ] Integration test: Overlay dismisses on button click
- [ ] Accessibility test: Passes axe-core checks

## Risks, Tradeoffs, and Open Questions

### Risks

1. **Performance on mobile:** 3D rendering can drain battery and cause lag
   - Mitigation: Use low-poly model, reduce quality on mobile, provide opt-out

2. **Large bundle size:** Three.js + model can add 500KB+ to initial load
   - Mitigation: Lazy-load with dynamic import, use code splitting

3. **Model licensing:** Finding a free, high-quality brain model
   - Mitigation: Use CC-licensed models from Sketchfab or create simplified version

4. **WebGL support:** ~2-3% of users lack WebGL support
   - Mitigation: Feature detection with fallback to static image

### Tradeoffs

**Complexity vs. Impact:**
- Full 3D experience: High wow factor, higher development time, performance risk
- Simplified 2D/3D hybrid: Lower risk, still engaging, easier to maintain
- Recommendation: Start with simplified low-poly brain, iterate if needed

**First Visit vs. Returning Users:**
- Current system uses localStorage - users clearing cache will see it again
- Alternative: Use cookie for longer persistence
- Recommendation: Stick with localStorage for privacy-friendliness

### Open Questions

1. **Model selection:** Should we use a realistic anatomical brain or a stylized/artistic version that matches the site's aesthetic?

2. **Educational labels:** Should clicking brain regions show anatomical names (frontal lobe, cerebellum) or thematic labels (thinking, balance, creativity)?

3. **Duration:** Should the animation auto-dismiss after a timeout (e.g., 10 seconds) or require explicit user action?

4. **Sound:** Should we add subtle ambient sound (neural activity, gentle hum) or keep it silent for accessibility?

5. **Skip option:** Should returning users have a way to view the animation again (e.g., button in footer)?

6. **Analytics:** Should we track how long users interact with the brain before entering the site?

## Implementation Notes

**Model Sourcing Recommendations:**
- Sketchfab: Search "brain anatomy" with CC license filter
- Poly Haven: Free CC0 3D models
- TurboSquid: Free section for brain models
- Alternative: Use a procedural brain shape created in Blender (more control)

**Performance Budget:**
- Model size: <2MB compressed
- Initial bundle impact: <300KB (three.js tree-shaken)
- Time to interactive: <3 seconds on 4G connection
- Frame rate: 60fps on devices with 4GB+ RAM

**Theme Integration:**
- Light mode: Brighter lighting, white/blue brain tones, soft shadows
- Dark mode: Dimmer lighting, purple/green brain tones, emissive materials
- Use `usePreferences()` hook to access current theme

**Existing Intro Replacement:**
The current seed animation in `ImmersiveHome.js` can be:
- Option A: Completely replaced by brain animation
- Option B: Shown before brain animation (two-stage intro)
- Option C: Brain animation only, seed becomes a decorative element elsewhere
- Recommendation: Option A for cleaner UX

## Next Steps

1. Find and evaluate 3D brain models (2-3 options)
2. Install dependencies and test basic three.js setup
3. Create minimal BrainScene component with placeholder geometry
4. Iterate on model selection and lighting
5. Integrate with existing intro system
6. Add interactivity and polish
7. Test across devices and browsers
8. Gather feedback before merging to main

## References

- hatom.com: Three.js r165 with custom cursor and canvas animations
- react-three-fiber docs: https://docs.pmnd.rs/react-three-fiber
- drei helpers: https://github.com/pmndrs/drei
- GLB compression: https://google.github.io/draco/
