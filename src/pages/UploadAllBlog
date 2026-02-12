import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function UploadAllBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    await api.post("/api/admin/upload-allblog", formData);

    alert("Blog uploaded successfully 🚀");
    navigate("/allblogs");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl w-[500px]"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Upload New Blog
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 mb-4 rounded text-black"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 mb-4 rounded text-black"
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="mb-6"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button className="w-full bg-blue-600 py-3 rounded">
          Upload Blog
        </button>
      </form>
    </div>
  );
}
