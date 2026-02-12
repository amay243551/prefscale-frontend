import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { Eye, Download, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";

/* ================= PAGE ANIMATION ================= */
const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function Blog() {
  const [activeTab, setActiveTab] = useState("foundations");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  /* ================= AUTH CHECK ================= */
  const ensureLogin = () => {
    if (!token) {
      alert("Please login or signup to continue.");
      navigate("/login");
      return false;
    }
    return true;
  };

  /* ================= DATE FORMAT ================= */
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  /* ================= VIEW ================= */
  const handleView = (fileUrl) => {
    if (!ensureLogin()) return;

    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      fileUrl
    )}&embedded=true`;

    window.open(viewerUrl, "_blank");
  };

  /* ================= DOWNLOAD ================= */
  const handleDownload = async (fileUrl, title) => {
    if (!ensureLogin()) return;

    try {
      const res = await fetch(fileUrl);
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download file");
    }
  };

  /* ================= DELETE (ADMIN) ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource permanently?")) return;

    try {
      await api.delete(`/api/admin/blog/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      alert("Resource deleted successfully ✅");
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete resource ❌");
    }
  };

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/blogs?category=${activeTab}`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeTab]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 text-lg">
        Loading resources…
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">
            Performance Engineering Library
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Curated resources on scalability, performance testing,
            and real-world production engineering.
          </p>
        </div>

        {/* ================= TABS ================= */}
        <div className="flex justify-center gap-4 mb-14">
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

        {/* ================= ADMIN CTA ================= */}
        {role === "admin" && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex justify-center mb-14"
          >
            <button
              onClick={() => navigate("/upload-blog")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition"
            >
              <Plus size={18} /> Upload New Resource
            </button>
          </motion.div>
        )}

        {/* ================= BLOG GRID ================= */}
        {blogs.length === 0 ? (
          <p className="text-center text-slate-400">
            No resources available in this category.
          </p>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                whileHover={{ scale: 1.03, y: -6 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-7 hover:border-blue-500/40"
              >
                {/* DATE */}
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition">
                  <span className="text-xs bg-black/70 text-white px-3 py-1 rounded-full">
                    {formatDate(blog.createdAt)}
                  </span>
                </div>

                {/* CATEGORY */}
                <span className="inline-block mb-4 text-xs uppercase tracking-wide bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full">
                  {blog.category}
                </span>

                {/* TITLE */}
                <h2 className="text-xl font-bold text-white mb-3">
                  {blog.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {blog.description}
                </p>

                {/* ACTIONS */}
                <div className="flex gap-3 flex-wrap">
                  <ActionBtn
                    icon={<Eye size={16} />}
                    label="View"
                    onClick={() => handleView(blog.fileUrl)}
                  />

                  <ActionBtn
                    icon={<Download size={16} />}
                    label="Download"
                    primary
                    onClick={() =>
                      handleDownload(blog.fileUrl, blog.title)
                    }
                  />

                  {role === "admin" && (
                    <ActionBtn
                      icon={<Trash2 size={16} />}
                      label="Delete"
                      danger
                      onClick={() => handleDelete(blog._id)}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ================= UI COMPONENTS ================= */

function TabButton({ children, active, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`px-7 py-3 rounded-full text-sm font-semibold transition
        ${
          active
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-white/5 text-slate-300 hover:bg-white/10"
        }`}
    >
      {children}
    </motion.button>
  );
}

function ActionBtn({ icon, label, onClick, primary, danger }) {
  let base =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition";

  if (primary) {
    base += " bg-blue-600 hover:bg-blue-700 text-white";
  } else if (danger) {
    base += " bg-red-500/20 hover:bg-red-500/30 text-red-400";
  } else {
    base += " bg-white/5 hover:bg-white/10 text-slate-300";
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={base}
    >
      {icon} {label}
    </motion.button>
  );
}
