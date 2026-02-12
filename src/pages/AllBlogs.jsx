import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Twitter, Linkedin } from "lucide-react";
import api from "../utils/api";

export default function AllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await api.get("/api/blogs?section=allblogs");
    setBlogs(res.data);
  };

  const shareTwitter = (blog) => {
    const url = `${window.location.origin}/allblogs/${blog._id}`;
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${blog.title}`,
      "_blank"
    );
  };

  const shareLinkedIn = (blog) => {
    const url = `${window.location.origin}/allblogs/${blog._id}`;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-4xl font-bold mb-10">All Blogs</h1>

      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="bg-white p-6 rounded-xl shadow mb-6 cursor-pointer"
        >
          <h2
            className="text-2xl font-semibold hover:underline"
            onClick={() => navigate(`/allblogs/${blog._id}`)}
          >
            {blog.title}
          </h2>

          <p className="mt-3 text-slate-600">{blog.description}</p>

          <div className="flex justify-between mt-4 text-sm text-slate-500">
            <span>Uploaded by {blog.uploadedBy}</span>

            <div className="flex gap-4">
              <Twitter size={20} onClick={() => shareTwitter(blog)} />
              <Linkedin size={20} onClick={() => shareLinkedIn(blog)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
