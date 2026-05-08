import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HPHeader from '../components/GenHeader';
import GenFooter from '../components/GenFooter';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlanFeature {
  label: string;
  free: boolean | string;
  premium: boolean | string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const COMPARISON_FEATURES: PlanFeature[] = [
  { label: 'Booking pages', free: true, premium: true },
  { label: 'Calendar sync', free: true, premium: true },
  { label: 'Basic notifications', free: true, premium: true },
  { label: 'Manual booking management', free: true, premium: true },
  { label: 'Bookings per month', free: 'Up to 30', premium: 'Unlimited' },
  { label: 'Email reminders', free: false, premium: true },
  { label: 'Advanced analytics dashboard', free: false, premium: true },
  { label: 'Booking insights & reports', free: false, premium: true },
  { label: 'Team scheduling', free: false, premium: true },
  { label: 'Custom branding', free: false, premium: true },
  { label: 'Advanced availability rules', free: false, premium: true },
  { label: 'Automated workflows', free: false, premium: true },
  { label: 'Exportable reports', free: false, premium: true },
  { label: 'Priority support', free: false, premium: true },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Can I cancel anytime?',
    answer:
      'Yes. There are no lock-in contracts. You can cancel your Premium subscription at any time from your dashboard settings. Your access remains active until the end of the billing period.',
  },
  {
    question: 'Is there a free trial for Premium?',
    answer:
      'The Free plan is available indefinitely — no time limit. If you want to try Premium features, reach out to our team and we can arrange a 14-day trial with full access.',
  },
  {
    question: 'Do I need a credit card to start?',
    answer:
      'No. You can sign up and use the Free plan without providing any payment details. A card is only required when you choose to upgrade to Premium.',
  },
  {
    question: 'Can I upgrade from Free to Premium later?',
    answer:
      'Absolutely. You can upgrade at any time from your account settings. Your existing data, bookings, and configurations will be preserved when you switch plans.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQAccordionItem = ({ item, isOpen, onToggle }: FAQItemProps) => (
  <div className="border-b border-white/8 last:border-0">
    <button
      id={`faq-${item.question.slice(0, 20).replace(/\s+/g, '-').toLowerCase()}`}
      className="w-full flex items-center justify-between py-5 text-left group"
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="text-white font-medium text-base group-hover:text-gradient transition-colors pr-6">
        {item.question}
      </span>
      <span
        className={`material-symbols-outlined text-gray-500 flex-shrink-0 transition-transform duration-200 ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        add
      </span>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-48 pb-5' : 'max-h-0'
      }`}
    >
      <p className="text-gray-400 text-sm leading-relaxed">{item.answer}</p>
    </div>
  </div>
);

const CheckIcon = () => (
  <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">
    check_circle
  </span>
);

const CrossIcon = () => (
  <span className="material-symbols-outlined text-white/20 text-lg" aria-hidden="true">
    remove
  </span>
);

const FeatureValue = ({ value }: { value: boolean | string }) => {
  if (value === true) return <CheckIcon />;
  if (value === false) return <CrossIcon />;
  return <span className="text-sm font-medium text-gray-300">{value}</span>;
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const PricingPage = () => {
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <HPHeader />
      <main className="relative z-10 grow">
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section
          className="relative pt-24 pb-20 overflow-hidden"
          aria-labelledby="pricing-heading"
        >
          {/* Background glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 flex flex-col items-center text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-8">
              <span className="material-symbols-outlined text-primary text-sm">sell</span>
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                Pricing
              </span>
            </div>

            <h1
              id="pricing-heading"
              className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 max-w-3xl leading-[1.1]"
            >
              Simple Pricing for{' '}
              <span className="text-gradient">Growing Teams</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-6 max-w-xl leading-relaxed">
              Start free. Upgrade when you need advanced scheduling intelligence.
              No surprises, no hidden fees.
            </p>
          </div>
        </section>

        {/* ── Plan Cards ──────────────────────────────────────────────── */}
        <section
          className="pb-20 relative"
          aria-labelledby="plan-cards-heading"
        >
          <h2 id="plan-cards-heading" className="sr-only">
            Pricing Plans
          </h2>
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

              {/* ── Free Plan ── */}
              <article
                id="free-plan-card"
                className="glass-card rounded-2xl p-8 flex flex-col border border-white/8 relative overflow-hidden"
                aria-label="Free plan"
              >
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">Free</h3>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-5xl font-black text-white">₹0</span>
                    <span className="text-gray-500 mb-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Perfect for individuals and small teams just getting started with smarter
                    scheduling.
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1" aria-label="Free plan features">
                  {[
                    'Basic booking pages',
                    'Manual booking management',
                    'Calendar sync',
                    'Up to 30 bookings/month',
                    'Basic notifications',
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-3">
                      <CheckIcon />
                      <span className="text-sm text-gray-300">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  id="free-plan-cta"
                  className="w-full h-12 rounded-xl bg-[#1f1f1f] border border-white/10 text-white font-bold text-sm hover:border-white/20 hover:bg-white/5 transition-all active:scale-95"
                  onClick={() => navigate('/register')}
                >
                  Start Free
                </button>
                <p className="text-xs text-center text-gray-600 mt-3">No credit card required</p>
              </article>

              {/* ── Premium Plan ── */}
              <article
                id="premium-plan-card"
                className="rounded-2xl p-8 flex flex-col relative overflow-hidden border border-primary/40"
                style={{ background: '#13101d' }}
                aria-label="Premium plan — Most Popular"
              >
                {/* Glow inside card */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-primary/8 blur-[60px] pointer-events-none" />

                {/* Badge */}
                <div className="absolute top-5 right-5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-[11px] font-bold uppercase tracking-widest">
                    <span className="material-symbols-outlined text-xs">star</span>
                    Most Popular
                  </span>
                </div>

                <div className="mb-8 relative z-10">
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">Premium</h3>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-5xl font-black text-white">₹499</span>
                    <span className="text-gray-500 mb-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Built for professionals and growing businesses who need advanced scheduling
                    intelligence.
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1 relative z-10" aria-label="Premium plan features">
                  {[
                    'Advanced analytics dashboard',
                    'Email reminders',
                    'Booking insights',
                    'Team scheduling',
                    'Custom branding',
                    'Priority support',
                    'Advanced availability rules',
                    'Automated workflows',
                    'Exportable reports',
                  ].map((feat) => (
                    <li key={feat} className="flex items-center gap-3">
                      <CheckIcon />
                      <span className="text-sm text-gray-300">{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  id="premium-plan-cta"
                  className="btn-gradient w-full h-12 rounded-xl text-white font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90 transition-all active:scale-95 relative z-10"
                  onClick={() => navigate('/register')}
                >
                  Upgrade to Premium
                </button>
                <p className="text-xs text-center text-gray-600 mt-3 relative z-10">
                  Cancel anytime · No lock-in
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── Feature Comparison Table ─────────────────────────────────── */}
        <section
          className="py-20 bg-[#0a0a0a] relative"
          aria-labelledby="comparison-heading"
        >
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-12">
              <h2
                id="comparison-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Compare plans
              </h2>
              <p className="text-gray-400 text-lg">
                Everything you need to make the right decision.
              </p>
            </div>

            <div className="max-w-3xl mx-auto glass-card rounded-2xl overflow-hidden border border-white/8">
              {/* Table header */}
              <div className="grid grid-cols-3 bg-[#1a1a1a] border-b border-white/8 px-6 py-4">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Feature
                </div>
                <div className="text-sm font-bold text-white text-center">Free</div>
                <div className="text-sm font-bold text-primary text-center">Premium</div>
              </div>

              {/* Table rows */}
              {COMPARISON_FEATURES.map((feat, i) => (
                <div
                  key={feat.label}
                  className={`grid grid-cols-3 px-6 py-4 items-center ${
                    i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'
                  } border-b border-white/5 last:border-0`}
                >
                  <span className="text-sm text-gray-300">{feat.label}</span>
                  <div className="flex justify-center">
                    <FeatureValue value={feat.free} />
                  </div>
                  <div className="flex justify-center">
                    <FeatureValue value={feat.premium} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="py-20 relative" aria-labelledby="faq-heading">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-16">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2
                  id="faq-heading"
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  Frequently asked questions
                </h2>
                <p className="text-gray-400 text-lg">
                  Got more questions?{' '}
                  <button
                    className="text-primary underline underline-offset-2 hover:no-underline transition-all"
                    onClick={() => navigate('/contact')}
                  >
                    Contact us
                  </button>
                </p>
              </div>

              <div className="glass-card rounded-2xl px-8 divide-y divide-white/8">
                {FAQ_ITEMS.map((item, index) => (
                  <FAQAccordionItem
                    key={item.question}
                    item={item}
                    isOpen={openFAQ === index}
                    onToggle={() => toggleFAQ(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────── */}
        <section className="py-24 relative" aria-labelledby="pricing-cta-heading">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                Get started today
              </span>
            </div>

            <h2
              id="pricing-cta-heading"
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Start managing bookings smarter
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join 10,000+ professionals. No complex setup, no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                id="pricing-cta-start-free"
                className="btn-gradient px-10 py-4 rounded-xl text-lg font-bold text-white shadow-xl shadow-primary/30 hover:opacity-90 transition-all active:scale-95"
                onClick={() => navigate('/register')}
              >
                Start Free
              </button>
              <button
                id="pricing-cta-contact-sales"
                className="px-10 py-4 rounded-xl border border-white/10 bg-[#171717] text-white font-medium hover:border-white/20 transition-colors flex items-center justify-center gap-2"
                onClick={() => navigate('/contact')}
              >
                <span className="material-symbols-outlined text-[18px] text-gray-400">
                  mail
                </span>
                Contact Sales
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Free forever for individuals. Upgrade when you're ready.
            </p>
          </div>
        </section>
      </main>
      <GenFooter />
    </>
  );
};

export default PricingPage;
