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
      <section className="h-[90vh] bg-gradient-to-r from-green-700 to-emerald-600 flex items-center">
        <div className="max-w-7xl mx-auto px-8 w-full flex justify-between items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
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

          <div className="hidden md:block">
            <a
              href="https://in.linkedin.com/company/ivavsys"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/ivavsys.jpg"
                alt="IVAVSYS Logo"
                className="w-52 object-contain"
              />
            </a>
          </div>
        </div>
      </section>

      {/* ================= INDUSTRY SECTION (NOW ABOVE TOOLS) ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">

          <p className="text-center text-lg text-slate-600 mb-6">
            Helping organizations achieve performance excellence through scalable and reliable testing solutions.
          </p>

          <h2 className="text-3xl font-bold text-center text-slate-900 mb-14">
            Why Teams Trust PREFSCALE
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

            <IndustryCard
              icon={<Landmark size={40} />}
              title="Banking Application Performance Testing"
              desc="Conducted load and stress testing using LoadRunner and Dynatrace to identify bottlenecks and optimize database and caching performance."
            />

            <IndustryCard
              icon={<ShoppingCart size={40} />}
              title="E-Commerce Platform"
              desc="Executed large-scale performance simulations with 50K+ concurrent users to assess system readiness."
            />

            <IndustryCard
              icon={<CreditCard size={40} />}
              title="FinTech Platform"
              desc="Delivered continuous performance monitoring through Grafana dashboards ensuring real-time performance visibility."
            />

            <IndustryCard
              icon={<HeartPulse size={40} />}
              title="Healthcare Portal"
              desc="Engineered performance optimization including code profiling and CI/CD performance gates."
            />

            <IndustryCard
              icon={<RadioTower size={40} />}
              title="Telecom Application"
              desc="Optimized scalability for live streaming through load testing and database tuning."
            />

          </div>
        </div>
      </section>

      {/* ================= PERFORMANCE ENGINEERING (NOW LAST BEFORE CTA) ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">

          <h2 className="text-3xl font-bold text-center text-slate-900">
            Performance Engineering Excellence
          </h2>

          <p className="text-center mt-6 text-slate-600 max-w-3xl mx-auto">
            Powered by industry-leading tools and engineering expertise, we deliver data-driven performance
            optimization that ensures reliability and business continuity.
          </p>

          <div className="mt-16 space-y-16">

            <PlainTool image="/assets/jmeter logo.png" title="Apache JMeter" link="/tools/jmeter" />
            <PlainTool image="/assets/loadrunner logo.jfif" title="OpenText LoadRunner" link="/tools/loadrunner" />
            <PlainTool image="/assets/neoload logo.png" title="NeoLoad" link="/tools/neoload" />
            <PlainTool image="/assets/locust logo.jfif" title="Locust" link="/tools/locust" />
            <PlainTool image="/assets/dynatrace.jpeg" title="Dynatrace" link="/tools/dynatrace" />

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA RESTORED ================= */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-emerald-600 text-center text-white">
        <h2 className="text-3xl font-bold">
          Performance Is a Feature
        </h2>

        <button
          onClick={handleGetStartedFree}
          className="mt-8 bg-white text-green-700 px-8 py-3 rounded-md font-semibold"
        >
          Get Started Free
        </button>
      </section>

    </motion.div>
  );
}

/* ================= COMPONENTS ================= */

function PlainTool({ image, title, link }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center gap-10">
      <div className="md:w-1/3 flex justify-center">
        <img src={image} alt={title} className="w-48 object-contain" />
      </div>

      <div className="md:w-2/3">
        <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>

        <button
          onClick={() => navigate(link)}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Learn more
        </button>
      </div>
    </div>
  );
}

function IndustryCard({ icon, title, desc }) {
  return (
    <div className="text-center px-4">
      <div className="flex justify-center text-green-700 mb-4">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-3 text-slate-600 text-sm">
        {desc}
      </p>
    </div>
  );
}
