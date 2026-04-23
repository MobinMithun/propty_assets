# CLAUDE.md — Propty Intelligence & Design Hub

## Project Mission
**Propty** is reimagining the real estate ecosystem in Bangladesh through AI-driven search, verified listings, and a seamless digital journey. This repository serves as the central hub for **Claude Projects**, brand intelligence, and high-speed design iterations.

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

## 📂 Repository Structure
- `brand_assets/`: **The Source of Truth.** Contains strategy slides, PDFs, and brand guides.
- `assets/`: Project-specific fonts, icons, and static media.
- `serve.mjs` & `screenshot.mjs`: Core utilities for local development and AI vision testing.
- `package.json`: Node dependencies for the automation scripts.

---

## 🚀 Execution Guardrails
- **Fast Iteration**: Deliver functional prototypes early.
- **Deep Research**: Use the `search_web` and `read_url_content` tools to benchmark against top global PropTech (Zillow, Rightmove, etc.).
- **Consistency**: Maintain the brand's premium positioning across all pages.
- **No Leftovers**: Keep the root clean; move temporary experiments to `scratch/`.

