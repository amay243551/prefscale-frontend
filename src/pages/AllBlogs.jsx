import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Linkedin, Twitter, ArrowLeft } from "lucide-react";
import api from "../utils/api";

export default function AllBlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const res = await api.get("/api/blogs?section=allblogs");
    const found = res.data.find((b) => b._id === id);
    setBlog(found);
  };

  if (!blog) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">

      {/* HEADER IMAGE SECTION */}
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
            <span>5 mins read</span>
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

          <div className="mt-10 text-lg text-slate-700 leading-8 whitespace-pre-line">
            {blog.description}
          </div>
        </div>

        {/* SIDEBAR */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Recent Articles</h3>
          <SidebarArticles currentId={id} />
        </div>
      </div>
    </div>
  );
}

function SidebarArticles({ currentId }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const res = await api.get("/api/blogs?section=allblogs");
    setArticles(res.data.filter((b) => b._id !== currentId).slice(0, 3));
  };

  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <div key={article._id} className="cursor-pointer">
          <h4 className="font-semibold hover:text-blue-600">
            {article.title}
          </h4>
          <p className="text-sm text-slate-500">
            {new Date(article.createdAt).toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
