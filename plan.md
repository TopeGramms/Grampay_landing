# GramPay — Implementation Plan

## Product direction
GramPay is one dark-first, premium financial infrastructure brand with two connected experiences: **Personal → WhatsApp** for people and **Developers → MCP** for AI agents. Both interfaces lead back to the same GramPay Core and financial rails.

## Design system
- **Design movement:** Technical editorial fintech — cinematic whitespace, sharp typography, deep charcoal surfaces, and restrained luminous green.
- **Core principles:** Product-first storytelling; familiar WhatsApp-native interaction; agent-ready technical clarity; trustworthy restraint; motion that explains a transaction.
- **Color philosophy:** Near-black and charcoal establish seriousness and focus. A signature electric-lime green marks action, success, and moments of clarity. Muted sage/gray keeps secondary information calm instead of decorative.
- **Layout paradigm:** A vertically paced narrative with offset columns, sticky demonstration rails, full-bleed cinematic moments, and bento modules that feel like interface fragments rather than a generic card grid.
- **Signature elements:** (1) rounded WhatsApp message bubbles with a fine lime edge, (2) transaction rails that move from outlined neutral states to green completion, and (3) compact mono labels that make the page feel instrumented and real.
- **Interaction philosophy:** Every interaction should clarify what the assistant is doing. Hover reveals details, scroll changes focus, and chat messages appear in a paced sequence. Motion remains subtle and respects `prefers-reduced-motion`.
- **Animation:** Use Framer Motion for staggered entrance, reveal-on-scroll, sequential chat messages, state transitions, accordion height/opacity, mobile drawer, and small parallax drift. Avoid constant motion, heavy effects, and random decoration.
- **Typography system:** Geist/Inter-style sans for headlines and body; compact monospace for status labels and microcopy. Oversized editorial headlines, relaxed paragraph measure, and strict uppercase micro-labels.
- **Brand essence:** One financial core with a human interface and an agent interface. Personal is conversational; Developers is infrastructure-oriented. Personality: direct, composed, intelligent.
- **Brand voice:** Clear, confident, and human. Example lines: “Your money. Just send a message.” and “The interface is already familiar.”
- **Wordmark & logo:** GramPay uses a custom-looking mark made from two offset rounded bars forming a forward-moving `G`, paired with a spaced wordmark. It signals motion and clarity without a generic chat or robot icon.
- **Signature brand color:** `#C7F36B` — a warm electric-lime that feels ownable against charcoal and reads as action/success without looking neon.

## Page structure
- `app/layout.tsx` — global metadata, Geist/Inter fallback, global theme.
- `app/page.tsx` — semantic page composition and data arrays.
- `app/globals.css` — theme tokens, layout utilities, bespoke surfaces, responsive rules, and reduced-motion behavior.
- `components/grampay.tsx` — reusable client-side sections and motion primitives for Personal, shared mode navigation, and the Developer/MCP experience.
- `public/manus-routes.json` — route manifest for the single-page route.
- `app.config.ts` — project logo metadata.

## Frontend behavior
The page is static and self-contained: no server or database is required. The persistent navigation switches between Personal and Developers in-place with a subtle transition. WhatsApp actions use the live GramPay destination `https://wa.me/2349135428476`; Developer CTAs are explanatory anchors until the live MCP endpoint and documentation URL are supplied. Financial claims are intentionally cautious; no partner, certification, volume, encryption, or licensed-institution claims are fabricated.
