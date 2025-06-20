import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MessageSquare, User } from 'lucide-react'
import api from '../../admin/services/api'
import { toast } from 'react-toastify'

// List of random placeholder image URLs from picsum.photos
const placeholderImages = [
  'https://picsum.photos/600/400?random=1',
  'https://picsum.photos/600/400?random=2',
  'https://picsum.photos/600/400?random=3',
  'https://picsum.photos/600/400?random=4',
  'https://picsum.photos/600/400?random=5',
]

// Function to get a random placeholder image
const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length)
  return placeholderImages[randomIndex]
}

const BlogList = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeCard, setActiveCard] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [slidesToShow, setSlidesToShow] = useState(3)
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sliderContainerRef = useRef(null)
  const isFetching = useRef(false)
  const modalRef = useRef(null)

  // Modal component to display blog details
  const BlogModal = ({ isOpen, onClose, blog }) => {
    if (!isOpen || !blog) return null

    const renderBodyContent = (item, index) => {
      switch (item.type) {
        case 'heading': {
          const HeadingTag = `h${item.level || 2}`
          return (
            <HeadingTag
              key={index}
              className="text-lg sm:text-xl font-semibold text-[#333333] mt-4 sm:mt-6"
            >
              {item.content}
            </HeadingTag>
          )
        }
        case 'paragraph':
          return (
            <p
              key={index}
              className="text-[#718096] text-sm sm:text-base mt-3 leading-relaxed "
            >
              {item.content}
            </p>
          )
        case 'image':
          return (
            <div key={index} className="mt-4 sm:mt-6">
              <img
                src={item.url || getRandomImage()}
                alt={item.caption || 'Blog Image'}
                className="w-full h-auto rounded-lg max-w-[90vw] sm:max-w-lg md:max-w-2xl shadow-md transition-transform duration-300 hover:scale-[1.02]"
                onError={(e) => {
                  console.error(`Failed to load modal image: ${e.target.src}`)
                  e.target.src = getRandomImage()
                }}
              />
              {item.caption && (
                <p className="text-[#ADD01C] text-xs sm:text-sm mt-2 italic">
                  {item.caption}
                </p>
              )}
            </div>
          )
        case 'list':
          return (
            <ul
              key={index}
              className={`mt-3 sm:mt-4 ${
                item.style === 'bullet' ? 'list-disc pl-6' : 'list-decimal pl-6'
              }`}
            >
              {item.items.map((listItem, i) => (
                <li
                  key={i}
                  className="text-[#718096] text-sm sm:text-base mt-1"
                >
                  {listItem}
                </li>
              ))}
            </ul>
          )
        default:
          return null
      }
    }

    const hasContent = blog.body.some(
      (item) =>
        item.type === 'heading' ||
        item.type === 'paragraph' ||
        item.type === 'list'
    )

    // Handle Escape key to close modal
    useEffect(() => {
      const handleEsc = (event) => {
        if (event.key === 'Escape') {
          onClose()
        }
      }
      window.addEventListener('keydown', handleEsc)
      return () => {
        window.removeEventListener('keydown', handleEsc)
      }
    }, [onClose])

    return (
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      >
        <div
          ref={modalRef}
          className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-[95vw] sm:max-w-xl md:max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="bg-[#FCF0F8] p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
            <div className="flex justify-between items-center">
              <h2
                id="modal-title"
                className="text-xl sm:text-2xl font-bold text-[#333333]"
              >
                <span className="text-[#9E0B7F]">{blog.title.slice(0, 1)}</span>
                {blog.title.slice(1)}
              </h2>
              <button
                onClick={onClose}
                className="text-[#718096] hover:text-[#9E0B7F] p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-7 sm:w-7"
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
            <div className="flex items-center text-sm sm:text-base text-[#718096] mt-2">
              <span>{blog.date}</span>
            </div>
          </div>
          <div className="border-t-2 border-[#ADD01C] border-opacity-30 pt-4 sm:pt-6">
            {blog.body.length > 0 ? (
              <div role="region" aria-label="Blog content">
                {blog.body.map((item, index) => renderBodyContent(item, index))}
              </div>
            ) : (
              <p className="text-[#718096] text-sm sm:text-base">
                No content available for this blog.
              </p>
            )}
            {!hasContent &&
              blog.body.every((item) => item.type === 'image') && (
                <p className="text-[#718096] text-sm sm:text-base mt-3">
                  This blog contains only images.
                </p>
              )}
          </div>
        </div>
      </div>
    )
  }

  // Fetch recent blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      if (isFetching.current) {
        console.log('Already fetching, skipping...')
        return
      }

      isFetching.current = true
      try {
        setLoading(true)
        console.log('Fetching blogs...')
        const response = await api.get('/blogs/all_blog_lists')
        console.log('API Response:', response.data)

        if (response.data.success && Array.isArray(response.data.data)) {
          // Filter published blogs, sort by created_at, and take top 6
          const sortedBlogs = response.data.data
            .filter((blog) => blog.status && blog.title && blog.created_at)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 6)

          console.log('Sorted Blogs:', sortedBlogs)

          // Map API data to blogPosts structure
          const formattedBlogs = sortedBlogs.map((blog) => {
            const imageObj = blog.body.find((item) => item.type === 'image')
            const imageUrl = imageObj?.url || getRandomImage()
            let formattedDate
            try {
              const date = new Date(blog.publish_date || blog.created_at)
              formattedDate = {
                day: date.getDate().toString().padStart(2, '0'),
                month: date
                  .toLocaleString('en-US', { month: 'short' })
                  .toUpperCase(),
              }
            } catch (e) {
              console.warn(`Invalid date for blog ${blog.id}:`, blog.created_at)
              formattedDate = { day: '01', month: 'JAN' }
            }

            return {
              id: blog.id,
              title: blog.title || 'Untitled',
              image: imageUrl,
              date: formattedDate,
              comments: 5,
              author: 'Dt. Tanu Bhargava',
              excerpt: blog.description || 'No description available.',
            }
          })

          console.log('Formatted Blogs:', formattedBlogs)
          setBlogPosts(formattedBlogs)
        } else {
          throw new Error('Invalid blog data received')
        }
      } catch (err) {
        console.error('Error fetching blogs:', err)
        const errorMessage =
          err.response?.status === 404
            ? 'No blogs found.'
            : 'Failed to load blogs. Please try again later.'
        setError(errorMessage)
        setBlogPosts([])
        toast.error(errorMessage)
      } finally {
        setLoading(false)
        isFetching.current = false
        console.log('Fetch complete')
      }
    }

    fetchBlogs()
  }, [])

  // Handle responsive slides
  useEffect(() => {
    setIsVisible(true)

    const updateDimensions = () => {
      const width = window.innerWidth
      let slides = 3

      if (width < 640) {
        slides = 1
      } else if (width < 1024) {
        slides = 2
      }

      setSlidesToShow(slides)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  // Handle blog click to fetch and open modal
  const handleBlogClick = async (blogId) => {
    try {
      console.log(`Fetching blog ID ${blogId}...`)
      const response = await api.get(`/blogs/get_blog/${blogId}`)
      console.log(
        'Single Blog Response:',
        JSON.stringify(response.data, null, 2)
      )

      if (response.data.success && response.data.data) {
        const blogData = response.data.data
        let formattedDate
        try {
          formattedDate = new Date(
            blogData.publish_date || blogData.created_at
          ).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
        } catch (e) {
          console.warn(`Invalid date for blog ${blogId}:`, blogData.created_at)
          formattedDate = 'Unknown Date'
        }

        const formattedBlog = {
          id: blogData.id,
          title: blogData.title || 'Untitled',
          date: formattedDate,
          body: blogData.body || [],
        }

        console.log(
          'Formatted Blog for Modal:',
          JSON.stringify(formattedBlog, null, 2)
        )
        setSelectedBlog(formattedBlog)
        setIsModalOpen(true)
      } else {
        throw new Error('Invalid blog data received')
      }
    } catch (err) {
      console.error(`Error fetching blog ID ${blogId}:`, err)
      const errorMessage =
        err.response?.status === 404
          ? 'Blog not found.'
          : err.response?.status === 422
          ? 'Invalid blog ID.'
          : 'Failed to load blog details. Please try again later.'
      toast.error(errorMessage)
    }
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBlog(null)
  }

  const nextSlide = () => {
    if (currentIndex >= blogPosts.length - slidesToShow) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(blogPosts.length - slidesToShow)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const goToSlide = (index) => {
    setCurrentIndex(index * slidesToShow)
  }

  // Add duplicate posts for continuous scrolling effect
  const extendedPosts = [...blogPosts, ...blogPosts]

  return (
    <section className="py-16 bg-white overflow-hidden relative">
      <div
        className={`container mx-auto px-4 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-block relative mb-2">
            <span className="text-[#ADD01C] font-medium relative z-10">
              Nutridietmitra Insights
            </span>
            <div className="absolute h-1 w-full bg-[#ADD01C] bg-opacity-30 bottom-0 left-0"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#333333] mb-4 relative">
            Nutrition <span className="text-[#9E0B7F]">Wisdom</span>
          </h2>
          <p className="text-[#718096] max-w-2xl mx-auto text-base md:text-lg">
            Expert advice from Dt. Tanu Bhargava on personalized, science-backed
            nutrition to empower your health journey.
          </p>
        </div>

        {/* Blog Carousel */}
        <div className="relative">
          {/* Navigation Controls */}
          <div className="flex justify-end mb-6 space-x-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FCF0F8] text-[#9E0B7F] transition-all duration-300 hover:bg-[#9E0B7F] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#9E0B7F] focus:ring-opacity-50"
              aria-label="Previous blog post"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#9E0B7F] text-white transition-all duration-300 hover:bg-[#D93BB1] focus:outline-none focus:ring-2 focus:ring-[#9E0B7F] focus:ring-opacity-50"
              aria-label="Next blog post"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Blog Posts Slider */}
          <div
            ref={sliderContainerRef}
            className="relative overflow-hidden pb-8"
          >
            {loading ? (
              <p className="text-[#718096] text-center text-base md:text-lg">
                Loading blogs...
              </p>
            ) : error ? (
              <p className="text-red-500 text-center text-base md:text-lg">
                {error}
              </p>
            ) : blogPosts.length === 0 ? (
              <p className="text-[#718096] text-center text-base md:text-lg">
                No blogs available.
              </p>
            ) : (
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / slidesToShow)
                  }%)`,
                }}
              >
                {extendedPosts.map((post, index) => (
                  <div
                    key={`${post.id}-${index}`}
                    className="px-4 relative"
                    style={{
                      flex: `0 0 ${100 / slidesToShow}%`,
                    }}
                  >
                    {/* Card Container with Fixed Height and Padding for Scale Effect */}
                    <div className="group h-full relative py-2 px-2">
                      {/* Actual Card Content */}
                      <div
                        className="h-full rounded-xl overflow-hidden shadow-lg bg-white border border-gray-100 transition-all duration-300 group-hover:shadow-xl relative z-10"
                        onMouseEnter={() => setActiveCard(index)}
                        onMouseLeave={() => setActiveCard(null)}
                      >
                        {/* Blog Image with Date */}
                        <div className="relative overflow-hidden h-48 md:h-56 lg:h-64">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => {
                              console.error(
                                `Failed to load image: ${e.target.src}`
                              )
                              e.target.src = getRandomImage()
                            }}
                          />
                          <div className="absolute right-4 bottom-4 bg-[#ADD01C] text-white px-3 py-2 rounded-lg text-center shadow-md transition-transform duration-300 group-hover:scale-105">
                            <div className="text-xl font-bold leading-none">
                              {post.date.day}
                            </div>
                            <div className="text-xs font-medium">
                              {post.date.month}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-xl font-bold text-[#333333] mb-3 line-clamp-2 h-14 md:h-16">
                            <button
                              onClick={() => handleBlogClick(post.id)}
                              className="text-left hover:text-[#9E0B7F] transition-colors duration-300"
                            >
                              {post.title}
                            </button>
                          </h3>
                          <p className="text-[#718096] mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center text-[#718096] text-sm">
                              <User size={14} className="text-[#D93BB1] mr-1" />
                              <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center text-[#718096] text-sm">
                              <MessageSquare
                                size={14}
                                className="text-[#D93BB1] mr-1"
                              />
                              <span>{post.comments} Comments</span>
                            </div>
                          </div>
                          <div className="mt-4 text-[#9E0B7F] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              onClick={() => handleBlogClick(post.id)}
                              className="inline-flex items-center hover:underline"
                            >
                              Read more
                              <ChevronRight size={16} className="ml-1" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Highlight Border on Hover */}
                      <div className="absolute inset-0 rounded-xl border-2 border-[#ADD01C] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dots Navigation */}
          {blogPosts.length > 0 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({
                length: Math.ceil(blogPosts.length / slidesToShow),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / slidesToShow) %
                      Math.ceil(blogPosts.length / slidesToShow) ===
                    index
                      ? 'w-8 bg-[#9E0B7F]'
                      : 'w-2 bg-[#D93BB1] bg-opacity-40'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hidden md:block absolute -bottom-10 left-1/4 bg-[#D93BB1] bg-opacity-10 h-20 w-20 rounded-full"></div>
      <div className="hidden md:block absolute top-20 right-10 bg-[#ADD01C] bg-opacity-10 h-16 w-16 rounded-full"></div>

      {/* Blog Modal */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={closeModal}
        blog={selectedBlog}
      />
    </section>
  )
}

export default BlogList
