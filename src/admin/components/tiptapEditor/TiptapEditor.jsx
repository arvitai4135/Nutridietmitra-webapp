import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import DOMPurify from 'dompurify';
import { debounce } from 'lodash';
import EditorContent from './EditorContent';

function TiptapEditor() {
  const { user, token } = useContext(AuthContext);
  const isAdmin = user && user.role === 'admin';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [inputErrors, setInputErrors] = useState({});
  const [activeFormatButtons, setActiveFormatButtons] = useState({
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
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Blog Editor');
  const [errorMessage, setErrorMessage] = useState('');
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [draftPosts, setDraftPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageRatios = useRef({});
  const imageUrls = useRef({});

  const debouncedSetContent = useRef(
    debounce((newContent) => {
      setContent(newContent);
    }, 300)
  ).current;

  const isValidToken = (token) => {
    if (typeof token !== 'string') return false;
    const parts = token.split('.');
    return parts.length === 3 && parts.every((part) => /^[A-Za-z0-9-_=]+$/.test(part));
  };

  const isValidDate = (dateString) => {
    if (!dateString || typeof dateString !== 'string') return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };

  useEffect(() => {
    fetchAllBlogs();
    return () => {
      Object.values(imageUrls.current).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && content) {
      const selection = window.getSelection();
      let range;
      if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0).cloneRange();
      }
      editorRef.current.innerHTML = content;
      if (range) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [activeSection]);

  const fetchAllBlogs = async () => {
    if (!token || !isValidToken(token)) {
      setErrorMessage('Invalid or missing authentication token. Please log in again.');
      setPublishedPosts([]);
      setDraftPosts([]);
      return;
    }
    try {
      const response = await api.get('/blogs/all_blog_lists');
      let blogs = response.data.data || [];
      if (!Array.isArray(blogs)) {
        blogs = [];
        setErrorMessage('Unexpected API response: Blog list is not an array.');
      }
      const allBlogs = blogs.map((post) => ({
        id: post.id,
        title: post.title || 'Untitled',
        date: isValidDate(post.publish_date) ? new Date(post.publish_date).toISOString().split('T')[0] : '',
      }));
      setPublishedPosts(allBlogs);
      setDraftPosts([]);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching blog list:', error);
      const errorMessage =
        error.response?.status === 404
          ? 'Blog list not found.'
          : error.response?.status === 500
          ? 'Server error: Unable to fetch blog list.'
          : 'Failed to fetch blog list.';
      setErrorMessage(errorMessage);
      setPublishedPosts([]);
      setDraftPosts([]);
    }
  };

  const fetchBlogById = async (blogId) => {
    if (!token || !isValidToken(token)) {
      setErrorMessage('Invalid or missing authentication token. Please log in again.');
      return;
    }
    try {
      const response = await api.get(`/blogs/get_blog/${blogId}`);
      const blog = response.data.data;
      setTitle(blog.title || '');
      setDescription(blog.description || '');
      setSlug(blog.slug || '');
      setPublishDate(
        blog.publish_date && isValidDate(blog.publish_date)
          ? new Date(blog.publish_date).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
      );
      setCategories(blog.categories || []);
      const generatedContent = constructEditorContent(blog.body || []);
      setContent(generatedContent);
      setImages([]);
      setHasUnsavedChanges(false);
      setSelectedPostId(blogId);
      setActiveSection('Preview');
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching blog:', error);
      const errorMessage =
        error.response?.status === 404
          ? 'Blog not found.'
          : error.response?.status === 500
          ? 'Server error: Unable to fetch blog.'
          : 'Failed to fetch blog.';
      setErrorMessage(errorMessage);
    }
  };

  const constructEditorContent = (bodyArray) => {
    let htmlContent = '';
    bodyArray.forEach((item) => {
      if (item.type === 'image') {
        htmlContent += `<div class="image-container image-align-center" contenteditable="false"><img src="${item.url}" alt="${item.caption || 'Blog Image'}" style="width: 100%; max-width: 100%; height: auto;" class="my-2.5" /></div>`;
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

  const handleTitleChange = (e) => {
    if (isAdmin) {
      setTitle(e.target.value);
      setHasUnsavedChanges(true);
    }
  };

  const handleDescriptionChange = (e) => {
    if (isAdmin) {
      setDescription(e.target.value);
      setHasUnsavedChanges(true);
    }
  };

  const handleSlugChange = (e) => {
    if (isAdmin) {
      setSlug(e.target.value);
      setHasUnsavedChanges(true);
    }
  };

  const handleDateChange = (e) => {
    if (isAdmin) {
      setPublishDate(e.target.value);
      setHasUnsavedChanges(true);
    }
  };

  const handleAddCategory = () => {
    if (isAdmin && newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setHasUnsavedChanges(true);
    }
  };

  const handleRemoveCategory = (category) => {
    if (isAdmin) {
      setCategories(categories.filter((c) => c !== category));
      setHasUnsavedChanges(true);
    }
  };

  const validateBodyContent = (jsonContent) => {
    if (!Array.isArray(jsonContent) || jsonContent.length === 0) {
      return { valid: false, error: 'Blog content cannot be empty.' };
    }
    for (const item of jsonContent) {
      if (!item.type) {
        return { valid: false, error: 'Each content item must have a type.' };
      }
      switch (item.type) {
        case 'heading':
          if (!item.level || !Number.isInteger(item.level) || item.level < 1 || item.level > 6) {
            return { valid: false, error: 'Heading level must be an integer between 1 and 6.' };
          }
          if (!item.content || typeof item.content !== 'string' || !item.content.trim()) {
            return { valid: false, error: 'Heading content must be a non-empty string.' };
          }
          break;
        case 'paragraph':
          if (!item.content || typeof item.content !== 'string' || !item.content.trim()) {
            return { valid: false, error: 'Paragraph content must be a non-empty string.' };
          }
          break;
        case 'list':
          if (item.style !== 'bullet' && item.style !== 'numbered') {
            return { valid: false, error: 'List style must be "bullet" or "numbered".' };
          }
          if (!Array.isArray(item.items) || item.items.length === 0) {
            return { valid: false, error: 'List must have at least one item.' };
          }
          if (item.items.some((i) => !i || typeof i !== 'string' || !i.trim())) {
            return { valid: false, error: 'List items must be non-empty strings.' };
          }
          break;
        case 'image':
          if (!item.url || typeof item.url !== 'string' || !item.url.trim()) {
            return { valid: false, error: 'Image URL must be a non-empty string.' };
          }
          if (item.caption && typeof item.caption !== 'string') {
            return { valid: false, error: 'Image caption must be a string if provided.' };
          }
          break;
        default:
          return { valid: false, error: `Unsupported content type: ${item.type}` };
      }
    }
    return { valid: true };
  };

  const handleSave = async ({ htmlContent, jsonContent }) => {
    if (!isAdmin) {
      setErrorMessage('Permission denied: Only admins can create blogs.');
      return;
    }
    if (!title.trim()) {
      setErrorMessage('Title is required.');
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Description is required.');
      return;
    }
    if (!slug.trim()) {
      setErrorMessage('Slug is required.');
      return;
    }
    if (!publishDate || !isValidDate(publishDate)) {
      setErrorMessage('Invalid or missing publish date. Use YYYY-MM-DD format.');
      return;
    }
    if (!Array.isArray(categories) || categories.some((cat) => !cat.trim())) {
      setErrorMessage('Categories must be a valid array of non-empty strings.');
      return;
    }
    // Filter out paragraphs with empty or whitespace-only content
    const filteredJsonContent = jsonContent.map((item) => {
      if (item.type === 'paragraph') {
        return item.content && typeof item.content === 'string' && item.content.trim().length > 0
          ? item
          : null;
      }
      // Normalize list style
      if (item.type === 'list') {
        const normalizedStyle = item.style === 'ordered' ? 'numbered' : item.style;
        return { ...item, style: normalizedStyle };
      }
      return item;
    }).filter((item) => item !== null);
    // Log the jsonContent and filteredJsonContent for debugging
    console.log('Original jsonContent:', JSON.stringify(jsonContent, null, 2));
    console.log('Filtered jsonContent:', JSON.stringify(filteredJsonContent, null, 2));
    if (filteredJsonContent.length === 0) {
      setErrorMessage('Blog content cannot be empty after filtering invalid paragraphs.');
      return;
    }
    const bodyValidation = validateBodyContent(filteredJsonContent);
    if (!bodyValidation.valid) {
      setErrorMessage(bodyValidation.error);
      return;
    }
    if (!token || !isValidToken(token)) {
      setErrorMessage('Invalid or missing authentication token. Please log in again.');
      return;
    }
    const formattedPublishDate = new Date(publishDate).toISOString().split('T')[0];
    const blogData = {
      title: title.trim(),
      description: description.trim(),
      slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
      publish_date: formattedPublishDate,
      categories: categories.map((cat) => cat.trim()),
      body: filteredJsonContent,
    };
    try {
      console.log('Sending blogData:', JSON.stringify(blogData, null, 2));
      const response = await api.post('/blogs/create', blogData);
      setHasUnsavedChanges(false);
      setErrorMessage('');
      alert('Blog post created successfully!');
      fetchAllBlogs();
    } catch (error) {
      console.error('Error saving blog post:', error);
      console.error('Response data:', error.response?.data);
      const errorMessage =
        error.response?.status === 422
          ? `Validation Error: ${error.response.data.detail?.map((err) => err.msg).join(', ') || 'Invalid data.'}`
          : error.response?.status === 400
          ? `Bad Request: ${error.response.data.message || JSON.stringify(error.response.data) || 'Invalid request data.'}`
          : error.response?.status === 404
          ? 'API endpoint not found.'
          : error.response?.status === 403
          ? 'Unauthorized: Only admins can create blogs.'
          : 'Failed to save the blog post.';
      setErrorMessage(errorMessage);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const setSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  return (
    <EditorContent
      isAdmin={isAdmin}
      title={title}
      description={description}
      slug={slug}
      publishDate={publishDate}
      categories={categories}
      newCategory={newCategory}
      hasUnsavedChanges={hasUnsavedChanges}
      content={content}
      images={images}
      lockAspectRatio={lockAspectRatio}
      inputErrors={inputErrors}
      activeFormatButtons={activeFormatButtons}
      mobileMenuOpen={mobileMenuOpen}
      activeSection={activeSection}
      errorMessage={errorMessage}
      publishedPosts={publishedPosts}
      draftPosts={draftPosts}
      editorRef={editorRef}
      fileInputRef={fileInputRef}
      imageRatios={imageRatios}
      imageUrls={imageUrls}
      debouncedSetContent={debouncedSetContent}
      setTitle={setTitle}
      setDescription={setDescription}
      setSlug={setSlug}
      setPublishDate={setPublishDate}
      setCategories={setCategories}
      setNewCategory={setNewCategory}
      setHasUnsavedChanges={setHasUnsavedChanges}
      setImages={setImages}
      setLockAspectRatio={setLockAspectRatio}
      setInputErrors={setInputErrors}
      setActiveFormatButtons={setActiveFormatButtons}
      setMobileMenuOpen={setMobileMenuOpen}
      setActiveSection={setActiveSection}
      setErrorMessage={setErrorMessage}
      handleTitleChange={handleTitleChange}
      handleDescriptionChange={handleDescriptionChange}
      handleSlugChange={handleSlugChange}
      handleDateChange={handleDateChange}
      handleAddCategory={handleAddCategory}
      handleRemoveCategory={handleRemoveCategory}
      handleSave={handleSave}
      toggleMobileMenu={toggleMobileMenu}
      setSection={setSection}
      fetchBlogById={fetchBlogById}
    />
  );
}

export default TiptapEditor;