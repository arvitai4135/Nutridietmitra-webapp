import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';

// Importing Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Contact from './pages/Contact';


// Importing Components
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header and Navigation are persistent across all pages */}
        <TopBar />
        <Header />
        <Navbar />

        {/* Main content area with routes */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact/>} />
          </Routes>
        </main>

        {/* Footer is persistent across all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;