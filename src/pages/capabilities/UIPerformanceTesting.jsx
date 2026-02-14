export default function UIPerformanceTesting() {
  return (
    <div className="bg-white min-h-screen">

      <section className="py-24 bg-blue-900 text-white text-center">
        <h1 className="text-4xl font-bold">UI Performance Testing</h1>
      </section>

      <section className="py-20 max-w-5xl mx-auto px-8">
        <p className="text-slate-700 leading-relaxed mb-6">
          UI Performance Testing ensures frontend responsiveness and smooth user experience.
        </p>

        <ul className="list-disc pl-6 space-y-4 text-slate-700">
          <li>Measures page load time.</li>
          <li>Validates rendering speed.</li>
          <li>Analyzes browser compatibility.</li>
          <li>Tests client-side performance under load.</li>
          <li>Ensures smooth animations and interactions.</li>
        </ul>
      </section>

    </div>
  );
}
