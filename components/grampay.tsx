import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Landmark,
  Menu,
  MessageCircle,
  MoreHorizontal,
  MoveUpRight,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';
import Link from 'next/link';
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

type DemoSceneKey = 'transfer' | 'airtime' | 'data';

type DemoBubble = {
  key: string;
  kind: 'user' | 'assistant' | 'typing' | 'review' | 'processing' | 'success';
  at: number;
  text?: string;
  meta?: string;
  title?: string;
  amount?: string;
  label?: string;
  details?: Array<{ label: string; value: string }>; 
  reference?: string;
  phone?: string;
};

const demoSceneOrder: DemoSceneKey[] = ['transfer', 'airtime', 'data'];

const demoScenes: Record<DemoSceneKey, DemoBubble[]> = {
  transfer: [
    { key: 'transfer-user-1', kind: 'user', at: 0, text: 'Send ₦25,000 to David for me.', meta: '10:41' },
    { key: 'transfer-typing', kind: 'typing', at: 1 },
    { key: 'transfer-assistant-1', kind: 'assistant', at: 2, text: 'Sure. Let me confirm the recipient before we continue.', meta: '10:41' },
    { key: 'transfer-review', kind: 'review', at: 3, title: 'PAYMENT REVIEW', amount: '₦25,000.00', details: [
      { label: 'Recipient', value: 'David Okafor' },
      { label: 'Bank', value: 'GTBank' },
      { label: 'Fee', value: '₦150.00 illustrative' },
    ] },
    { key: 'transfer-assistant-2', kind: 'assistant', at: 5, text: 'Please review and authorize the payment.', meta: '10:42' },
    { key: 'transfer-user-2', kind: 'user', at: 6, text: 'Confirm transfer.', meta: '10:42' },
    { key: 'transfer-processing', kind: 'processing', at: 7 },
    { key: 'transfer-success', kind: 'success', at: 8, title: 'Transfer successful', amount: '₦25,000.00', reference: 'TXN 4R9M-1028', label: 'David Okafor', meta: '10:42' },
  ],
  airtime: [
    { key: 'airtime-user-1', kind: 'user', at: 0, text: 'Buy ₦2,000 airtime for me.', meta: '10:41' },
    { key: 'airtime-typing', kind: 'typing', at: 1 },
    { key: 'airtime-assistant-1', kind: 'assistant', at: 2, text: 'Sure! Which network should I use?', meta: '10:41' },
    { key: 'airtime-user-2', kind: 'user', at: 3, text: 'MTN.', meta: '10:41' },
    { key: 'airtime-review', kind: 'review', at: 4, title: 'AIRTIME PURCHASE', amount: '₦2,000.00', details: [
      { label: 'Network', value: 'MTN' },
      { label: 'Phone', value: '0803 XXX XXXX' },
      { label: 'Payment', value: 'GramPay balance' },
    ] },
    { key: 'airtime-assistant-2', kind: 'assistant', at: 5, text: 'Please confirm your airtime purchase.', meta: '10:42' },
    { key: 'airtime-user-3', kind: 'user', at: 6, text: 'Confirm.', meta: '10:42' },
    { key: 'airtime-processing', kind: 'processing', at: 7 },
    { key: 'airtime-success', kind: 'success', at: 8, title: 'Airtime purchase successful', amount: '₦2,000.00', reference: 'TXN MTN-2104', label: '0803 XXX XXXX', meta: '10:42' },
  ],
  data: [
    { key: 'data-user-1', kind: 'user', at: 0, text: 'Buy 5GB data for me.', meta: '10:41' },
    { key: 'data-typing', kind: 'typing', at: 1 },
    { key: 'data-assistant-1', kind: 'assistant', at: 2, text: 'Which network should I use?', meta: '10:41' },
    { key: 'data-user-2', kind: 'user', at: 3, text: 'Airtel.', meta: '10:41' },
    { key: 'data-review', kind: 'review', at: 4, title: 'DATA BUNDLE', amount: '₦1,500.00', details: [
      { label: 'Network', value: 'Airtel' },
      { label: 'Bundle', value: '5GB · 30 days' },
      { label: 'Phone', value: '0802 XXX XXXX' },
    ] },
    { key: 'data-assistant-2', kind: 'assistant', at: 5, text: 'Here is your data bundle. Please review before confirming.', meta: '10:42' },
    { key: 'data-user-3', kind: 'user', at: 6, text: 'Confirm.', meta: '10:42' },
    { key: 'data-processing', kind: 'processing', at: 7 },
    { key: 'data-success', kind: 'success', at: 8, title: 'Data purchase successful', amount: '5GB data', reference: 'TXN AIR-4428', label: '0802 XXX XXXX', meta: '10:42' },
  ],
};

function DemoReviewCard({ bubble }: { bubble: DemoBubble }) {
  const details = bubble.details ?? [];

  return (
    <motion.div
      key={bubble.key}
      className="demo-review-card"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="demo-review-label">{bubble.title}</p>
      {bubble.amount && <div className="demo-review-amount">{bubble.amount}</div>}
      <div className="demo-review-list">
        {details.map((detail) => (
          <div className="demo-review-row" key={`${bubble.key}-${detail.label}`}>
            <span>{detail.label}</span>
            <strong>{detail.value}</strong>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function WhatsAppDemo({ compact = false }: { compact?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [scene, setScene] = useState<DemoSceneKey>('transfer');
  const [step, setStep] = useState(0);

  const sceneData = demoScenes[scene];
  const totalSteps = sceneData.length - 1;

  useEffect(() => {
    if (reduceMotion) {
      setStep(totalSteps);
      return;
    }

    const timer = window.setTimeout(() => {
      if (step >= totalSteps) {
        const currentIndex = demoSceneOrder.indexOf(scene);
        const nextScene = demoSceneOrder[(currentIndex + 1) % demoSceneOrder.length];
        setScene(nextScene);
        setStep(0);
        return;
      }

      setStep((current) => current + 1);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [reduceMotion, scene, step, totalSteps]);

  const switchScene = (nextScene: DemoSceneKey) => {
    setScene(nextScene);
    setStep(0);
  };

  const visibleItems = sceneData.filter((item) => item.at <= step);

  return (
    <div className={`chat-frame ${compact ? 'chat-frame-compact' : ''}`}>
      <div className="demo-selector" aria-label="WhatsApp demo scenarios">
        {demoSceneOrder.map((key) => (
          <button
            key={key}
            type="button"
            className={scene === key ? 'active' : ''}
            onClick={() => switchScene(key)}
            aria-pressed={scene === key}
          >
            {key === 'transfer' ? 'Transfers' : key === 'airtime' ? 'Airtime' : 'Data'}
          </button>
        ))}
      </div>

      <div className="iphone-shell" aria-live="polite">
        <div className="iphone-frame-shadow" aria-hidden="true" />
        <div className="dynamic-island" aria-hidden="true">
          <span className="dynamic-pill" />
        </div>
        <div className="side-button side-button-top" aria-hidden="true" />
        <div className="side-button side-button-mid" aria-hidden="true" />
        <div className="side-button side-button-bottom" aria-hidden="true" />

        <div className="chat-shell">
          <div className="status-bar" aria-hidden="true">
            <span className="time">9:41</span>
            <span className="device-status">
              <span className="signal-bars"><i /><i /><i /><i /></span>
              <span className="wifi-indicator" />
              <span className="battery"><span /></span>
            </span>
          </div>

          <div className="chat-window">
            <div className="chat-topbar">
              <div className="chat-person">
                <div className="avatar">G</div>
                <div>
                  <div className="chat-name">GramPay</div>
                  <div className="chat-state">online</div>
                </div>
              </div>
              <div className="topbar-actions" aria-hidden="true">
                <span className="icon-call" />
                <span className="icon-video" />
                <MoreHorizontal size={17} />
              </div>
            </div>

            <div className="chat-body">
              <div className="chat-date">TODAY</div>
              <AnimatePresence initial={false} mode="popLayout">
                {visibleItems.map((bubble) => {
                  if (bubble.kind === 'user') {
                    return (
                      <motion.div
                        key={bubble.key}
                        className="bubble user"
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {bubble.text}
                        <span className="bubble-meta">{bubble.meta}</span>
                      </motion.div>
                    );
                  }

                  if (bubble.kind === 'assistant') {
                    return (
                      <motion.div
                        key={bubble.key}
                        className="bubble assistant"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {bubble.text}
                        <span className="bubble-meta">{bubble.meta}</span>
                      </motion.div>
                    );
                  }

                  if (bubble.kind === 'typing') {
                    return (
                      <motion.div
                        key={bubble.key}
                        className="bubble typing"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.28 }}
                      >
                        <span />
                        <span />
                        <span />
                      </motion.div>
                    );
                  }

                  if (bubble.kind === 'review') {
                    return <DemoReviewCard key={bubble.key} bubble={bubble} />;
                  }

                  if (bubble.kind === 'processing') {
                    return (
                      <motion.div
                        key={bubble.key}
                        className="demo-processing"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="processing-spinner" aria-hidden="true" />
                        <span>Processing</span>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={bubble.key}
                      className="bubble assistant success-bubble"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="success-check"><Check size={12} /></span>
                      <div className="success-copy">
                        <strong>{bubble.title}</strong>
                        <span>{bubble.amount}</span>
                        <em>{bubble.label}</em>
                        <small>{bubble.reference}</small>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="chat-composer" aria-label="Message composer">
              <span className="composer-attachment" aria-hidden="true">+</span>
              <span className="composer-input">Type a message</span>
              <span className="composer-mic" aria-hidden="true" />
            </div>
          </div>
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
        <nav className="navbar" aria-label="Primary navigation"><Link href="#top" onClick={close}><Logo /></Link><div className="mode-switch" role="group" aria-label="Choose GramPay experience"><Link className="active" href="/" aria-current="page">Personal</Link><Link href="/developers">Developers</Link></div><div className="nav-links"><a className="nav-link" href="#how-it-works">How it works</a><a className="nav-link" href="#features">Features</a><a className="nav-link" href="#security">Security</a><a className="nav-link" href="#faq">FAQ</a></div><a className="nav-cta" href={waLink} target="_blank" rel="noreferrer">Try on WhatsApp <ArrowRight size={14} /></a><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button></nav>
        <AnimatePresence>{open && <motion.div className="mobile-drawer" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><div className="mobile-mode-switch" role="group" aria-label="Choose GramPay experience"><Link className="active" href="/" aria-current="page" onClick={close}>Personal</Link><Link href="/developers" onClick={close}>Developers</Link></div><a href="#how-it-works" onClick={close}>How it works</a><a href="#features" onClick={close}>Features</a><a href="#security" onClick={close}>Security</a><a href="#faq" onClick={close}>FAQ</a><a className="mobile-cta" href={waLink} target="_blank" rel="noreferrer">Try on WhatsApp <ArrowRight size={13} /></a></motion.div>}</AnimatePresence>
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
  return <footer className="footer"><div className="container"><div className="footer-row"><div className="footer-brand"><Logo /><p>Money movement, through a conversation.</p></div><div className="footer-links"><a href="#features">How it works</a><a href="#security">Security</a><a href="#faq">FAQ</a><a href="/developers">Developers</a><a href={waLink} target="_blank" rel="noreferrer">Contact</a></div></div><div className="footer-bottom"><span>© 2026 GramPay</span><span>Personal · WhatsApp</span></div></div></footer>;
}
