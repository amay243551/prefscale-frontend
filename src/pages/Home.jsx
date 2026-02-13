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
import { motion } from "framer-motion";

/* ================= PAGE ANIMATION ================= */
const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleStartTesting = () => {
    token ? navigate("/allblogs") : navigate("/signup");
  };

  const handleLearnPerformance = () => {
    navigate("/allblogs");
  };

  const handleGetStartedFree = () => {
    token ? navigate("/") : navigate("/signup");
  };

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="bg-white"
    >
      {/* ================= HERO ================= */}
      <section className="relative h-[90vh] overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500">
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          
          {/* LEFT CONTENT */}
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Engineered for Enterprise Performance and Reliability
            </h1>

            <p className="mt-6 text-lg text-green-100">
              Simulate real-world traffic, uncover performance risks, and ensure
              your applications deliver consistent, high-quality experiences —
              regardless of scale or complexity.
            </p>

            <p className="mt-6 text-xl font-semibold text-white">
              Prevent failures. Deliver excellence. Scale without limits.
            </p>

            <div className="mt-10 flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartTesting}
                className="bg-white text-green-700 px-6 py-3 rounded-md font-semibold"
              >
                Start Testing
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                onClick={handleLearnPerformance}
                className="flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-md font-medium"
              >
                Learn Performance <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>

          {/* RIGHT LOGO */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src="/assets/ivavsys.jpg"
              alt="IVAVSYS Logo"
              className="w-64 object-contain drop-shadow-xl"
            />
          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}
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

          <div className="mt-14 grid md:grid-cols-4 gap-8">
            <Feature icon={<Gauge />} title="Load Testing" desc="Expected traffic validation." />
            <Feature icon={<Zap />} title="Stress & Spike" desc="Peak and burst handling." />
            <Feature icon={<Activity />} title="Live Insights" desc="Latency & throughput." />
            <Feature icon={<ShieldCheck />} title="Production Confidence" desc="Scale safely." />
          </div>
        </div>
      </section>

      {/* ================= PERFORMANCE TOOLS ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            Performance Engineering Excellence
          </h2>

          <div className="mt-16 space-y-16">

            <ToolItem
              image="/assets/jmeter logo.png"
              title="Apache JMeter"
              desc="Open-source performance testing tool for scalable and reliable load testing."
              link="/tools/jmeter"
            />

            <ToolItem
              image="/assets/loadrunner logo.jfif"
              title="OpenText LoadRunner"
              desc="Enterprise-grade performance testing solution for large-scale systems."
              link="/tools/loadrunner"
            />

            <ToolItem
              image="/assets/neoload logo.png"
              title="NeoLoad"
              desc="Modern load testing tool for continuous performance validation."
              link="/tools/neoload"
            />

            <ToolItem
              image="/assets/locust logo.jfif"
              title="Locust"
              desc="Python-based scalable performance testing for real-world simulations."
              link="/tools/locust"
            />

            <ToolItem
              image="/assets/dynatrace.jpeg"
              title="Dynatrace"
              desc="AI-powered monitoring and observability platform."
              link="/tools/dynatrace"
            />

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-14 bg-gradient-to-r from-green-700 to-emerald-600 text-center text-white">
        <h2 className="text-3xl font-bold">
          Performance Is a Feature
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleGetStartedFree}
          className="mt-6 bg-white text-green-700 px-8 py-3 rounded-md font-semibold"
        >
          Get Started Free
        </motion.button>
      </section>
    </motion.div>
  );
}

/* ================= COMPONENTS ================= */

function Feature({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white p-6 rounded-xl shadow"
    >
      <div className="text-slate-700 mb-4">{icon}</div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </motion.div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <div className="flex justify-center text-slate-700 mb-3">{icon}</div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </motion.div>
  );
}

function ToolItem({ image, title, desc, link }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex flex-col md:flex-row items-center gap-10 bg-white p-8 rounded-xl shadow-lg"
    >
      <img
        src={image}
        alt={title}
        className="w-48 object-contain"
      />

      <div className="flex-1">
        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 text-slate-600">{desc}</p>

        <button
          onClick={() => navigate(link)}
          className="mt-5 bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
        >
          Learn More
        </button>
      </div>
    </motion.div>
  );
}
