import { motion } from "framer-motion";

export default function NeoLoad() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-8 py-16"
    >
      <h1 className="text-4xl font-bold mb-6 text-slate-900">
        NeoLoad Tutorial
      </h1>

      {/* Overview */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Overview
        </h2>

        <p className="text-slate-600 leading-relaxed">
          This tutorial provides a comprehensive introduction to NeoLoad,
          covering both foundational and advanced performance testing concepts.
          It helps build strong knowledge and practical performance testing skills.
        </p>
      </section>

      {/* What You Will Learn */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">
          What You Will Learn
        </h2>

        <div className="space-y-6 text-slate-600">

          <div>
            <h3 className="font-semibold">1. Installation and Setup</h3>
            <ul className="list-disc pl-6">
              <li>Installation and environment configuration</li>
              <li>System requirements and setup</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">2. Core Functional Features</h3>
            <ul className="list-disc pl-6">
              <li>Understanding NeoLoad architecture</li>
              <li>Key components and workflow</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">3. Script Recording and Development</h3>
            <ul className="list-disc pl-6">
              <li>Recording user transactions</li>
              <li>Validating recorded scripts</li>
              <li>Verifying user paths</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">4. Correlation and Parameterization</h3>
            <ul className="list-disc pl-6">
              <li>Handling dynamic values</li>
              <li>Counter, List, File variables</li>
              <li>Random Integer, String, UUID</li>
              <li>Password and Date variables</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">5. Virtual User Configuration</h3>
            <ul className="list-disc pl-6">
              <li>Populations and user distribution</li>
              <li>Workload modeling</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">6. Monitoring and Analysis</h3>
            <ul className="list-disc pl-6">
              <li>System monitors integration</li>
              <li>Performance tracking</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">7. Runtime and Scenario Management</h3>
            <ul className="list-disc pl-6">
              <li>Creating test scenarios</li>
              <li>Execution control</li>
              <li>Results analysis</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">8. Maintenance and Uninstallation</h3>
            <ul className="list-disc pl-6">
              <li>Environment cleanup</li>
            </ul>
          </div>

        </div>
      </section>
    </motion.div>
  );
}
