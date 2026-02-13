import { motion } from "framer-motion";

export default function JMeter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-8 py-16"
    >
      {/* ===== Title ===== */}
      <h1 className="text-4xl font-bold mb-6 text-slate-900">
        Apache JMeter
      </h1>

      {/* ===== Overview ===== */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Overview
        </h2>

        <p className="text-slate-600 leading-relaxed">
          Apache JMeter is an open-source performance testing tool developed in Java.
          It does not require any purchasing or licensing costs, meaning you can
          conduct performance testing without spending any money on the tool.
          JMeter has rapidly grown due to its powerful features that compete with
          licensed tools.
        </p>

        <p className="text-slate-600 leading-relaxed mt-4">
          The Apache JMeter Development Community continuously works on user
          requirements and regularly releases upgraded versions with major
          improvements. It also provides useful plug-ins to enhance the tool's
          capabilities.
        </p>
      </section>

      {/* ===== History ===== */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          A Brief History
        </h2>

        <p className="text-slate-600 leading-relaxed">
          Apache JMeter was developed by Stefano Mazzocchi and officially released
          in 1998. Since then, its features have grown significantly.
          In November 2011, JMeter became a Top-Level Apache Project, meaning it
          has a dedicated Project Management Committee and official website.
        </p>
      </section>

      {/* ===== Features ===== */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">
          Key Features
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-slate-600">
          <li>Open-source and completely free to use</li>
          <li>No additional licensing or purchasing cost</li>
          <li>Pure Java-based (Platform Independent)</li>
          <li>Lightweight and easy to install</li>
          <li>No maintenance cost</li>
          <li>Easy to upgrade</li>
          <li>Supports plug-ins via .jar files</li>
          <li>No explicit hardware required (depends on load)</li>
          <li>Unlimited user (thread) load generation capability</li>
          <li>Simple and user-friendly GUI</li>
          <li>Supports both GUI and Non-GUI mode</li>
          <li>Recording option for user actions</li>
          <li>Supports parameterization and correlation</li>
          <li>Easy debugging of scripts</li>
          <li>Supports Android application performance testing</li>
          <li>Tests both static and dynamic resources</li>
          <li>Supports scripting with BeanShell, Groovy, JavaScript</li>
          <li>Supports protocols like HTTP, Web Services, Databases, SOAP</li>
          <li>Integrates with Dynatrace, Grafana and other APM tools</li>
          <li>Integration with CI tools like Jenkins</li>
          <li>HTML reporting (post version 3.0)</li>
          <li>Proper documentation available</li>
          <li>Free and commercial support options available</li>
        </ul>
      </section>

      {/* ===== Limitations ===== */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">
          Limitations
        </h2>

        <ul className="list-disc pl-6 space-y-3 text-slate-600">
          <li>Limited protocol support</li>
          <li>No dedicated support team</li>
          <li>Scripts cannot be regenerated</li>
          <li>No protocol adviser</li>
          <li>Compatibility issues when upgrading versions</li>
          <li>No runtime graphs without monitoring integration</li>
          <li>Dependency on BeanShell for complex scripting</li>
          <li>GC/Heap memory issues on limited resource machines</li>
          <li>Unpredictable issues in distributed testing</li>
          <li>Lack of in-depth analysis features</li>
          <li>Reports have limited analysis capabilities</li>
        </ul>
      </section>

      {/* ===== Conclusion ===== */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Conclusion
        </h2>

        <p className="text-slate-600 leading-relaxed">
          Apache JMeter is a simple and powerful performance testing tool widely
          used in product-based companies. While some service-based companies
          prefer licensed tools, JMeter is highly accepted due to its cost
          effectiveness and accurate results. It remains a well-known and trusted
          name in the performance testing world.
        </p>
      </section>

      {/* ===== Official Website ===== */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-slate-800">
          Official Website
        </h2>

        <a
          href="https://jmeter.apache.org/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://jmeter.apache.org/index.html
        </a>
      </section>
    </motion.div>
  );
}
