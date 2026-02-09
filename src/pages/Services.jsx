import {
  Gauge,
  Zap,
  Activity,
  ShieldCheck,
  Bug,
  Server,
  Database,
  Cloud,
  FileText,
  BarChart3,
  Radar,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= PAGE TRANSITION ================= */
const pageTransition = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

/* ================= TRAFFIC WAVE ================= */
const wave = {
  animate: {
    x: ["-100%", "100%"],
    transition: {
      repeat: Infinity,
      duration: 6,
      ease: "linear",
    },
  },
};

export default function Services() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.6 }}
      className="overflow-hidden"
    >
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />

        {/* TRAFFIC WAVES */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            variants={wave}
            animate="animate"
            className="absolute top-1/3 w-full h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-40"
          />
          <motion.div
            variants={wave}
            animate="animate"
            className="absolute top-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30"
            style={{ animationDelay: "1s" }}
          />
          <motion.div
            variants={wave}
            animate="animate"
            className="absolute top-2/3 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-30"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold">
            Performance <span className="text-sky-400">Services</span>
          </h1>

          <p className="mt-8 text-slate-300 text-lg leading-relaxed">
            We test systems the way real users hit them —
            at scale, under pressure, and over time.
          </p>
        </div>
      </section>

      {/* ================= WHAT WE TEST ================= */}
      <section className="py-24 bg-gradient-to-b from-white to-slate-100 text-slate-900">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            What We Test Under Load
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <ServiceCard icon={<Gauge />} title="Load Testing" desc="Expected concurrent users, stable throughput, SLA validation." />
            <ServiceCard icon={<Zap />} title="Stress Testing" desc="Breaking points, saturation limits, graceful failures." />
            <ServiceCard icon={<Activity />} title="Spike Testing" desc="Sudden traffic surges, auto-scaling response." />
            <ServiceCard icon={<Database />} title="Database Performance" desc="Query latency, pool exhaustion, locking issues." />
            <ServiceCard icon={<Cloud />} title="Scalability Testing" desc="Cloud limits, elasticity, infra behavior." />
            <ServiceCard icon={<ShieldCheck />} title="Reliability Engineering" desc="Resilience, fault tolerance, availability." />
          </div>
        </div>
      </section>

      {/* ================= METHODOLOGY ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900">
            Our Testing Methodology
          </h2>

          <p className="mt-6 text-slate-600 text-center max-w-3xl mx-auto">
            We follow a structured, repeatable, and data-driven methodology
            to ensure test results are accurate, actionable, and production-relevant.
          </p>

          <div className="mt-16 grid md:grid-cols-4 gap-10">
            <MethodStep
              icon={<Radar />}
              title="Understand System"
              desc="Analyze architecture, traffic patterns, and business goals."
            />
            <MethodStep
              icon={<Server />}
              title="Design Scenarios"
              desc="Create realistic user journeys and concurrency models."
            />
            <MethodStep
              icon={<BarChart3 />}
              title="Execute Tests"
              desc="Run controlled load, stress, spike, and endurance tests."
            />
            <MethodStep
              icon={<Bug />}
              title="Analyze & Optimize"
              desc="Identify bottlenecks and provide improvement guidance."
            />
          </div>
        </div>
      </section>

      {/* ================= DELIVERABLES ================= */}
      <section className="py-24 bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center">
            What You Get (Deliverables)
          </h2>

          <p className="mt-6 text-slate-400 text-center max-w-3xl mx-auto">
            Every engagement ends with clear, actionable deliverables
            that engineering and leadership teams can rely on.
          </p>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            <Deliverable
              icon={<FileText />}
              title="Detailed Test Report"
              points={[
                "Test scope & assumptions",
                "Load profiles & scenarios",
                "Pass/fail criteria",
              ]}
            />
            <Deliverable
              icon={<BarChart3 />}
              title="Performance Metrics"
              points={[
                "Response times",
                "Throughput & concurrency",
                "Error rates & saturation points",
              ]}
            />
            <Deliverable
              icon={<CheckCircle />}
              title="Actionable Insights"
              points={[
                "Identified bottlenecks",
                "Capacity limits",
                "Optimization recommendations",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ================= FINAL MESSAGE ================= */}
      <section className="py-24 bg-black text-white text-center">
        <h2 className="text-4xl font-bold">
          Test Early. Scale Confidently.
        </h2>

        <p className="mt-8 text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Performance issues are easiest to fix before production.
          PREFSCALE helps teams uncover limits early and scale with confidence.
        </p>
      </section>
    </motion.div>
  );
}

/* ================= COMPONENTS ================= */

function ServiceCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-sky-500 text-white"
    >
      <div className="absolute -top-6 left-6 text-sky-400">{icon}</div>
      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-slate-300 text-sm">{desc}</p>
    </motion.div>
  );
}

function MethodStep({ icon, title, desc }) {
  return (
    <div className="text-center">
      <div className="flex justify-center text-sky-600 mb-4">{icon}</div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function Deliverable({ icon, title, points }) {
  return (
    <div className="bg-slate-900 p-8 rounded-xl border border-slate-700">
      <div className="text-sky-400 mb-4">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-300">
        {points.map((p, i) => (
          <li key={i}>• {p}</li>
        ))}
      </ul>
    </div>
  );
}
