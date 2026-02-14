import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function UploadResources() {
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

      await api.post("/api/admin/upload-resource", formData);

      alert("Resource uploaded successfully 🚀");
      navigate("/resources");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white py-16 px-6">
      <div className="max-w-xl mx-auto bg-white/5 p-10 rounded-3xl">

        <h2 className="text-4xl font-bold mb-10 text-center">
          📂 Upload Resource
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 mb-6 rounded text-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 mb-6 rounded text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full p-3 mb-6 rounded text-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="foundations">Foundations</option>
            <option value="deepdive">Deep Dive</option>
          </select>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-6"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 py-3 rounded"
          >
            {loading ? "Uploading..." : "Upload Resource"}
          </button>
        </form>
      </div>
    </div>
  );
}
