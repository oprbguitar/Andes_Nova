# AndesNova homepage design QA

- Source visual truth: `C:\Users\oprbg\Documents\Proyectos Codex\AndesNova\design and logo\new design.png`
- Implementation URL: `http://127.0.0.1:4173/Andes_Nova/`
- Desktop implementation screenshot: `C:\Users\oprbg\AppData\Local\Temp\andesnova-home-desktop.png`
- Mobile implementation screenshot: `C:\Users\oprbg\AppData\Local\Temp\andesnova-home-mobile.png`
- Combined comparison: `C:\Users\oprbg\AppData\Local\Temp\andesnova-home-comparison.png`
- Desktop viewport and CSS size: 1672 × 941 px
- Source pixels: 1672 × 941 px
- Implementation pixels: 1672 × 941 px
- Device scale factor: 1
- Density normalization: none required; source and implementation match pixel-for-pixel dimensions
- Mobile viewport and implementation pixels: 390 × 844 px
- State: homepage loaded after the 320 ms entrance transition; chatbot and modals closed

## Full-view comparison evidence

The source and implementation were placed side by side at the same 1672 × 941 dimensions. The implementation matches the source's major composition: transparent header, left-aligned four-line headline, right-side glass evaluation panel, centered mountain and Nova core, four lower KPI cards, dense lower cloud cover, dark legal footer, and lower-right chatbot.

The official supplied horizontal logo uses its documented descriptor-under-wordmark lockup, while the reference image places the descriptor beside the wordmark. Keeping the supplied official logo intact was treated as the higher-priority brand constraint.

## Focused region comparison evidence

- Header: official horizontal logo is intact and undistorted; Projects and Consultations retain their original destinations and use matching white glass controls.
- Hero: title hierarchy, CTA placement, glass panel, five interactive evaluation nodes, central official symbol, and mountain placement were checked at full scale.
- Lower region: all four KPI cards, dense foreground cloud cover, legal copy and controls, and the chatbot launcher remain visible without scroll.
- Mobile: all primary controls, five evaluation nodes, four KPI cards, footer controls, and chatbot remain visible at 390 × 844 with no horizontal or vertical document overflow.

## Required fidelity surfaces

- Fonts and typography: hierarchy, weight, wrapping, line height, letter spacing, and optical density match the reference closely. The supplied identity's Sora-first stack falls back to the existing Inter/system stack when Sora is unavailable.
- Spacing and layout rhythm: reference proportions are reproduced at 1672 × 941; the glass panel, hero copy, KPI row, footer, and chatbot align to the same major regions.
- Colors and visual tokens: official identity colors are defined as reusable CSS variables and applied to actions, text, statuses, borders, backgrounds, and footer.
- Image quality and asset fidelity: official supplied logo, symbol, and mountain are used. Only fully transparent canvas margins were trimmed from display copies; artwork proportions and pixels were not stretched or recolored. The atmospheric cloud texture is a raster asset, not CSS-drawn cloud art.
- Copy and content: existing homepage copy, KPI values, status labels, legal text, links, routes, and accessible names remain unchanged.

## Comparison history

### Iteration 1

- P1: generated cloud texture retained its black compositing background, producing horizontal dark bands.
- P1: large transparent margins in the supplied logo files caused the header wordmark and central symbol to be clipped.
- Fix: converted the black cloud matte into alpha, then trimmed only transparent margins from display copies of the official logo assets.

### Iteration 2

- P2: semi-transparent dark edge pixels created visible gray cloud outlines.
- Fix: reconstructed straight-alpha cloud colors from the original black matte, eliminating the edge contamination.

### Iteration 3

- P2: glass panel height and mountain contrast drifted from the reference.
- Fix: added proportional top/bottom panel margins, increased mountain contrast modestly, and reduced the mist opacity.
- Post-fix evidence: `C:\Users\oprbg\AppData\Local\Temp\andesnova-home-desktop.png`

## Interaction and runtime verification

- Page identity and meaningful DOM: passed.
- Framework error overlay: absent.
- Console warnings/errors: none.
- `Iniciar evaluación`: opens the existing six-step evaluation dialog.
- Evaluation node: `Base` changes to `aria-expanded="true"`.
- Legal controls: privacy dialog opens.
- Chatbot: existing AndesNova IA region opens with its current controls.
- Projects: navigates to `/Andes_Nova/proyectos/`, where the existing portfolio renders without console errors.
- Consultations: remains `mailto:consultas@andesnova.solutions`.
- Desktop overflow: 1672 × 941 document and viewport dimensions match.
- Mobile overflow: 390 × 844 document and viewport dimensions match.

## Findings

No actionable P0, P1, or P2 findings remain.

## Follow-up polish

- P3: the official supplied header lockup stacks the descriptor below the wordmark, while the visual reference places it to the right. The implementation deliberately preserves the official supplied logo without redrawing or separating it.

## Projects redesign QA

- Source visual truth: `C:\Users\oprbg\Documents\Proyectos Codex\AndesNova\design and logo\design proyectos.png`
- Supplied background: `C:\Users\oprbg\Documents\Proyectos Codex\AndesNova\design and logo\imagen fondo  proyectos.png`
- Implementation URL: `http://127.0.0.1:4173/Andes_Nova/proyectos/`
- Desktop screenshot: `C:\Users\oprbg\AppData\Local\Temp\andesnova-projects-desktop.png`
- Mobile viewport screenshots: `C:\Users\oprbg\AppData\Local\Temp\andesnova-projects-mobile-viewport.png` and `C:\Users\oprbg\AppData\Local\Temp\andesnova-projects-mobile-bottom2.png`
- Desktop viewport: 1672 × 941 px; mobile viewport: 390 × 844 px
- Desktop result: 9 project modules, header, title, supplied full-background asset, footer and chatbot fit in one viewport with no horizontal or vertical overflow.
- Mobile result: all 9 project modules, footer controls and chatbot remain available in one responsive column with no horizontal overflow.
- Functional preservation: project names, statuses, categories, accessible labels and destinations are unchanged. The ERP Express Perú destination retains the required `#descarga` fragment.
- Runtime verification: production build passed; desktop and mobile console warnings/errors are empty.
- Footer-width follow-up: the dark-blue Projects footer now spans the complete viewport width; the inset desktop header retains its original 8 px side spacing.

## Hover-layer regression QA

- `Riesgos`, `Clientes` and `Base` were exercised through their existing buttons.
- In the expanded state, the active node resolves to `z-index: 100`, its popover to `z-index: 110`, and the containing visual plane to `z-index: 20`.
- The lower KPI plane remains below the active visual plane; the Base popover was confirmed to overlap the KPI region without being covered.
- Evidence: `C:\Users\oprbg\AppData\Local\Temp\andesnova-hover-risks.png`, `C:\Users\oprbg\AppData\Local\Temp\andesnova-hover-clients.png`, and `C:\Users\oprbg\AppData\Local\Temp\andesnova-hover-base.png`.

final result: passed
