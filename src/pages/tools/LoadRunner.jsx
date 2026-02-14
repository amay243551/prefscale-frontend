import { motion } from "framer-motion";

export default function LoadRunner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-8 py-16"
    >
      <h1 className="text-4xl font-bold mb-8">
        OpenText LoadRunner
      </h1>

      <p className="text-slate-600 leading-relaxed">
        LoadRunner is an enterprise-grade performance testing tool designed
        to test applications under heavy user loads. It helps organizations
        identify performance bottlenecks before deployment and ensures system
        stability at scale.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Key Features
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Supports multiple protocols (Web, SAP, Oracle, Citrix, etc.)</li>
        <li>Controller for managing virtual users</li>
        <li>Advanced monitoring and analysis reports</li>
        <li>Enterprise-level scalability</li>
        <li>Cloud and on-premise testing support</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Advantages
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Highly reliable for large enterprise systems</li>
        <li>Strong protocol support</li>
        <li>Detailed analytics and reporting</li>
        <li>Industry-proven testing framework</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Limitations
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-slate-600">
        <li>Commercial (paid) tool</li>
        <li>Steeper learning curve</li>
        <li>Resource intensive</li>
      </ul>
    </motion.div>
  );
}
