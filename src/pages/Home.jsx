import {
  ArrowRight,
  Users,
  Server,
  BarChart3,
  ShieldCheck,
  Landmark,
  ShoppingCart,
  CreditCard,
  HeartPulse,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

      {/* HERO - CHANGED TO BLUE */}
      <section className="h-[90vh] bg-gradient-to-r from-blue-900 to-blue-700 flex items-center">
        <div className="max-w-7xl mx-auto px-8 w-full flex justify-between items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Engineered for Enterprise Performance and Reliability
            </h1>

            <p className="mt-6 text-lg text-blue-100">
              Simulate real-world traffic, uncover performance risks, and ensure your applications deliver
              consistent, high-quality experiences — regardless of scale or complexity.
            </p>

            <p className="mt-6 text-xl font-semibold">
              Prevent failures. Deliver excellence. Scale without limits.
            </p>

            <div className="mt-10 flex gap-4">
              <button
                onClick={handleStartTesting}
                className="bg-white text-blue-800 px-6 py-3 rounded-md font-semibold"
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

          {/* LOGO REPLACED */}
          <div className="hidden md:block">
            <img
              src="/assets/PTPE_Logo2.JPG"
              alt="PTPE Logo"
              className="w-52 object-contain"
            />
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-4 gap-8 text-center">
          <Metric icon={<Users size={32} />} value="100+" label="Concurrent Users Tested" />
          <Metric icon={<Server size={32} />} value="99.9%" label="Uptime Validation" />
          <Metric icon={<BarChart3 size={32} />} value="Real-time" label="Performance Metrics" />
          <Metric icon={<ShieldCheck size={32} />} value="Enterprise" label="Security & Reliability" />
        </div>
      </section>

      {/* INDUSTRY */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-lg text-slate-600 mb-6">
            Helping organizations achieve performance excellence through scalable and reliable testing solutions.
          </p>

          <h2 className="text-3xl font-bold text-center text-slate-900 mb-14">
            Why Teams Trust PREFSCALE
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">

            <IndustryCard icon={<Landmark size={40} />} title="Banking Application" desc="Load & stress testing using LoadRunner and Dynatrace." />
            <IndustryCard icon={<ShoppingCart size={40} />} title="E-Commerce Platform" desc="50K+ concurrent users performance simulation." />
            <IndustryCard icon={<CreditCard size={40} />} title="FinTech Platform" desc="Continuous monitoring with Grafana dashboards." />
            <IndustryCard icon={<HeartPulse size={40} />} title="Healthcare Portal" desc="CI/CD performance gates and optimization." />
            <IndustryCard icon={<BarChart3 size={40} />} title="Telecom Application" desc="Engineered performance optimization for live class streaming through scalability testing and database tuning, ensuring consistent and reliable learning experiences at scale." />

          </div>
        </div>
      </section>

      {/* PERFORMANCE ENGINEERING */}
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
            <ToolItem image="/assets/jmeter logo.png" title="Apache JMeter" link="/tools/jmeter" />
            <ToolItem image="/assets/loadrunner logo.jfif" title="OpenText LoadRunner" link="/tools/loadrunner" />
            <ToolItem image="/assets/neoload logo.png" title="NeoLoad" link="/tools/neoload" />
            <ToolItem image="/assets/locust logo.jfif" title="Locust" link="/tools/locust" />
            <ToolItem image="/assets/dynatrace.jpeg" title="Dynatrace" link="/tools/dynatrace" />
          </div>
        </div>
      </section>

      {/* FINAL CTA - CHANGED TO BLUE */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-center text-white">
        <h2 className="text-3xl font-bold">
          Performance Is a Feature
        </h2>

        <button
          onClick={handleGetStartedFree}
          className="mt-8 bg-white text-blue-800 px-8 py-3 rounded-md font-semibold"
        >
          Get Started Free
        </button>
      </section>

      {/* FOOTER ADDED */}
      <footer className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-10">

          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <p>📞 +91 79871 71669</p>
            <p>✉️ contact.perfmatrix@gmail.com</p>
            <p>📍 Pune, India, 411033</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Navigation</h3>
            <p className="cursor-pointer" onClick={() => navigate("/")}>Home</p>
            <p className="cursor-pointer" onClick={() => navigate("/capabilities")}>Capabilities</p>
            <p className="cursor-pointer" onClick={() => navigate("/allblogs")}>Blog</p>
            <p className="cursor-pointer" onClick={() => navigate("/about")}>About Us</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>
            <p>Performance Testing</p>
            <p>Performance Engineering</p>
            <p>UI Performance Testing</p>
            <p>Live Production Monitoring</p>
            <p>Mobile Performance Testing</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
            <p>WhatsApp</p>
            <p>Facebook</p>
            <p>LinkedIn</p>
            <p>X</p>
            <p>YouTube</p>
          </div>

        </div>
      </footer>

    </motion.div>
  );
}

/* COMPONENTS */

function Metric({ icon, value, label }) {
  return (
    <div>
      <div className="flex justify-center text-blue-700 mb-3">{icon}</div>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  );
}

function IndustryCard({ icon, title, desc }) {
  return (
    <div className="text-center px-4">
      <div className="flex justify-center text-blue-700 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-slate-600 text-sm">{desc}</p>
    </div>
  );
}

function ToolItem({ image, title, link }) {
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
          className="mt-4 bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
        >
          Learn more
        </button>
      </div>
    </div>
  );
}
