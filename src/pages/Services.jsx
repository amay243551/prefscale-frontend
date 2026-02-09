import {
  Gauge,
  Zap,
  Activity,
  ShieldCheck,
  Bug,
  Server,
  BarChart3,
  Clock,
  Database,
  Cloud,
} from "lucide-react";

export default function Services() {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white py-24">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Performance Engineering Services
          </h1>
          <p className="mt-6 text-slate-300 max-w-3xl mx-auto text-lg">
            PREFSCALE provides end-to-end performance testing solutions
            that help teams validate scalability, reliability, and stability
            before production failures occur.
          </p>
        </div>
      </section>

      {/* ================= WHAT WE DO ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            What We Test & Why It Matters
          </h2>

          <p className="mt-6 text-slate-600 max-w-3xl mx-auto text-center">
            Modern applications fail not because of features, but because of
            unexpected load, traffic spikes, slow databases, and poor scalability.
            Our services are designed to expose these risks early.
          </p>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-10">

          <Service
            icon={<Gauge />}
            title="Load Testing"
            desc="Validate system performance under expected real-world traffic."
            useCases={[
              "Can 1,000 users login concurrently?",
              "Is response time stable under peak hours?",
              "Does throughput meet SLA targets?",
            ]}
            metrics={[
              "Response time",
              "Requests per second",
              "Error rate",
            ]}
          />

          <Service
            icon={<Zap />}
            title="Stress Testing"
            desc="Push the system beyond normal limits to identify breaking points."
            useCases={[
              "What happens beyond maximum capacity?",
              "Does the system fail gracefully?",
              "How fast does recovery happen?",
            ]}
            metrics={[
              "Failure threshold",
              "Recovery time",
              "System stability",
            ]}
          />

          <Service
            icon={<Activity />}
            title="Spike Testing"
            desc="Evaluate system behavior during sudden traffic surges."
            useCases={[
              "Flash sales & product launches",
              "Viral traffic scenarios",
              "Unexpected external spikes",
            ]}
            metrics={[
              "Latency spikes",
              "Auto-scaling behavior",
              "Error burst analysis",
            ]}
          />

          <Service
            icon={<Clock />}
            title="Endurance (Soak) Testing"
            desc="Ensure long-term reliability under sustained load."
            useCases={[
              "Memory leak detection",
              "CPU & resource exhaustion",
              "Long-running stability",
            ]}
            metrics={[
              "Memory growth",
              "CPU utilization",
              "Performance degradation",
            ]}
          />

          <Service
            icon={<Database />}
            title="Database Performance Testing"
            desc="Identify database-level bottlenecks impacting application speed."
            useCases={[
              "Slow queries under load",
              "Connection pool saturation",
              "Concurrency issues",
            ]}
            metrics={[
              "Query latency",
              "Connection usage",
              "Lock contention",
            ]}
          />

          <Service
            icon={<Cloud />}
            title="Scalability & Infrastructure Testing"
            desc="Validate system scaling behavior across cloud environments."
            useCases={[
              "Horizontal scaling validation",
              "Load balancer efficiency",
              "Cloud resource limits",
            ]}
            metrics={[
              "Auto-scaling triggers",
              "Instance saturation",
              "Availability",
            ]}
          />
        </div>
      </section>

      {/* ================= HOW WE DELIVER ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">
            How PREFSCALE Delivers Value
          </h2>

          <div className="mt-14 grid md:grid-cols-3 gap-10 text-center">
            <Delivery
              icon={<BarChart3 />}
              title="Data-Driven Insights"
              desc="All results are backed by measurable metrics, not assumptions."
            />
            <Delivery
              icon={<Bug />}
              title="Early Risk Detection"
              desc="Identify failures before they impact real users."
            />
            <Delivery
              icon={<ShieldCheck />}
              title="Production Confidence"
              desc="Release features knowing your system can handle growth."
            />
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900 text-white text-center">
        <h2 className="text-3xl font-bold">
          Test Before Your Users Do
        </h2>

        <p className="mt-4 text-slate-300 max-w-xl mx-auto">
          Performance failures cost revenue, trust, and reputation.
          PREFSCALE helps you prevent them.
        </p>
      </section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Service({ icon, title, desc, useCases, metrics }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition">
      <div className="text-slate-700 mb-4">{icon}</div>

      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-slate-600 text-sm">{desc}</p>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-slate-800">Common Use Cases</h4>
        <ul className="mt-2 list-disc list-inside text-sm text-slate-600 space-y-1">
          {useCases.map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-semibold text-slate-800">
          Key Metrics Measured
        </h4>
        <ul className="mt-2 list-disc list-inside text-sm text-slate-600 space-y-1">
          {metrics.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Delivery({ icon, title, desc }) {
  return (
    <div className="bg-slate-50 p-8 rounded-xl shadow">
      <div className="flex justify-center text-slate-700 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600 text-sm">{desc}</p>
    </div>
  );
}
