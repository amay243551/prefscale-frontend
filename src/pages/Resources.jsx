import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function Resources() {
  const [activeTab, setActiveTab] = useState("foundations");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  /* ================= LOGIN CHECK ================= */

  const ensureLogin = () => {
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return false;
    }
    return true;
  };

  /* ================= VIEW PDF (GOOGLE DOCS) ================= */

  const handleView = (fileUrl) => {
    if (!ensureLogin()) return;

    const viewerUrl =
      "https://docs.google.com/gview?embedded=true&url=" +
      encodeURIComponent(fileUrl);

    window.open(viewerUrl, "_blank");
  };

  /* ================= DOWNLOAD PDF ================= */

  const handleDownload = (fileUrl, title) => {
    if (!ensureLogin()) return;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ================= DELETE (ADMIN) ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource permanently?")) return;

    try {
      await api.delete(`/api/admin/blog/${id}`);
      setResources((prev) => prev.filter((r) => r._id !== id));
      alert("Deleted successfully ✅");
    } catch {
      alert("Delete failed ❌");
    }
  };

  /* ================= FETCH RESOURCES ================= */

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/api/blogs?section=resources&category=${activeTab}`
        );

        setResources(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading resources...
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-white">
            Performance Engineering Library
          </h1>
        </div>

        {/* CATEGORY BUTTONS */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("foundations")}
            className={`px-6 py-2 rounded ${
              activeTab === "foundations"
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-gray-300"
            }`}
          >
            Foundations
          </button>

          <button
            onClick={() => setActiveTab("deepdive")}
            className={`px-6 py-2 rounded ${
              activeTab === "deepdive"
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-gray-300"
            }`}
          >
            Deep Dive
          </button>
        </div>

        {/* ADMIN UPLOAD BUTTON */}
        {role === "admin" && (
          <div className="flex justify-center mb-12">
            <button
              onClick={() => navigate("/upload-resources")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Plus size={18} /> Upload Resource
            </button>
          </div>
        )}

        {/* RESOURCE GRID */}
        {resources.length === 0 ? (
          <p className="text-center text-gray-400">
            No resources available.
          </p>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {resources.map((item) => (
              <div
                key={item._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
              >
                <span className="text-xs text-blue-400 uppercase">
                  {activeTab}
                </span>

                <h2 className="text-xl font-bold text-white mt-2">
                  {item.title}
                </h2>

                <p className="text-gray-400 text-sm mt-3">
                  {item.description}
                </p>

                {/* ACTION BUTTONS */}
                <div className="mt-6 flex gap-3 flex-wrap">

                  <button
                    onClick={() => handleView(item.fileUrl)}
                    className="bg-white/10 text-white px-4 py-2 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      handleDownload(item.fileUrl, item.title)
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Download
                  </button>

                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
