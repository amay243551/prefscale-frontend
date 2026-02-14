export default function EarlyPerformanceTesting() {
  return (
    <div className="bg-white min-h-screen">

      <section className="py-24 bg-blue-900 text-white text-center">
        <h1 className="text-4xl font-bold">Early Performance Testing</h1>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-8">
        <p className="text-slate-700 leading-relaxed mb-6">
          Early performance testing (Shift-Left Testing) integrates performance validation in the development lifecycle.
        </p>

        <ul className="list-disc pl-6 space-y-4 text-slate-700">
          <li>Identifies bottlenecks during development phase.</li>
          <li>Reduces cost of fixing performance issues later.</li>
          <li>Integrates performance tests into CI/CD pipelines.</li>
          <li>Ensures scalable architecture from early stages.</li>
          <li>Improves release quality and stability.</li>
        </ul>
      </section>

    </div>
  );
}
