import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
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

        if (!response.data) {
          throw new Error('API response is empty or missing data.');
        }

        let blogData = response.data;

        if (typeof blogData === 'string') {
          try {
            blogData = JSON.parse(blogData);
            console.log('Parsed blogData from string:', JSON.stringify(blogData, null, 2));
          } catch (parseErr) {
            throw new Error(`Failed to parse blog data string: ${parseErr.message}`);
          }
        }

        if (blogData.data) {
          blogData = blogData.data;
          console.log('Extracted blogData.data:', JSON.stringify(blogData, null, 2));
        }

        if (!blogData || typeof blogData !== 'object') {
          throw new Error(
            `Invalid API response: Blog data is missing or not an object. Received: ${JSON.stringify(blogData)}`
          );
        }

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
                htmlContent += `<h${level} class="text-2xl md:text-3xl font-bold mt-4 mb-2 text-gray-800">${DOMPurify.sanitize(item.content)}</h${level}>`;
              } else if (item.type === 'paragraph') {
                if (!item.content || typeof item.content !== 'string') {
                  console.warn(`Invalid paragraph at index ${index}:`, item);
                  return;
                }
                htmlContent += `<p class="text-gray-600 leading-relaxed mb-4">${DOMPurify.sanitize(item.content)}</p>`;
              } else if (item.type === 'list') {
                if (!item.style || !['bullet', 'ordered'].includes(item.style) || !Array.isArray(item.items)) {
                  console.warn(`Invalid list at index ${index}:`, item);
                  return;
                }
                const listTag = item.style === 'bullet' ? 'ul' : 'ol';
                htmlContent += `<${listTag} class="${item.style === 'bullet' ? 'list-disc' : 'list-decimal'} pl-6 mb-4">`;
                item.items.forEach((listItem, itemIndex) => {
                  if (typeof listItem !== 'string' || !listItem.trim()) {
                    console.warn(`Invalid list item at index ${itemIndex}:`, listItem);
                    return;
                  }
                  htmlContent += `<li class="text-gray-600 mb-1">${DOMPurify.sanitize(listItem)}</li>`;
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
            htmlContent = '<p class="text-gray-600">No valid content available for this blog post.</p>';
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
        setContent('<p class="text-gray-600">Unable to load blog content due to a server error.</p>');
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

  return (
    <div className="min-h-screen bg-[#FCF0F8] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
        {/* Blog Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
          {blog.publishDate && (
            <span className="mr-4">
              Published: {new Date(blog.publishDate).toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          )}
          {blog.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-[#FF69B4] text-white px-2 py-1 rounded-full text-xs"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        {blog.description && (
          <p className="text-gray-600 italic mb-6">{blog.description}</p>
        )}
        {/* Blog Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default BlogPost;