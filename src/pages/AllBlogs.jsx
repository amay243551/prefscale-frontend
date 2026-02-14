import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import api from "../utils/api";
import { motion } from "framer-motion";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await api.get("/api/blogs?section=allblogs");
    setBlogs(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;

    await api.delete(`/api/admin/blog/${id}`);
    setBlogs(blogs.filter((b) => b._id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">

      <div className="max-w-7xl mx-auto flex justify-between items-center mb-16">
        <h1 className="text-5xl font-bold">All Blogs</h1>

        {role === "admin" && (
          <button
            onClick={() => navigate("/upload-allblog")}
            className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-xl"
          >
            <Plus size={18} /> Add Blog
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">

        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            whileHover={{ scale: 1.03 }}
            className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl"
          >

            {/* Thumbnail */}
            {blog.thumbnail && (
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="h-52 w-full object-cover"
              />
            )}

            <div
              className="p-6 cursor-pointer"
              onClick={() => navigate(`/allblogs/${blog._id}`)}
            >
              <h2 className="text-2xl font-bold mb-3">
                {blog.title}
              </h2>

              <p className="text-slate-400 mb-4 line-clamp-3">
                {blog.description}
              </p>

              <div className="text-sm text-slate-500">
                {new Date(blog.createdAt).toDateString()}
              </div>
            </div>

            {/* Admin Delete */}
            {role === "admin" && (
              <div className="p-4 border-t border-slate-800">
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-400"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}

          </motion.div>
        ))}
      </div>
    </div>
  );
}
