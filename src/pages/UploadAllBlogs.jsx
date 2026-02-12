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
  const [loading, setLoading] = useState(false);

  // ✅ Safe Image Upload
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white py-16 px-6">
      <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10">

        <h2 className="text-4xl font-bold mb-8 text-center">
          Create New Blog
        </h2>

        <form onSubmit={handleSubmit}>

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

          <div className="mb-8">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>

        </form>
      </div>
    </div>
  );
}
