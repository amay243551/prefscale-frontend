import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Linkedin, Twitter, Plus } from "lucide-react";
import { motion } from "framer-motion";
import api from "../utils/api";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white py-20 px-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Insights & Engineering Blogs
          </h1>

          {role === "admin" && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/upload-allblog")}
              className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-xl"
            >
              <Plus size={18} /> Add Blog
            </motion.button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10"
            >
              <h2
                className="text-2xl font-bold cursor-pointer hover:text-blue-400"
                onClick={() => navigate(`/allblogs/${blog._id}`)}
              >
                {blog.title}
              </h2>

              <p className="text-slate-400 mt-4 text-sm">
                {blog.description}
              </p>

              <div className="mt-6 text-xs text-slate-500">
                <p>By {blog.uploadedBy}</p>
                <p>{new Date(blog.createdAt).toDateString()}</p>
              </div>

              <div className="flex gap-4 mt-6">
                <Linkedin
                  className="cursor-pointer hover:text-blue-400"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin}/allblogs/${blog._id}`
                    )
                  }
                />
                <Twitter
                  className="cursor-pointer hover:text-blue-400"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?url=${window.location.origin}/allblogs/${blog._id}`
                    )
                  }
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
