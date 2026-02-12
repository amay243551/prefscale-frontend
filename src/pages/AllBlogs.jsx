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
    try {
      const res = await api.get("/api/blogs?section=allblogs");
      setBlogs(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen bg-slate-100 py-16 px-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-12 text-center">
          All Blogs
        </h1>

        {blogs.length === 0 ? (
          <p className="text-center text-slate-500">
            No blogs uploaded yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2
                  className="text-xl font-semibold cursor-pointer hover:underline"
                  onClick={() => navigate(`/allblogs/${blog._id}`)}
                >
                  {blog.title}
                </h2>

                <p className="text-slate-600 mt-3 text-sm">
                  {blog.description}
                </p>

                <div className="mt-6 text-sm text-slate-500">
                  <p>By {blog.uploadedBy}</p>
                  <p>{formatDate(blog.createdAt)}</p>
                </div>

                <div className="flex gap-4 mt-4">
                  <Twitter
                    size={18}
                    className="cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${window.location.origin}/allblogs/${blog._id}`,
                        "_blank"
                      )
                    }
                  />
                  <Linkedin
                    size={18}
                    className="cursor-pointer"
                    onClick={() =>
                      window.open(
                        `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin}/allblogs/${blog._id}`,
                        "_blank"
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
