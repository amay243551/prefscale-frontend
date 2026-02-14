import { motion } from "framer-motion";

export default function StressTesting() {
  return (
    <div className="bg-white min-h-screen">

      {/* HERO */}
      <section className="py-24 bg-blue-900 text-white text-center">
        <h1 className="text-4xl font-bold">Stress Testing</h1>
      </section>

      {/* CONTENT */}
      <section className="py-20 max-w-5xl mx-auto px-8">
        <p className="text-slate-700 leading-relaxed mb-6">
          Stress testing evaluates how an application behaves under extreme workload conditions beyond its normal operational capacity.
          The goal is to identify breaking points and ensure system stability during peak demand.
        </p>

        <ul className="list-disc pl-6 space-y-4 text-slate-700">
          <li>Simulates traffic beyond expected production limits.</li>
          <li>Identifies system bottlenecks and failure thresholds.</li>
          <li>Validates system recovery after crashes or overload.</li>
          <li>Tests infrastructure resilience under CPU, memory, and DB pressure.</li>
          <li>Ensures graceful degradation instead of complete failure.</li>
        </ul>
      </section>

    </div>
  );
}
