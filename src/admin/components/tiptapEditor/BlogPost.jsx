import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import EditorContent from './EditorContent';
import DOMPurify from 'dompurify';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [content, setContent] = useState('');

  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'https://backend.nutridietmitra.com';
  const placeholderImage = '/placeholder.png';
  const cdnPlaceholder = 'https://via.placeholder.com/150';

  useEffect(() => {
    const fetchBlogBySlug = async () => {
      setLoading(true);
      setError('');
      setContent('');

      if (!slug) {
        setError('No slug provided in the URL.');
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching blog for slug: ${slug}`);
        const response = await api.get(`/blogs/slug/${slug}`);
        console.log('Raw API response:', JSON.stringify(response, null, 2));

        // Check if response.data exists
        if (!response.data) {
          throw new Error('API response is empty or missing data.');
        }

        let blogData = response.data;

        // Handle case where response.data is a string
        if (typeof blogData === 'string') {
          try {
            blogData = JSON.parse(blogData);
            console.log('Parsed blogData from string:', JSON.stringify(blogData, null, 2));
          } catch (parseErr) {
            throw new Error(`Failed to parse blog data string: ${parseErr.message}`);
          }
        }

        // Check if blogData.data exists (nested data structure)
        if (blogData.data) {
          blogData = blogData.data;
          console.log('Extracted blogData.data:', JSON.stringify(blogData, null, 2));
        }

        // Validate blogData
        if (!blogData || typeof blogData !== 'object') {
          throw new Error(
            `Invalid API response: Blog data is missing or not an object. Received: ${JSON.stringify(blogData)}`
          );
        }

        // Ensure body is an array
        if (!Array.isArray(blogData.body)) {
          console.warn('Blog body is not an array:', blogData.body);
          blogData.body = [];
        }

        const constructEditorContent = (bodyArray) => {
          console.log('Constructing content from body:', JSON.stringify(bodyArray, null, 2));
          let htmlContent = '';
          bodyArray.forEach((item, index) => {
            if (!item || !item.type || (!item.content && !item.url)) {
              console.warn(`Skipping invalid item at index ${index}:`, item);
              return;
            }

            try {
              if (item.type === 'image') {
                let imageUrl = item.url || placeholderImage;
                if (imageUrl.startsWith('data:image')) {
                  console.warn(`Base64 image detected at index ${index}, using placeholder`);
                  imageUrl = placeholderImage;
                } else if (imageUrl.startsWith('/')) {
                  imageUrl = `${backendBaseUrl}${imageUrl}`;
                }
                htmlContent += `<div class="image-container image-align-center" contenteditable="false"><img src="${DOMPurify.sanitize(imageUrl)}" alt="${
                  item.caption || 'Blog Image'
                }" style="width: 100%; height: auto; max-width: 100%;" class="my-2.5" loading="lazy" onerror="this.src='${placeholderImage}'; this.onerror = () => { this.src = '${cdnPlaceholder}'; }" onload="console.log('Image loaded: ${imageUrl}')" onError="console.error('Image failed to load: ${imageUrl}')" /></div><p><br></p>`;
              } else if (item.type === 'heading') {
                const level = Number(item.level) || 1;
                if (level < 1 || level > 6 || !item.content || typeof item.content !== 'string') {
                  console.warn(`Invalid heading at index ${index}:`, item);
                  return;
                }
                htmlContent += `<h${level}>${DOMPurify.sanitize(item.content)}</h${level}>`;
              } else if (item.type === 'paragraph') {
                if (!item.content || typeof item.content !== 'string') {
                  console.warn(`Invalid paragraph at index ${index}:`, item);
                  return;
                }
                htmlContent += `<p>${DOMPurify.sanitize(item.content)}</p>`;
              } else if (item.type === 'list') {
                if (!item.style || !['bullet', 'ordered'].includes(item.style) || !Array.isArray(item.items)) {
                  console.warn(`Invalid list at index ${index}:`, item);
                  return;
                }
                const listTag = item.style === 'bullet' ? 'ul' : 'ol';
                htmlContent += `<${listTag}>`;
                item.items.forEach((listItem, itemIndex) => {
                  if (typeof listItem !== 'string' || !listItem.trim()) {
                    console.warn(`Invalid list item at index ${itemIndex}:`, listItem);
                    return;
                  }
                  htmlContent += `<li>${DOMPurify.sanitize(listItem)}</li>`;
                });
                htmlContent += `</${listTag}>`;
              } else {
                console.warn(`Unsupported content type at index ${index}:`, item.type);
              }
            } catch (err) {
              console.error(`Error processing item at index ${index}:`, err, item);
            }
          });
          if (!htmlContent) {
            htmlContent = '<p>No valid content available for this blog post.</p>';
          }
          console.log('Generated HTML content:', htmlContent);
          return DOMPurify.sanitize(htmlContent);
        };

        const generatedContent = constructEditorContent(blogData.body || []);
        setContent(generatedContent);
        setBlog({
          title: blogData.title || 'Untitled',
          description: blogData.description || blogData.title || 'No description available',
          slug: blogData.slug || slug,
          publishDate: blogData.publish_date && new Date(blogData.publish_date).toISOString().split('T')[0] || '',
          categories: Array.isArray(blogData.categories) ? blogData.categories : [],
          id: blogData.id || null,
          images: (blogData.body || [])
            .filter((item) => item.type === 'image')
            .map((item, index) => {
              let imageUrl = item.url && !item.url.startsWith('data:image') ? item.url : placeholderImage;
              if (imageUrl.startsWith('/')) {
                imageUrl = `${backendBaseUrl}${imageUrl}`;
              }
              return {
                id: `${blogData.id || 'unknown'}-image-${index}`,
                url: imageUrl,
                file: null,
                width: 100,
                height: 'auto',
                caption: item.caption || 'Blog Image',
              };
            }),
        });
      } catch (err) {
        console.error('Error fetching blog:', err);
        let errorMessage = 'Failed to fetch blog post: An unknown error occurred.';
        if (err.response) {
          if (err.response.status === 404) {
            errorMessage = 'Blog post not found. Please check the slug or visit the Blogs page to find valid slugs.';
          } else if (err.response.status === 422) {
            errorMessage = `Validation Error: ${
              err.response.data.detail?.map((e) => e.msg).join(', ') || 'Invalid slug format.'
            }`;
          } else if (err.response.status >= 500) {
            errorMessage = `Server error: Unable to fetch blog post. Please try again later.`;
          }
} else if (err.message.includes('Network Error')) {
  errorMessage = `Cannot connect to the backend server at ${
    import.meta.env.VITE_API_BASE_URL || 'https://backend.nutridietmitra.com/api'
  }. Please ensure the server is running and accessible, or contact your administrator.`;
} else {
  errorMessage = `Failed to fetch blog post: ${err.message}`;
}
        setError(errorMessage);
        setContent('<p>Unable to load blog content due to a server error.</p>');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogBySlug();
  }, [slug, navigate, backendBaseUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FCF0F8]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#FF69B4]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-md mx-4 mt-4 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold">Error Loading Blog Post</h2>
        <p>{error}</p>
        <p className="mt-2">
          Visit the <a href="/blogs" className="text-[#FF69B4] underline">Blogs page</a> to find available blog posts.
        </p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-4 text-[#718096] bg-[#FCF0F8] max-w-4xl mx-auto">
        No blog post available for the slug "{slug}". Please try a different slug or visit the{' '}
        <a href="/blogs" className="text-[#FF69B4] underline">Blogs page</a>.
      </div>
    );
  }

  const editorContentProps = {
    isAdmin: false,
    title: blog.title,
    description: blog.description,
    slug: blog.slug,
    publishDate: blog.publishDate,
    categories: blog.categories,
    newCategory: '',
    hasUnsavedChanges: false,
    content: content,
    images: blog.images,
    lockAspectRatio: true,
    inputErrors: {},
    activeFormatButtons: {
      bold: false,
      italic: false,
      underline: false,
      bulletList: false,
      numberedList: false,
      alignLeft: false,
      alignCenter: false,
      alignRight: false,
      heading1: false,
      heading2: false,
      heading3: false,
      heading4: false,
      heading5: false,
      heading6: false,
    },
    mobileMenuOpen: false,
    activeSection: 'Preview',
    errorMessage: '',
    publishedPosts: [],
    draftPosts: [],
    selectedPostId: blog.id,
    editorRef: { current: null },
    fileInputRef: { current: null },
    imageRatios: { current: {} },
    imageUrls: { current: {} },
    debouncedSetContent: () => {},
    setTitle: () => {},
    setDescription: () => {},
    setSlug: () => {},
    setPublishDate: () => {},
    setCategories: () => {},
    setNewCategory: () => {},
    setHasUnsavedChanges: () => {},
    setImages: () => {},
    setLockAspectRatio: () => {},
    setInputErrors: () => {},
    setActiveFormatButtons: () => {},
    setMobileMenuOpen: () => {},
    setActiveSection: () => {},
    setErrorMessage: () => {},
    setSelectedPostId: () => {},
    setPublishedPosts: () => {},
    setDraftPosts: () => {},
    handleTitleChange: () => {},
    handleDescriptionChange: () => {},
    handleSlugChange: () => {},
    handleDateChange: () => {},
    handleAddCategory: () => {},
    handleRemoveCategory: () => {},
    handleSave: () => {},
    handleUpdate: () => {},
    handleDelete: () => {},
    toggleMobileMenu: () => {},
    setSection: () => {},
    fetchBlogById: () => {},
    isDeleting: false,
    viewOnly: true,
    setContent: () => {},
  };

  return (
    <div className="min-h-screen bg-[#FCF0F8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <EditorContent {...editorContentProps} />
      </div>
    </div>
  );
};

export default BlogPost;