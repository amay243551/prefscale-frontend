import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const [activeTab, setActiveTab] = useState("foundations");
  const navigate = useNavigate();

  // 🔐 CHECK LOGIN BEFORE DOWNLOAD
  const handleDownload = (pdfUrl) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login or signup to download this resource.");
      navigate("/login");
      return;
    }

    // ✅ USER LOGGED IN → DOWNLOAD
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-8">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800">
            Performance Engineering Blog
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Learn performance engineering from fundamentals to real-world
            production-grade practices.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-6 mb-12">
          <TabButton
            active={activeTab === "foundations"}
            onClick={() => setActiveTab("foundations")}
          >
            Foundations
          </TabButton>

          <TabButton
            active={activeTab === "deep"}
            onClick={() => setActiveTab("deep")}
          >
            Deep Dive
          </TabButton>
        </div>

        {/* CONTENT */}
        {activeTab === "foundations" && (
          <Section
            title="Foundations of Performance Engineering"
            desc="A practical starting point covering performance testing basics,
            system behavior, and scalability fundamentals."
            onDownload={() =>
              handleDownload("/JMeter Perfmon Integration.pdf")
            }
            buttonText="Download Foundations Guide (PDF)"
          />
        )}

        {activeTab === "deep" && (
          <Section
            title="Advanced Performance Engineering"
            desc="In-depth techniques covering load modeling, bottleneck analysis,
            capacity planning, and production tuning strategies."
            onDownload={() =>
              handleDownload("/Webtours_Test_Fragment.pdf")
            }
            buttonText="Download Advanced Guide (PDF)"
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

function Section({ title, desc, onDownload, buttonText }) {
  return (
    <div className="bg-white rounded-xl shadow p-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      <p className="mt-4 text-slate-600 leading-relaxed">{desc}</p>

      <button
        onClick={onDownload}
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        {buttonText}
      </button>
    </div>
  );
}
