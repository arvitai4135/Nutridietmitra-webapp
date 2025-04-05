import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

// Importing Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

// Importing Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Refund from "./components/Refund";
import TermsAndConditions from "./components/Terms&Condition";
import Shipping from "./components/Shipping";

// ScrollToTop component to handle scrolling on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <Header />
        <Navbar />
        <ScrollToTop /> {/* Add this to handle scroll on all route changes */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/shipping" element={<Shipping />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;