import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Linkedin, Twitter, ArrowLeft } from "lucide-react";
import api from "../utils/api";

export default function AllBlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await api.get(`/api/blog/${id}`);
        setBlog(blogRes.data);

        const recentRes = await api.get("/api/blogs?section=allblogs");
        setRecent(recentRes.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-slate-900 to-black text-white py-16 px-10">
        <button
          onClick={() => navigate("/allblogs")}
          className="flex items-center gap-2 text-sm mb-6 opacity-80 hover:opacity-100"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </button>

        <h1 className="text-4xl md:text-5xl font-bold max-w-4xl">
          {blog.title}
        </h1>

        <div className="flex gap-6 mt-6 text-sm opacity-80">
          <span>By {blog.uploadedBy}</span>
          <span>{new Date(blog.createdAt).toDateString()}</span>
        </div>

        {/* SHARE BUTTONS */}
        <div className="flex gap-4 mt-6">
          <Twitter
            className="cursor-pointer hover:text-blue-400"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${window.location.href}`,
                "_blank"
              )
            }
          />
          <Linkedin
            className="cursor-pointer hover:text-blue-400"
            onClick={() =>
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
                "_blank"
              )
            }
          />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-10 py-16 grid lg:grid-cols-3 gap-16">

        {/* ARTICLE */}
        <div className="lg:col-span-2">

          {blog.description && (
            <p className="text-lg text-slate-600 mb-10">
              {blog.description}
            </p>
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: blog.content || "<p>No content available.</p>",
            }}
          />
        </div>

        {/* SIDEBAR */}
        <div>
          <h3 className="text-2xl font-bold mb-6">
            Recent Articles
          </h3>

          <div className="space-y-6">
            {recent
              .filter((r) => r._id !== blog._id)
              .slice(0, 4)
              .map((article) => (
                <div
                  key={article._id}
                  onClick={() => navigate(`/allblogs/${article._id}`)}
                  className="cursor-pointer border-b pb-4 hover:text-blue-600"
                >
                  <h4 className="font-semibold">
                    {article.title}
                  </h4>
                  <p className="text-sm text-slate-500">
                    {new Date(article.createdAt).toDateString()}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
