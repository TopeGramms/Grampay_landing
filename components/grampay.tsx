import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  CircleDot,
  Landmark,
  Menu,
  MessageCircle,
  MoreHorizontal,
  MoveUpRight,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const waLink = 'https://wa.me/2349135428476';

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function Logo() {
  return (
    <span className="wordmark">
      <span className="logo-mark" aria-hidden="true">G</span>
      <span>GramPay</span>
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

function Reveal({ children, className = '', delay = 0, priority = false }: { children: React.ReactNode; className?: string; delay?: number; priority?: boolean }) {
  const reduceMotion = useReducedMotion();
  return <motion.div className={className} variants={reveal} initial={priority || reduceMotion ? false : 'hidden'} animate={priority || reduceMotion ? 'visible' : undefined} whileInView="visible" viewport={{ once: true, amount: 0.18 }} transition={{ delay: reduceMotion ? 0 : delay, duration: reduceMotion ? 0 : undefined }}>{children}</motion.div>;
}

function WhatsAppDemo({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(reduceMotion ? 10 : 0);
  useEffect(() => {
    if (reduceMotion) { setStep(10); return; }
    const timer = window.setInterval(() => setStep((current) => (current >= 11 ? 0 : current + 1)), 1100);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);
  const show = (n: number) => reduceMotion || step >= n;
  const activeStatus = Math.min(Math.max(step - 7, 0), 3);
  const statuses = ['Verifying', 'Authorizing', 'Processing', 'Successful'];

  return (
    <div className={`chat-frame ${compact ? 'chat-frame-compact' : ''}`}>
      <div className="chat-window">
        <div className="chat-topbar">
          <div className="chat-person"><div className="avatar">G</div><div><div className="chat-name">GramPay assistant</div><div className="chat-state">online · ready to help</div></div></div>
          <div className="topbar-meta"><MoreHorizontal size={18} /></div>
        </div>
        <div className="chat-body" aria-live="polite">
          <div className="chat-date">TODAY</div>
          <AnimatePresence initial={false} mode="popLayout">
            {show(0) && <motion.div key="hello" className="bubble user" initial={{ opacity: 0, y: 10, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>Send ₦25,000 to David<span className="bubble-meta">10:41</span></motion.div>}
            {step === 1 && !reduceMotion && <motion.div key="typing" className="bubble typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span /><span /><span /></motion.div>}
            {show(2) && <motion.div key="found" className="bubble assistant" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>Got it. I found David&apos;s account.<span className="bubble-meta">10:41</span></motion.div>}
            {show(3) && <motion.div key="recipient" className="recipient-card"><p>RECIPIENT FOUND</p><strong>David Okafor</strong><div className="recipient-line"><span className="bank-dot" />GTBank <span>·</span> **** 4821</div></motion.div>}
            {show(4) && <motion.div key="confirm" className="bubble assistant" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>Send ₦25,000?<div className="bubble-meta">Review before you confirm</div></motion.div>}
            {show(5) && <motion.div key="yes" className="bubble user" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>Yes<span className="bubble-meta">10:42</span></motion.div>}
            {show(6) && <motion.div key="pin" className="bubble assistant" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>Enter your PIN to authorize this payment.<span className="bubble-meta">Your PIN stays private</span></motion.div>}
            {show(7) && <motion.div key="rail" className="transaction-rail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4 }}>{statuses.map((status, index) => <span className="rail-step-wrap" key={status}><span className={`rail-step ${index < activeStatus ? 'done' : ''} ${index === activeStatus ? 'active' : ''}`}>{index < activeStatus ? <Check size={10} /> : <CircleDot size={10} />}{status}</span>{index < statuses.length - 1 && <span className={`rail-line ${index < activeStatus ? 'active' : ''}`} />}</span>)}</motion.div>}
            {show(10) && <motion.div key="success" className="bubble assistant success-bubble" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}><span className="success-check"><Check size={12} /></span><span>₦25,000 sent successfully<span className="bubble-meta">Transaction complete · 10:42</span></span></motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  const close = () => setOpen(false);
  return (
    <header className={`nav-shell ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar" aria-label="Primary navigation"><a href="#top" onClick={close}><Logo /></a><div className="mode-switch" role="group" aria-label="Choose GramPay experience"><a className="active" href="/" aria-current="page">Personal</a><a href="/mcp-landing.html">Developers</a></div><div className="nav-links"><a className="nav-link" href="#how-it-works">How it works</a><a className="nav-link" href="#features">Features</a><a className="nav-link" href="#security">Security</a><a className="nav-link" href="#faq">FAQ</a></div><a className="nav-cta" href={waLink} target="_blank" rel="noreferrer">Try on WhatsApp <ArrowRight size={14} /></a><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button></nav>
        <AnimatePresence>{open && <motion.div className="mobile-drawer" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><div className="mobile-mode-switch" role="group" aria-label="Choose GramPay experience"><a className="active" href="/" aria-current="page" onClick={close}>Personal</a><a href="/mcp-landing.html" onClick={close}>Developers</a></div><a href="#how-it-works" onClick={close}>How it works</a><a href="#features" onClick={close}>Features</a><a href="#security" onClick={close}>Security</a><a href="#faq" onClick={close}>FAQ</a><a className="mobile-cta" href={waLink} target="_blank" rel="noreferrer">Try on WhatsApp <ArrowRight size={13} /></a></motion.div>}</AnimatePresence>
      </div>
    </header>
  );
}

export function Hero() {
  return <section id="top" className="hero page-grid"><div className="container hero-layout"><Reveal priority className="hero-copy"><SectionLabel>Personal / WhatsApp</SectionLabel><h1>Your money.<br /><em>Just send a message.</em></h1><p>Send money and check a payment in WhatsApp. Review the details. Authorize only when you’re ready.</p><div className="hero-actions"><a className="button-primary" href={waLink} target="_blank" rel="noreferrer">Try it on WhatsApp <MoveUpRight size={16} /></a><a className="button-secondary" href="#how-it-works">See how it works <ArrowDownRight size={15} /></a></div></Reveal><Reveal priority delay={.12}><WhatsAppDemo /></Reveal></div></section>;
}

export function TrustBar() {
  const items = [[<MessageCircle key="wa" />, 'WhatsApp'], [<ShieldCheck key="secure" />, 'Explicit authorization'], [<Landmark key="bank" />, 'Bank transfers'], [<Activity key="status" />, 'Real-time status']];
  return <section className="trust"><div className="container trust-row"><div className="trust-copy"><strong>The conversation is the interface.</strong><span>WhatsApp in. A clear next step out.</span></div><div className="trust-items">{items.map(([icon, label]) => <span className="trust-chip" key={label as string}>{icon}{label}</span>)}</div></div></section>;
}

export function ProblemSection() {
  const steps = ['Open banking app', 'Find recipient', 'Copy account number', 'Switch apps', 'Confirm transfer', 'Wait / check status'];
  return <section className="section problem-section"><div className="container problem-layout"><Reveal className="problem-copy"><SectionLabel>Before the message / 02</SectionLabel><div className="section-heading"><h2>One request. Too many steps.</h2><p>A quick transfer can mean leaving the conversation, opening another app, and checking back to see what happened.</p></div></Reveal><Reveal delay={.1}><div className="workflow"><div className="workflow-list">{steps.map((step, index) => <div className="workflow-item" key={step}><span className="mono">0{index + 1}</span><span>{step}</span></div>)}</div><div className="workflow-end"><span>With GramPay</span><strong>“Send ₦50,000 to David.”</strong></div></div></Reveal></div></section>;
}

const howSteps = [
  { title: 'Start a conversation', body: 'Open WhatsApp and send a message.', msg: 'Hey GramPay', reply: 'I’m here. What do you need to do?' },
  { title: 'Tell it what you need', body: 'Use natural language instead of navigating menus.', msg: 'Send ₦10,000 to Tunde', reply: 'I found Tunde. Ready to review?' },
  { title: 'Confirm securely', body: 'Review the transaction and authorize it.', msg: 'Yes, send it', reply: 'Enter your PIN to authorize.' },
  { title: 'Done', body: 'Get a clear confirmation when the transaction is completed.', msg: 'Payment confirmed', reply: '₦10,000 sent successfully.' },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => { if (reduceMotion) return; const timer = window.setInterval(() => setActive((current) => (current + 1) % howSteps.length), 4400); return () => window.clearInterval(timer); }, [reduceMotion]);
  const item = howSteps[active];
  return <section id="how-it-works" className="section how-section"><div className="container how-layout"><Reveal className="how-sidebar"><SectionLabel>How it works / 03</SectionLabel><div className="section-heading"><h2>One conversation. Four clear steps.</h2><p>GramPay keeps the complexity behind the scenes and the next action right in front of you.</p></div><div className="step-list">{howSteps.map((step, index) => <button className={`step-tab ${index === active ? 'active' : ''}`} onClick={() => setActive(index)} key={step.title}><span className="step-number">0{index + 1}</span><span><strong>{step.title}</strong>{step.body}</span></button>)}</div></Reveal><Reveal delay={.1}><div className="step-stage"><div className="stage-index"><b>STAGE 0{active + 1}</b><span>·</span><span>LIVE CONVERSATION</span></div><AnimatePresence mode="wait"><motion.div key={active} className="mini-chat" initial={reduceMotion ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -18 }} transition={{ duration: reduceMotion ? 0 : .35 }}><div className="bubble user">{item.msg}<span className="bubble-meta">10:42</span></div><div className="bubble assistant">{item.reply}<span className="bubble-meta">GramPay assistant</span></div><div className="mini-chat-foot"><Check size={14} /> {item.title === 'Done' ? 'Clear confirmation received' : 'Next action stays in the chat'}</div></motion.div></AnimatePresence></div></Reveal></div></section>;
}

const featureData = [
  { title: 'Recipient', body: 'See the name and account details before you continue.' },
  { title: 'Amount', body: 'Review the exact naira amount in the conversation.' },
  { title: 'Authorization', body: 'Sensitive actions wait for your explicit approval.' },
  { title: 'Outcome', body: 'Get a clear status when the transaction completes.' },
];

export function FeatureGrid() {
  return <section id="features" className="section features"><div className="container feature-layout"><Reveal className="feature-intro"><SectionLabel>What stays visible / 04</SectionLabel><div className="section-heading"><h2>Important details.<br />In the open.</h2></div><p>A money movement should never be a mystery. Review the details, authorize the action, and see the outcome in one conversation.</p></Reveal><div className="feature-list">{featureData.map((feature, index) => <Reveal delay={index * .05} key={feature.title}><article className="feature-row"><span className="feature-index">0{index + 1}</span><h3>{feature.title}</h3><p>{feature.body}</p></article></Reveal>)}</div></div></section>;
}

const securityLayers = [
  ['01', 'WhatsApp identity', 'The conversation starts from a familiar place.'],
  ['02', 'Transaction verification', 'The details are surfaced before you confirm.'],
  ['03', 'PIN authorization', 'Sensitive actions require your explicit authorization.'],
  ['04', 'Payment processing', 'The transaction moves through its payment provider.'],
  ['05', 'Transaction confirmation', 'You receive a clear status when it is complete.'],
];

export function SecuritySection() {
  return <section id="security" className="section"><div className="container security-layout"><Reveal><SectionLabel>Trust, made visible / 05</SectionLabel><div className="section-heading"><h2>Simple on the surface. Serious underneath.</h2><p>GramPay is designed so every important action has a visible step: identify, review, authorize, process, confirm.</p></div></Reveal><Reveal delay={.1}><div className="security-rail">{securityLayers.map(([number, title, body]) => <div className="security-layer" key={number}><div className="layer-num">{number}</div><div><strong>{title}</strong><span>{body}</span></div><span className="layer-state">tracked</span></div>)}</div></Reveal></div></section>;
}

const transactionStates = [
  ['MESSAGE', 'Send ₦50,000 to John', 'The request arrives as a message.'],
  ['IDENTIFIED', 'John Doe', 'Access Bank · •••• 1294'],
  ['AUTHORIZED', 'PIN verified', 'You reviewed and authorized the payment.'],
  ['PROCESSING', 'Payment provider processing…', 'The status is visible while it moves.'],
  ['SUCCESS', '₦50,000 sent', 'Transaction completed.'],
];

export function TransactionFlow() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  useEffect(() => { if (reduceMotion) { setActive(transactionStates.length - 1); return; } const timer = window.setInterval(() => setActive((current) => (current + 1) % transactionStates.length), 1700); return () => window.clearInterval(timer); }, [reduceMotion]);
  return <section className="section transaction-section"><div className="container"><Reveal className="transaction-head"><div className="section-heading"><SectionLabel>Transaction record / 06</SectionLabel><h2>From message<br />to done.</h2></div><p>One simple request can still have a serious, observable path underneath it.</p></Reveal><div className="transaction-flow">{transactionStates.map(([label, title, body], index) => <article className={`transaction-card ${index === active ? 'active' : ''} ${index < active ? 'done' : ''}`} key={label}><span className="status-label">{label}</span><h3>{title}</h3><p>{body}</p>{index === 0 && <span className="transaction-amount">₦50,000 / JOHN</span>}{index === 4 && <span className="transaction-amount"><Check size={12} /> Complete</span>}</article>)}</div></div></section>;
}

const faqs = [
  ['What is this?', 'GramPay is an AI-powered financial assistant designed to help you manage supported payment and account tasks through a WhatsApp conversation.'],
  ['How does it work?', 'You send a message in natural language, GramPay interprets what you need, shows the relevant details, and guides you through the next action.'],
  ['Do I need another app?', 'No. The experience is designed to happen inside WhatsApp, so there is no separate interface to learn.'],
  ['How are transactions authorized?', 'Before a sensitive transaction completes, you review the details and provide explicit authorization, such as your PIN when prompted.'],
  ['What happens if a transaction fails?', 'You should receive a clear status so you know the transaction did not complete and what next step is available. Never repeat a payment unless the status is clear.'],
  ['How do I get started?', 'Use the Try it on WhatsApp button to start a conversation with GramPay.'],
  ['Is my money stored by the assistant?', 'No. The assistant is an interface for supported financial actions; it is not described here as a wallet or a place where your money is stored.'],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();
  return <section id="faq" className="section"><div className="container faq-layout"><Reveal><SectionLabel>Answers / 07</SectionLabel><div className="section-heading"><h2>Good questions deserve clear answers.</h2><p>We keep the language direct and the claims careful. Product-specific controls should be verified before launch.</p></div></Reveal><Reveal delay={.1}><div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button className="faq-question" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? null : index)}><span>{question}</span><ChevronDown size={18} /></button><AnimatePresence initial={false}>{open === index && <motion.div id={`faq-answer-${index}`} className="faq-answer" initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={reduceMotion ? undefined : { height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .25 }}><p>{answer}</p></motion.div>}</AnimatePresence></div>)}</div></Reveal></div></section>;
}

export function FinalCTA() {
  return <section className="final-cta"><div className="container"><div className="final-box"><SectionLabel>Start a conversation</SectionLabel><h2>Your next transfer starts with a message.</h2><a className="button-primary" href={waLink} target="_blank" rel="noreferrer">Open WhatsApp <Send size={15} /></a></div></div></section>;
}

export function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-row"><div className="footer-brand"><Logo /><p>Money movement, through a conversation.</p></div><div className="footer-links"><a href="#features">How it works</a><a href="#security">Security</a><a href="#faq">FAQ</a><a href="/mcp-landing.html">Developers</a><a href={waLink} target="_blank" rel="noreferrer">Contact</a></div></div><div className="footer-bottom"><span>© 2026 GramPay</span><span>Personal · WhatsApp</span></div></div></footer>;
}
