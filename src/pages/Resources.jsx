import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("foundations");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

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

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black py-20"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-extrabold text-white text-center mb-12">
          📚 Resource Library
        </h1>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-12">
          <button
            onClick={() => setActiveTab("foundations")}
            className={`px-6 py-2 rounded ${
              activeTab === "foundations"
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-white"
            }`}
          >
            Foundations
          </button>

          <button
            onClick={() => setActiveTab("deepdive")}
            className={`px-6 py-2 rounded ${
              activeTab === "deepdive"
                ? "bg-blue-600 text-white"
                : "bg-white/10 text-white"
            }`}
          >
            Deep Dive
          </button>
        </div>

        {role === "admin" && (
          <div className="flex justify-center mb-10">
            <button
              onClick={() => navigate("/upload-resources")}
              className="bg-blue-600 text-white px-6 py-3 rounded flex items-center gap-2"
            >
              <Plus size={18} /> Upload Resource
            </button>
          </div>
        )}

        {loading ? (
          <p className="text-center text-slate-400">Loading...</p>
        ) : blogs.length === 0 ? (
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

                <div className="mt-6">
                  <a
                    href={blog.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    View PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
