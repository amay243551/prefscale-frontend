import { useState } from "react";

export default function Blog() {
  const [activeTab, setActiveTab] = useState("launchpad");

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800">
            Performance Engineering Blog
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Structured learning paths covering performance engineering —
            from core concepts to enterprise-scale systems.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-6 mb-12">
          <TabButton
            active={activeTab === "launchpad"}
            onClick={() => setActiveTab("launchpad")}
          >
            🚀 LaunchPad
          </TabButton>

          <TabButton
            active={activeTab === "deepscale"}
            onClick={() => setActiveTab("deepscale")}
          >
            ⚙️ DeepScale
          </TabButton>
        </div>

        {/* CONTENT */}
        {activeTab === "launchpad" && (
          <Section
            title="LaunchPad — Core Performance Foundations"
            desc="This track is designed for engineers starting with performance
            engineering. It focuses on understanding system behavior,
            performance testing fundamentals, and scalability basics."
            pdf="/performance-testing-basics.pdf"
            pdfName="Download LaunchPad Guide (PDF)"
          />
        )}

        {activeTab === "deepscale" && (
          <Section
            title="DeepScale — Advanced Performance Engineering"
            desc="This track is aimed at engineers working on high-traffic
            applications. It covers advanced load modeling, bottleneck
            analysis, capacity planning, and production-level tuning."
            pdf="/advanced-performance-engineering.pdf"
            pdfName="Download DeepScale Guide (PDF)"
          />
        )}
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-medium transition
        ${
          active
            ? "bg-slate-800 text-white"
            : "bg-white border text-slate-600 hover:bg-slate-100"
        }`}
    >
      {children}
    </button>
  );
}

function Section({ title, desc, pdf, pdfName }) {
  return (
    <div className="bg-white rounded-xl shadow p-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="mt-4 text-slate-600 leading-relaxed">{desc}</p>

      <a
        href={pdf}
        download
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        {pdfName}
      </a>
    </div>
  );
}
