/*
import { useState } from "react";
import api from "../utils/api";   // ✅ USE API UTILITY

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill all required fields");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      // ✅ CALL RENDER BACKEND
      const res = await api.post("/api/contact", form);

      alert(res.data.message);
      setForm({ name: "", company: "", email: "", message: "" });

    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* IMAGE HERO */}
/*      <section className="relative">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
          alt="Team discussion"
          className="w-full h-[70vh] object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="max-w-6xl mx-auto px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-semibold">
              Let’s Talk About Performance
            </h1>
            <p className="mt-4 max-w-xl text-gray-200">
              Discuss scalability, load testing, and performance
              engineering challenges with our experts.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */
/*
}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16">

          {/* LEFT TEXT *//*}
          <div className="flex items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Start a Performance Conversation
              </h2>

              <p className="mt-6 text-gray-600 leading-relaxed max-w-md">
                Whether you’re experiencing performance issues or planning
                large-scale testing, our engineers will guide you with
                actionable insights tailored to your system.
              </p>
            </div>
          </div>

          {/* FORM *//*
          }
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-xl shadow-lg space-y-6"
          >
            <Input
              label="Full Name *"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <Input
              label="Company"
              name="company"
              value={form.company}
              onChange={handleChange}
            />

            <Input
              label="Work Email *"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <div>
              <label className="text-sm text-gray-600">
                Message *
              </label>
              <textarea
                name="message"
                rows="4"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Describe your performance challenge..."
                className="mt-2 w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

        </div>
      </section>
    </div>
  );
}

/* ---------- INPUT COMPONENT ---------- */
/*
function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        name={name}
        required={label.includes("*")}
        value={value}
        onChange={onChange}
        className="mt-2 w-full border rounded-md px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}
*/
