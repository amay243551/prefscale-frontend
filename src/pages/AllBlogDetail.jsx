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
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await api.get(`/api/blog/${id}`);
        setBlog(blogRes.data);

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
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <div className="bg-gradient-to-r from-slate-900 to-black text-white py-16 px-6">
        <button
          onClick={() => navigate("/allblogs")}
          className="flex items-center gap-2 text-sm mb-6"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </button>

        <h1 className="text-4xl font-bold">
          {blog.title}
        </h1>

        <div className="flex gap-6 mt-6 text-sm opacity-80">
          <span>By {blog.uploadedBy}</span>
          <span>
            {new Date(blog.createdAt).toDateString()}
          </span>
        </div>

        {/* SHARE + DOWNLOAD */}
        <div className="flex items-center gap-4 mt-8 flex-wrap">
          <span className="text-sm">Share:</span>

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
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
          >
            <Download size={16} />
            Download PDF
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex gap-16">
        <div className="w-2/3" ref={contentRef}>

          {blog.thumbnail && (
            <img
              src={blog.thumbnail}
              className="rounded-xl mb-10 shadow-lg"
              alt="thumbnail"
            />
          )}

          <div
            className="prose max-w-none"
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
                className="flex items-center gap-2 px-4 py-2 rounded bg-red-600 text-white"
              >
                <Trash2 size={16} />
                Delete
              </button>
            )}
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
      className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-white hover:text-black cursor-pointer"
    >
      {icon}
    </div>
  );
}
