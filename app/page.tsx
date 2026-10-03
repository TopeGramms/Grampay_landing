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
  TrustBar,
  TransactionFlow,
  WhyWhatsApp,
} from '@/components/grampay';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <ProblemSection />
      <HowItWorks />
      <FeatureGrid />
      <MagicSection />
      <SecuritySection />
      <TransactionFlow />
      <WhyWhatsApp />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
