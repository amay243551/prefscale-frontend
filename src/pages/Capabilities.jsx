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
      <section className="py-28 bg-black text-white text-center">
        <h1 className="text-5xl font-bold">
          WE OFFER WHAT YOU ARE LOOKING FOR
        </h1>

        <p className="mt-6 text-lg max-w-3xl mx-auto text-slate-300 leading-relaxed">
          We deliver end-to-end performance assurance — from early development validation to live production monitoring — ensuring scalable, reliable, and high-performing digital platforms.
        </p>
      </section>

      {/* ================= SERVICES LIST ================= */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-8 space-y-20">

          <ServiceItem
            title="Load Testing"
            desc="Ensure your application can handle anticipated user demand with confidence. Our load testing approach replicates real-world traffic patterns to evaluate performance, identify bottlenecks, and ensure consistent speed, stability, and scalability before go-live."
          />

          <ServiceItem
            title="Stress Testing"
            desc="Assess how your application performs under extreme workloads and peak demand. We simulate high-stress scenarios to uncover system limitations, validate stability, and ensure your application can recover quickly and reliably."
          />

          <ServiceItem
            title="Endurance Testing"
            desc="Validate your system’s ability to perform reliably during prolonged usage. Our endurance testing detects performance degradation, memory inefficiencies, and resource constraints to ensure stable and uninterrupted operation."
          />

          <ServiceItem
            title="Spike Testing"
            desc="Validate your system’s resilience against unexpected traffic surges. Our spike testing identifies performance bottlenecks and ensures your application can scale quickly while maintaining reliability and seamless user experience."
          />

          <ServiceItem
            title="Early Performance Testing"
            desc="Shift performance testing left by validating application performance during development. We help detect bottlenecks early, optimize system efficiency, and ensure scalable, high-quality releases."
          />

          <ServiceItem
            title="UI Performance Testing"
            desc="Ensure fast, responsive, and seamless user interfaces across devices and browsers. We evaluate rendering speed, page load performance, and frontend responsiveness to deliver smooth and consistent user experiences."
          />

          <ServiceItem
            title="Mobile Performance Testing"
            desc="Validate the performance of mobile applications under real-world conditions. We assess responsiveness, load times, network behavior, and device compatibility to ensure optimal performance across all mobile platforms."
          />

          <ServiceItem
            title="Dynatrace Observability"
            desc="Utilize Dynatrace’s AI-driven monitoring to gain complete visibility into application, infrastructure, and user experience. We help detect performance issues early and ensure continuous reliability in live production environments."
          />

          <ServiceItem
            title="API Performance Testing"
            desc="Ensure your APIs deliver fast, reliable, and scalable performance under varying load conditions. We validate response times, throughput, and stability to ensure seamless integration and consistent service delivery."
          />

          <ServiceItem
            title="Cloud Performance Testing"
            desc="Validate the performance and reliability of your applications in cloud environments. We assess scalability, resource utilization, and system behavior to ensure optimal performance across dynamic cloud infrastructures."
          />

          <ServiceItem
            title="Scalability Testing"
            desc="Evaluate your application’s ability to scale efficiently as user demand grows. We simulate increasing workloads to identify capacity limits and ensure your system can handle future growth with confidence."
          />

        </div>
      </section>
    </motion.div>
  );
}

/* ================= SERVICE COMPONENT ================= */

function ServiceItem({ title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="border-b border-slate-200 pb-12"
    >
      <h2 className="text-2xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-4 text-slate-600 leading-relaxed">
        {desc}
      </p>

      <button className="mt-6 text-sky-600 font-medium hover:underline">
        Read More
      </button>
    </motion.div>
  );
}
Capabilities.tsx
