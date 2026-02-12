import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Linkedin, Twitter, ArrowLeft } from "lucide-react";
import api from "../utils/api";

export default function AllBlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/api/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="p-20 text-center">Loading...</div>;
  }

  if (!blog) {
    return <div className="p-20 text-center">Blog not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="relative h-64 bg-slate-200">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/10"></div>
        <div className="absolute bottom-6 left-12 text-white">
          <button
            onClick={() => navigate("/allblogs")}
            className="flex items-center gap-2 mb-4 text-sm"
          >
            <ArrowLeft size={16} /> Back to List
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-16 grid lg:grid-cols-3 gap-16">

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2">

          <span className="bg-blue-600 text-white px-3 py-1 text-xs rounded">
            All Blogs
          </span>

          <h1 className="text-4xl font-bold mt-6 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-slate-500 mt-6">
            <span>By {blog.uploadedBy}</span>
            <span>{new Date(blog.createdAt).toDateString()}</span>
          </div>

          <div className="flex gap-4 mt-6">
            <Twitter
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${window.location.href}`,
                  "_blank"
                )
              }
            />
            <Linkedin
              className="cursor-pointer"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
                  "_blank"
                )
              }
            />
          </div>

          <div
            className="mt-10 text-lg text-slate-700 leading-8"
            dangerouslySetInnerHTML={{ __html: blog.content || blog.description }}
          />
        </div>
      </div>
    </div>
  );
}
