import {
  ArrowRight,
  Gauge,
  Activity,
  ShieldCheck,
  Zap,
  BarChart3,
  Server,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================= CTA HANDLERS ================= */

  const handleStartTesting = () => {
    if (token) {
      navigate("/blog"); // logged in users
    } else {
      navigate("/signup"); // new users
    }
  };

  const handleLearnPerformance = () => {
    navigate("/blog");
  };

  const handleGetStartedFree = () => {
    if (token) {
      navigate("/"); // already logged in → stay home
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="bg-white">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[90vh] overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475"
          alt="Technology background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Performance Testing <br />
              <span className="text-slate-300">Built for Scale</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300">
              PREFSCALE helps engineering teams validate system performance
              under real-world load — before users experience failures.
            </p>

            <div className="mt-10 flex gap-4">
              <button
                onClick={handleStartTesting}
                className="bg-white text-slate-900 px-6 py-3 rounded-md font-semibold hover:bg-slate-100 transition"
              >
                Start Testing
              </button>

              <button
                onClick={handleLearnPerformance}
                className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition"
              >
                Learn Performance <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-4 gap-8 text-center">
          <Stat icon={<Users />} value="100+" label="Concurrent Users Tested" />
          <Stat icon={<Server />} value="99.9%" label="Uptime Validation" />
          <Stat icon={<BarChart3 />} value="Real-time" label="Performance Metrics" />
          <Stat icon={<ShieldCheck />} value="Secure" label="Enterprise Ready" />
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Why Teams Trust PREFSCALE
          </h2>

          <p className="mt-4 text-slate-600 text-center max-w-2xl mx-auto">
            Built by engineers, for engineers — focused on reliability,
            scalability, and measurable performance.
          </p>

          <div className="mt-14 grid md:grid-cols-4 gap-8">
            <Feature
              icon={<Gauge />}
              title="Load Testing"
              desc="Measure how your system behaves under expected traffic."
            />
            <Feature
              icon={<Zap />}
              title="Stress & Spike"
              desc="Validate stability during traffic spikes and peak loads."
            />
            <Feature
              icon={<Activity />}
              title="Live Insights"
              desc="Observe response times, failures, and throughput."
            />
            <Feature
              icon={<ShieldCheck />}
              title="Production Confidence"
              desc="Ship features knowing your system can handle growth."
            />
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            How PREFSCALE Works
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <Step
              number="01"
              title="Design Tests"
              desc="Define real-world traffic scenarios and user behavior."
            />
            <Step
              number="02"
              title="Execute Load"
              desc="Simulate concurrent users using proven testing tools."
            />
            <Step
              number="03"
              title="Analyze Results"
              desc="Identify bottlenecks and infrastructure limits."
            />
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-14 bg-gradient-to-r from-slate-800 to-slate-900 text-center text-white">
        <h2 className="text-3xl font-bold">
          Performance Is a Feature
        </h2>

        <p className="mt-4 text-slate-300 max-w-xl mx-auto">
          Don’t wait for production failures. Test, validate, and scale with confidence.
        </p>

        <button
          onClick={handleGetStartedFree}
          className="inline-block mt-6 bg-white text-slate-900 px-8 py-3 rounded-md font-semibold hover:bg-slate-100 transition"
        >
          Get Started Free
        </button>
      </section>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Feature({ icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <div className="text-slate-700 mb-4">{icon}</div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
  return (
    <div className="text-center">
      <div className="text-slate-800 text-5xl font-bold">{number}</div>
      <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600 text-sm">{desc}</p>
    </div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div>
      <div className="flex justify-center text-slate-700 mb-3">
        {icon}
      </div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}
