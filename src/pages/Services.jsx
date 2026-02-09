import {
  Gauge,
  Zap,
  Activity,
  ShieldCheck,
  Bug,
  Server,
  Database,
  Cloud,
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
    x: ["0%", "100%"],
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
      className="bg-black text-white overflow-hidden"
    >

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center">
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
            We simulate real traffic, push systems to their limits,
            and expose performance bottlenecks before production users do.
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            What We Test Under Load
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <ServiceCard
              icon={<Gauge />}
              title="Load Testing"
              desc="Validate behavior under expected concurrent users."
            />
            <ServiceCard
              icon={<Zap />}
              title="Stress Testing"
              desc="Identify breaking points beyond normal capacity."
            />
            <ServiceCard
              icon={<Activity />}
              title="Spike Testing"
              desc="Analyze sudden traffic surges and system reaction."
            />
            <ServiceCard
              icon={<Database />}
              title="Database Performance"
              desc="Expose query latency and connection pool limits."
            />
            <ServiceCard
              icon={<Cloud />}
              title="Scalability Testing"
              desc="Validate cloud scaling, auto-healing and limits."
            />
            <ServiceCard
              icon={<ShieldCheck />}
              title="Reliability Engineering"
              desc="Ensure graceful failure and system resilience."
            />
          </div>
        </div>
      </section>

      {/* ================= WHY IT MATTERS ================= */}
      <section className="py-24 bg-black text-center">
        <h2 className="text-4xl font-bold">
          Traffic Is Predictable. Failures Are Not.
        </h2>

        <p className="mt-8 text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Most outages are not caused by bugs — they are caused by
          untested concurrency, saturation, and scaling limits.
          <br /><br />
          PREFSCALE makes those limits visible before users experience them.
        </p>
      </section>
    </motion.div>
  );
}

/* ================= COMPONENT ================= */

function ServiceCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-sky-500"
    >
      <div className="absolute -top-6 left-6 text-sky-400">
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-slate-400 text-sm">{desc}</p>
    </motion.div>
  );
}
