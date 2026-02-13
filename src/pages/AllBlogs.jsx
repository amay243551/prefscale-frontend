import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
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
    try {
      const res = await api.get("/api/blogs?section=allblogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white py-20 px-6">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-16">

        <div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            All Blogs
          </h1>
          <p className="text-slate-400 mt-3">
            Insights. Engineering. Performance. Innovation.
          </p>
        </div>

        {role === "admin" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/upload-allblog")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl shadow-lg transition"
          >
            <Plus size={18} /> Add Blog
          </motion.button>
        )}
      </div>

      {/* BLOG GRID */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate(`/allblogs/${blog._id}`)}
            className="cursor-pointer backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-3xl shadow-xl hover:border-blue-500/40 transition"
          >
            <h2 className="text-2xl font-bold mb-4">
              {blog.title}
            </h2>

            <p className="text-slate-400 mb-6 line-clamp-3">
              {blog.description}
            </p>

            <div className="text-sm text-slate-500">
              {new Date(blog.createdAt).toDateString()}
            </div>
          </motion.div>
        ))}

      </div>

      {blogs.length === 0 && (
        <div className="text-center text-slate-500 mt-20">
          No blogs available.
        </div>
      )}
    </div>
  );
}
