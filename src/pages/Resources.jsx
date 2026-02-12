import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { Eye, Download, Trash2, Plus } from "lucide-react";
import { motion } from "framer-motion";

const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

export default function Resources() {
  const [activeTab, setActiveTab] = useState("foundations");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const ensureLogin = () => {
    if (!token) {
      alert("Please login or signup to continue.");
      navigate("/login");
      return false;
    }
    return true;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleView = (fileUrl) => {
    if (!ensureLogin()) return;

    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      fileUrl
    )}&embedded=true`;

    window.open(viewerUrl, "_blank");
  };

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
    } catch {
      alert("Download failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resource permanently?")) return;

    try {
      await api.delete(`/api/admin/blog/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      alert("Deleted successfully ✅");
    } catch {
      alert("Delete failed ❌");
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/api/blogs?section=resources&category=${activeTab}`
        );
        setBlogs(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
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
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white">
            Performance Engineering Library
          </h1>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab("foundations")}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Foundations
          </button>
          <button
            onClick={() => setActiveTab("deep")}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Deep Dive
          </button>
        </div>

        {role === "admin" && (
          <div className="flex justify-center mb-10">
            <button
              onClick={() => navigate("/upload-blog")}
              className="bg-blue-600 text-white px-6 py-3 rounded flex items-center gap-2"
            >
              <Plus size={18} /> Upload Resource
            </button>
          </div>
        )}

        {blogs.length === 0 ? (
          <p className="text-center text-slate-400">
            No resources available.
          </p>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <span className="text-xs text-blue-400 uppercase">
                  {blog.category}
                </span>

                <h2 className="text-xl font-bold text-white mt-2">
                  {blog.title}
                </h2>

                <p className="text-slate-400 text-sm mt-3">
                  {blog.description}
                </p>

                <div className="mt-6 flex gap-3 flex-wrap">
                  <button
                    onClick={() => handleView(blog.fileUrl)}
                    className="bg-white/10 text-white px-4 py-2 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      handleDownload(blog.fileUrl, blog.title)
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Download
                  </button>

                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(blog._id)}
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
