'use client';

import {
  FeatureGrid,
  FinalCTA,
  Footer,
  FAQ,
  Hero,
  HowItWorks,
  MagicSection,
  Navbar,
  ProblemSection,
  SecuritySection,
  TransactionFlow,
  TrustBar,
  WhyWhatsApp,
} from '@/components/grampay';

export default function HomePage() {
  return <main className="gram-page mode-personal"><Navbar /><div className="mode-stage"><div className="mode-panel"><div className="personal-experience"><Hero /><TrustBar /><ProblemSection /><HowItWorks /><FeatureGrid /><MagicSection /><SecuritySection /><TransactionFlow /><WhyWhatsApp /><FAQ /><FinalCTA /><Footer /></div></div></div></main>;
}
