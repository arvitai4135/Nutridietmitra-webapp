import React, { useState, useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import DOMPurify from 'dompurify';
import { debounce } from 'lodash';
import EditorContent from './EditorContent';

function TiptapEditor({ initialSlug, viewOnly }) {
  const { user, token } = useContext(AuthContext);
  const isAdmin = user && user.role === 'admin' && !viewOnly;

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
  const [isDeleting, setIsDeleting] = useState(false);

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
    console.log('TiptapEditor State:', {
      isAdmin,
      user,
      token: token ? 'Present' : 'Missing',
      activeSection,
      selectedPostId,
      content: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
      publishDate,
      errorMessage,
    });
    if (initialSlug) {
      fetchBlogBySlug(initialSlug);
    }
  }, [initialSlug, viewOnly]);

  useEffect(() => {
    if (!viewOnly) {
      fetchAllBlogs();
    }
    return () => {
      Object.values(imageUrls.current).forEach((url) => URL.revokeObjectURL(url));
      imageUrls.current = {};
      imageRatios.current = {};
    };
  }, [viewOnly]);

  useEffect(() => {
    if (editorRef.current && content && !viewOnly) {
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
  }, [activeSection, viewOnly]);

  const fetchAllBlogs = async () => {
    console.log('Fetching all blogs');
    if (!token || !isValidToken(token)) {
      setErrorMessage('Invalid or missing authentication token. Please log in again.');
      setPublishedPosts([]);
      setDraftPosts([]);
      console.log('Fetch failed: Invalid or missing token');
      return;
    }
    try {
      const response = await api.get('/blogs/all_blog_lists');
      console.log('Fetch blogs response:', response.data);
      let blogs = response.data.data || [];
      if (!Array.isArray(blogs)) {
        blogs = [];
        setErrorMessage('Unexpected API response: Blog list is not an array.');
        console.log('Fetch failed: Blog list is not an array');
      }
      const allBlogs = blogs.map((post) => ({
        id: post.id,
        title: post.title || 'Untitled',
        description: post.description || 'No description available',
        date: isValidDate(post.publish_date) ? new Date(post.publish_date).toISOString().split('T')[0] : '',
        status: post.status !== undefined ? post.status : true,
        slug: post.slug || '',
      }));
      const published = allBlogs.filter((post) => post.status === true);
      const drafts = allBlogs.filter((post) => post.status === false);
      setPublishedPosts(published);
      setDraftPosts(drafts);
      setErrorMessage('');
      console.log('Updated publishedPosts:', published);
      console.log('Updated draftPosts:', drafts);
    } catch (error) {
      console.error('Error fetching blog list:', error);
      console.error('Response data:', error.response?.data);
      const errorMessage =
        error.response?.status === 404
          ? 'Blog list not found.'
          : error.response?.status === 500
          ? 'Server error: Unable to fetch blog list.'
          : 'Failed to fetch blog list.';
      setErrorMessage(errorMessage);
      setPublishedPosts([]);
      setDraftPosts([]);
      console.log('Fetch failed with error:', errorMessage);
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
      console.log('Blog body:', blog.body);
      setTitle(blog.title || '');
      setDescription(blog.description || '');
      setSlug(blog.slug || '');
      const date = blog.publish_date && isValidDate(blog.publish_date)
        ? new Date(blog.publish_date).toISOString().split('T')[0]
        : '';
      setPublishDate(date);
      console.log('Setting publishDate in fetchBlogById:', date);
      setCategories(blog.categories || []);

      const fetchedImages = (blog.body || [])
        .filter((item) => item.type === 'image')
        .map((item, index) => ({
          id: `${blog.id}-image-${index}`,
          url: item.url,
          file: null,
          width: 100,
          height: 'auto',
          caption: item.caption || 'Blog Image',
        }));
      setImages(fetchedImages);

      const generatedContent = constructEditorContent(blog.body || []);
      console.log('Generated content:', generatedContent);
      setContent(generatedContent);
      setHasUnsavedChanges(false);
      setSelectedPostId(blogId);
      setActiveSection('Blog Editor');
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

  const fetchBlogBySlug = async (slug) => {
    try {
      const response = await api.get(`/blogs/slug/${slug}`);
      const blog = response.data.data;
      console.log('Blog fetched by slug:', blog);
      setTitle(blog.title || '');
      setDescription(blog.title || '');
      setSlug(blog.slug || '');
      const date = blog.publish_date && isValidDate(blog.publish_date)
        ? new Date(blog.publish_date).toISOString().split('T')[0]
        : '';
      setPublishDate(date);
      console.log('Setting publishDate in fetchBlogBySlug:', date);
      setCategories(blog.categories || []);

      const fetchedImages = (blog.body || [])
        .filter((item) => item.type === 'image')
        .map((item, index) => ({
          id: `${blog.id}-image-${index}`,
          url: item.url,
          file: null,
          width: 100,
          height: 'auto',
          caption: item.caption || 'Blog Image',
        }));
      setImages(fetchedImages);

      const generatedContent = constructEditorContent(blog.body || []);
      setContent(generatedContent);
      setHasUnsavedChanges(false);
      setSelectedPostId(blog.id);
      setActiveSection(viewOnly ? 'Preview' : 'Blog Editor');
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      setErrorMessage(
        error.response?.status === 404
          ? 'Blog not found.'
          : error.response?.status === 422
          ? `Validation Error: ${error.response.data.detail?.map((err) => err.msg).join(', ') || 'Invalid slug.'}`
          : 'Failed to fetch blog.'
      );
    }
  };

  const constructEditorContent = (bodyArray) => {
    console.log('Body array:', bodyArray);
    let htmlContent = '';
    bodyArray.forEach((item) => {
      if (item.type === 'image') {
        const imageUrl = item.url || '/placeholder.png';
        htmlContent += `<div class="image-container image-align-center" contenteditable="false"><img src="${imageUrl}" alt="${item.caption || 'Blog Image'}" style="width: 100%; height: auto; max-width: 100%;" class="my-2.5" onerror="this.src='/placeholder.png'" /></div><p><br></p>`;
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
    console.log('Title change:', e.target.value, 'isAdmin:', isAdmin);
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
      let newSlug = e.target.value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      setSlug(newSlug);
      setHasUnsavedChanges(true);

      if (newSlug) {
        const allBlogs = [...publishedPosts, ...draftPosts];
        const isSlugTaken = allBlogs.some(
          (blog) => blog.slug === newSlug && blog.id !== selectedPostId
        );
        if (isSlugTaken) {
          setErrorMessage('This slug is already in use. Please choose a different one.');
          setInputErrors((prev) => ({ ...prev, slug: 'Slug already exists' }));
        } else {
          setErrorMessage('');
          setInputErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.slug;
            return newErrors;
          });
        }
      }
    }
  };

  const handleDateChange = (e) => {
    if (isAdmin) {
      const newDate = e.target.value;
      console.log('handleDateChange in TiptapEditor - New date:', newDate);
      if (newDate && !isValidDate(newDate)) {
        setErrorMessage('Invalid date format. Please use YYYY-MM-DD.');
        setInputErrors((prev) => ({
          ...prev,
          publishDate: 'Invalid date format.',
        }));
        return;
      }
      setPublishDate(newDate);
      setHasUnsavedChanges(true);
      setInputErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.publishDate;
        return newErrors;
      });
      setErrorMessage('');
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
    console.log('Saving:', { htmlContent: htmlContent.substring(0, 100) + '...', jsonContent });
    if (!isAdmin) {
      setErrorMessage('Permission denied: Only admins can save blogs.');
      return;
    }
    if (!title.trim()) {
      setErrorMessage('Title is required.');
      setInputErrors((prev) => ({ ...prev, title: 'Title is required.' }));
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Description is required.');
      setInputErrors((prev) => ({ ...prev, description: 'Description is required.' }));
      return;
    }
    if (!slug.trim() || !/^[a-z0-9-]+$/.test(slug.trim())) {
      setErrorMessage('Slug is required and must contain only lowercase letters, numbers, and hyphens.');
      setInputErrors((prev) => ({ ...prev, slug: 'Invalid slug format.' }));
      return;
    }
    const allBlogs = [...publishedPosts, ...draftPosts];
    const isSlugTaken = allBlogs.some(
      (blog) => blog.slug === slug.trim() && blog.id !== selectedPostId
    );
    if (isSlugTaken) {
      setErrorMessage('This slug is already in use. Please choose a different one.');
      setInputErrors((prev) => ({ ...prev, slug: 'Slug already exists' }));
      return;
    }
    if (!publishDate || !isValidDate(publishDate)) {
      setErrorMessage('Invalid or missing publish date. Use YYYY-MM-DD format.');
      setInputErrors((prev) => ({ ...prev, publishDate: 'Invalid date format.' }));
      return;
    }
    if (!Array.isArray(categories) || categories.some((cat) => !cat.trim())) {
      setErrorMessage('Categories must be a valid array of non-empty strings.');
      setInputErrors((prev) => ({ ...prev, categories: 'Invalid categories.' }));
      return;
    }
    const filteredJsonContent = jsonContent
      .map((item) => {
        if (item.type === 'paragraph') {
          return item.content && typeof item.content === 'string' && item.content.trim().length > 0
            ? item
            : null;
        }
        if (item.type === 'list') {
          const normalizedStyle = item.style === 'ordered' ? 'numbered' : item.style;
          return { ...item, style: normalizedStyle };
        }
        if (item.type === 'image') {
          return { type: 'image', caption: item.caption || 'Blog Image' };
        }
        return item;
      })
      .filter((item) => item !== null);
    console.log('Original jsonContent:', JSON.stringify(jsonContent, null, 2));
    console.log('Filtered jsonContent:', JSON.stringify(filteredJsonContent, null, 2));
    if (filteredJsonContent.length === 0) {
      setErrorMessage('Blog content cannot be empty after filtering invalid paragraphs.');
      setInputErrors((prev) => ({ ...prev, content: 'Content cannot be empty.' }));
      return;
    }
    const bodyValidation = validateBodyContent(filteredJsonContent);
    if (!bodyValidation.valid) {
      setErrorMessage(bodyValidation.error);
      setInputErrors((prev) => ({ ...prev, content: bodyValidation.error }));
      return;
    }
    if (!token || !isValidToken(token)) {
      setErrorMessage('Invalid or missing authentication token. Please log in again.');
      return;
    }
    const formattedPublishDate = new Date(publishDate).toISOString();
    const blogData = {
      title: title.trim(),
      description: description.trim(),
      slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
      publish_date: formattedPublishDate,
      categories: categories.map((cat) => cat.trim()),
      body: filteredJsonContent,
    };
    try {
      console.log('Preparing blogData:', JSON.stringify(blogData, null, 2));
      const formData = new FormData();
      formData.append('blog_data', JSON.stringify(blogData));
      if (images && images.length > 0) {
        images.forEach((image, index) => {
          if (image.file) {
            const fileName = `image-${index}.${image.file.name.split('.').pop()}`;
            formData.append('images', image.file, fileName);
          }
        });
      }
      console.log('Sending FormData to /blogs/create');
      const response = await api.post('/blogs/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Create blog response:', response.data);
      const newBlogId = response.data.id;
      setHasUnsavedChanges(false);
      setErrorMessage('');
      setSelectedPostId(newBlogId);
      alert('Blog post created successfully!');
      fetchAllBlogs();
    } catch (error) {
      console.error('Error saving blog post:', error);
      console.error('Response data:', error.response?.data);
      let errorMessage = 'Failed to save the blog post.';
      if (error.response?.status === 422) {
        errorMessage = `Validation Error: ${error.response.data.detail?.map((err) => err.msg).join(', ') || 'Invalid data.'}`;
      } else if (error.response?.status === 404) {
        errorMessage = 'API endpoint not found.';
      } else if (error.response?.status === 403) {
        errorMessage = 'Unauthorized: Only admins can save blogs.';
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      setErrorMessage(errorMessage);
    }
  };

  const handleUpdate = async ({ htmlContent, jsonContent }) => {
    console.log('Updating:', { htmlContent: htmlContent.substring(0, 100) + '...', jsonContent });
    if (!isAdmin) {
      setErrorMessage('Permission denied: Only admins can update blogs.');
      return;
    }
    if (!selectedPostId) {
      setErrorMessage('No blog post selected for update.');
      return;
    }
    if (!title.trim()) {
      setErrorMessage('Title is required.');
      setInputErrors((prev) => ({ ...prev, title: 'Title is required.' }));
      return;
    }
    if (!description.trim()) {
      setErrorMessage('Description is required.');
      setInputErrors((prev) => ({ ...prev, description: 'Description is required.' }));
      return;
    }
    if (!slug.trim() || !/^[a-z0-9-]+$/.test(slug.trim())) {
      setErrorMessage('Slug is required and must contain only lowercase letters, numbers, and hyphens.');
      setInputErrors((prev) => ({ ...prev, slug: 'Invalid slug format.' }));
      return;
    }
    const allBlogs = [...publishedPosts, ...draftPosts];
    const isSlugTaken = allBlogs.some(
      (blog) => blog.slug === slug.trim() && blog.id !== selectedPostId
    );
    if (isSlugTaken) {
      setErrorMessage('This slug is already in use. Please choose a different one.');
      setInputErrors((prev) => ({ ...prev, slug: 'Slug already exists' }));
      return;
    }
    if (!publishDate || !isValidDate(publishDate)) {
      setErrorMessage('Invalid or missing publish date. Use YYYY-MM-DD format.');
      setInputErrors((prev) => ({ ...prev, publishDate: 'Invalid date format.' }));
      return;
    }
    if (!Array.isArray(categories) || categories.some((cat) => !cat.trim())) {
      setErrorMessage('Categories must be a valid array of non-empty strings.');
      setInputErrors((prev) => ({ ...prev, categories: 'Invalid categories.' }));
      return;
    }
    const filteredJsonContent = jsonContent
      .map((item) => {
        if (item.type === 'paragraph') {
          return item.content && typeof item.content === 'string' && item.content.trim().length > 0
            ? item
            : null;
        }
        if (item.type === 'list') {
          const normalizedStyle = item.style === 'ordered' ? 'numbered' : item.style;
          return { ...item, style: normalizedStyle };
        }
        if (item.type === 'image') {
          return { type: 'image', caption: item.caption || 'Blog Image' };
        }
        return item;
      })
      .filter((item) => item !== null);
    if (filteredJsonContent.length === 0) {
      setErrorMessage('Blog content cannot be empty after filtering invalid paragraphs.');
      setInputErrors((prev) => ({ ...prev, content: 'Content cannot be empty.' }));
      return;
    }
    const bodyValidation = validateBodyContent(filteredJsonContent);
    if (!bodyValidation.valid) {
      setErrorMessage(bodyValidation.error);
      setInputErrors((prev) => ({ ...prev, content: bodyValidation.error }));
      return;
    }
    if (!token || !isValidToken(token)) {
      setErrorMessage('Invalid or missing authentication token. Please log in again.');
      return;
    }
    const formattedPublishDate = new Date(publishDate).toISOString();
    const blogData = {
      title: title.trim(),
      description: description.trim(),
      slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
      publish_date: formattedPublishDate,
      categories: categories.map((cat) => cat.trim()),
      body: filteredJsonContent,
    };
    try {
      console.log('Updating blogData:', JSON.stringify(blogData, null, 2));
      const formData = new FormData();
      formData.append('blog_data', JSON.stringify(blogData));
      if (images && images.length > 0) {
        images.forEach((image, index) => {
          if (image.file) {
            const fileName = `image-${index}.${image.file.name.split('.').pop()}`;
            formData.append('images', image.file, fileName);
          }
        });
      }
      console.log('Sending FormData to /blogs/update');
      const response = await api.put(`/blogs/update/${selectedPostId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setHasUnsavedChanges(false);
      setErrorMessage('');
      alert('Blog post updated successfully!');
      fetchAllBlogs();
    } catch (error) {
      console.error('Error updating blog post:', error);
      console.error('Response data:', error.response?.data);
      const errorMessage =
        error.response?.status === 422
          ? `Validation Error: ${error.response.data.detail?.map((err) => err.msg).join(', ') || 'Invalid data.'}`
          : error.response?.status === 404
          ? 'Blog post not found.'
          : error.response?.status === 403
          ? 'Unauthorized: Only admins can update blogs.'
          : 'Failed to update the blog post.';
      setErrorMessage(errorMessage);
    }
  };

  const handleDelete = async (blogId) => {
    if (isDeleting) return;
    setIsDeleting(true);
    console.log('handleDelete called with blogId:', blogId);
    if (!isAdmin) {
      setErrorMessage('Permission denied: Only admins can delete blogs.');
      console.log('Delete failed: User is not admin');
      setIsDeleting(false);
      return;
    }
    if (!blogId) {
      setErrorMessage('No blog post selected for deletion.');
      console.log('Delete failed: No blogId provided');
      setIsDeleting(false);
      return;
    }
    if (!token || !isValidToken(token)) {
      setErrorMessage('Invalid or missing authentication token. Please log in again.');
      console.log('Delete failed: Invalid or missing token');
      setIsDeleting(false);
      return;
    }
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      console.log('Deletion canceled by user');
      setIsDeleting(false);
      return;
    }
    try {
      console.log('Sending DELETE request to:', `/blogs/delete/${blogId}`);
      const response = await api.delete(`/blogs/delete/${blogId}`);
      console.log('DELETE response:', response.data);

      setTitle('');
      setDescription('');
      setSlug('');
      setPublishDate('');
      setCategories([]);
      setContent('');
      setImages([]);
      setSelectedPostId(null);
      setHasUnsavedChanges(false);
      setErrorMessage('');

      await fetchAllBlogs();
      setActiveSection('Published');

      alert('Blog post deleted successfully!');
      console.log('State after deletion:', { title, content, description, slug, publishDate, categories, selectedPostId });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      const errorMessage =
        error.response?.status === 404
          ? 'Blog post not found. It may have already been deleted or does not exist.'
          : error.response?.status === 403
          ? 'Unauthorized: You do not have permission to delete this blog.'
          : error.response?.status === 422
          ? `Validation Error: ${error.response.data.detail?.map((err) => err.msg).join(', ') || 'Invalid data.'}`
          : error.response?.status === 401
          ? 'Authentication failed: Please log in again.'
          : error.response?.data?.message || 'Failed to delete the blog post.';
      setErrorMessage(errorMessage);
      console.log('Error message set:', errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const setSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    if (section !== 'Blog Editor' && section !== 'Preview') {
      setTitle('');
      setDescription('');
      setSlug('');
      setPublishDate('');
      setCategories([]);
      setContent('');
      setImages([]);
      setSelectedPostId(null);
    }
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
      selectedPostId={selectedPostId}
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
      setSelectedPostId={setSelectedPostId}
      setPublishedPosts={setPublishedPosts}
      handleTitleChange={handleTitleChange}
      handleDescriptionChange={handleDescriptionChange}
      handleSlugChange={handleSlugChange}
      handleDateChange={handleDateChange}
      handleAddCategory={handleAddCategory}
      handleRemoveCategory={handleRemoveCategory}
      handleSave={handleSave}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      toggleMobileMenu={toggleMobileMenu}
      setSection={setSection}
      fetchBlogById={fetchBlogById}
      isDeleting={isDeleting}
      viewOnly={viewOnly}
      setContent={setContent}
    />
  );
}

export default TiptapEditor;