export default function MobilePerformanceTesting() {
  return (
    <div className="bg-white min-h-screen">

      <section className="py-24 bg-blue-900 text-white text-center">
        <h1 className="text-4xl font-bold">Mobile Performance Testing</h1>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-8">
        <p className="text-slate-700 leading-relaxed mb-6">
          Mobile performance testing evaluates application performance across mobile devices and networks.
        </p>

        <ul className="list-disc pl-6 space-y-4 text-slate-700">
          <li>Tests under different network speeds (3G/4G/5G).</li>
          <li>Validates battery consumption efficiency.</li>
          <li>Measures app startup time.</li>
          <li>Ensures compatibility across devices.</li>
          <li>Monitors backend API performance for mobile apps.</li>
        </ul>
      </section>

    </div>
  );
}
