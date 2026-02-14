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
  BarChart3,
  Cloud,
  Link,
  TrendingUp,
} from "lucide-react";

const pageTransition = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function Capabilities() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.6 }}
      className="bg-white"
    >
      {/* ================= HERO ================= */}
      <section className="py-28 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-bold text-left">
            Our Capabilities
          </h1>
        </div>
      </section>

      {/* ================= TITLE ================= */}
      <section className="py-20 text-center bg-blue-50">
        <h2 className="text-4xl font-semibold text-blue-900">
          WE OFFER WHAT YOU ARE LOOKING FOR
        </h2>

        <p className="mt-6 max-w-4xl mx-auto text-blue-700">
          We deliver end-to-end performance assurance — from development validation 
          to production monitoring — ensuring scalable and reliable digital platforms.
        </p>
      </section>

      {/* ================= GRID ================= */}
      <section className="pb-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-10">

          <CapabilityCard icon={<Gauge size={40} />} title="Load Testing" short="Validate expected user traffic performance." link="/capabilities/load-testing" />
          <CapabilityCard icon={<Flame size={40} />} title="Stress Testing" short="Test limits under extreme workloads." link="/capabilities/stress-testing" />
          <CapabilityCard icon={<Clock size={40} />} title="Endurance Testing" short="Validate long-duration stability." link="/capabilities/endurance-testing" />
          <CapabilityCard icon={<Zap size={40} />} title="Spike Testing" short="Handle sudden traffic surges." link="/capabilities/spike-testing" />
          <CapabilityCard icon={<Rocket size={40} />} title="Early Performance Testing" short="Shift performance left in SDLC." link="/capabilities/early-performance-testing" />
          <CapabilityCard icon={<Monitor size={40} />} title="UI Performance Testing" short="Ensure fast frontend responsiveness." link="/capabilities/ui-performance-testing" />
          <CapabilityCard icon={<Smartphone size={40} />} title="Mobile Performance Testing" short="Optimize mobile responsiveness." link="/capabilities/mobile-performance-testing" />
          <CapabilityCard icon={<BarChart3 size={40} />} title="Dynatrace Observability" short="AI-driven monitoring & visibility." link="/capabilities/dynatrace-observability" />
          <CapabilityCard icon={<Link size={40} />} title="API Performance Testing" short="Validate API speed & reliability." link="/capabilities/api-performance-testing" />
          <CapabilityCard icon={<Cloud size={40} />} title="Cloud Performance Testing" short="Ensure cloud scalability." link="/capabilities/cloud-performance-testing" />
          <CapabilityCard icon={<TrendingUp size={40} />} title="Scalability Testing" short="Test future growth readiness." link="/capabilities/scalability-testing" />

        </div>
      </section>
    </motion.div>
  );
}

function CapabilityCard({ icon, title, short, link }) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-white p-8 rounded-xl shadow-lg border border-blue-100"
    >
      <div className="text-blue-700 mb-6">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-blue-900">
        {title}
      </h3>

      <p className="mt-3 text-blue-700 text-sm">
        {short}
      </p>

      <button
        onClick={() => navigate(link)}
        className="mt-5 text-blue-800 font-medium hover:underline"
      >
        Learn More →
      </button>
    </motion.div>
  );
}
