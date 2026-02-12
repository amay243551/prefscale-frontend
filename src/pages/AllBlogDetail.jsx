import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

export default function AllBlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const res = await api.get("/api/blogs?section=allblogs");
    const found = res.data.find((b) => b._id === id);
    setBlog(found);
  };

  if (!blog) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <p className="text-slate-600 mb-4">
        Uploaded by {blog.uploadedBy}
      </p>
      <p className="text-lg mb-8">{blog.description}</p>

      <a
        href={blog.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-slate-900 text-white px-6 py-3 rounded"
      >
        Read Full Document
      </a>
    </div>
  );
}
