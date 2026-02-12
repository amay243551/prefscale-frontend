import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Linkedin, Twitter, Facebook, ArrowLeft } from "lucide-react";
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
      <div className="bg-gradient-to-r from-slate-900 to-black text-white py-16 px-6">
        <button
          onClick={() => navigate("/allblogs")}
          className="flex items-center gap-2 text-sm mb-6 opacity-80 hover:opacity-100"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </button>

        <h1 className="text-4xl md:text-5xl font-bold max-w-4xl leading-tight">
          {blog.title}
        </h1>

        <div className="flex gap-6 mt-6 text-sm opacity-80 flex-wrap">
          <span>By {blog.uploadedBy}</span>
          <span>{new Date(blog.createdAt).toDateString()}</span>
        </div>

        {/* SHARE SECTION */}
        <div className="flex items-center gap-4 mt-8">

          <span className="text-sm font-medium opacity-80">
            Share:
          </span>

          {/* Twitter */}
          <div
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${window.location.href}`,
                "_blank"
              )
            }
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-black cursor-pointer transition"
          >
            <Twitter size={18} />
          </div>

          {/* Facebook */}
          <div
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                "_blank"
              )
            }
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-black cursor-pointer transition"
          >
            <Facebook size={18} />
          </div>

          {/* LinkedIn */}
          <div
            onClick={() =>
              window.open(
                `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
                "_blank"
              )
            }
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-black cursor-pointer transition"
          >
            <Linkedin size={18} />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">

        {/* LEFT ARTICLE */}
        <div className="w-full lg:w-2/3 overflow-hidden">

          {blog.description && (
            <p className="text-lg text-slate-600 mb-10">
              {blog.description}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none break-words overflow-hidden
                       prose-img:rounded-xl prose-img:shadow-lg
                       prose-headings:font-bold"
            style={{ wordBreak: "break-word" }}
            dangerouslySetInnerHTML={{
              __html: blog.content || "<p>No content available.</p>",
            }}
          />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="w-full lg:w-1/3 sticky top-24 h-fit">
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
                  className="cursor-pointer border-b pb-4 hover:text-blue-600 transition"
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
