import { motion } from "framer-motion";

export default function EnduranceTesting() {
  return (
    <div className="bg-white min-h-screen">

      <section className="py-24 bg-blue-900 text-white text-center">
        <h1 className="text-4xl font-bold">Endurance Testing</h1>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-8">
        <p className="text-slate-700 leading-relaxed mb-6">
          Endurance testing (Soak Testing) ensures system stability over long periods under consistent load.
          It helps detect memory leaks and performance degradation.
        </p>

        <ul className="list-disc pl-6 space-y-4 text-slate-700">
          <li>Runs application for extended durations (hours/days).</li>
          <li>Detects memory leaks and resource exhaustion.</li>
          <li>Monitors database stability over time.</li>
          <li>Validates application uptime reliability.</li>
          <li>Ensures stable long-term performance.</li>
        </ul>
      </section>

    </div>
  );
}
