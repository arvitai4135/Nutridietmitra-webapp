import React, { useEffect, useState, lazy, Suspense, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

// Authentication Context
import { AuthProvider, AuthContext } from "../src/admin/context/AuthContext";

// Website Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import ErrorBoundary from "./errorBoundary/ErrorBoundary";

// Website Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Refund from "./components/Refund";
import TermsAndConditions from "./components/Terms&Condition.jsx";
import Shipping from "./components/Shipping";
import OrderConfirmation from "./components/OrderConfirmation.jsx";

// Admin Components (Lazy Loaded)
const Dashboard = lazy(() => import("../src/admin/components/Dashboard.jsx"));
const Login = lazy(() => import("../src/admin/components/Login.jsx"));
const Signup = lazy(() => import("../src/admin/components/Signup.jsx"));
const ForgotPassword = lazy(() => import("../src/admin/components/passwords/ForgotPassword.jsx"));
const ChangePassword = lazy(() => import("../src/admin/components/passwords/ChangePassword.jsx"));
const ResetPassword = lazy(() => import("../src/admin/components/passwords/ResetPassword.jsx"));
const BlogEditor = lazy(() => import("../src/admin/components/tiptapEditor/TiptapEditor.jsx"));
const Booking = lazy(() => import("../src/admin/pages/Booking.jsx"));
const Plans = lazy(() => import("../src/admin/components/Plans.jsx"));
const AdminBlog = lazy(() => import("../src/pages/Blogs.jsx"));
// const AdminContact = lazy(() => import("../src/admin/pages/Contact.jsx"));

const theme = createTheme();

// ScrollToTop component for public routes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

// ProtectedRoute component for admin routes
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, user, justSignedUp } = useContext(AuthContext);
  
  if (!isLoggedIn) {
    console.log('User not logged in, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  // If user just signed up, allow them to stay on the current route (likely /)
  if (justSignedUp) {
    console.log('User just signed up, allowing current route:', window.location.pathname);
    return children;
  }

  // Restrict /dashboard to admin only
  if (window.location.pathname.startsWith('/dashboard') && user?.email !== 'guptakishna45@gmail.com') {
    console.log('Non-admin access to /dashboard blocked, redirecting to /');
    return <Navigate to="/" replace />;
  }

  return children;
};

// Layout for public routes
const PublicLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <TopBar />
    <Header />
    <Navbar />
    <ScrollToTop />
    <ErrorBoundary>
      <main className="flex-grow">{children}</main>
    </ErrorBoundary>
    <Footer />
  </div>
);

// Layout for admin routes
const AdminLayout = ({ children }) => (
  <Suspense fallback={<CircularProgress style={{ display: "block", margin: "50px auto" }} />}>
    {children}
  </Suspense>
);

function App() {
  const [blogContent, setBlogContent] = useState("");

  const handleSaveBlog = (blogData) => {
    console.log("Blog saved:", blogData);
    // Backend integration would go here
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <About />
                </PublicLayout>
              }
            />
            <Route
              path="/services"
              element={
                <PublicLayout>
                  <Services />
                </PublicLayout>
              }
            />
            <Route
              path="/blogs"
              element={
                <PublicLayout>
                  <Blogs />
                </PublicLayout>
              }
            />
            <Route
              path="/gallery"
              element={
                <PublicLayout>
                  <Gallery />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <Contact />
                </PublicLayout>
              }
            />
            <Route
              path="/privacy"
              element={
                <PublicLayout>
                  <PrivacyPolicy />
                </PublicLayout>
              }
            />
            <Route
              path="/refund"
              element={
                <PublicLayout>
                  <Refund />
                </PublicLayout>
              }
            />
            <Route
              path="/terms"
              element={
                <PublicLayout>
                  <TermsAndConditions />
                </PublicLayout>
              }
            />
            <Route
              path="/shipping"
              element={
                <PublicLayout>
                  <Shipping />
                </PublicLayout>
              }
            />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />

            {/* Admin Routes */}
            <Route
              path="/login"
              element={
                <AdminLayout>
                  <Login />
                </AdminLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AdminLayout>
                  <Signup />
                </AdminLayout>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <AdminLayout>
                  <ForgotPassword />
                </AdminLayout>
              }
            />
            <Route
              path="/reset-password"
              element={
                <AdminLayout>
                  <ResetPassword />
                </AdminLayout>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ChangePassword />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            >
              <Route path="booking" element={<Booking />} />
              <Route path="plans" element={<Plans />} />
              <Route path="blog" element={<AdminBlog />} />
              {/* <Route path="contact" element={<AdminContact />} /> */}
            </Route>
            <Route
              path="/editor"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <BlogEditor initialContent={blogContent} onSave={handleSaveBlog} />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;