import { useNavigate } from 'react-router-dom';
import HPHeader from '../components/GenHeader';
import GenFooter from '../components/GenFooter';

// ─── Types ───────────────────────────────────────────────────────────────────

interface UseCase {
  icon: string;
  title: string;
  description: string;
  painPoint: string;
  chips: string[];
  accentColor: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const USE_CASES: UseCase[] = [
  {
    icon: 'medical_services',
    title: 'Doctors & Clinics',
    description:
      'Patients book appointments online, skip long waiting room queues, and receive automated reminders before their visit — reducing no-shows by up to 40%.',
    painPoint: 'Eliminates phone-tag booking and double-booked patient slots.',
    chips: ['Appointment Scheduling', 'Patient Reminders', 'Calendar Management'],
    accentColor: 'rgba(59,130,246,0.15)',
  },
  {
    icon: 'meeting_room',
    title: 'Meeting Room Booking',
    description:
      'Teams reserve conference rooms without overlap or last-minute conflicts. A shared availability layer keeps everyone aligned and rooms productively utilized.',
    painPoint: 'Prevents "ghost bookings" and back-to-back collision errors.',
    chips: ['Conflict Prevention', 'Shared Availability', 'Team Scheduling'],
    accentColor: 'rgba(124,59,237,0.15)',
  },
  {
    icon: 'work',
    title: 'Freelancers & Consultants',
    description:
      'Manage client consultations, discovery calls, and follow-ups without endless email threads. Share a booking link and let clients self-serve.',
    painPoint: 'Removes scheduling back-and-forth from every engagement.',
    chips: ['Client Booking', 'Availability Sync', 'Meeting Links'],
    accentColor: 'rgba(16,185,129,0.15)',
  },
  {
    icon: 'self_improvement',
    title: 'Salons & Wellness',
    description:
      'Customers book grooming, spa, and wellness sessions directly on your page. Staff schedules are respected, and automated reminders reduce walk-ins.',
    painPoint: 'Stops overbooking across multiple staff members simultaneously.',
    chips: ['Time Slots', 'Staff Availability', 'Automated Reminders'],
    accentColor: 'rgba(236,72,153,0.15)',
  },
  {
    icon: 'school',
    title: 'Coaches & Mentors',
    description:
      'Handle recurring coaching sessions, group classes, and 1-on-1 mentoring appointments effortlessly. Clients see real availability — not a static form.',
    painPoint: 'Streamlines recurring bookings without manual re-confirmation.',
    chips: ['Recurring Sessions', 'Group Scheduling', 'Progress Sessions'],
    accentColor: 'rgba(245,158,11,0.15)',
  },
  {
    icon: 'domain',
    title: 'Educational Institutions',
    description:
      'Book labs, classrooms, office hours, and faculty consultations through a unified system. Resource allocation becomes transparent and conflict-free.',
    painPoint: 'Eliminates spreadsheet chaos for room and faculty scheduling.',
    chips: ['Classroom Scheduling', 'Slot Management', 'Resource Allocation'],
    accentColor: 'rgba(99,102,241,0.15)',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface UseCaseCardProps {
  uc: UseCase;
  index: number;
}

const UseCaseCard = ({ uc }: UseCaseCardProps) => (
  <article
    className="use-case-card glass-card rounded-2xl p-8 flex flex-col gap-5 border border-white/8 relative overflow-hidden transition-all duration-300 group"
    style={{ '--card-accent': uc.accentColor } as React.CSSProperties}
    aria-label={`Use case: ${uc.title}`}
  >
    {/* Accent glow on hover */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
      style={{ background: uc.accentColor }}
    />

    {/* Icon */}
    <div className="relative z-10 w-12 h-12 rounded-xl bg-[#1f1f1f] border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors duration-300">
      <span className="material-symbols-outlined text-2xl icon-gradient-text">{uc.icon}</span>
    </div>

    {/* Title */}
    <div className="relative z-10">
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-colors duration-200">
        {uc.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{uc.description}</p>
    </div>

    {/* Pain point */}
    <div className="relative z-10 flex items-start gap-3 bg-white/4 rounded-xl p-3 border border-white/6">
      <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">
        check_circle
      </span>
      <p className="text-xs text-gray-300 leading-relaxed">{uc.painPoint}</p>
    </div>

    {/* Feature chips */}
    <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-2">
      {uc.chips.map((chip) => (
        <span
          key={chip}
          className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-400"
        >
          {chip}
        </span>
      ))}
    </div>
  </article>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const UseCasesPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <HPHeader />
      <main className="relative z-10 grow">
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section
          className="relative pt-24 pb-28 overflow-hidden"
          aria-labelledby="use-cases-heading"
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 flex flex-col items-center text-center relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 mb-8">
              <span className="material-symbols-outlined text-secondary text-sm">category</span>
              <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                Use Cases
              </span>
            </div>

            <h1
              id="use-cases-heading"
              className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 max-w-4xl leading-[1.1]"
            >
              Built for Every{' '}
              <span className="text-gradient">Scheduling Workflow</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Whether you run a clinic, consult remotely, or manage a team — Calhi adapts to your
              workflow. One platform, every scheduling context, zero double-bookings.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                id="use-cases-start-free"
                className="btn-gradient h-12 px-8 rounded-xl text-white font-bold text-base shadow-lg shadow-primary/25 hover:opacity-90 transition-all active:scale-95"
                onClick={() => navigate('/register')}
              >
                Start Free
              </button>
              <button
                id="use-cases-see-features"
                className="h-12 px-8 rounded-xl bg-[#171717] border border-white/10 text-white font-medium transition-colors hover:border-white/20 flex items-center justify-center gap-2"
                onClick={() => navigate('/')}
              >
                <span className="material-symbols-outlined text-[18px] text-gray-400">
                  arrow_back
                </span>
                See Features
              </button>
            </div>

            {/* Stats strip */}
            <div className="mt-16 w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8">
              {[
                { value: '6+', label: 'Industry Use Cases' },
                { value: '40%', label: 'Fewer No-Shows' },
                { value: '10k+', label: 'Active Professionals' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#171717] px-8 py-6 text-center">
                  <div className="text-3xl font-black text-gradient mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Use Case Cards ───────────────────────────────────────────── */}
        <section
          className="py-20 bg-[#0a0a0a] relative"
          aria-labelledby="use-cases-grid-heading"
        >
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-16">
            <div className="text-center mb-16">
              <h2
                id="use-cases-grid-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Every industry, one intelligent scheduler
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                From healthcare to education, Calhi removes the friction of scheduling so your team
                can focus on what actually matters.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {USE_CASES.map((uc, i) => (
                <UseCaseCard key={uc.title} uc={uc} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ─────────────────────────────────────────────── */}
        <section className="py-24 relative overflow-hidden" aria-labelledby="how-it-works-heading">
          <div className="absolute inset-0 bg-[#111]/60 skew-y-2 transform origin-bottom-left -z-10" />
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
            <div className="text-center mb-16">
              <h2
                id="how-it-works-heading"
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                Get started in three steps
              </h2>
              <p className="text-gray-400 text-lg">
                No complex setup. No IT team required. Live in under five minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: '01',
                  icon: 'person_add',
                  title: 'Create your account',
                  desc: 'Sign up for free, set your availability rules, and get your personal booking link in seconds.',
                },
                {
                  step: '02',
                  icon: 'share',
                  title: 'Share your link',
                  desc: 'Send your unique Calhi link to clients, patients, or teammates. They see only available slots.',
                },
                {
                  step: '03',
                  icon: 'notifications_active',
                  title: 'Get booked automatically',
                  desc: 'Bookings land in your dashboard. Reminders go out automatically. You just show up.',
                },
              ].map((step) => (
                <div key={step.step} className="glass-card rounded-2xl p-8 text-center group relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-5xl font-black text-white/4 select-none">
                    {step.step}
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/25 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/25 transition-colors duration-300">
                    <span className="material-symbols-outlined text-3xl text-primary">{step.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────── */}
        <section className="py-24 relative" aria-labelledby="use-cases-cta-heading">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
            <h2 id="use-cases-cta-heading" className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to streamline your scheduling?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join thousands of professionals who've replaced scheduling chaos with Calhi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                id="use-cases-cta-start-free"
                className="btn-gradient px-10 py-4 rounded-xl text-lg font-bold text-white shadow-xl shadow-primary/30 hover:opacity-90 transition-all active:scale-95"
                onClick={() => navigate('/register')}
              >
                Start Free — No Card Needed
              </button>
              <button
                id="use-cases-cta-pricing"
                className="px-10 py-4 rounded-xl border border-white/10 bg-[#171717] text-white font-medium hover:border-white/20 transition-colors"
                onClick={() => navigate('/pricing')}
              >
                View Pricing
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Free forever for individuals. Upgrade anytime.
            </p>
          </div>
        </section>
      </main>

      <style>{`
        .use-case-card {
          transform: translateY(0);
        }
        .use-case-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.14);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
      `}</style>

      <GenFooter />
    </>
  );
};

export default UseCasesPage;
