# GramPay Landing

GramPay is a two-interface financial product experience:

- **Personal / WhatsApp:** a natural-language financial assistant for supported money movement through WhatsApp.
- **Developer / MCP:** an MCP connector that gives AI agents a structured path for crypto-to-Naira cashouts and Nigerian bank settlement.

## Landing pages

| Experience | Route | Description |
| --- | --- | --- |
| Personal | `/` | WhatsApp-native GramPay product story, animated conversation demo, security flow, FAQ, and WhatsApp CTA. |
| Developers | [`/mcp-landing.html`](./public/mcp-landing.html) | The original GramPay MCP landing page, integrated locally with its connection flow, settlement receipt UI, safeguards, and provider information. |

The **Developers** link in the Personal navigation opens the full MCP landing page directly.

## Source and integrations

- Personal WhatsApp CTA: [`wa.me/2349135428476`](https://wa.me/2349135428476)
- Original MCP implementation and landing source: [`TopeGramms/grampay-mcp-server`](https://github.com/TopeGramms/grampay-mcp-server)
- MCP landing page source file: [`public/mcp-landing.html`](./public/mcp-landing.html)
- MCP connector endpoint referenced by the original page: `https://grampay-mcp.up.railway.app/mcp`

## Tech stack

- Next.js 14
- TypeScript
- Tailwind CSS / PostCSS
- Framer Motion
- Lucide React
- Static export to `out/`

The Personal page is implemented with reusable React sections in [`components/grampay.tsx`](./components/grampay.tsx). The Developer page is intentionally kept as the original standalone HTML experience so it can retain its own layout, motion, copy, and MCP connection flow.

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
public/mcp-landing.html  Original integrated MCP landing page
public/               Static assets and route manifest
out/                  Generated static export
```

## Product positioning

> One GramPay core. Two interfaces: WhatsApp for people and MCP for AI agents.
