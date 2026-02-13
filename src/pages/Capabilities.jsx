import { motion } from "framer-motion";

/* ================= PAGE TRANSITION ================= */
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
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative h-[60vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581090700227-4c4f50c80e8b')",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-slate-900/75"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-8">
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

          <CapabilityCard
            title="Load Testing"
            desc="Ensure your application can handle anticipated user demand with confidence. Our load testing approach replicates real-world traffic patterns to evaluate performance, identify bottlenecks, and ensure consistent speed, stability, and scalability before go-live."
          />

          <CapabilityCard
            title="Stress Testing"
            desc="Assess how your application performs under extreme workloads and peak demand. We simulate high-stress scenarios to uncover system limitations, validate stability, and ensure your application can recover quickly and reliably."
          />

          <CapabilityCard
            title="Endurance Testing"
            desc="Validate your system’s ability to perform reliably during prolonged usage. Our endurance testing detects performance degradation, memory inefficiencies, and resource constraints to ensure stable and uninterrupted operation."
          />

          <CapabilityCard
            title="Spike Testing"
            desc="Validate your system’s resilience against unexpected traffic surges. Our spike testing identifies performance bottlenecks and ensures your application can scale quickly while maintaining reliability and seamless user experience."
          />

          <CapabilityCard
            title="Early Performance Testing"
            desc="Shift performance testing left by validating application performance during development. We help detect bottlenecks early, optimize system efficiency, and ensure scalable, high-quality releases."
          />

          <CapabilityCard
            title="UI Performance Testing"
            desc="Ensure fast, responsive, and seamless user interfaces across devices and browsers. We evaluate rendering speed, page load performance, and frontend responsiveness to deliver smooth and consistent user experiences."
          />

          <CapabilityCard
            title="Mobile Performance Testing"
            desc="Validate the performance of mobile applications under real-world conditions. We assess responsiveness, load times, network behavior, and device compatibility to ensure optimal performance across all mobile platforms."
          />

          <CapabilityCard
            title="Dynatrace Observability"
            desc="Utilize Dynatrace’s AI-driven monitoring to gain complete visibility into application, infrastructure, and user experience. We help detect performance issues early and ensure continuous reliability in live production environments."
          />

          <CapabilityCard
            title="API Performance Testing"
            desc="Ensure your APIs deliver fast, reliable, and scalable performance under varying load conditions. We validate response times, throughput, and stability to ensure seamless integration and consistent service delivery."
          />

          <CapabilityCard
            title="Cloud Performance Testing"
            desc="Validate the performance and reliability of your applications in cloud environments. We assess scalability, resource utilization, and system behavior to ensure optimal performance across dynamic cloud infrastructures."
          />

          <CapabilityCard
            title="Scalability Testing"
            desc="Evaluate your application’s ability to scale efficiently as user demand grows. We simulate increasing workloads to identify capacity limits and ensure your system can handle future growth with confidence."
          />

        </div>
      </section>
    </motion.div>
  );
}

/* ================= CAPABILITY CARD ================= */

function CapabilityCard({ title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white p-10 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition"
    >
      <div className="h-40 bg-slate-100 rounded-lg mb-8 flex items-center justify-center text-slate-400">
        Icon / Image
      </div>

      <h3 className="text-2xl font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-4 text-slate-600 leading-relaxed text-sm">
        {desc}
      </p>
    </motion.div>
  );
}
