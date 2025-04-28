import React, { useState, useRef, useEffect, useContext } from 'react';
import { Calendar, Tag, CheckSquare, Clock, Edit, Trash2, Save, ArrowLeft, ArrowRight, Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Image, Link, Eye, Lock, Unlock } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import DOMPurify from 'dompurify';
import { debounce } from 'lodash';

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

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let container = range.startContainer;
      let offset = range.startOffset;

      let imageContainer = container.nodeType === 1 ? container.closest('.image-container') : container.parentElement.closest('.image-container');
      if (imageContainer) {
        const parent = imageContainer.parentNode;
        const index = Array.from(parent.childNodes).indexOf(imageContainer);
        container = parent;
        offset = index + 1;
      }

      return { container, offset };
    }
    return null;
  };

  const restoreCursorPosition = (position) => {
    if (position && editorRef.current) {
      const { container, offset } = position;
      const selection = window.getSelection();
      const range = document.createRange();

      try {
        if (!editorRef.current.contains(container)) {
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
        } else if (container.childNodes.length > 0 && offset <= container.childNodes.length) {
          range.setStart(container, offset);
          range.setEnd(container, offset);
        } else {
          range.selectNodeContents(container);
          range.collapse(false);
        }

        selection.removeAllRanges();
        selection.addRange(range);

        const currentSelection = window.getSelection();
        if (currentSelection.rangeCount > 0) {
          const currentRange = currentSelection.getRangeAt(0);
          let currentContainer = currentRange.startContainer;
          let imageContainer = currentContainer.nodeType === 1 ? currentContainer.closest('.image-container') : currentContainer.parentElement.closest('.image-container');
          if (imageContainer) {
            const newP = document.createElement('p');
            newP.innerHTML = '<br>';
            imageContainer.parentNode.insertBefore(newP, imageContainer.nextSibling);
            const newRange = document.createRange();
            newRange.setStart(newP, 0);
            newRange.setEnd(newP, 0);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        }
      } catch (error) {
        console.error('Error restoring cursor position:', error);
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  const handleFormat = (command, value = null) => {
    if (isAdmin && editorRef.current) {
      editorRef.current.focus();
      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const position = saveCursorPosition();

      if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
        const isBulletList = command === 'insertUnorderedList';
        const listTag = isBulletList ? 'UL' : 'OL';

        let blockNode = selection.getRangeAt(0).commonAncestorContainer;
        if (blockNode.nodeType !== 1) {
          blockNode = blockNode.parentNode;
        }
        while (blockNode && blockNode !== editorRef.current) {
          if (['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(blockNode.tagName)) {
            break;
          }
          blockNode = blockNode.parentNode;
        }

        let listNode = blockNode;
        while (listNode && listNode !== editorRef.current) {
          if (listNode.tagName === 'UL' || listNode.tagName === 'OL') {
            break;
          }
          listNode = listNode.parentNode;
        }

        const isInList = listNode && listNode !== editorRef.current;
        const currentListType = isInList ? listNode.tagName : null;

        if (isInList) {
          if (currentListType === listTag) {
            const listItems = listNode.querySelectorAll('li');
            const fragment = document.createDocumentFragment();
            let p = document.createElement('p');
            listItems.forEach((li, index) => {
              let text = li.textContent.trim();
              if (text.startsWith('• ') || /^\d+\.\s/.test(text)) {
                text = text.replace(/^•\s|^\d+\.\s/, '');
              }
              p.textContent += (index > 0 ? ' ' : '') + text;
            });
            listNode.parentNode.replaceChild(p, listNode);
          } else {
            const newList = document.createElement(listTag);
            const listItems = listNode.querySelectorAll('li');
            listItems.forEach((li, index) => {
              const newLi = document.createElement('li');
              let text = li.textContent.trim();
              if (text.startsWith('• ') || /^\d+\.\s/.test(text)) {
                text = text.replace(/^•\s|^\d+\.\s/, '');
              }
              newLi.textContent = isBulletList ? `• ${text}` : `${index + 1}. ${text}`;
              newList.appendChild(newLi);
            });
            listNode.parentNode.replaceChild(newList, listNode);
          }
        } else {
          if (!blockNode || blockNode === editorRef.current) {
            const p = document.createElement('p');
            const contents = selection.getRangeAt(0).extractContents();
            p.appendChild(contents);
            selection.getRangeAt(0).insertNode(p);
            blockNode = p;
          }

          const selectedText = selection.getRangeAt(0).toString().trim();
          if (!selectedText) return;

          const lines = selectedText.split(/\r?\n/).filter((line) => line.trim() !== '');

          const list = document.createElement(listTag);
          lines.forEach((line, index) => {
            const li = document.createElement('li');
            li.textContent = isBulletList ? `• ${line.trim()}` : `${index + 1}. ${line.trim()}`;
            list.appendChild(li);
          });

          const range = selection.getRangeAt(0);
          const beforeRange = document.createRange();
          beforeRange.setStart(blockNode, 0);
          beforeRange.setEnd(range.startContainer, range.startOffset);

          const afterRange = document.createRange();
          afterRange.setStart(range.endContainer, range.endOffset);
          afterRange.setEnd(blockNode, blockNode.childNodes.length);

          const beforeText = beforeRange.toString();
          const afterText = afterRange.toString();

          const fragment = document.createDocumentFragment();

          if (beforeText.trim()) {
            const beforeP = document.createElement('p');
            beforeP.textContent = beforeText;
            fragment.appendChild(beforeP);
          }

          fragment.appendChild(list);

          if (afterText.trim()) {
            const afterP = document.createElement('p');
            afterP.textContent = afterText;
            fragment.appendChild(afterP);
          }

          blockNode.parentNode.replaceChild(fragment, blockNode);

          range.selectNodeContents(list.lastChild);
          range.collapse(false);
        }
      } else if (command.startsWith('formatBlock')) {
        // Handle heading and paragraph formatting
        let blockNode = selection.getRangeAt(0).commonAncestorContainer;
        if (blockNode.nodeType !== 1) {
          blockNode = blockNode.parentNode;
        }
        while (blockNode && blockNode !== editorRef.current) {
          if (['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(blockNode.tagName)) {
            break;
          }
          blockNode = blockNode.parentNode;
        }

        if (!blockNode || blockNode === editorRef.current) {
          const p = document.createElement('p');
          const contents = selection.getRangeAt(0).extractContents();
          p.appendChild(contents);
          selection.getRangeAt(0).insertNode(p);
          blockNode = p;
        }

        const selectedText = selection.getRangeAt(0).toString().trim();
        if (!selectedText) {
          // If no text is selected, apply to the entire block
          document.execCommand('formatBlock', false, value);
        } else {
          // Wrap selected text in the desired tag
          const range = selection.getRangeAt(0);
          const newElement = document.createElement(value);
          range.surroundContents(newElement);
        }
      } else {
        document.execCommand(command, false, value);
      }

      debouncedSetContent(editorRef.current.innerHTML);
      restoreCursorPosition(position);
      updateActiveFormattingStates();
      setHasUnsavedChanges(true);
    }
  };

  const handleContentChange = () => {
    if (isAdmin && editorRef.current) {
      const position = saveCursorPosition();
      const newContent = editorRef.current.innerHTML;
      debouncedSetContent(newContent);
      restoreCursorPosition(position);
      setHasUnsavedChanges(true);
    }
  };

  const handleImageUpload = (e) => {
    if (isAdmin) {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        const newImages = files.map((file) => {
          const url = URL.createObjectURL(file);
          const img = new window.Image();
          img.src = url;
          img.onload = () => {
            imageRatios.current[file.name] = img.width / img.height;
          };
          imageUrls.current[file.name] = url;
          return {
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
            name: file.name,
            url,
            file,
            width: 100,
            height: 100,
            alignment: 'center',
          };
        });
        setImages((prev) => [...prev, ...newImages]);
        newImages.forEach((image) => {
          const imgHtml = `<div class="image-container image-align-${image.alignment}" data-image-id="${image.id}" contenteditable="false"><img src="${image.url}" alt="Blog Image" style="width: ${image.width}%; height: auto; max-width: 100%;" class="my-2.5" /></div>`;
          if (editorRef.current) {
            const selection = window.getSelection();
            let range;
            if (selection.rangeCount > 0) {
              range = selection.getRangeAt(0);
            } else {
              range = document.createRange();
              range.selectNodeContents(editorRef.current);
              range.collapse(false);
            }

            let insertNode = range.startContainer;
            if (insertNode.nodeType !== 1) {
              insertNode = insertNode.parentNode;
            }
            const imageContainer = insertNode.closest('.image-container');
            if (imageContainer) {
              const newP = document.createElement('p');
              newP.innerHTML = '<br>';
              imageContainer.parentNode.insertBefore(newP, imageContainer);
              range.setStart(newP, 0);
              range.setEnd(newP, 0);
            }

            const imgNode = document.createElement('div');
            imgNode.innerHTML = imgHtml;
            range.insertNode(imgNode.firstChild);

            const insertedNode = editorRef.current.querySelector(`[data-image-id="${image.id}"]`);
            if (insertedNode) {
              const newP = document.createElement('p');
              newP.innerHTML = '<br>';
              insertedNode.insertAdjacentElement('afterend', newP);
              range.setStart(newP, 0);
              range.setEnd(newP, 0);
            } else {
              const newP = document.createElement('p');
              newP.innerHTML = '<br>';
              editorRef.current.appendChild(newP);
              range.setStart(newP, 0);
              range.setEnd(newP, 0);
            }

            selection.removeAllRanges();
            selection.addRange(range);
            debouncedSetContent(editorRef.current.innerHTML);
          }
        });
        setHasUnsavedChanges(true);
        e.target.value = null;
      }
    }
  };

  const updateImageSize = (imageId, dimension, value) => {
    if (isAdmin) {
      const parsedValue = parseFloat(value);
      const isValid = !isNaN(parsedValue) && parsedValue >= 0;
      const newValue = isValid ? parsedValue : 100;

      setInputErrors((prev) => ({
        ...prev,
        [`${imageId}-${dimension}`]: !isValid,
      }));

      const updatedImages = images.map((img) => {
        if (img.id === imageId) {
          return { ...img, [dimension]: newValue };
        }
        return img;
      });
      setImages(updatedImages);

      if (editorRef.current) {
        const imageContainers = editorRef.current.querySelectorAll(`.image-container[data-image-id="${imageId}"]`);
        imageContainers.forEach((container) => {
          const img = container.querySelector('img');
          if (img) {
            const updatedImg = updatedImages.find((i) => i.id === imageId);
            img.style.width = `${updatedImg.width}%`;
            img.style.height = `auto`;
            img.style.maxWidth = '100%';
          }
        });
        debouncedSetContent(editorRef.current.innerHTML);
      }
      setHasUnsavedChanges(true);
    }
  };

  const updateImageAlignment = (alignment) => {
    if (isAdmin && editorRef.current) {
      const selection = window.getSelection();
      if (!selection.rangeCount) {
        alert('Please select an image to align.');
        return;
      }

      const range = selection.getRangeAt(0);
      let selectedNode = range.commonAncestorContainer;
      if (selectedNode.nodeType !== 1) {
        selectedNode = selectedNode.parentNode;
      }

      let imageContainer = selectedNode.closest('.image-container');
      if (!imageContainer) {
        const imgNode = selectedNode.querySelector('img') || (selectedNode.tagName === 'IMG' ? selectedNode : null);
        if (imgNode) {
          imageContainer = imgNode.closest('.image-container');
        }
      }

      if (!imageContainer) {
        alert('No image selected. Please click or select an image in the editor.');
        return;
      }

      const imageId = imageContainer.getAttribute('data-image-id');
      if (!imageId) {
        alert('Error: Image ID not found.');
        return;
      }

      imageContainer.classList.remove('image-align-left', 'image-align-center', 'image-align-right');
      imageContainer.classList.add(`image-align-${alignment}`);

      const updatedImages = images.map((img) => {
        if (img.id === imageId) {
          return { ...img, alignment };
        }
        return img;
      });
      setImages(updatedImages);

      debouncedSetContent(editorRef.current.innerHTML);
      setHasUnsavedChanges(true);
    }
  };

  const removeImage = (imageId) => {
    if (isAdmin) {
      const image = images.find((img) => img.id === imageId);
      if (image) {
        if (imageRatios.current[image.name]) {
          delete imageRatios.current[image.name];
        }
        if (imageUrls.current[image.name]) {
          URL.revokeObjectURL(imageUrls.current[image.name]);
          delete imageUrls.current[image.name];
        }
        setInputErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`${imageId}-width`];
          delete newErrors[`${imageId}-height`];
          return newErrors;
        });
      }
      setImages(images.filter((img) => img.id !== imageId));
      if (editorRef.current) {
        const imageContainers = editorRef.current.querySelectorAll(`.image-container[data-image-id="${imageId}"]`);
        imageContainers.forEach((container) => {
          container.remove();
        });
        debouncedSetContent(editorRef.current.innerHTML);
      }
      setHasUnsavedChanges(true);
    }
  };

  const toggleAspectRatioLock = () => {
    if (isAdmin) {
      setLockAspectRatio(!lockAspectRatio);
      setHasUnsavedChanges(true);
    }
  };

  const handleSave = async () => {
    if (!isAdmin) {
      setErrorMessage('Permission denied: Only admins can create blogs.');
      return;
    }
    if (!title || !description || !slug || !publishDate) {
      setErrorMessage('Please fill in all required fields: Title, Description, Slug, and Publish Date.');
      return;
    }
    if (!token || !isValidToken(token)) {
      setErrorMessage('Invalid or missing authentication token. Please log in again.');
      return;
    }
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content || '<p></p>';
    const bodyContent = [];
    tempDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.classList.contains('image-container')) {
          const img = node.querySelector('img');
          if (img) {
            bodyContent.push({
              type: 'image',
              url: img.src,
              caption: img.alt || 'Blog Image',
            });
          }
        } else if (node.tagName.match(/^H[1-6]$/)) {
          bodyContent.push({
            type: 'heading',
            level: parseInt(node.tagName.replace('H', '')),
            content: node.textContent.trim(),
          });
        } else if (node.tagName === 'UL' || node.tagName === 'OL') {
          const items = Array.from(node.querySelectorAll('li')).map((li) =>
            li.textContent.trim().replace(/^•\s|^\d+\.\s/, '')
          );
          bodyContent.push({
            type: 'list',
            style: node.tagName === 'UL' ? 'bullet' : 'numbered',
            items,
          });
        } else if (['P', 'DIV', 'LI'].includes(node.tagName)) {
          let text = node.textContent.trim();
          if (text) {
            text = text.replace(/^•\s|^\d+\.\s/, '');
            bodyContent.push({
              type: 'paragraph',
              content: text,
           anaconda
            });
          }
        }
      }
    });
    if (bodyContent.length === 0) {
      bodyContent.push({ type: 'paragraph', content: '' });
    }
    const formattedPublishDate = new Date(publishDate).toISOString();
    const blogData = {
      title,
      description,
      slug,
      publish_date: formattedPublishDate,
      categories,
      body: bodyContent,
    };
    try {
      const response = await api.post('/blogs/create', blogData);
      setHasUnsavedChanges(false);
      setErrorMessage('');
      alert('Blog post created successfully!');
      fetchAllBlogs();
    } catch (error) {
      console.error('Error saving blog post:', error);
      const errorMessage =
        error.response?.status === 422
          ? `Validation Error: ${error.response.data.detail?.map((err) => err.msg).join(', ') || 'Invalid data.'}`
          : error.response?.status === 404
          ? 'API endpoint not found.'
          : error.response?.status === 403
          ? 'Unauthorized: Only admins can create blogs.'
          : 'Failed to save the blog post.';
      setErrorMessage(errorMessage);
    }
  };

  const handleKeyDown = (e) => {
    if (isAdmin) {
      if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertHTML', false, '    ');
      }

      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let container = range.startContainer;
        if (container.nodeType !== 1) {
          container = container.parentNode;
        }
        const imageContainer = container.closest('.image-container');
        if (imageContainer) {
          e.preventDefault();
          const newP = document.createElement('p');
          newP.innerHTML = '<br>';
          imageContainer.parentNode.insertBefore(newP, imageContainer.nextSibling);
          const newRange = document.createRange();
          newRange.setStart(newP, 0);
          newRange.setEnd(newP, 0);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
    }
  };

  const handleEditorClick = () => {
    if (isAdmin) {
      updateActiveFormattingStates();
    }
  };

  const updateActiveFormattingStates = () => {
    if (isAdmin && editorRef.current) {
      const selection = window.getSelection();
      let bulletList = false;
      let numberedList = false;
      let heading1 = false;
      let heading2 = false;
      let heading3 = false;
      let heading4 = false;

      if (selection.rangeCount > 0) {
        let node = selection.getRangeAt(0).commonAncestorContainer;
        if (node.nodeType !== 1) {
          node = node.parentNode;
        }
        while (node && node !== editorRef.current) {
          if (node.tagName === 'UL') {
            bulletList = true;
            break;
          } else if (node.tagName === 'OL') {
            numberedList = true;
            break;
          } else if (node.tagName === 'H1') {
            heading1 = true;
            break;
          } else if (node.tagName === 'H2') {
            heading2 = true;
            break;
          } else if (node.tagName === 'H3') {
            heading3 = true;
            break;
          } else if (node.tagName === 'H4') {
            heading4 = true;
            break;
          }
          node = node.parentNode;
        }
      }

      setActiveFormatButtons({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
        bulletList,
        numberedList,
        alignLeft: document.queryCommandState('justifyLeft'),
        alignCenter: document.queryCommandState('justifyCenter'),
        alignRight: document.queryCommandState('justifyRight'),
        heading1,
        heading2,
        heading3,
        heading4,
      });
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
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#FCF0F8]">
      <style>
        {`
          .image-container {
            margin: 10px 0;
            width: 100%;
            box-sizing: border-box;
            pointer-events: none;
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
            max-width: 100%;
            height: auto;
            pointer-events: auto;
          }
          .image-container p {
            pointer-events: auto;
          }
          .prose img {
            max-width: 100%;
            height: auto;
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
          .mobile-menu-nav {
            transition: all 0.3s ease;
          }
          .sidebar-ul li button {
            transition: background-color 0.2s ease;
          }
          .group:hover .group-hover\\:block {
            display: block;
          }
          @media (max-width: 768px) {
            .preview-container {
              padding: 16px !important;
              margin: 0 !important;
            }
            .preview-title {
              font-size: 1.75rem !important;
              line-height: 2.25rem !important;
              margin-bottom: 1rem !important;
            }
            .preview-meta {
              font-size: 0.9rem !important;
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 0.5rem !important;
            }
            .preview-meta span {
              margin-bottom: 0.25rem !important;
            }
            .preview-description {
              font-size: 1rem !important;
              margin-bottom: 1.5rem !important;
            }
            .preview-content {
              padding: 1.5rem !important;
              font-size: 1rem !important;
              line-height: 1.75 !important;
            }
            .preview-url {
              font-size: 0.875rem !important;
              margin-top: 1.5rem !important;
            }
            .preview-categories {
              flex-wrap: wrap !important;
              gap: 0.5rem !important;
            }
            .preview-categories span {
              font-size: 0.85rem !important;
              padding: 0.25rem 0.75rem !important;
            }
          }
          .disabled-input {
            background-color: #f5f5f5;
            cursor: not-allowed;
            opacity: 0.6;
          }
          .disabled-button {
            background-color: #d1d5db;
            cursor: not-allowed;
            opacity: 0.6;
          }
        `}
      </style>

      <div className="md:hidden p-4 flex justify-between items-center bg-[#9E0B7F] text-white">
        <div className="flex items-center space-x-2">
          <img src="/Logo1.png" alt="NutriDietMitra Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">NutriDiet</h1>
        </div>
        <button onClick={toggleMobileMenu} className="text-white p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mobile-menu-nav bg-[#9E0B7F] text-white px-4 py-2">
          <nav>
            <ul className="sidebar-ul list-none p-0 m-0">
              <li className="mb-2">
                <button
                  onClick={() => setSection('Blog Editor')}
                  className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                    activeSection === 'Blog Editor' ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'
                  }`}
                >
                  <Edit className="mr-2" size={20} />
                  <span>Blog Editor</span>
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setSection('Preview')}
                  className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                    activeSection === 'Preview' ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'
                  }`}
                >
                  <Eye className="mr-2" size={20} />
                  <span>Preview</span>
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setSection('Published')}
                  className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                    activeSection === 'Published' ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'
                  }`}
                >
                  <CheckSquare className="mr-2" size={20} />
                  <span>Published</span>
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setSection('Drafts')}
                  className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                    activeSection === 'Drafts' ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'
                  }`}
                >
                  <Clock className="mr-2" size={20} />
                  <span>Drafts</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <div className="hidden md:block w-64 flex-shrink-0 sidebar-nav bg-[#9E0B7F] text-white px-4 py-6">
        <div className="flex items-center space-x-2 mb-6">
          <img src="/Logo1.png" alt="NutriDietMitra Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">NutriDiet</h1>
        </div>
        <nav>
          <ul className="sidebar-ul list-none p-0 m-0">
            <li className="mb-2">
              <button
                onClick={() => setSection('Blog Editor')}
                className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                  activeSection === 'Blog Editor' ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'
                }`}
              >
                <Edit className="mr-2" size={20} />
                <span>Blog Editor</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setSection('Preview')}
                className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                  activeSection === 'Preview' ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'
                }`}
              >
                <Eye className="mr-2" size={20} />
                <span>Preview</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setSection('Published')}
                className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                  activeSection === 'Published' ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'
                }`}
              >
                <CheckSquare className="mr-2" size={20} />
                <span>Published</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setSection('Drafts')}
                className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                  activeSection === 'Drafts' ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'
                }`}
              >
                <Clock className="mr-2" size={20} />
                <span>Drafts</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-grow flex flex-col overflow-auto">
        <header className="bg-white p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/Logo1.png" alt="NutriDietMitra Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-[#9E0B7F]">NutriDiet {activeSection}</h1>
          </div>
          <div className="flex items-center">
            {hasUnsavedChanges && (
              <span className="mr-4 flex items-center text-[#718096]">
                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                Unsaved changes
              </span>
            )}
            {activeSection === 'Blog Editor' && isAdmin && (
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md flex items-center bg-[#ADD01C] text-white hover:bg-opacity-90"
              >
                <Save className="mr-2" size={16} />
                <span className="hidden sm:inline">Save</span>
              </button>
            )}
            {!isAdmin && activeSection === 'Blog Editor' && (
              <button className="px-4 py-2 rounded-md flex items-center disabled-button" disabled>
                <Save className="mr-2" size={16} />
                <span className="hidden sm:inline">Save (Admin Only)</span>
              </button>
            )}
          </div>
        </header>

        {errorMessage && (
          <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-md mx-4 mt-4">{errorMessage}</div>
        )}

        <div className="flex flex-col md:flex-row flex-grow overflow-auto">
          {activeSection === 'Blog Editor' && (
            <div className="flex flex-col md:flex-row w-full overflow-auto">
              <div className="w-full md:w-1/2 p-4 md:p-6 overflow-auto">
                <div className="bg-white rounded-md p-4 md:p-6 mb-6 shadow-sm">
                  <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 font-medium text-[#333333]">
                      Blog Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={handleTitleChange}
                      className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                        !isAdmin ? 'disabled-input' : ''
                      }`}
                      placeholder={isAdmin ? 'Enter blog title' : 'View-only (Admin Only)'}
                      disabled={!isAdmin}
                      autoComplete="off"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 font-medium text-[#333333]">
                      Blog Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      value={description}
                      onChange={handleDescriptionChange}
                      className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                        !isAdmin ? 'disabled-input' : ''
                      }`}
                      placeholder={isAdmin ? 'Enter blog description' : 'View-only (Admin Only)'}
                      disabled={!isAdmin}
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="flex-1">
                      <label htmlFor="slug" className="block mb-2 font-medium text-[#333333]">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={handleSlugChange}
                        className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                          !isAdmin ? 'disabled-input' : ''
                        }`}
                        placeholder={isAdmin ? 'enter-slug-here' : 'View-only (Admin Only)'}
                        disabled={!isAdmin}
                        autoComplete="off"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="publishDate" className="block mb-2 font-medium text-[#333333]">
                        Publish Date
                      </label>
                      <div className="relative flex border border-gray-300 rounded-md">
                        <div className="border-r border-gray-300 p-2 bg-gray-100 flex items-center justify-center">
                          <Calendar size={20} className="text-[#718096]" />
                        </div>
                        <input
                          type="date"
                          id="publishDate"
                          value={publishDate}
                          onChange={handleDateChange}
                          className={`flex-grow px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] rounded-r-md bg-white ${
                            !isAdmin ? 'disabled-input' : ''
                          }`}
                          style={{ colorScheme: 'light' }}
                          disabled={!isAdmin}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 font-medium text-[#333333]">Categories</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="px-3 py-1 rounded-full flex items-center bg-[#FCF0F8] text-[#9E0B7F]"
                        >
                          {category}
                          {isAdmin && (
                            <button
                              onClick={() => handleRemoveCategory(category)}
                              className="ml-2 hover:opacity-80 text-[#9E0B7F]"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <div className="relative flex flex-1 border border-gray-300 rounded-l-md">
                        <div className="border-r border-gray-300 p-2 bg-gray-100 flex items-center justify-center">
                          <Tag size={20} className="text-[#718096]" />
                        </div>
                        <input
                          type="text"
                          placeholder={isAdmin ? 'Add category' : 'View-only (Admin Only)'}
                          value={newCategory}
                          onChange={(e) => isAdmin && setNewCategory(e.target.value)}
                          className={`flex-grow px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                            !isAdmin ? 'disabled-input' : ''
                          }`}
                          onKeyPress={(e) => {
                            if (isAdmin && e.key === 'Enter') {
                              handleAddCategory();
                              e.preventDefault();
                            }
                          }}
                          disabled={!isAdmin}
                          autoComplete="off"
                        />
                      </div>
                      {isAdmin && (
                        <button
                          onClick={handleAddCategory}
                          className="px-4 md:px-6 py-2 rounded-r-md bg-[#9E0B7F] text-white hover:bg-opacity-90"
                        >
                          Add
                        </button>
                      )}
                      {!isAdmin && (
                        <button className="px-4 md:px-6 py-2 rounded-r-md disabled-button" disabled>
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-md overflow-hidden mb-6">
                  <div className="p-2 flex flex-wrap items-center gap-2 bg-gradient-to-r from-[#D93BB1] via-[#9E0B7F] to-[#ADD01C]">
                    <div className="flex gap-1 md:gap-2">
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && document.execCommand('undo')}
                        title="Undo"
                        disabled={!isAdmin}
                      >
                        <ArrowLeft size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Undo
                        </span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && document.execCommand('redo')}
                        title="Redo"
                        disabled={!isAdmin}
                      >
                        <ArrowRight size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Redo
                        </span>
                      </button>
                    </div>
                    <div className="hidden md:block w-px h-6 bg-white/30"></div>
                    <div className="hidden md:block">
                      <select
                        className="bg-white rounded px-2 py-1 text-sm w-32"
                        onChange={(e) => isAdmin && handleFormat('fontName', e.target.value)}
                        disabled={!isAdmin}
                        autoComplete="off"
                      >
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>
                    <div className="hidden md:block w-px h-6 bg-white/30"></div>
                    <div className="hidden md:block">
                      <select
                        className="bg-white rounded px-2 py-1 text-sm w-32"
                        onChange={(e) => isAdmin && handleFormat('formatBlock', e.target.value)}
                        disabled={!isAdmin}
                        autoComplete="off"
                      >
                        <option value="p">Paragraph</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                        <option value="h4">Heading 4</option>
                      </select>
                    </div>
                    <div className="w-px h-6 bg-white/30"></div>
                    <div className="flex gap-1 md:gap-2">
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${
                          activeFormatButtons.bold && isAdmin ? 'bg-white/30' : ''
                        } ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && handleFormat('bold')}
                        title="Bold"
                        disabled={!isAdmin}
                      >
                        <Bold size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Bold
                        </span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${
                          activeFormatButtons.italic && isAdmin ? 'bg-white/30' : ''
                        } ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && handleFormat('italic')}
                        title="Italic"
                        disabled={!isAdmin}
                      >
                        <Italic size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Italic
                        </span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${
                          activeFormatButtons.underline && isAdmin ? 'bg-white/30' : ''
                        } ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && handleFormat('underline')}
                        title="Underline"
                        disabled={!isAdmin}
                      >
                        <Underline size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Underline
                        </span>
                      </button>
                    </div>
                    <div className="w-px h-6 bg-white/30"></div>
                    <div className="flex gap-1 md:gap-2">
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${
                          activeFormatButtons.bulletList && isAdmin ? 'bg-white/30' : ''
                        } ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && handleFormat('insertUnorderedList')}
                        title="Bullet List"
                        disabled={!isAdmin}
                      >
                        <List size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Bullet List
                        </span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${
                          activeFormatButtons.numberedList && isAdmin ? 'bg-white/30' : ''
                        } ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && handleFormat('insertOrderedList')}
                        title="Numbered List"
                        disabled={!isAdmin}
                      >
                        <List size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Numbered List
                        </span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${
                          activeFormatButtons.alignLeft && isAdmin ? 'bg-white/30' : ''
                        } ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && handleFormat('justifyLeft')}
                        title="Align Text Left"
                        disabled={!isAdmin}
                      >
                        <AlignLeft size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Align Text Left
                        </span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${
                          activeFormatButtons.alignCenter && isAdmin ? 'bg-white/30' : ''
                        } ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && handleFormat('justifyCenter')}
                        title="Align Text Center"
                        disabled={!isAdmin}
                      >
                        <AlignCenter size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Align Text Center
                        </span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${
                          activeFormatButtons.alignRight && isAdmin ? 'bg-white/30' : ''
                        } ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && handleFormat('justifyRight')}
                        title="Align Text Right"
                        disabled={!isAdmin}
                      >
                        <AlignRight size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Align Text Right
                        </span>
                      </button>
                    </div>
                    <div className="w-px h-6 bg-white/30"></div>
                    <div className="flex gap-1 md:gap-2">
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && updateImageAlignment('left')}
                        title="Align Image Left"
                        disabled={!isAdmin}
                      >
                        <AlignLeft size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Align Image Left
                        </span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && updateImageAlignment('center')}
                        title="Align Image Center"
                        disabled={!isAdmin}
                      >
                        <AlignCenter size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Align Image Center
                        </span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && updateImageAlignment('right')}
                        title="Align Image Right"
                        disabled={!isAdmin}
                      >
                        <AlignRight size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Align Image Right
                        </span>
                      </button>
                    </div>
                    <div className="flex gap-1 md:gap-2 ml-auto">
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => isAdmin && fileInputRef.current?.click()}
                        title="Insert Image"
                        disabled={!isAdmin}
                      >
                        <Image size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Insert Image
                        </span>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleImageUpload}
                          multiple
                          accept="image/*"
                          disabled={!isAdmin}
                          autoComplete="off"
                        />
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${!isAdmin ? 'disabled-button' : ''}`}
                        onClick={() => {
                          if (isAdmin) {
                            const url = prompt('Enter link URL:');
                            if (url) handleFormat('createLink', url);
                          }
                        }}
                        title="Insert Link"
                        disabled={!isAdmin}
                      >
                        <Link size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                          Insert Link
                        </span>
                      </button>
                    </div>
                  </div>

                  <div
                    className={`bg-white p-4 min-h-64 ${!isAdmin ? 'disabled-input' : ''}`}
                    ref={editorRef}
                    contentEditable={isAdmin}
                    onInput={handleContentChange}
                    onKeyDown={handleKeyDown}
                    onClick={handleEditorClick}
                    onMouseUp={updateActiveFormattingStates}
                    onBlur={handleContentChange}
                    style={{ minHeight: '300px', whiteSpace: 'pre-wrap', wordWrap: 'break-word', paddingLeft: '20px' }}
                  />
                </div>

                {images.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-[#333333]">Uploaded Images</h3>
                      <button
                        onClick={toggleAspectRatioLock}
                        className={`p-2 rounded ${
                          lockAspectRatio ? 'bg-[#9E0B7F] text-white' : 'bg-gray-200 text-[#333333]'
                        } hover:opacity-90 ${!isAdmin ? 'disabled-button' : ''}`}
                        title={lockAspectRatio ? 'Unlock Aspect Ratio' : 'Lock Aspect Ratio'}
                        disabled={!isAdmin}
                      >
                        {lockAspectRatio ? <Lock size={16} /> : <Unlock size={16} />}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {images.map((image) => (
                        <div key={image.id} className="border rounded-md p-2 relative group">
                          <img src={image.url} alt="Blog Image" className="w-full h-32 object-cover rounded" />
                          <div className="mt-2 flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm truncate flex-1 text-[#718096]">Image {image.id}</span>
                              <button
                                onClick={() => isAdmin && removeImage(image.id)}
                                className="text-red-500 hover:text-red-700"
                                disabled={!isAdmin}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <label className="text-xs text-[#333333]">Width (%)</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  value={image.width}
                                  onChange={(e) => isAdmin && updateImageSize(image.id, 'width', e.target.value)}
                                  className={`w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                                    inputErrors[`${image.id}-width`] ? 'border-red-500' : 'border-gray-300'
                                  } ${!isAdmin ? 'disabled-input' : ''}`}
                                  placeholder="Enter width"
                                  disabled={!isAdmin}
                                  autoComplete="off"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="text-xs text-[#333333]">Height (%)</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  value={image.height}
                                  onChange={(e) => isAdmin && updateImageSize(image.id, 'height', e.target.value)}
                                  className={`w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                                    inputErrors[`${image.id}-height`] ? 'border-red-500' : 'border-gray-300'
                                  } ${!isAdmin ? 'disabled-input' : ''}`}
                                  placeholder="Enter height"
                                  disabled={!isAdmin}
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            className={`absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity bg-[#9E0B7F] text-white ${
                              !isAdmin ? 'disabled-button' : ''
                            }`}
                            onClick={() => {
                              if (isAdmin && editorRef.current) {
                                const selection = window.getSelection();
                                if (selection.rangeCount > 0) {
                                  const range = selection.getRangeAt(0);
                                  const imgHtml = `<div class="image-container image-align-${image.alignment}" data-image-id="${image.id}" contenteditable="false"><img src="${image.url}" alt="Blog Image" style="width: ${image.width}%; height: auto; max-width: 100%;" class="my-2.5" /></div>`;
                                  const imgNode = document.createElement('div');
                                  imgNode.innerHTML = imgHtml;
                                  range.insertNode(imgNode.firstChild);
                                  const insertedNode = editorRef.current.querySelector(`[data-image-id="${image.id}"]`);
                                  if (insertedNode) {
                                    const newP = document.createElement('p');
                                    newP.innerHTML = '<br>';
                                    insertedNode.insertAdjacentElement('afterend', newP);
                                    range.setStart(newP, 0);
                                    range.setEnd(newP, 0);
                                  }
                                  selection.removeAllRanges();
                                  selection.addRange(range);
                                  handleContentChange();
                                }
                              }
                            }}
                            disabled={!isAdmin}
                          >
                            <Image size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2 p-4 md:p-6 overflow-auto bg-[#FCF0F8] border-l border-gray-200 preview-container">
                <h2 className="text-xl font-bold mb-4 text-[#9E0B7F]">Blog Preview</h2>
                <div className="border-t border-gray-200 pt-4">
                  <h1 className="text-3xl font-bold mb-2 text-[#9E0B7F] preview-title">{title || 'Untitled'}</h1>
                  <div className="flex items-center mb-2 flex-wrap text-[#718096] preview-meta">
                    <Calendar size={16} className="mr-1" />
                    <span>{publishDate || 'Not set'}</span>
                    <span className="mx-2">•</span>
                    <div className="flex flex-wrap gap-2 preview-categories">
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <span
                            key={category}
                            className="px-2 py-0.5 rounded-full text-sm bg-[#FCF0F8] text-[#9E0B7F]"
                          >
                            {category}
                          </span>
                        ))
                      ) : (
                        <span>No categories</span>
                      )}
                    </div>
                  </div>
                  <p className="mb-4 text-[#718096] preview-description">{description || 'No description provided'}</p>
                  <div
                    className="prose max-w-none bg-white p-4 rounded-md shadow-sm preview-content"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(content || '<p>Start writing your blog post...</p>', {
                        ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img', 'div', 'br'],
                        ALLOWED_ATTR: ['src', 'alt', 'class', 'style', 'data-image-id'],
                        ADD_ATTR: ['src'],
                        ADD_URI_SAFE_ATTR: ['src'],
                      }),
                    }}
                  />
                  <p className="text-sm mt-4 text-[#718096] preview-url">
                    URL: nutridietmitra.com/blog/{slug || 'slug-not-set'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Preview' && (
            <div className="w-full p-4 md:p-6 overflow-auto bg-[#FCF0F8] preview-container">
              <h2 className="text-xl font-bold mb-4 text-[#9E0B7F]">Blog Preview</h2>
              <div className="border-t border-gray-200 pt-4">
                <h1 className="text-3xl font-bold mb-2 text-[#9E0B7F] preview-title">{title || 'No title'}</h1>
                <div className="flex items-center mb-2 flex-wrap text-[#718096] preview-meta">
                  <Calendar size={16} className="mr-1" />
                  <span>{publishDate || 'Not set'}</span>
                  <span className="mx-2">•</span>
                  <div className="flex flex-wrap gap-2 preview-categories">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-0.5 rounded-full text-sm bg-[#FCF0F8] text-[#9E0B7F]"
                        >
                          {category}
                        </span>
                      ))
                    ) : (
                      <span>No categories</span>
                    )}
                  </div>
                </div>
                <p className="mb-4 text-[#718096] preview-description">{description || 'No description'}</p>
                <div
                  className="prose max-w-none bg-white p-4 rounded-md shadow-sm preview-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content || '<p>No content available</p>', {
                      ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img', 'div', 'br'],
                      ALLOWED_ATTR: ['src', 'alt', 'class', 'style', 'data-image-id'],
                      ADD_ATTR: ['src'],
                      ADD_URI_SAFE_ATTR: ['src'],
                    }),
                  }}
                />
                <p className="text-sm mt-4 text-[#718096] preview-url">
                  URL: nutridietmitra.com/blog/{slug || 'no-slug'}
                </p>
              </div>
            </div>
          )}

          {activeSection === 'Published' && (
            <div className="w-full p-4 md:p-6 overflow-auto bg-[#FCF0F8]">
              <h2 className="text-xl font-bold mb-4 text-[#9E0B7F]">Published Posts</h2>
              <div className="border-t border-gray-200 pt-4">
                {publishedPosts.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {publishedPosts.map((post) => (
                      <li
                        key={post.id}
                        className="mb-4 p-4 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => fetchBlogById(post.id)}
                      >
                        <h3 className="text-lg font-medium text-[#333333]">{post.title}</h3>
                        <p className="text-[#718096]">Published: {post.date || 'Date not set'}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#718096]">No published posts yet.</p>
                )}
              </div>
            </div>
          )}

          {activeSection === 'Drafts' && (
            <div className="w-full p-4 md:p-6 overflow-auto bg-[#FCF0F8]">
              <h2 className="text-xl font-bold mb-4 text-[#9E0B7F]">Drafts</h2>
              <div className="border-t border-gray-200 pt-4">
                {draftPosts.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {draftPosts.map((post) => (
                      <li
                        key={post.id}
                        className="mb-4 p-4 bg-white rounded-md shadow-sm cursor-pointer hover:bg-gray-100"
                        onClick={() => fetchBlogById(post.id)}
                      >
                        <h3 className="text-lg font-medium text-[#333333]">{post.title}</h3>
                        <p className="text-[#718096]">Last Edited: {post.date || 'Date not set'}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#718096]">No drafts yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TiptapEditor;