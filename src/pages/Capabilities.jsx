import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Gauge,
  Flame,
  Clock,
  Zap,
  Rocket,
  Monitor,
  Smartphone,
  Database,
  Cloud,
  BarChart,
  Activity,
} from "lucide-react";

/* ================= PAGE TRANSITION ================= */
const pageTransition = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function Capabilities() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.6 }}
      className="bg-white"
    >
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[60vh] flex items-center bg-gradient-to-r from-slate-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-left">
            Capabilities
          </h1>
        </div>
      </section>

      {/* ================= TITLE SECTION ================= */}
      <section className="py-20 text-center bg-slate-50">
        <h2 className="text-4xl font-semibold text-slate-900">
          WE OFFER WHAT YOU ARE LOOKING FOR
        </h2>

        <p className="mt-6 max-w-4xl mx-auto text-slate-600 leading-relaxed">
          We deliver end-to-end performance assurance — from early development validation to live production monitoring — ensuring scalable, reliable, and high-performing digital platforms.
        </p>
      </section>

      {/* ================= CAPABILITIES GRID ================= */}
      <section className="pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-12">

          <CapabilityCard icon={<Gauge size={48} />} title="Load Testing" link="/capabilities/load-testing" />
          <CapabilityCard icon={<Flame size={48} />} title="Stress Testing" link="/capabilities/stress-testing" />
          <CapabilityCard icon={<Clock size={48} />} title="Endurance Testing" link="/capabilities/endurance-testing" />
          <CapabilityCard icon={<Zap size={48} />} title="Spike Testing" link="/capabilities/spike-testing" />
          <CapabilityCard icon={<Rocket size={48} />} title="Early Performance Testing" link="/capabilities/early-performance" />
          <CapabilityCard icon={<Monitor size={48} />} title="UI Performance Testing" link="/capabilities/ui-performance" />
          <CapabilityCard icon={<Smartphone size={48} />} title="Mobile Performance Testing" link="/capabilities/mobile-performance" />
          <CapabilityCard icon={<Activity size={48} />} title="Dynatrace Observability" link="/capabilities/dynatrace" />
          <CapabilityCard icon={<Database size={48} />} title="API Performance Testing" link="/capabilities/api-performance" />
          <CapabilityCard icon={<Cloud size={48} />} title="Cloud Performance Testing" link="/capabilities/cloud-performance" />
          <CapabilityCard icon={<BarChart size={48} />} title="Scalability Testing" link="/capabilities/scalability-testing" />

        </div>
      </section>
    </motion.div>
  );
}

/* ================= CAPABILITY CARD ================= */

function CapabilityCard({ icon, title, link }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white p-10 rounded-xl shadow-md border border-slate-200 hover:shadow-xl transition"
    >
      <div className="text-blue-700 mb-6">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <button
        onClick={() => navigate(link)}
        className="mt-6 text-blue-700 font-medium hover:underline"
      >
        Learn More
      </button>
    </motion.div>
  );
}
