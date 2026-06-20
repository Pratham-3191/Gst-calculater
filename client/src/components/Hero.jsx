import { Calculator, ArrowRight, Sparkles, Shield, Zap, History } from 'lucide-react';

const Hero = () => {
  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-16">
      {/* ── Background Effects ── */}
      <div className="absolute inset-0 dot-pattern" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[140px] animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-fuchsia-600/[0.07] rounded-full blur-[160px]" />

      {/* Subtle grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span className="text-sm font-medium text-indigo-300">
            Free & Open Source GST Calculator
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 animate-slide-up">
          <span className="text-white">GST </span>
          <span className="gradient-text">Calculator</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-xl sm:text-2xl text-gray-300 font-light mb-4 animate-slide-up"
          style={{ animationDelay: '100ms' }}
        >
          Calculate GST, Reverse GST, CGST and SGST instantly.
        </p>

        {/* Description */}
        <p
          className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-12 animate-slide-up"
          style={{ animationDelay: '200ms' }}
        >
          A free GST calculator designed for businesses, freelancers, students
          and individuals.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-slide-up"
          style={{ animationDelay: '300ms' }}
        >
          <button
            onClick={scrollToCalculator}
            className="btn-primary flex items-center gap-2.5 text-lg px-8 py-4 shadow-2xl shadow-indigo-500/20"
            id="cta-start"
          >
            <Calculator className="w-5 h-5" />
            Start Calculating
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2 text-lg px-8 py-4"
            id="cta-digital-heroes"
          >
            Built for Digital Heroes
          </a>
        </div>

        {/* Feature Highlights */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-slide-up"
          style={{ animationDelay: '450ms' }}
        >
          {[
            {
              icon: Zap,
              title: 'Real-time',
              desc: 'Instant calculations',
              color: 'indigo',
            },
            {
              icon: Shield,
              title: 'Accurate',
              desc: 'CGST & SGST split',
              color: 'violet',
            },
            {
              icon: History,
              title: 'History',
              desc: 'Cloud saved',
              color: 'fuchsia',
            },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="glass-card-hover p-4 flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg bg-${color}-500/10 flex items-center justify-center flex-shrink-0`}
              >
                <Icon className={`w-5 h-5 text-${color}-400`} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
