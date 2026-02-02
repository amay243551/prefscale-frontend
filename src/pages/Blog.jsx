import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Blog() {
  const [activeTab, setActiveTab] = useState("foundations");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  /* 🔐 ENSURE LOGIN */
  const ensureLogin = () => {
    if (!token) {
      alert("Please login or signup to continue.");
      navigate("/login");
      return false;
    }
    return true;
  };

  /* 👁️ VIEW FILE (READ ONLINE) */
  const handleView = (fileUrl) => {
    if (!ensureLogin()) return;
    window.open(fileUrl, "_blank"); // browser PDF viewer
  };

  /* ⬇️ DOWNLOAD FILE */
  const handleDownload = (fileUrl) => {
    if (!ensureLogin()) return;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* 🗑️ DELETE (ADMIN ONLY) */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await api.delete(`/api/admin/blog/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      alert("Blog deleted successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog ❌");
    }
  };

  /* 📡 FETCH BLOGS */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/blogs?category=${activeTab}`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-slate-600">Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Performance Engineering Library
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Curated resources covering performance testing, scalability,
            and production-grade engineering practices.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-12">
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

        {/* ADMIN UPLOAD */}
        {role === "admin" && (
          <div className="flex justify-center mb-12">
            <button
              onClick={() => navigate("/upload-blog")}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg shadow"
            >
              + Upload New Blog
            </button>
          </div>
        )}

        {/* BLOG LIST */}
        {blogs.length === 0 ? (
          <p className="text-center text-slate-500">
            No blogs available in this category
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block mb-3 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                    {blog.category.toUpperCase()}
                  </span>

                  <h2 className="text-2xl font-bold text-slate-900">
                    {blog.title}
                  </h2>

                  <p className="mt-3 text-slate-600 leading-relaxed">
                    {blog.description}
                  </p>
                </div>

                <div className="mt-6 flex gap-3 flex-wrap">
                  {/* VIEW */}
                  <button
                    onClick={() => handleView(blog.fileUrl)}
                    className="bg-slate-700 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg transition"
                  >
                    View
                  </button>

                  {/* DOWNLOAD */}
                  <button
                    onClick={() => handleDownload(blog.fileUrl)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
                  >
                    Download
                  </button>

                  {/* DELETE */}
                  {role === "admin" && (
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg transition"
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
    </div>
  );
}

/* ================= TAB BUTTON ================= */

function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold transition
        ${
          active
            ? "bg-slate-900 text-white"
            : "bg-white border text-slate-600 hover:bg-slate-100"
        }`}
    >
      {children}
    </button>
  );
}
