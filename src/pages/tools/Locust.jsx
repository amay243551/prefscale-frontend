import { motion } from "framer-motion";

export default function Locust() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-8 py-16"
    >
      <h1 className="text-4xl font-bold mb-6 text-slate-900">
        Locust Performance Testing
      </h1>

      {/* Overview */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Overview
        </h2>

        <p className="text-slate-600 leading-relaxed">
          Performance testing ensures applications remain fast, stable, and
          reliable under both expected and peak traffic conditions.
          Locust is a leading open-source performance testing tool designed
          with simplicity, scalability, and a code-driven approach.
        </p>

        <p className="text-slate-600 leading-relaxed mt-4">
          Unlike traditional tools that rely on graphical interfaces and
          record-and-playback mechanisms, Locust uses Python scripting to
          define user behavior. This enables highly customized, realistic
          performance test scenarios.
        </p>
      </section>

      {/* What is Locust */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          What is Locust?
        </h2>

        <p className="text-slate-600 leading-relaxed">
          Locust is an open-source load testing framework written in Python.
          It simulates real-world user traffic and measures system performance
          under load conditions. It can simulate thousands or even millions of
          concurrent users through distributed execution.
        </p>
      </section>

      {/* Key Features */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">
          Key Features
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-slate-600">
          <li>Open-source and freely available</li>
          <li>Python-based scripting</li>
          <li>Real-time monitoring via web UI</li>
          <li>Distributed architecture (millions of users)</li>
          <li>Supports Web apps, APIs, backend systems</li>
          <li>CI/CD integration support</li>
          <li>Lightweight and easy to deploy</li>
        </ul>
      </section>

      {/* Importance */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Why Locust is Important
        </h2>

        <p className="text-slate-600 leading-relaxed">
          Locust combines scripting flexibility with scalable distributed
          testing. Its master-worker architecture allows multiple machines
          to generate load simultaneously. The real-time dashboard provides
          metrics like response times, throughput, and failure rates.
        </p>
      </section>

      {/* Architecture */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">
          Locust Architecture
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-slate-600">
          <li><strong>Master Node:</strong> Controls test execution and aggregates results.</li>
          <li><strong>Worker Nodes:</strong> Generate load and simulate user behavior.</li>
        </ul>
      </section>

      {/* Core Concepts */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">
          Core Concepts
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-slate-600">
          <li>User Class</li>
          <li>Task</li>
          <li>Wait Time</li>
          <li>Host</li>
          <li>Events</li>
        </ul>
      </section>

      {/* Conclusion */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Conclusion
        </h2>

        <p className="text-slate-600 leading-relaxed">
          Locust is a powerful and flexible performance testing tool
          that allows scalable, efficient, and realistic load testing.
          Its Python-based approach makes it highly customizable and
          developer-friendly, ensuring reliable system validation under
          peak demand.
        </p>
      </section>
    </motion.div>
  );
}
