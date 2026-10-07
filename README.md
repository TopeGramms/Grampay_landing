# GramPay Landing

GramPay is one financial platform with two interfaces:

- **Personal / WhatsApp:** the interface for people.
- **Developers / MCP:** the interface for AI agents to request financial capabilities made available by GramPay.
- **Shared platform:** both experiences use GramPay's financial infrastructure. Flutterwave currently provides payment infrastructure beneath the platform.

## Landing pages

| Experience | Route | Description |
| --- | --- | --- |
| Personal | `/` | GramPay's WhatsApp experience for people, with an animated conversation demo, product details, FAQ, and WhatsApp CTA. |
| Developers | [`/mcp-landing.html`](./public/mcp-landing.html) | The MCP interface for AI agents, the shared GramPay platform, and its underlying payment infrastructure. |

The **Developers** link in the Personal navigation opens the full MCP landing page directly.

## Source and integrations

- Personal WhatsApp CTA: [`wa.me/2349135428476`](https://wa.me/2349135428476)
- MCP landing page source file: [`public/mcp-landing.html`](./public/mcp-landing.html)
- This repository contains the landing experiences; the MCP service implementation is maintained separately.

## Tech stack

- Next.js 15
- TypeScript
- Tailwind CSS / PostCSS
- Framer Motion
- Lucide React
- Static export to `out/`

The Personal page is implemented with reusable React sections in [`components/grampay.tsx`](./components/grampay.tsx). The Developers page is standalone HTML, preserving its own layout, motion, and receipt-inspired visual treatment.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The local MCP landing page is available at:

```text
http://localhost:3000/mcp-landing.html
```

## Production build

```bash
npm run build
```

The static site is generated in `out/`, including both `index.html` and `mcp-landing.html`.

## Repository structure

```text
app/                  Next.js app shell and homepage
components/           Personal GramPay React sections
public/mcp-landing.html  Standalone Developers/MCP experience
public/               Static assets and route manifest
out/                  Generated static export
```

## Product positioning

- **Personal:** WhatsApp for people.
- **Developers:** MCP for AI agents.
- **Both:** GramPay financial infrastructure.
- **Payment infrastructure:** Flutterwave is the current provider beneath GramPay.
