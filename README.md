# Aurikrex Calc ⚡

> **Offline-first scientific calculator PWA for science students**  
> Designed to feel like an unfair advantage for JAMB, WAEC, JUPEB, A-level and university science students.

---

## ✨ Features & Architecture

### 1. Calculation Engine (Single Seam Interface)
- Single seam interface: `engine.evaluate({ input, context }) -> EvaluationResult`
- Seamlessly replaceable engine (ready for Rust/WASM phase without UI changes)
- Preprocessing and implicit multiplication (`2π`, `3(4+5)`, `2Ans`)
- Up to 12 significant digits internally
- Result forms: Decimal, Exact fraction (`3/4`), Standard form (`2.94 × 10¹`), Engineering notation, and arbitrary significant figure formatting.

### 2. Units & Dimensional Analysis
- Typed inline after numbers: `9.8 m/s² * 3 s = 29.4 m/s`
- Normalises unicode superscripts (`m/s²` -> `m/s^2`)
- Strict dimensional checks: prevents invalid additions (e.g., `5 m + 3 s` returns `"Can't add length (m) and time (s)"`)
- Built-in conversions: `29.4 m/s` to `105.84 km/h`, `1 kWh` to `3.6 MJ`.
- Unit category cycling strip: Length, Mass, Time, Force, Energy, Electric.

### 3. Live Editable Tape
- Bottom-aligned scrollable tape history with diagonal-cut Aurikrex accent bar.
- Tap any row to edit in-place.
- Dependent recalculation (FR-8) and circular reference prevention.
- Offline persistence via IndexedDB (Dexie) with `navigator.storage.persist()`.
- Export & Import JSON backups from day one.

### 4. Aurikrex Keypad & Modifiers
- Thumb-friendly `100dvh` one-screen layout tuned for 360×700 and 390×844 viewports.
- Header Annunciator strip: `S` (SHIFT - cyan), `A` (ALPHA - violet), `INV` (amber), `HYP` (pink).
- One-shot modifiers with double-tap lock for SHIFT.
- Dynamic relabeling of keys without blank states.
- 5 swipeable Function Pages:
  - **P1 Core**: Trig, Hyperbolic, Powers, Roots, Log, Ln, Constants.
  - **P2 Algebra & Calculus**: Solve, d/dx, ∫dx, Σ, lim, |x|, mod, ⌊x⌋, ⌈x⌉.
  - **P3 Stats & Discrete**: nCr, nPr, Mean, Std Dev, Linear Regression, GCD, LCM, Prime factors.
  - **P4 Vectors & Matrices**: Dot, Cross, Norm, Determinant, Inverse, Complex polar/rect.
  - **P5 Science**: Molar mass ($M_r$), pH, Molarity, Gas laws, Hardy-Weinberg.
- The iconic solid blue `=` key with chamfered corner echoing the Aurikrex logo.

### 5. Toolbox & Science Utilities
- **Formula Bank**: 40+ curated formulas across Mechanics, Waves, Electricity, Thermal, Chemistry, Biology, and Genetics with interactive step-by-step solvers.
- **Physical Constants**: $g, c, h, N_A, R, k_B, e, G, \varepsilon_0, \mu_0, m_e, m_p$ with SI units.
- **Chemistry Tool**: Formula molar mass calculation (e.g. $\text{H}_2\text{SO}_4$, $\text{Ca(OH)}_2$) with elemental breakdown percentages and mini periodic table.
- **Academic Tools**: CGPA calculation on 5.0 Nigerian university scale and JAMB aggregate calculator.

---

## 🧪 Golden Test Suite (105+ Verified Tests)

Run the automated test suite with Vitest:

```bash
npm test
```

Includes test cases verified against reference calculators and hand calculations:
- `sin(30°) = 0.5` in DEG mode
- `5! = 120`
- `2π ≈ 6.283185`
- `1/0` produces `"Can't divide by zero"`
- `asin(2)` produces domain error
- `9.8 m/s² * 3 s = 29.4 m/s`
- `29.4 m/s` converts to `105.84 km/h`
- `5 m + 3 s` produces dimension error
- `1 kWh` converts to `3.6 MJ`
- `x² - 5x + 6 = 0` solves roots $2$ and $3$
- $\int_0^1 x^2 \, dx \approx 0.3333$
- $\text{H}_2\text{SO}_4$ molar mass $\approx 98.079\text{ g/mol}$

---

## 🚀 Building & Exporting

```bash
# Development mode
npm run dev

# Static Export (output: 'export' in Next.js)
npm run build
```

The static PWA output is emitted directly to `out/` ready to deploy to Cloudflare Pages, Vercel, or GitHub Pages.
