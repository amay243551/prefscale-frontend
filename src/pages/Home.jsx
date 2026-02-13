import {
  ArrowRight,
  Landmark,
  ShoppingCart,
  CreditCard,
  HeartPulse,
  RadioTower,
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
      <section className="h-[90vh] bg-gradient-to-r from-green-700 to-emerald-600 flex items-center">
        <div className="max-w-7xl mx-auto px-8 w-full flex justify-between items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Engineered for Enterprise Performance and Reliability
            </h1>

            <p className="mt-6 text-lg text-green-100">
              Simulate real-world traffic, uncover performance risks, and ensure your applications deliver
              consistent, high-quality experiences — regardless of scale or complexity.
            </p>

            <p className="mt-6 text-xl font-semibold">
              Prevent failures. Deliver excellence. Scale without limits.
            </p>

            <div className="mt-10 flex gap-4">
              <button
                onClick={handleStartTesting}
                className="bg-white text-green-700 px-6 py-3 rounded-md font-semibold"
              >
                Start Testing
              </button>

              <button
                onClick={handleLearnPerformance}
                className="flex items-center gap-2 border border-white text-white px-6 py-3 rounded-md"
              >
                Learn Performance <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Logo */}
          <div className="hidden md:block">
            <a
              href="https://in.linkedin.com/company/ivavsys"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/ivavsys.jpg"
                alt="IVAVSYS Logo"
                className="w-64 object-contain drop-shadow-xl"
              />
            </a>
          </div>
        </div>
      </section>

      {/* ================= PERFORMANCE TOOLS ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900">
            Performance Engineering Excellence
          </h2>

          {/* ADDED TEXT */}
          <p className="text-center mt-6 text-slate-600 max-w-3xl mx-auto">
            Powered by industry-leading tools and engineering expertise, we deliver data-driven performance
            optimization that ensures reliability and business continuity.
          </p>

          <div className="mt-16 space-y-24">
            <PlainTool image="/assets/jmeter logo.png" title="Apache JMeter" link="/tools/jmeter" />
            <PlainTool image="/assets/loadrunner logo.jfif" title="OpenText LoadRunner" link="/tools/loadrunner" />
            <PlainTool image="/assets/neoload logo.png" title="NeoLoad" link="/tools/neoload" />
            <PlainTool image="/assets/locust logo.jfif" title="Locust" link="/tools/locust" />
            <PlainTool image="/assets/dynatrace.jpeg" title="Dynatrace" link="/tools/dynatrace" />
          </div>
        </div>
      </section>

      {/* ================= INDUSTRY EXPERIENCE ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">

          {/* ADDED TEXT ABOVE WHY PREFSCALE */}
          <p className="text-center text-lg text-slate-600 mb-6">
            Helping organizations achieve performance excellence through scalable and reliable testing solutions.
          </p>

          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">
            Why Teams Trust PREFSCALE
          </h2>

          {/* UPDATED GRID LAYOUT */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">

            <IndustryCard
              icon={<Landmark size={56} />}
              title="Banking Application Performance Testing"
              desc="Conducted load and stress testing using LoadRunner and Dynatrace to identify bottlenecks and optimize database and caching performance, ensuring scalable and reliable system operations."
            />

            <IndustryCard
              icon={<ShoppingCart size={56} />}
              title="E-Commerce Platform"
              desc="Executed large-scale performance simulations with 50K+ concurrent users to assess system readiness. Enabled performance optimization through targeted infrastructure scaling and CDN performance improvements."
            />

            <IndustryCard
              icon={<CreditCard size={56} />}
              title="FinTech Platform"
              desc="Delivered continuous performance monitoring through Grafana and customized dashboards, ensuring real-time performance visibility and enhanced customer experience."
            />

            <IndustryCard
              icon={<HeartPulse size={56} />}
              title="Healthcare Portal"
              desc="Engineered a complete performance optimization strategy, including code profiling, capacity planning, and CI/CD performance gates to ensure consistent scalability and production readiness."
            />

            <IndustryCard
              icon={<RadioTower size={56} />}
              title="Telecom Application"
              desc="Engineered performance optimization for live class streaming through scalability testing and database tuning, ensuring consistent and reliable learning experiences at scale."
            />

          </div>
        </div>
      </section>
    </motion.div>
  );
}

/* ================= COMPONENTS ================= */

function PlainTool({ image, title, link }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/3 flex justify-center">
        <img src={image} alt={title} className="w-72 object-contain" />
      </div>

      <div className="md:w-2/3">
        <h3 className="text-3xl font-bold text-slate-900">{title}</h3>

        <button
          onClick={() => navigate(link)}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Learn more
        </button>
      </div>
    </div>
  );
}

function IndustryCard({ icon, title, desc }) {
  return (
    <div className="text-center px-6">
      <div className="flex justify-center text-green-700 mb-6">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 text-slate-600">
        {desc}
      </p>
    </div>
  );
}
