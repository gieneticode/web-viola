import React, { useState, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Backdrop } from "./components/Bits.jsx";
import { AnimGrain, ScrollProgress } from "./components/Premium.jsx";
import Cursor from "./components/Cursor.jsx";
import Loader from "./components/Loader.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Work from "./pages/Work.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Process from "./pages/Process.jsx";
import Contact from "./pages/Contact.jsx";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <main>
      <div key={location.pathname} className="page-transition">
        <Routes location={location}>
          <Route path="/"           element={<Home />} />
          <Route path="/about"      element={<About />} />
          <Route path="/services"   element={<Services />} />
          <Route path="/work"       element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/process"    element={<Process />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="*"           element={<Home />} />
        </Routes>
      </div>
    </main>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const done = useCallback(() => setLoaded(true), []);
  return (
    <>
      {!loaded && <Loader onDone={done} />}
      <Cursor />
      <Backdrop />
      <AnimGrain />
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />
      <AnimatedRoutes />
      <Footer />
    </>
  );
}
