import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function AllBlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    const res = await api.get("/api/blogs?section=allblogs");
    const found = res.data.find((b) => b._id === id);
    setBlog(found);
  };

  if (!blog) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-white py-16 px-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">
          {blog.title}
        </h1>

        <p className="text-slate-500 mb-4">
          By {blog.uploadedBy}
        </p>

        <p className="text-lg text-slate-700 leading-8 mb-10">
          {blog.description}
        </p>

        <a
          href={blog.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-slate-900 text-white px-6 py-3 rounded-md"
        >
          Read Full Document
        </a>
      </div>
    </div>
  );
}
