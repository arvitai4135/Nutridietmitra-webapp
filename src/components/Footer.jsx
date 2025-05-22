import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaFlickr,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../admin/services/api";
import Appointment from "./form/Appointment";
import { toast } from "react-toastify";

// Placeholder images for consistency
const placeholderImages = [
  "https://picsum.photos/600/400?random=1",
  "https://picsum.photos/600/400?random=2",
  "https://picsum.photos/600/400?random=3",
  "https://picsum.photos/600/400?random=4",
  "https://picsum.photos/600/400?random=5",
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  return placeholderImages[randomIndex];
};

const LinkIcon = () => (
  <span className="w-2 h-2 bg-nutricare-green mr-1.5 inline-block rounded-full"></span>
);

const BlogModal = ({ isOpen, onClose, blog }) => {
  if (!isOpen || !blog) return null;

  const modalRef = useRef(null);

  const renderBodyContent = (item, index) => {
    switch (item.type) {
      case "heading":
        const HeadingTag = `h${item.level || 2}`;
        return (
          <HeadingTag
            key={index}
            className="text-lg font-semibold text-white mt-3"
          >
            {item.content}
          </HeadingTag>
        );
      case "paragraph":
        return (
          <p
            key={index}
            className="text-gray-300 text-sm mt-2 leading-relaxed"
          >
            {item.content}
          </p>
        );
      case "image":
        return (
          <div key={index} className="mt-3">
            <img
              src={item.url || getRandomImage()}
              srcSet={`${item.url || getRandomImage()} 600w, ${
                item.url || getRandomImage()
              } 300w`}
              sizes="(max-width: 600px) 100vw, 600px"
              alt={item.caption || "Blog Image"}
              className="w-full h-auto rounded-lg max-w-full mx-auto shadow-md transition-transform duration-300 hover:scale-[1.02]"
              loading="lazy"
              onError={(e) => {
                console.error(`Failed to load modal image: ${item.url}`);
                e.target.src = getRandomImage();
              }}
            />
            {item.caption && (
              <p className="text-nutricare-green text-xs mt-1 italic text-center">
                {item.caption}
              </p>
            )}
          </div>
        );
      case "list":
        return (
          <ul
            key={index}
            className={`mt-2 ${
              item.style === "bullet" ? "list-disc pl-5" : "list-decimal pl-5"
            }`}
          >
            {item.items.map((listItem, i) => (
              <li
                key={i}
                className="text-gray-300 text-sm mt-1 leading-relaxed"
              >
                {listItem}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  const hasContent = blog.body.some(
    (item) => item.type === "heading" || item.type === "paragraph" || item.type === "list"
  );

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal || !isOpen) return;

    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "Tab") {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => {
      modal.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-2 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-nutricare-text-dark p-4 rounded-xl w-full max-w-[95vw] sm:max-w-lg md:max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl border border-nutricare-green border-opacity-20 transform transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg mb-3">
          <div className="flex justify-between items-center">
            <h2
              id="modal-title"
              className="text-lg sm:text-xl font-bold text-white"
            >
              <span className="text-nutricare-green">{blog.title.slice(0, 1)}</span>
              {blog.title.slice(1)}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-nutricare-green p-1.5 rounded-full bg-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center text-xs sm:text-sm text-gray-400 mt-2">
            <FaCalendarAlt className="mr-1.5 text-nutricare-green" size={14} />
            <span>{blog.date}</span>
          </div>
        </div>
        <div className="border-t-2 border-nutricare-green border-opacity-30 pt-3">
          {blog.body.length > 0 ? (
            <div role="region" aria-label="Blog content">
              {blog.body.map((item, index) => renderBodyContent(item, index))}
            </div>
          ) : (
            <p className="text-gray-300 text-sm">No content available for this blog.</p>
          )}
          {!hasContent && blog.body.every((item) => item.type === "image") && (
            <p className="text-gray-300 text-sm mt-2">
              This blog contains only images.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isFetching = useRef(false);
  const cache = useRef(null);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      if (isFetching.current) return;
      if (cache.current) {
        setRecentPosts(cache.current);
        setLoading(false);
        return;
      }

      isFetching.current = true;
      try {
        setLoading(true);
        const response = await api.get("/blogs/all_blog_lists");

        if (response.data.success && Array.isArray(response.data.data)) {
          const sortedBlogs = response.data.data
            .filter((blog) => {
              const isValid =
                blog.title &&
                blog.created_at &&
                blog.status &&
                blog.body.some((item) => item.type === "image");
              return isValid;
            })
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 3);

          const formattedBlogs = sortedBlogs.map((blog) => {
            const imageObj = blog.body.find((item) => item.type === "image");
            const imageUrl = imageObj?.url || getRandomImage();

            let formattedDate;
            try {
              formattedDate = new Date(
                blog.publish_date || blog.created_at
              ).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              });
            } catch (e) {
              console.warn(`Invalid date for blog ${blog.id}:`, blog.created_at);
              formattedDate = "Unknown Date";
            }

            return {
              id: blog.id,
              title: blog.title || "Untitled",
              date: formattedDate,
              image: imageUrl,
              slug: blog.slug || `blog-${blog.id}`,
            };
          });

          cache.current = formattedBlogs;
          setRecentPosts(formattedBlogs);
        } else {
          throw new Error("Invalid blog data received");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        const errorMessage =
          err.response?.data?.message ||
          "Failed to load recent posts. Please try again later.";
        setError(errorMessage);
        setRecentPosts([]);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
        isFetching.current = false;
      }
    };

    fetchRecentBlogs();
  }, []);

  const handleBlogClick = async (blogId) => {
    try {
      const response = await api.get(`/blogs/get_blog/${blogId}`);

      if (response.data.success && response.data.data) {
        const blogData = response.data.data;
        let formattedDate;
        try {
          formattedDate = new Date(
            blogData.publish_date || blogData.created_at
          ).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          });
        } catch (e) {
          console.warn(`Invalid date for blog ${blogId}:`, blogData.created_at);
          formattedDate = "Unknown Date";
        }

        const formattedBlog = {
          id: blogData.id,
          title: blogData.title || "Untitled",
          date: formattedDate,
          body: blogData.body || [],
        };

        setSelectedBlog(formattedBlog);
        setIsModalOpen(true);
      } else {
        throw new Error("Invalid blog data received");
      }
    } catch (err) {
      console.error(`Error fetching blog ID ${blogId}:`, err);
      const errorMessage =
        err.response?.status === 404
          ? "Blog not found."
          : err.response?.status === 422
          ? "Invalid blog ID."
          : "Failed to load blog details. Please try again later.";
      toast.error(errorMessage);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <footer className="bg-nutricare-text-dark text-white">
      <div className="container mx-auto px-4 py-6 max-w-screen min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="min-w-0">
            <div className="mb-3">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-nutricare-green flex items-center justify-center mr-2">
                  <span className="text-nutricare-text-dark font-bold text-base sm:text-lg">
                    N
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold">
                  NutriDietMitra
                </h2>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-2">
                Founded by Dt. Tanu Bhargava in 2014, NutriDietMitra is a premier
                diet clinic in Jaipur with over 17 years of expertise in nutrition
                and wellness.
              </p>
              <div className="w-12 h-1 bg-nutricare-green mb-2"></div>
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-nutricare-green mr-2" size={14} />
                <a
                  href="mailto:Nutridietmitra@gmail.com"
                  className="text-gray-400 text-xs sm:text-sm hover:text-nutricare-green transition duration-300"
                >
                  Nutridietmitra@gmail.com
                </a>
              </div>
              <div className="flex items-center mb-2">
                <FaPhone className="text-nutricare-green mr-2" size={14} />
                <a
                  href="tel:+917568153534"
                  className="text-gray-400 text-xs sm:text-sm hover:text-nutricare-green transition duration-300"
                >
                  +91-7568153534
                </a>
              </div>
              <div className="flex space-x-2">
                <a
                  href="#"
                  className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-white" size={12} />
                </a>
                <a
                  href="#"
                  className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-white" size={12} />
                </a>
                <a
                  href="#"
                  className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300"
                  aria-label="Flickr"
                >
                  <FaFlickr className="text-white" size={12} />
                </a>
                <a
                  href="#"
                  className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-nutricare-green transition duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="text-white" size={12} />
                </a>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold mb-2 relative">
              <span className="relative z-10">Quick Links</span>
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-nutricare-green"></span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Personalized Nutrition
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Wellness Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Individual Coaching
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Sports Nutrition
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Child Nutrition
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setIsAppointmentOpen(true)}
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300 w-full text-left"
                >
                  <LinkIcon />
                  Make Appointments
                </button>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-gray-400 hover:text-nutricare-green flex items-center transition duration-300"
                >
                  <LinkIcon />
                  Online Consultations
                </Link>
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold mb-2 relative">
              <span className="relative z-10">Recent Posts</span>
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-nutricare-green"></span>
            </h3>
            {loading ? (
              <p className="text-gray-400 text-xs sm:text-sm">Loading posts...</p>
            ) : error ? (
              <p className="text-red-500 text-xs sm:text-sm">
                Failed to load recent posts. Please try again later.
              </p>
            ) : recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex space-x-2 mb-2"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                    <img
                      src={post.image}
                      srcSet={`${post.image} 600w, ${post.image} 300w`}
                      sizes="(max-width: 600px) 100vw, 300px"
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        console.error(`-Failed to load image: ${post.image}`);
                        e.target.src = getRandomImage();
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center text-xs sm:text-sm text-gray-400 mb-1">
                      <FaCalendarAlt
                        className="mr-1.5 text-nutricare-green"
                        size={12}
                      />
                      <span>{post.date}</span>
                    </div>
                    <button
                      onClick={() => handleBlogClick(post.id)}
                      className="text-xs sm:text-sm text-left hover:text-nutricare-green transition duration-300 leading-tight line-clamp-2"
                    >
                      {post.title}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-xs sm:text-sm">
                No recent posts available.
              </p>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold mb-2 relative">
              <span className="relative z-10">Newsletter</span>
              <span className="absolute bottom-0 left-0 w-10 h-1 bg-nutricare-green"></span>
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mb-2 leading-relaxed">
              Subscribe for exclusive wellness tips, diet plans, and updates from
              Dt. Tanu Bhargava.
            </p>
            <form className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  name="EMAIL"
                  placeholder="Your email address..."
                  required
                  className="w-full p-2 text-xs sm:text-sm rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-nutricare-green min-h-[40px]"
                />
                <input
                  type="submit"
                  value="Subscribe"
                  className="w-full sm:w-auto bg-nutricare-green text-white py-2 px-4 text-xs sm:text-sm rounded-md hover:bg-nutricare-green-dark transition duration-300 cursor-pointer min-h-[40px]"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-3 max-w-screen min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <div className="text-gray-400 text-xs sm:text-sm">
              Copyright © {new Date().getFullYear()}{" "}
              <Link
                to="/"
                className="text-nutricare-green hover:text-white transition duration-300"
              >
                NutriDietMitra
              </Link>
              . All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center sm:justify-end gap-x-2 gap-y-1 text-xs sm:text-sm">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-nutricare-green transition duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-nutricare-green transition duration-300"
              >
                T&C
              </Link>
              <Link
                to="/refund"
                className="text-gray-400 hover:text-nutricare-green transition duration-300"
              >
                Refund Policy
              </Link>
              <Link
                to="/shipping"
                className="text-gray-400 hover:text-nutricare-green transition duration-300"
              >
                Shipping Policy
              </Link>
              <Link
                to="/contact"
                className="text-gray-400 hover:text-nutricare-green transition duration-300"
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-nutricare-green transition duration-300"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Appointment
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        selectedService="General Appointment"
      />

      <BlogModal
        isOpen={isModalOpen}
        onClose={closeModal}
        blog={selectedBlog}
      />

      <button
        className="fixed bottom-4 right-4 w-10 h-10 rounded-full bg-nutricare-green flex items-center justify-center shadow-lg hover:bg-nutricare-green-dark transition duration-300 z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;