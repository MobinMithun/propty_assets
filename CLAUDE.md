# CLAUDE.md — Propty Intelligence & Design Hub

## Project Mission
**Propty** is reimagining the real estate ecosystem in Bangladesh through AI-driven search, verified listings, and a seamless digital journey. This repository is the strategic engine for generating:
- **Strategic Assets**: Pitch slides, product roadmaps, and detailed market insights.
- **High-Fidelity Prototypes**: Dummy sites, interactive UI/UX components, and AI-powered interfaces.
- **Market Intelligence**: Competitive analysis and localized PropTech strategy for Bangladesh.

---

## ⚡ High-Speed Analysis Workflow
When analyzing new requests or brand materials:
1.  **Context Injection**: Always read `brand_assets/` and existing knowledge items first.
2.  **Rapid Synthesis**: Break down complex documents (PDFs, slides) into actionable UI components and features immediately.
3.  **Proactive Suggestion**: Don't wait for permission; propose the "next best step" based on the project's long-term vision.

---

## 🎨 UI/UX Excellence
Since the previous design was discarded, all new work must adhere to **premium, state-of-the-art** standards:
- **Invoke Skills**: Use `ui-ux-pro-max` for all design planning and `web-design-guidelines` for audits.
- **Aesthetic**: Focus on vibrant, modern themes (Glassmorphism, Bento grids, Sleek Dark Mode).
- **No Generics**: Use custom brand colors (check `brand_assets`), modern typography (Inter, Kanit, Prompt), and smooth micro-animations.

---

## 🛠 Tech Stack & Tools
- **Core**: HTML5, Vanilla CSS, JS (Frameworks only if explicitly requested).
- **Styling**: Tailwind CSS via CDN (default for rapid prototyping).
- **Dev Server**: `node serve.mjs` (Port 3000).
- **Visual Validation**: `node screenshot.mjs http://localhost:3000 [label]` for Puppeteer-based review.

---

## 🧠 Living Documentation & Evolution
This repository is a **living entity**. For every session and major analysis:
1.  **Update `CLAUDE.md`**: Capture new progress, updated project priorities, and refined design tokens directly in this file.
2.  **Market Intelligence**: Store competitive research, user personas, and PropTech trends in `brand_assets/intelligence/`.
3.  **Asset Persistence**: Save all generated assets (images, logos, diagrams) in `brand_assets/` or `assets/` immediately.
4.  **Session Synopses**: After significant milestones, update the "Project Status" section below to maintain continuity for future Claude instances.

---

## 📈 Market Intelligence Storage
- `brand_assets/intelligence/market_research.md`: Global and local PropTech trends.
- `brand_assets/intelligence/user_personas.md`: Targeted buyer/seller/agent profiles for Bangladesh.
- `brand_assets/intelligence/feature_roadmap.md`: Prioritized feature list based on analysis.

---

## 🔍 Competitive Benchmarking
To build Propty with global standards, capture reference sites regularly:
- **Usage**: `node capture_references.mjs <url1> <url2> ...`
- **Storage**: Screenshots are saved to `brand_assets/reference_sites/` with domain and timestamp.
- **Workflow**: Analyze these references for layout, UX patterns, and AI integration ideas.

---

## 📂 Repository Structure
- `brand_assets/`: Source of Truth (Strategy, PDFs, Guides).
  - `intelligence/`: Market research, insights, and roadmap updates.
  - `reference_sites/`: **New.** Screenshots of global PropTech leaders for benchmarking.
- `assets/`: UI assets, fonts, and icons.
- `serve.mjs`, `screenshot.mjs`, `capture_references.mjs`: Automation and analysis utilities.

## 🚀 Execution Guardrails
- **Continuous Learning**: Every chat must contribute to the repository's long-term memory.
- **Fast Iteration**: Deliver functional prototypes early.
- **Deep Research**: Benchmark against Zillow, Rightmove, etc., and document findings in `intelligence/`.
- **Cleanliness**: Move temporary experiments to `scratch/`.


