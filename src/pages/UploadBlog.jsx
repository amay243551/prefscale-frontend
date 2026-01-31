import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function UploadBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("foundations");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !category) {
      alert("File and category required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category); // ✅ REQUIRED
      formData.append("file", file);          // ✅ REQUIRED

      await api.post("/api/admin/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog uploaded successfully ✅");
      navigate("/blog");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload Blog (Admin)
        </h2>

        <input
          type="text"
          placeholder="Blog Title"
          className="w-full mb-4 p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Blog Description"
          className="w-full mb-4 p-2 border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* ✅ CATEGORY DROPDOWN */}
        <select
          className="w-full mb-4 p-2 border"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="foundations">Foundations</option>
          <option value="deep">Deep Dive</option>
        </select>

        {/* ✅ FILE INPUT */}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="w-full mb-4"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2"
        >
          {loading ? "Uploading..." : "Upload Blog"}
        </button>
      </form>
    </div>
  );
}
