import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function UploadBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("foundations");
  const [section, setSection] = useState("allblogs");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || !description || !section) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("section", section);
      formData.append("file", file);

      await api.post("/api/admin/blog", formData);

      alert("Blog uploaded successfully ✅");

      navigate(section === "resources" ? "/resources" : "/allblogs");
    } catch (err) {
      alert(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload Blog
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 border rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <select
          className="w-full p-3 border rounded mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="foundations">Foundations</option>
          <option value="deep">Deep Dive</option>
        </select>

        <select
          className="w-full p-3 border rounded mb-4"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        >
          <option value="allblogs">All Blogs</option>
          <option value="resources">Resources</option>
        </select>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white py-3 rounded"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
