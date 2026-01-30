import { useState } from "react";
import api from "../utils/api";

export default function AboutUs() {
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

    try {
      setLoading(true);
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
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1531297484001-80022131f5a1"
          alt="Performance Engineering"
          className="w-full h-[80vh] object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-7xl mx-auto px-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Engineering <br /> Performance at Scale
            </h1>
            <p className="mt-6 max-w-xl text-slate-300 text-lg">
              PREFSCALE ensures systems never fail when it matters most.
            </p>
          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="border-l-4 border-slate-300 pl-8">
            <h2 className="text-3xl font-bold text-slate-800">Our Story</h2>
            <p className="mt-6 text-slate-600">
              PREFSCALE was founded to solve a recurring problem — systems that
              pass functional tests but fail under real traffic.
            </p>
            <p className="mt-4 text-slate-600">
              Performance issues are often found too late, during outages or
              customer complaints.
            </p>
            <p className="mt-4 font-semibold text-slate-800">
              We decided to change that mindset.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              alt="Team collaboration"
              className="w-full h-64 object-cover"
            />
            <div className="p-8 text-sm text-slate-500">
              Real-world traffic requires real performance engineering
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-10">
          <InfoCard
            title="Our Mission"
            desc="Help teams predict failures before users experience them."
          />
          <InfoCard
            title="Our Vision"
            desc="Make performance a design decision, not a post-release emergency."
          />
        </div>
      </section>

      {/* ================= HOW WE WORK ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-slate-800">
            How We Approach Performance
          </h2>
          <div className="mt-16 space-y-12">
            <TimelineStep step="01" title="Understand the System" desc="Analyze architecture and traffic patterns." />
            <TimelineStep step="02" title="Model Real Traffic" desc="Simulate real-world load and spikes." />
            <TimelineStep step="03" title="Measure What Matters" desc="Latency, throughput, and errors." />
            <TimelineStep step="04" title="Continuous Performance" desc="Integrated into CI/CD pipelines." />
          </div>
        </div>
      </section>

      {/* ================= CONTACT US ================= */}
      <section className="py-24 bg-gray-100">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16">

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Contact Us
            </h2>
            <p className="mt-6 text-slate-600 max-w-md">
              Let’s discuss performance challenges, scalability issues, or
              testing strategies tailored to your system.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-xl shadow-lg space-y-6"
          >
            <Input label="Full Name *" name="name" value={form.name} onChange={handleChange} />
            <Input label="Company" name="company" value={form.company} onChange={handleChange} />
            <Input label="Work Email *" name="email" type="email" value={form.email} onChange={handleChange} />

            <div>
              <label className="text-sm text-gray-600">Message *</label>
              <textarea
                name="message"
                rows="4"
                required
                value={form.message}
                onChange={handleChange}
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

/* ================= REUSABLE COMPONENTS ================= */

function InfoCard({ title, desc }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-10">
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
      <p className="mt-4 text-slate-600">{desc}</p>
    </div>
  );
}

function TimelineStep({ step, title, desc }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="text-slate-400 font-semibold text-xl">{step}</div>
      <div>
        <h4 className="text-xl font-semibold text-slate-800">{title}</h4>
        <p className="mt-2 text-slate-500 max-w-2xl">{desc}</p>
      </div>
    </div>
  );
}

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
