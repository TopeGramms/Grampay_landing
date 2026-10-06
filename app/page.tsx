'use client';

import {
  FeatureGrid,
  FinalCTA,
  Footer,
  FAQ,
  Hero,
  HowItWorks,
  Navbar,
  ProblemSection,
  SecuritySection,
  TransactionFlow,
  TrustBar,
} from '@/components/grampay';

export default function HomePage() {
  return <main className="gram-page mode-personal"><Navbar /><div className="mode-stage"><div className="mode-panel"><div className="personal-experience"><Hero /><TrustBar /><ProblemSection /><HowItWorks /><FeatureGrid /><SecuritySection /><TransactionFlow /><FAQ /><FinalCTA /><Footer /></div></div></div></main>;
}
