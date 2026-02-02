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

  /* 🔐 CHECK LOGIN BEFORE DOWNLOAD */
  const handleDownload = (pdf) => {
    if (!token) {
      alert("Please login or signup to download this resource.");
      navigate("/login");
      return;
    }

    window.open(
      `${import.meta.env.VITE_BACKEND_URL}/public/${pdf}`,
      "_blank"
    );
  };

  /* 📡 FETCH BLOGS BY CATEGORY */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `/api/blogs?category=${activeTab}`
        );
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
    return <p className="text-center mt-10">Loading blogs...</p>;
  }

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
        <div className="flex justify-center gap-6 mb-10">
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

        {/* ADMIN UPLOAD BUTTON */}
        {role === "admin" && (
          <div className="flex justify-center mb-12">
            <button
              onClick={() => navigate("/upload-blog")}
              className="bg-black text-white px-6 py-3 rounded"
            >
              Upload Blogs
            </button>
          </div>
        )}

        {/* BLOG LIST */}
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">
            No blogs available in this category
          </p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow p-8 mb-6"
            >
              <h2 className="text-2xl font-bold text-slate-800">
                {blog.title}
              </h2>

              <p className="mt-3 text-slate-600">
                {blog.description}
              </p>

              <button
                onClick={() => handleDownload(blog.pdf)}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
              >
                Download File
              </button>
            </div>
          ))
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
