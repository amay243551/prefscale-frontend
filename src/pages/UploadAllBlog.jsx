import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import api from "../utils/api";

export default function UploadAllBlog() {
  const navigate = useNavigate();
  const quillRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= IMAGE UPLOAD FOR EDITOR ================= */

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await api.post(
          "/api/admin/upload-image",
          formData
        );

        const imageUrl = res.data.url;

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", imageUrl);
      } catch (err) {
        console.error(err);
        alert("Image upload failed");
      }
    };
  };

  /* ================= THUMBNAIL UPLOAD ================= */

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post(
        "/api/admin/upload-image",
        formData
      );

      setThumbnail(res.data.url);
      setThumbnailPreview(res.data.url);
    } catch (err) {
      alert("Thumbnail upload failed");
    }
  };

  /* ================= QUILL MODULES ================= */

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !content) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/api/admin/upload-allblog", {
        title,
        description,
        content,
        thumbnail,
      });

      alert("Blog uploaded successfully 🚀");
      navigate("/allblogs");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl">

        <h2 className="text-4xl font-bold mb-10 text-center">
          🚀 Create New Blog
        </h2>

        <form onSubmit={handleSubmit}>

          {/* TITLE */}
          <div className="mb-6">
            <label className="block mb-2 text-sm">Title</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <label className="block mb-2 text-sm">Short Description</label>
            <input
              type="text"
              className="w-full p-3 rounded-lg text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short summary"
            />
          </div>

          {/* THUMBNAIL */}
          <div className="mb-6">
            <label className="block mb-2 text-sm">Blog Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="text-sm"
            />

            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-4 rounded-xl shadow-lg w-full max-h-64 object-cover"
              />
            )}
          </div>

          {/* RICH TEXT EDITOR */}
          <div className="mb-10">
            <label className="block mb-2 text-sm">Blog Content</label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              ref={quillRef}
              className="bg-white text-black rounded-lg"
              style={{ height: "400px", marginBottom: "50px" }}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>

        </form>
      </div>
    </div>
  );
}
