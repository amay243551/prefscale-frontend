import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Linkedin,
  Twitter,
  Facebook,
  ArrowLeft,
  Heart,
  Trash2,
  Download,
} from "lucide-react";
import api from "../utils/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function AllBlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef();

  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await api.get(`/api/blog/${id}`);
        setBlog(blogRes.data);

        const recentRes = await api.get(
          "/api/blogs?section=allblogs"
        );

        setRecentBlogs(recentRes.data.slice(0, 5));

        const likedBlogs =
          JSON.parse(localStorage.getItem("likedBlogs")) || [];

        if (likedBlogs.includes(id)) {
          setLiked(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* ================= LIKE ================= */

  const handleLike = async () => {
    if (liked) return;

    try {
      await api.post(`/api/blog/${id}/like`);

      const likedBlogs =
        JSON.parse(localStorage.getItem("likedBlogs")) || [];

      likedBlogs.push(id);
      localStorage.setItem(
        "likedBlogs",
        JSON.stringify(likedBlogs)
      );

      setBlog({ ...blog, likes: blog.likes + 1 });
      setLiked(true);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE ================= */

  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) return;

    try {
      await api.delete(`/api/admin/blog/${id}`);
      alert("Blog deleted");
      navigate("/allblogs");
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= DOWNLOAD PDF ================= */

  const handleDownload = async () => {
    const element = contentRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight =
      (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );
      heightLeft -= pageHeight;
    }

    pdf.save(
      `${blog.title
        .replace(/[^a-zA-Z0-9]/g, "_")
        .toLowerCase()}.pdf`
    );
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        Loading...
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        Blog not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-blue-50">

      {/* HERO */}
      <div className="bg-white shadow-sm py-12 px-6 border-b">
        <div className="max-w-7xl mx-auto">

          <button
            onClick={() => navigate("/allblogs")}
            className="flex items-center gap-2 text-sm mb-6 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={16} /> Back to Blogs
          </button>

          <h1 className="text-4xl font-bold text-slate-800">
            {blog.title}
          </h1>

          <div className="flex gap-6 mt-4 text-sm text-gray-500">
            <span>By {blog.uploadedBy}</span>
            <span>
              {new Date(blog.createdAt).toDateString()}
            </span>
          </div>

          {/* SHARE + DOWNLOAD */}
          <div className="flex items-center gap-4 mt-6 flex-wrap">

            <span className="text-sm text-gray-600">Share:</span>

            <IconShare
              icon={<Twitter size={18} />}
              url={`https://twitter.com/intent/tweet?url=${window.location.href}`}
            />

            <IconShare
              icon={<Facebook size={18} />}
              url={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
            />

            <IconShare
              icon={<Linkedin size={18} />}
              url={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
            />

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Download size={16} />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16">

        {/* LEFT SIDE */}
        <div
          className="lg:w-2/3 w-full bg-white p-10 rounded-2xl shadow-lg"
          ref={contentRef}
        >

          {blog.thumbnail && (
            <img
              src={blog.thumbnail}
              className="rounded-xl mb-10 shadow-md"
              alt="thumbnail"
            />
          )}

          <div
            className="prose prose-lg max-w-full break-words"
            dangerouslySetInnerHTML={{
              __html: blog.content || "",
            }}
          />

          {/* LIKE + DELETE */}
          <div className="mt-12 flex items-center gap-6">
            <button
              onClick={handleLike}
              disabled={liked}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border transition 
              ${
                liked
                  ? "bg-red-500 text-white"
                  : "hover:bg-red-100 hover:text-red-600"
              }`}
            >
              <Heart size={18} />
              {blog.likes || 0}
            </button>

            {user?.role === "admin" && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:w-1/3 w-full">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-slate-800">
              Recent Articles
            </h3>

            <div className="space-y-4">
              {recentBlogs
                .filter((item) => item._id !== id)
                .map((item) => (
                  <div
                    key={item._id}
                    onClick={() =>
                      navigate(`/allblogs/${item._id}`)
                    }
                    className="cursor-pointer border p-4 rounded-lg hover:shadow-md transition"
                  >
                    <h4 className="font-medium text-slate-800">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(
                        item.createdAt
                      ).toDateString()}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function IconShare({ icon, url }) {
  return (
    <div
      onClick={() => window.open(url, "_blank")}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-blue-100 hover:text-blue-600 cursor-pointer transition"
    >
      {icon}
    </div>
  );
}
