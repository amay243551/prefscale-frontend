import { motion } from "framer-motion";

export default function Dynatrace() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-8 py-16"
    >
      <h1 className="text-4xl font-bold mb-8">
        Dynatrace
      </h1>

      <p className="text-slate-600 leading-relaxed">
        Dynatrace is an AI-powered observability and performance monitoring
        platform that provides deep insights into application performance,
        infrastructure health, and user experience. It helps teams detect,
        analyze, and resolve issues automatically.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Key Features
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Full-stack monitoring (frontend, backend, database)</li>
        <li>Real-time performance analytics</li>
        <li>AI-based root cause analysis</li>
        <li>Cloud-native and container monitoring</li>
        <li>End-user experience tracking</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Benefits
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Automatic issue detection</li>
        <li>Reduced troubleshooting time</li>
        <li>Improved system reliability</li>
        <li>Enterprise-grade security and scalability</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Why Use Dynatrace with Performance Testing?
      </h2>

      <p className="text-slate-600 leading-relaxed">
        Dynatrace integrates with tools like JMeter, LoadRunner, and NeoLoad
        to provide deep visibility into system behavior during performance
        tests. It helps teams analyze CPU usage, memory consumption, database
        queries, and application response time under load.
      </p>
    </motion.div>
  );
}
