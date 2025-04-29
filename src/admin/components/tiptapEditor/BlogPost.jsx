import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import api from '../../services/api'; // Adjust path to your API service
import { Calendar, Tag } from 'lucide-react';

function BlogPost() {
  const { slug } = useParams(); // Get the slug from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blogs/slug/${slug}`);
        setBlog(response.data.data);
        setError('');
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError(
          err.response?.status === 404
            ? 'Blog post not found.'
            : 'Failed to load the blog post. Please try again later.'
        );
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-[#9E0B7F] text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-md mx-4 mt-4 max-w-4xl mx-auto">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-md mx-4 mt-4 max-w-4xl mx-auto">
        Blog post not found.
      </div>
    );
  }

  // Construct HTML content from blog.body
  const constructContent = (bodyArray) => {
    let htmlContent = '';
    bodyArray.forEach((item) => {
      if (item.type === 'image' && item.url) {
        const widthStyle = item.width ? `width: ${item.width}%;` : 'width: 100%;';
        const heightStyle = item.height === 'auto' ? 'height: auto;' : item.height ? `height: ${item.height}%;` : 'height: auto;';
        htmlContent += `<div class="image-container image-align-center" contenteditable="false"><img src="${item.url}" alt="${
          item.caption || 'Blog Image'
        }" style="${widthStyle} ${heightStyle} max-width: 100%;" class="my-2.5" /></div>`;
      } else if (item.type === 'heading') {
        htmlContent += `<h${item.level}>${item.content}</h${item.level}>`;
      } else if (item.type === 'paragraph') {
        htmlContent += `<p>${item.content}</p>`;
      } else if (item.type === 'list') {
        const listTag = item.style === 'bullet' ? 'ul' : 'ol';
        htmlContent += `<${listTag}>`;
        item.items.forEach((listItem) => {
          htmlContent += `<li>${listItem}</li>`;
        });
        htmlContent += `</${listTag}>`;
      }
    });
    return htmlContent;
  };

  const contentHtml = constructContent(blog.body || []);

  return (
    <div className="w-full p-4 md:p-6 overflow-auto">
      <div className="bg-white rounded-md p-4 md:p-6 shadow-sm max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#9E0B7F] mb-4">{blog.title}</h2>
        <div className="flex items-center gap-2 text-sm text-[#718096] mb-4">
          <Calendar size={16} />
          <span>{blog.publish_date ? new Date(blog.publish_date).toLocaleDateString() : 'No Date'}</span>
          <span>|</span>
          <Tag size={16} />
          <span>{blog.categories?.join(', ') || 'No Categories'}</span>
        </div>
        <p className="text-base text-[#333333] mb-4">{blog.description}</p>
        <div
          className="prose"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(contentHtml, {
              ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img', 'div', 'br', 'strong', 'em', 'u', 'a'],
              ALLOWED_ATTR: ['src', 'alt', 'class', 'style', 'href'],
            }),
          }}
        />
        <div className="flex flex-wrap gap-2 mt-4">
          {blog.categories?.map((category) => (
            <span
              key={category}
              className="px-3 py-1 rounded-full bg-[#FCF0F8] text-[#9E0B7F] text-sm"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <style>
        {`
          .image-container {
            margin: 10px 0;
            width: 100%;
            box-sizing: border-box;
          }
          .image-align-left {
            display: flex;
            justify-content: flex-start;
          }
          .image-align-center {
            display: flex;
            justify-content: center;
          }
          .image-align-right {
            display: flex;
            justify-content: flex-end;
          }
          .image-container img {
            width: 100%;
            height: auto;
            max-width: 100%;
          }
          .prose img {
            width: 100%;
            height: auto;
            max-width: 100%;
          }
          .prose h1 {
            font-size: 2rem;
            font-weight: 700;
            color: #9E0B7F;
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            line-height: 1.2;
          }
          .prose h2 {
            font-size: 1.75rem;
            font-weight: 600;
            color: #9E0B7F;
            margin-top: 1.25rem;
            margin-bottom: 0.75rem;
          }
          .prose h3 {
            font-size: 1.5rem;
            font-weight: 600;
            color: #9E0B7F;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          .prose h4 {
            font-size: 1.25rem;
            font-weight: 600;
            color: #9E0B7F;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          .prose h5 {
            font-size: 1.1rem;
            font-weight: 600;
            color: #9E0B7F;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          .prose h6 {
            font-size: 1rem;
            font-weight: 600;
            color: #9E0B7F;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
          }
          .prose p {
            font-size: 1rem;
            line-height: 1.75;
            color: #333333;
            margin-bottom: 1rem;
          }
          .prose ul {
            list-style-type: disc;
            padding-left: 20px;
            color: #333333;
          }
          .prose ol {
            list-style-type: decimal;
            padding-left: 20px;
            color: #333333;
          }
          .prose li {
            margin-bottom: 8px;
            font-size: 1rem;
            line-height: 1.75;
          }
          @media (max-width: 768px) {
            .image-container {
              margin: 8px 0;
            }
            .image-container img {
              width: 100%;
              height: auto;
            }
          }
        `}
      </style>
    </div>
  );
}

export default BlogPost;