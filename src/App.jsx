import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Resources  from "./pages/Resources";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UploadResources from "./pages/UploadResources";
import ProtectedRoute from "./components/ProtectedRoute";
import AllBlogs from "./pages/AllBlogs";
import AllBlogDetail from "./pages/AllBlogDetail";
import UploadAllBlog from "./pages/UploadAllBlog";



function AnimatedRoutes({ user, setUser }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/resources" element={<Resources  />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/allblogs/:id" element={<AllBlogDetail />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        <Route
  path="/upload-allblog"
  element={
    <ProtectedRoute>
      <UploadAllBlog />
    </ProtectedRoute>
  }
/>
        <Route
          path="/upload-resources"
          element={
            <ProtectedRoute>
              <UploadResources />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <AnimatedRoutes user={user} setUser={setUser} />
    </BrowserRouter>
  );
}
