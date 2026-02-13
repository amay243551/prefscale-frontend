import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Resources from "./pages/Resources";
import Capabilities from "./pages/Capabilities";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UploadResources from "./pages/UploadResources";
import ProtectedRoute from "./components/ProtectedRoute";
import AllBlogs from "./pages/AllBlogs";
import AllBlogDetail from "./pages/AllBlogDetail";
import UploadAllBlog from "./pages/UploadAllBlog";

/* ======== TOOL PAGES IMPORT ======== */
import JMeter from "./pages/tools/JMeter";
import LoadRunner from "./pages/tools/LoadRunner";
import NeoLoad from "./pages/tools/NeoLoad";
import Locust from "./pages/tools/Locust";
import Dynatrace from "./pages/tools/Dynatrace";

/* ======== Capability Pages ======== */
import LoadTesting from "./pages/capabilities/LoadTesting";
import StressTesting from "./pages/capabilities/StressTesting";
import EnduranceTesting from "./pages/capabilities/EnduranceTesting";
import SpikeTesting from "./pages/capabilities/SpikeTesting";
import EarlyPerformance from "./pages/capabilities/EarlyPerformance";
import UIPerformance from "./pages/capabilities/UIPerformance";
import MobilePerformance from "./pages/capabilities/MobilePerformance";
import APIPerformance from "./pages/capabilities/APIPerformance";
import CloudPerformance from "./pages/capabilities/CloudPerformance";
import ScalabilityTesting from "./pages/capabilities/ScalabilityTesting";



function AnimatedRoutes({ user, setUser }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        {/* ===== Main Pages ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/capabilities" element={<Capabilities />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/allblogs" element={<AllBlogs />} />
        <Route path="/allblogs/:id" element={<AllBlogDetail />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />

        {/* ===== Tool Pages (NEW) ===== */}
        <Route path="/tools/jmeter" element={<JMeter />} />
        <Route path="/tools/loadrunner" element={<LoadRunner />} />
        <Route path="/tools/neoload" element={<NeoLoad />} />
        <Route path="/tools/locust" element={<Locust />} />
        <Route path="/tools/dynatrace" element={<Dynatrace />} />

        {/* ===== Protected Routes ===== */}
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

        {/* ===== Capability Testing Routes ===== */}
<Route path="/capabilities/load-testing" element={<LoadTesting />} />
<Route path="/capabilities/stress-testing" element={<StressTesting />} />
<Route path="/capabilities/endurance-testing" element={<EnduranceTesting />} />
<Route path="/capabilities/spike-testing" element={<SpikeTesting />} />
<Route path="/capabilities/early-performance" element={<EarlyPerformance />} />
<Route path="/capabilities/ui-performance" element={<UIPerformance />} />
<Route path="/capabilities/mobile-performance" element={<MobilePerformance />} />
<Route path="/capabilities/api-performance" element={<APIPerformance />} />
<Route path="/capabilities/cloud-performance" element={<CloudPerformance />} />
<Route path="/capabilities/scalability-testing" element={<ScalabilityTesting />} />
        
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
