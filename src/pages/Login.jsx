import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 clear old auth data
    localStorage.clear();

    try {
      setLoading(true);

      const res = await api.post("/api/login", form);

      // ✅ safety check
      if (!res.data?.token || !res.data?.role) {
        throw new Error("Invalid login response");
      }

      // ✅ Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      const userData = {
        role: res.data.role,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // ✅ FIX: always redirect to HOME
      navigate("/", { replace: true });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border"
          onChange={handleChange}
          required
        />

        <button
          className="w-full bg-black text-white py-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-sm">
          No account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
}
