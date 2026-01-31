import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function UploadBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    formData.append("file", file); // 🔴 MUST be "file"

    try {
      setLoading(true);
      await api.post("/api/admin/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Blog uploaded successfully");
      navigate("/blog"); // after upload
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-8">Upload Blog (Admin)</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full mb-4 p-2 border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Blog Description"
          className="w-full mb-4 p-2 border"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="mb-4"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
