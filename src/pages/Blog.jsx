import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading blogs...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>

      {/* ================= ADMIN UPLOAD ================= */}
      {role === "admin" && (
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-6 bg-black text-white px-4 py-2 rounded"
        >
          Upload Blog
        </button>
      )}

      {/* ================= BLOG LIST ================= */}
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="border p-4 rounded mb-4 shadow-sm"
          >
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600 mb-2">{blog.description}</p>

            <a
              href={`https://prefscale-backend.onrender.com/uploads/${blog.pdf}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium"
            >
              Download PDF
            </a>
          </div>
        ))
      )}
    </div>
  );
}
