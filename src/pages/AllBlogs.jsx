import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import api from "../utils/api";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/api/blogs?section=allblogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-10 py-16">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">All Blogs</h1>

        {role === "admin" && (
          <button
            onClick={() => navigate("/upload-allblog")}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus size={18} /> Add Blog
          </button>
        )}
      </div>

      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/allblogs/${blog._id}`)}
              className="bg-white rounded-xl shadow p-6 cursor-pointer hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-3">
                {blog.title}
              </h2>

              <p className="text-sm text-slate-600 mb-4">
                {blog.description?.slice(0, 100)}...
              </p>

              <div className="text-xs text-slate-500">
                {new Date(blog.createdAt).toDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
