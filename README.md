# Aurikrex Calculator ⚡

> **Offline-first scientific calculator PWA for Falcon’s own use**  
> Built to feel like an unfair advantage for study, research, and lesson prep.  
> *Falcon is the only user, forever — running on his own Android phone and personal devices.*

---

## 🏛️ Architecture & PRD v2 Specifications

### 1. Engine Specification & Section 4A JSON Contract
The UI communicates strictly through the versioned JSON contract specified in Section 4A of the PRD.
Until the standalone Rust engine (`aurikrex-engine`) ships its WebAssembly build, the UI runs against recorded JSON fixtures and an in-process contract-compliant engine:

```typescript
evaluate(request: JSON string) -> JSON string
recalc(rows: JSON string) -> JSON string
call(op: string, args: JSON string) -> JSON string
version() -> JSON string
```

#### Request Structure:
```json
{
  "input": "9.8 m/s^2 * 3 s",
  "context": {
    "angle": "deg",
    "ans": { "value": 29.4, "unit": "m/s" },
    "variables": { "A": { "value": 9.8 } },
    "sig_figs": 12,
    "result_form": "decimal",
    "seed": 42
  }
}
```

#### Response Structure:
```json
{
  "ok": true,
  "value": 29.4,
  "unit": "m/s",
  "dimension": [1, 0, -1, 0, 0, 0, 0],
  "forms": {
    "decimal": "29.4",
    "fraction": "147/5",
    "standard": "2.94e1",
    "sig_figs": "29.4"
  },
  "steps": [],
  "warnings": [],
  "error": null
}
```

#### Fixed Error Codes:
`SYNTAX`, `UNEXPECTED_TOKEN`, `UNKNOWN_FUNCTION`, `UNKNOWN_UNIT`, `UNKNOWN_VARIABLE`, `ARITY`, `DIV_ZERO`, `DOMAIN`, `OVERFLOW`, `DIM_MISMATCH`, `BAD_EXPONENT_UNIT`, `CYCLE`, `NO_SOLUTION`, `NOT_CONVERGED`, `SINGULAR_MATRIX`, `TOO_LARGE`, `INTERNAL`.

---

### 2. Units & Dimensional Analysis
- 7-integer SI dimension vector: `[length, mass, time, current, temperature, amount, luminous_intensity]`.
- Typed inline: `9.8 m/s² * 3 s = 29.4 m/s` (`[1, 0, -1, 0, 0, 0, 0]`).
- Exact angle snapping: Values within $1\text{e-}12$ snap to zero or integers (e.g. $\sin(180^\circ) = 0$, $\cos(90^\circ) = 0$).
- Dimension mismatch safety: `5 m + 3 s` returns `DIM_MISMATCH` (`"Can't add length (m) and time (s)"`).
- Built-in conversions: `29.4 m/s` $\to$ `105.84 km/h`, `1 kWh` $\to$ `3.6 MJ`.
- Unit category cycling strip: Length, Mass, Time, Force, Energy, Electric.
- Percentage convention: $200 + 10\% = 220$ (calculator convention).

---

### 3. Ask (AI Word-Problem Setup)
- **DeepSeek on Cloudflare Workers AI**: Configured for `@cf/deepseek-ai/deepseek-r1-distill-qwen-32b` within Cloudflare's free daily 10,000 Neurons allocation.
- **Passphrase-Protected**: Falcon's personal passphrase stored locally on device protects the Cloudflare Worker budget.
- **Formula & Variable Extraction**: The AI outputs structured JSON; the Aurikrex engine computes the result.
- **Offline Safety**: Disables visibly with an "online only" badge when disconnected.

---

### 4. Live Editable Tape & Storage
- Bottom-aligned scrollable tape with Aurikrex diagonal-cut accent bar.
- In-place row editing recalculates dependent rows in $<50\text{ ms}$.
- Detects circular tape references (`CYCLE`).
- Offline IndexedDB persistence via Dexie with `navigator.storage.persist()`.
- Export & Import JSON backups.

---

## 🧪 PRD v2 Golden Test Suite (101 Tests)

Run the test suite with Vitest:

```bash
npm test
```

### Verified PRD v2 Section 8 Seed Cases:
1. $2\pi \approx 6.2832$
2. $\sin(30^\circ) = 0.5$ in DEG
3. $5! = 120$
4. $1/0$ returns `DIV_ZERO`
5. $9.8\text{ m/s}^2 \times 3\text{ s} = 29.4\text{ m/s}$ (`dimension: [1, 0, -1, 0, 0, 0, 0]`)
6. $5\text{ m} + 3\text{ s}$ returns `DIM_MISMATCH`
7. $29.4\text{ m/s} \to 105.84\text{ km/h}$
8. $1\text{ kWh} \to 3.6\text{ MJ}$
9. $200 + 10\% = 220$ (calculator convention)
10. $\arcsin(2)$ returns `DOMAIN`
11. Circular tape reference returns `CYCLE`
12. Input over 2,000 characters returns `TOO_LARGE`

---

## 🚀 Building & Exporting

```bash
# Development server
npm run dev

# Static Export (output: 'export' in Next.js)
npm run build
```

Emitted to `out/` ready for Cloudflare Pages, Vercel, or local PWA install.
