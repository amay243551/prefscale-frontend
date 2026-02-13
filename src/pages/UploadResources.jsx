import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function UploadResource() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("foundations");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !file) {
      alert("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("file", file);

    try {
      setLoading(true);

      await api.post(
        "/api/admin/upload-resource",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Resource uploaded successfully 🚀");
      navigate("/resources");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white py-16 px-6">
      <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl">

        <h2 className="text-4xl font-bold mb-10 text-center">
          📂 Upload Resource
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
              placeholder="Enter resource title"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <label className="block mb-2 text-sm">Description</label>
            <textarea
              className="w-full p-3 rounded-lg text-black"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
            />
          </div>

          {/* CATEGORY */}
          <div className="mb-6">
            <label className="block mb-2 text-sm">Category</label>
            <select
              className="w-full p-3 rounded-lg text-black"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="foundations">Foundations</option>
              <option value="deepdive">DeepDive</option>
            </select>
          </div>

          {/* FILE UPLOAD */}
          <div className="mb-8">
            <label className="block mb-2 text-sm">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-sm"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition duration-300 shadow-lg"
          >
            {loading ? "Uploading..." : "Upload Resource"}
          </button>

        </form>
      </div>
    </div>
  );
}
