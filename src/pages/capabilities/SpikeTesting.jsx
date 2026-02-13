export default function SpikeTesting() {
  return (
    <div className="bg-white min-h-screen">

      <section className="py-24 bg-blue-900 text-white text-center">
        <h1 className="text-4xl font-bold">Spike Testing</h1>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-8">
        <p className="text-slate-700 leading-relaxed mb-6">
          Spike testing measures system response to sudden and extreme increases in traffic.
          It ensures rapid scalability and stability during unexpected demand.
        </p>

        <ul className="list-disc pl-6 space-y-4 text-slate-700">
          <li>Simulates sudden traffic surges.</li>
          <li>Tests auto-scaling mechanisms.</li>
          <li>Validates system elasticity in cloud environments.</li>
          <li>Identifies performance lag during sudden peaks.</li>
          <li>Ensures minimal downtime during spikes.</li>
        </ul>
      </section>

    </div>
  );
}
