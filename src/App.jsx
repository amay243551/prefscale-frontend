import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import UploadBlog from "./pages/UploadBlog";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      if (!stored || stored === "undefined") return null;
      return JSON.parse(stored);
    } catch (err) {
      console.error("Failed to parse user from localStorage", err);
      localStorage.removeItem("user");
      return null;
    }
  });

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        {/* 🔐 ADMIN ONLY: Upload Blog (DIRECT PAGE, NOT DASHBOARD) */}
        <Route
          path="/upload-blog"
          element={
            <ProtectedRoute>
              <UploadBlog />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
