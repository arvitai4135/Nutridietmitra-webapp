import React, { useEffect, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Calendar,
  Tag,
  CheckSquare,
  Clock,
  Edit,
  Trash2,
  Save,
  LayoutDashboard,
  Eye,
  ExternalLink,
} from 'lucide-react';
import DOMPurify from 'dompurify';
import { AuthContext } from '../../context/AuthContext';
import EditorControls from './EditorControls';

function EditorContent({
  isAdmin,
  title,
  description,
  slug,
  publishDate,
  categories = [],
  newCategory,
  hasUnsavedChanges,
  content,
  images,
  lockAspectRatio,
  inputErrors,
  activeFormatButtons,
  mobileMenuOpen,
  activeSection,
  errorMessage,
  publishedPosts,
  draftPosts,
  selectedPostId,
  editorRef,
  fileInputRef,
  imageRatios,
  imageUrls,
  debouncedSetContent,
  setTitle,
  setDescription,
  setSlug,
  setPublishDate,
  setCategories,
  setNewCategory,
  setHasUnsavedChanges,
  setImages,
  setLockAspectRatio,
  setInputErrors,
  setActiveFormatButtons,
  setMobileMenuOpen,
  setActiveSection,
  setErrorMessage,
  setSelectedPostId,
  handleTitleChange,
  handleDescriptionChange,
  handleSlugChange,
  handleDateChange,
  handleAddCategory,
  handleRemoveCategory,
  handleSave,
  handleUpdate,
  handleDelete,
  toggleMobileMenu,
  setSection,
  fetchBlogById,
  isDeleting,
  viewOnly,
  setContent,
}) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [deletingPostId, setDeletingPostId] = useState(null);

  useEffect(() => {
    if (!token && isAdmin) {
      setErrorMessage('Please log in to access this feature.');
      navigate('/login');
    }
  }, [token, isAdmin, navigate, setErrorMessage]);

  useEffect(() => {
    if (!editorRef.current || activeSection !== 'Blog Editor' || viewOnly) return;

    try {
      let sanitizedContent = DOMPurify.sanitize(content || '<p>Start writing your blog post...</p>', {
        ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img', 'div', 'br', 'strong', 'em', 'u', 'a'],
        ALLOWED_ATTR: ['src', 'alt', 'class', 'style', 'data-image-id', 'href']
      });
      const parser = new DOMParser();
      const doc = parser.parseFromString(sanitizedContent, 'text/html');
      const lists = doc.querySelectorAll('ul, ol');
      lists.forEach((list) => {
        const items = list.querySelectorAll('li');
        items.forEach((li) => {
          if (!li.textContent.trim()) li.remove();
        });
        if (list.children.length === 0) list.remove();
      });
      sanitizedContent = doc.body.innerHTML;
      if (!editorRef.current.innerHTML.includes('image-container') || editorRef.current.innerHTML === '<p>Start writing your blog post...</p>') {
        editorRef.current.innerHTML = sanitizedContent;
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    } catch (error) {
      console.error('Error sanitizing editor content:', error);
      setErrorMessage('Failed to load editor content. Please refresh the page.');
    }
  }, [editorRef, content, activeSection, viewOnly, setErrorMessage]);

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    return selection.rangeCount > 0 ? { range: selection.getRangeAt(0).cloneRange() } : null;
  };

  const restoreCursorPosition = (position) => {
    if (!position || !editorRef.current) return;
    const { range } = position;
    const selection = window.getSelection();
    try {
      selection.removeAllRanges();
      selection.addRange(range);
    } catch (error) {
      console.error('Error restoring cursor position:', error);
      const newRange = document.createRange();
      newRange.selectNodeContents(editorRef.current);
      newRange.collapse(false);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  const parseEditorContentToJSON = (htmlContent) => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const elements = doc.body.childNodes;
      const jsonContent = [];

      elements.forEach((node) => {
        if (node.nodeType === 1) {
          const tagName = node.tagName.toLowerCase();
          if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) {
            jsonContent.push({
              type: 'heading',
              level: parseInt(tagName.replace('h', '')),
              content: node.textContent.trim(),
            });
          } else if (tagName === 'p') {
            jsonContent.push({
              type: 'paragraph',
              content: node.textContent.trim(),
            });
          } else if (tagName === 'ul' || tagName === 'ol') {
            const items = Array.from(node.querySelectorAll('li'))
              .map((li) => {
                let text = li.textContent.trim();
                if (text.startsWith('• ') || /^\d+\.\s/.test(text)) {
                  text = text.replace(/^•\s|^\d+\.\s/, '');
                }
                return text;
              })
              .filter((item) => item !== '');
            if (items.length > 0) {
              jsonContent.push({
                type: 'list',
                style: tagName === 'ul' ? 'bullet' : 'ordered',
                items,
              });
            }
          } else if (node.classList.contains('image-container')) {
            const img = node.querySelector('img');
            if (img) {
              const style = img.getAttribute('style') || '';
              const widthMatch = style.match(/width:\s*(\d+\.?\d*)%/);
              const heightMatch = style.match(/height:\s*(auto|\d+\.?\d*%)?/);
              const width = widthMatch ? parseFloat(widthMatch[1]) : 100;
              const height = heightMatch
                ? heightMatch[1] === 'auto'
                  ? 'auto'
                  : parseFloat(heightMatch[1])
                : 'auto';
              jsonContent.push({
                type: 'image',
                url: img.src,
                caption: img.alt || 'No caption',
                width,
                height,
              });
            }
          }
        }
      });

      return jsonContent;
    } catch (error) {
      console.error('Error parsing editor content to JSON:', error);
      return [];
    }
  };

  const handleFormat = (command, value = null) => {
    if (!isAdmin || !editorRef.current || viewOnly) return;
    try {
      editorRef.current.focus();
      const position = saveCursorPosition();
      const selection = window.getSelection();

      if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
        if (selection.rangeCount === 0) {
          setErrorMessage('Please select text to create a list.');
          return;
        }

        const range = selection.getRangeAt(0);
        const isBulletList = command === 'insertUnorderedList';
        const listTag = isBulletList ? 'ul' : 'ol';

        let parentNode = range.commonAncestorContainer;
        if (parentNode.nodeType !== 1) parentNode = parentNode.parentNode;
        if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(parentNode.tagName)) {
          setErrorMessage('Cannot create a list inside a heading.');
          return;
        }

        let blockNode = parentNode;
        while (blockNode && blockNode !== editorRef.current) {
          if (['P', 'DIV', 'UL', 'OL'].includes(blockNode.tagName)) break;
          blockNode = blockNode.parentNode;
        }

        let listNode = parentNode;
        while (listNode && listNode !== editorRef.current) {
          if (listNode.tagName === 'UL' || listNode.tagName === 'OL') break;
          listNode = listNode.parentNode;
        }

        const isInList = listNode && listNode !== editorRef.current;
        const currentListType = isInList ? listNode.tagName : null;

        if (isInList) {
          if (currentListType === listTag) {
            const fragment = document.createDocumentFragment();
            const listItems = listNode.querySelectorAll('li');
            listItems.forEach((li) => {
              const p = document.createElement('p');
              let text = li.textContent.trim();
              if (text.startsWith('• ') || /^\d+\.\s/.test(text)) {
                text = text.replace(/^•\s|^\d+\.\s/, '');
              }
              p.textContent = text || '\u00A0';
              fragment.appendChild(p);
            });
            listNode.parentNode.replaceChild(fragment, listNode);
          } else {
            const newList = document.createElement(listTag);
            const listItems = listNode.querySelectorAll('li');
            listItems.forEach((li) => {
              const newLi = document.createElement('li');
              let text = li.textContent.trim();
              if (text.startsWith('• ') || /^\d+\.\s/.test(text)) {
                text = text.replace(/^•\s|^\d+\.\s/, '');
              }
              newLi.textContent = text || '\u00A0';
              newList.appendChild(newLi);
            });
            listNode.parentNode.replaceChild(newList, listNode);
          }
        } else {
          const selectedContent = range.cloneContents();
          const tempDiv = document.createElement('div');
          tempDiv.appendChild(selectedContent);
          const textContent = tempDiv.textContent.trim();

          if (!textContent) {
            setErrorMessage('Please select non-empty text to create a list.');
            return;
          }

          const lines = [];
          const nodes = tempDiv.childNodes;
          nodes.forEach((node) => {
            if (node.nodeType === 3) {
              const text = node.textContent.trim();
              if (text) lines.push(text);
            } else if (node.nodeType === 1) {
              const text = node.textContent.trim();
              if (text) lines.push(text);
            }
          });

          if (lines.length === 0) {
            setErrorMessage('Please select non-empty text to create a list.');
            return;
          }

          const list = document.createElement(listTag);
          lines.forEach((line) => {
            const li = document.createElement('li');
            li.textContent = line || '\u00A0';
            list.appendChild(li);
          });

          range.deleteContents();
          range.insertNode(list);

          editorRef.current.normalize();

          if (!blockNode || blockNode === editorRef.current) {
            const p = document.createElement('p');
            p.innerHTML = '<br>';
            list.insertAdjacentElement('afterend', p);
          } else if (blockNode.tagName === 'P' && blockNode.textContent.trim() === '') {
            blockNode.remove();
          }
        }
      } else if (command === 'createLink') {
        document.execCommand(command, false, value);
      } else if (command === 'formatBlock') {
        document.execCommand(command, false, value);
      } else if (command === 'fontName') {
        document.execCommand(command, false, value);
      } else {
        document.execCommand(command, false, value);
      }

      updateActiveFormattingStates();
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      debouncedSetContent(newContent);
      setHasUnsavedChanges(true);
      restoreCursorPosition(position);
    } catch (error) {
      console.error('Error applying format:', error);
      setErrorMessage('Failed to apply formatting. Please try again.');
    }
  };

  const updateImageAlignment = (alignment) => {
    if (!isAdmin || !editorRef.current || viewOnly) return;
    try {
      const position = saveCursorPosition();
      const selection = window.getSelection();
      let node = selection.focusNode;
      if (node.nodeType !== 1) node = node.parentNode;
      const imageContainer = node.closest('.image-container');
      if (imageContainer) {
        imageContainer.classList.remove('image-align-left', 'image-align-center', 'image-align-right');
        imageContainer.classList.add(`image-align-${alignment}`);
        const newContent = editorRef.current.innerHTML;
        setContent(newContent);
        debouncedSetContent(newContent);
        setHasUnsavedChanges(true);
        restoreCursorPosition(position);
      } else {
        console.warn('No image selected for alignment change.');
      }
    } catch (error) {
      console.error('Error updating image alignment:', error);
      setErrorMessage('Failed to align image. Please try again.');
    }
  };

  const handleContentChange = () => {
    if (!isAdmin || !editorRef.current || viewOnly) return;
    try {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      debouncedSetContent(newContent);
      setHasUnsavedChanges(true);
      updateActiveFormattingStates();
    } catch (error) {
      console.error('Error handling content change:', error);
      setErrorMessage('Failed to update content. Please try again.');
    }
  };

  const handleImageUpload = (e) => {
    if (!isAdmin || viewOnly || !e.target.files) return;
    try {
      const position = saveCursorPosition();
      const files = Array.from(e.target.files);
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes

      // Filter out files larger than 1MB
      const validFiles = files.filter((file) => {
        if (file.size > maxSize) {
          setErrorMessage(`Image "${file.name}" exceeds 1MB size limit.`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) {
        setErrorMessage('No valid images uploaded. All images must be under 1MB.');
        return;
      }

      const newImages = validFiles.map((file, index) => {
        const id = `${Date.now()}-${index}`;
        const url = URL.createObjectURL(file);
        imageUrls.current[id] = url;

        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = url;
          img.onload = () => {
            const ratio = img.width / img.height;
            imageRatios.current[id] = ratio;
            resolve({ id, file, url, width: 100, height: 100 / ratio });
          };
          img.onerror = () => {
            console.error('Error loading image:', url);
            resolve({ id, file, url, width: 100, height: 100 });
          };
        });
      });

      Promise.all(newImages)
        .then((resolvedImages) => {
          setImages((prevImages) => [...prevImages, ...resolvedImages]);
          resolvedImages.forEach((image) => {
            const imgHtml = `<div class="image-container image-align-center" contenteditable="false"><img src="${image.url}" alt="Blog Image" style="width: ${image.width}%; height: auto; max-width: 100%;" class="my-2.5" data-image-id="${image.id}" /></div>`;
            const selection = window.getSelection();
            let range;
            if (selection.rangeCount > 0 && position) {
              range = position.range;
            } else {
              range = document.createRange();
              range.selectNodeContents(editorRef.current);
              range.collapse(false);
            }

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = imgHtml;
            const imageContainer = tempDiv.firstChild;
            range.insertNode(imageContainer);

            const newP = document.createElement('p');
            newP.innerHTML = '<br>';
            imageContainer.insertAdjacentElement('afterend', newP);

            range.setStart(newP, 0);
            range.setEnd(newP, 0);
            selection.removeAllRanges();
            selection.addRange(range);

            const newContent = editorRef.current.innerHTML;
            setContent(newContent);
            debouncedSetContent(newContent);
            setHasUnsavedChanges(true);
          });

          e.target.value = '';
        })
        .catch((error) => {
          console.error('Error processing image upload:', error);
          setErrorMessage('Failed to upload image. Please try again.');
        });
    } catch (error) {
      console.error('Error in handleImageUpload:', error);
      setErrorMessage('Failed to upload image. Please try again.');
    }
  };

  const updateImageSize = (id, dimension, value) => {
    if (!isAdmin || viewOnly) return;
    try {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue) || parsedValue <= 0) {
        setInputErrors((prev) => ({
          ...prev,
          [`${id}-${dimension}`]: 'Value must be a positive number.',
        }));
        return;
      }

      setInputErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${id}-${dimension}`];
        return newErrors;
      });

      setImages((prevImages) =>
        prevImages.map((img) => {
          if (img.id !== id) return img;
          let newWidth = img.width;
          let newHeight = img.height;

          if (dimension === 'width') {
            newWidth = parsedValue;
            if (lockAspectRatio && imageRatios.current[id]) {
              newHeight = newWidth / imageRatios.current[id];
            }
          } else {
            newHeight = parsedValue;
            if (lockAspectRatio && imageRatios.current[id]) {
              newWidth = newHeight * imageRatios.current[id];
            }
          }

          return { ...img, width: newWidth, height: newHeight };
        })
      );

      const imageContainers = editorRef.current.querySelectorAll(`.image-container img[data-image-id="${id}"]`);
      if (imageContainers.length === 0) {
        console.warn(`Image with ID ${id} not found in editor.`);
        return;
      }
      imageContainers.forEach((img) => {
        img.style.width = `${dimension === 'width' ? parsedValue : images.find((image) => image.id === id).width}%`;
        img.style.height = lockAspectRatio ? 'auto' : `${dimension === 'height' ? parsedValue : images.find((image) => image.id === id).height}%`;
      });

      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      debouncedSetContent(newContent);
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error('Error updating image size:', error);
      setErrorMessage('Failed to resize image. Please try again.');
    }
  };

  const removeImage = (id) => {
    if (!isAdmin || viewOnly) return;
    try {
      const image = images.find((img) => img.id === id);
      if (image && imageUrls.current[id]) {
        URL.revokeObjectURL(imageUrls.current[id]);
        delete imageUrls.current[id];
        delete imageRatios.current[id];
      }
      setImages((prevImages) => prevImages.filter((img) => img.id !== id));
      const imageContainers = editorRef.current.querySelectorAll(`.image-container img[data-image-id="${id}"]`);
      if (imageContainers.length === 0) {
        console.warn(`Image with ID ${id} not found in editor for removal.`);
      }
      imageContainers.forEach((img) => {
        const container = img.closest('.image-container');
        if (container) container.remove();
      });
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      debouncedSetContent(newContent);
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error('Error removing image:', error);
      setErrorMessage('Failed to remove image. Please try again.');
    }
  };

  const toggleAspectRatioLock = () => {
    if (!isAdmin || viewOnly) return;
    try {
      setLockAspectRatio(!lockAspectRatio);
      setHasUnsavedChanges(true);
    } catch (error) {
      console.error('Error toggling aspect ratio lock:', error);
      setErrorMessage('Failed to toggle aspect ratio lock. Please try again.');
    }
  };

  const handleKeyDown = (e) => {
    if (!isAdmin || viewOnly) return;
    try {
      if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertHTML', false, '    ');
      }

      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let container = range.startContainer;
        if (container.nodeType !== 1) container = container.parentNode;
        const imageContainer = container.closest('.image-container');
        if (imageContainer && e.key !== 'Tab') {
          e.preventDefault();
          const newP = document.createElement('p');
          newP.innerHTML = '<br>';
          imageContainer.insertAdjacentElement('afterend', newP);
          const newRange = document.createRange();
          newRange.setStart(newP, 0);
          newRange.setEnd(newP, 0);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
    } catch (error) {
      console.error('Error handling key down:', error);
      setErrorMessage('Failed to handle key input. Please try again.');
    }
  };

  const handleEditorClick = () => {
    if (!isAdmin || viewOnly) return;
    try {
      updateActiveFormattingStates();
    } catch (error) {
      console.error('Error handling editor click:', error);
      setErrorMessage('Failed to update editor state. Please try again.');
    }
  };

  const updateActiveFormattingStates = () => {
    if (!isAdmin || !editorRef.current || viewOnly) return;
    try {
      const selection = window.getSelection();
      let bulletList = false;
      let numberedList = false;
      let heading1 = false;
      let heading2 = false;
      let heading3 = false;
      let heading4 = false;
      let heading5 = false;
      let heading6 = false;

      if (selection.rangeCount > 0) {
        let node = selection.getRangeAt(0).commonAncestorContainer;
        if (node.nodeType !== 1) node = node.parentNode;
        while (node && node !== editorRef.current) {
          if (node.tagName === 'UL') bulletList = true;
          else if (node.tagName === 'OL') numberedList = true;
          else if (node.tagName === 'H1') heading1 = true;
          else if (node.tagName === 'H2') heading2 = true;
          else if (node.tagName === 'H3') heading3 = true;
          else if (node.tagName === 'H4') heading4 = true;
          else if (node.tagName === 'H5') heading5 = true;
          else if (node.tagName === 'H6') heading6 = true;
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
        heading5,
        heading6,
      });
    } catch (error) {
      console.error('Error updating formatting states:', error);
      setErrorMessage('Failed to update formatting states. Please try again.');
    }
  };

  const handleSaveWithJSON = () => {
    if (!isAdmin || !editorRef.current || viewOnly || !token) {
      setErrorMessage('Authorization token missing or insufficient permissions. Please log in.');
      navigate('/login');
      return;
    }
    try {
      const htmlContent = editorRef.current.innerHTML;
      let jsonContent = parseEditorContentToJSON(htmlContent);
      jsonContent = jsonContent.filter((node) => {
        if (node.type === 'list') {
          node.items = node.items.filter((item) => item !== '');
          return node.items.length > 0;
        }
        return true;
      });
      handleSave({ htmlContent, jsonContent });
    } catch (error) {
      console.error('Error saving with JSON:', error);
      setErrorMessage('Failed to save blog post. Please try again.');
    }
  };

  const handleUpdateWithJSON = () => {
    if (!isAdmin || !editorRef.current || viewOnly || !token) {
      setErrorMessage('Authorization token missing or insufficient permissions. Please log in.');
      navigate('/login');
      return;
    }
    try {
      const htmlContent = editorRef.current.innerHTML;
      let jsonContent = parseEditorContentToJSON(htmlContent);
      jsonContent = jsonContent.filter((node) => {
        if (node.type === 'list') {
          node.items = node.items.filter((item) => item !== '');
          return node.items.length > 0;
        }
        return true;
      });
      handleUpdate({ htmlContent, jsonContent });
    } catch (error) {
      console.error('Error updating with JSON:', error);
      setErrorMessage('Failed to update blog post. Please try again.');
    }
  };

  const handleDeleteWithToken = async (postId) => {
    if (!token) {
      setErrorMessage('Authorization token missing. Please log in.');
      navigate('/login');
      return;
    }
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      setDeletingPostId(postId);
      await handleDelete(postId);
      setErrorMessage('Post deleted successfully.');
    } catch (error) {
      console.error('Error deleting post:', error);
      setErrorMessage('Failed to delete post. Please try again.');
    } finally {
      setDeletingPostId(null);
    }
  };

  const fetchBlogByIdWithToken = async (postId) => {
    if (!token) {
      setErrorMessage('Authorization token missing. Please log in.');
      navigate('/login');
      return;
    }
    try {
      await fetchBlogById(postId);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setErrorMessage('Failed to load post. Please try again.');
    }
  };

  const handleOpenPost = (slug) => {
    if (viewOnly || !slug) {
      setErrorMessage('Invalid post URL or view-only mode.');
      return;
    }
    try {
      navigate(`/blog/${slug}`);
    } catch (error) {
      console.error('Error navigating to blog post:', error);
      setErrorMessage('Failed to open blog post. Please try again.');
    }
  };

  const handleEditPost = async (postId) => {
    if (!token || !isAdmin) {
      setErrorMessage('Authorization token missing or insufficient permissions. Please log in.');
      navigate('/login');
      return;
    }
    try {
      setSelectedPostId(postId);
      await fetchBlogByIdWithToken(postId);
      setSection('Blog Editor');
    } catch (error) {
      console.error('Error initiating edit:', error);
      setErrorMessage('Failed to load post for editing. Please try again.');
    }
  };

  const handleViewPost = async (postId, postTitle) => {
    if (!token) {
      setErrorMessage('Authorization token missing. Please log in.');
      navigate('/login');
      return;
    }
    try {
      setSelectedPostId(postId);
      await fetchBlogByIdWithToken(postId);
      setSection('Preview');
    } catch (error) {
      console.error(`Error viewing post "${postTitle}":`, error);
      setErrorMessage('Failed to load post for preview. Please try again.');
    }
  };

  const handleDashboardRedirect = () => {
    try {
      navigate('/dashboard');
    } catch (error) {
      console.error('Error redirecting to dashboard:', error);
      setErrorMessage('Failed to redirect to dashboard. Please try again.');
    }
  };

  const renderPreviewContent = useMemo(() => {
    try {
      const sanitizedContent = DOMPurify.sanitize(content || '<p>Blog content goes here...</p>', {
        ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img', 'div', 'br', 'strong', 'em', 'u', 'a'],
        ALLOWED_ATTR: ['src', 'alt', 'class', 'style', 'data-image-id', 'href'],
        ADD_ATTR: ['src', 'href'],
        ADD_URI_SAFE_ATTR: ['src', 'href'],
      });
      return sanitizedContent;
    } catch (error) {
      console.error('Error rendering preview content:', error);
      setErrorMessage('Failed to render preview. Please try again.');
      return '<p>Error rendering content. Please try again.</p>';
    }
  }, [content, setErrorMessage]);

  const renderPosts = useMemo(() => {
    const posts = activeSection === 'Published' ? publishedPosts : draftPosts;
    return posts.map((post) => (
      <div
        key={post.id}
        className={`post-card rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col w-full min-h-[200px] ${
          activeSection === 'Published'
            ? 'bg-[#FCF0F8] border border-[#D93BB1]'
            : 'bg-white'
        } p-4`}
      >
        <h3
          className={`font-bold truncate ${
            activeSection === 'Published'
              ? 'text-lg sm:text-xl text-[#7B0A5F]'
              : 'text-base sm:text-lg font-semibold text-[#9E0B7F]'
          }`}
        >
          {post.title}
        </h3>
        <p
          className={`flex-grow line-clamp-3 ${
            activeSection === 'Published'
              ? 'text-sm sm:text-base text-[#6B7280] mt-2'
              : 'text-[#718096] text-sm mt-2'
          }`}
        >
          {post.description || 'No description available'}
        </p>
        <div
          className={`flex items-center mt-2 ${
            activeSection === 'Published'
              ? 'text-[#9E0B7F] text-xs sm:text-sm font-medium'
              : 'text-[#718096] text-xs sm:text-sm'
          }`}
        >
          <Calendar className="mr-2" size={16} />
          {post.date || 'Not published'}
        </div>
        {activeSection === 'Published' && (
          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-end gap-1.5 mt-4">
            <button
              onClick={() => handleViewPost(post.id, post.title)}
              className="px-3 py-1.5 rounded-md flex items-center bg-blue-700 text-white hover:bg-blue-800 text-xs sm:text-sm min-w-[70px] justify-center"
              aria-label={`View post ${post.title} in preview`}
            >
              <Eye className="mr-1" size={16} />
              View
            </button>
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-md flex items-center bg-[#7B0A5F] text-white hover:bg-opacity-80 text-xs sm:text-sm min-w-[70px] justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Open post ${post.title} in new tab`}
            >
              <ExternalLink className="mr-1" size={16} />
              Open
            </a>
            {isAdmin ? (
              <>
                <button
                  onClick={() => handleEditPost(post.id)}
                  className="px-3 py-1.5 rounded-md flex items-center bg-green-600 text-white hover:bg-green-700 text-xs sm:text-sm min-w-[70px] justify-center"
                  aria-label={`Edit post ${post.title}`}
                >
                  <Edit className="mr-1" size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteWithToken(post.id)}
                  className={`px-3 py-1.5 rounded-md flex items-center bg-red-700 text-white hover:bg-red-800 text-xs sm:text-sm min-w-[70px] justify-center ${deletingPostId === post.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={deletingPostId === post.id}
                  aria-label={`Delete post ${post.title}`}
                >
                  <Trash2 className="mr-1" size={16} />
                  Delete
                </button>
              </>
            ) : (
              <>
                <button
                  className="px-3 py-1.5 rounded-md flex items-center bg-gray-400 text-white text-xs sm:text-sm opacity-60 cursor-not-allowed min-w-[70px] justify-center"
                  disabled
                  aria-label="Edit post (admin only)"
                >
                  <Edit className="mr-1" size={16} />
                  Edit
                </button>
                <button
                  className="px-3 py-1.5 rounded-md flex items-center bg-gray-400 text-white text-xs sm:text-sm opacity-60 cursor-not-allowed min-w-[70px] justify-center"
                  disabled
                  aria-label="Delete post (admin only)"
                >
                  <Trash2 className="mr-1" size={16} />
                  Delete
                </button>
              </>
            )}
          </div>
        )}
        {activeSection === 'Drafts' && (
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            {isAdmin ? (
              <button
                onClick={() => handleEditPost(post.id)}
                className="px-3 py-1.5 rounded-md flex items-center bg-[#ADD01C] text-white hover:bg-opacity-90 text-sm min-w-[80px] justify-center"
                aria-label={`Edit draft ${post.title}`}
              >
                <Edit className="mr-1" size={14} />
                Edit
              </button>
            ) : (
              <button
                className="px-3 py-1.5 rounded-md flex items-center bg-gray-300 text-white text-sm opacity-50 cursor-not-allowed min-w-[80px] justify-center"
                disabled
                aria-label="Edit draft (admin only)"
              >
                <Edit className="mr-1" size={14} />
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    ));
  }, [activeSection, publishedPosts, draftPosts, isAdmin, viewOnly, deletingPostId, handleEditPost, handleDeleteWithToken, handleViewPost]);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#FCF0F8]" style={{ fontFamily: 'Arial, sans-serif' }}>
      <style>
        {`
          .image-container { margin: 10px 0; width: 100%; box-sizing: border-box; }
          .image-align-left { display: flex; justify-content: flex-start; }
          .image-align-center { display: flex; justify-content: center; }
          .image-align-right { display: flex; justify-content: flex-end; }
          .image-container img { width: 100%; height: auto; max-width: 100%; display: block; }
          .prose img { width: 100%; height: auto; max-width: 100%; display: block; }
          .prose h1 { font-size: 2rem; font-weight: 700; color: #9E0B7F; margin: 1.5rem 0 1rem; line-height: 1.2; }
          .prose h2 { font-size: 1.75rem; font-weight: 600; color: #9E0B7F; margin: 1.25rem 0 0.75rem; }
          .prose h3 { font-size: 1.5rem; font-weight: 600; color: #9E0B7F; margin: 1rem 0 0.5rem; }
          .prose h4 { font-size: 1.25rem; font-weight: 600; color: #9E0B7F; margin: 1rem 0 0.5rem; }
          .prose h5 { font-size: 1.1rem; font-weight: 600; color: #9E0B7F; margin: 1rem 0 0.5rem; }
          .prose h6 { font-size: 1rem; font-weight: 600; color: #9E0B7F; margin: 1rem 0 0.5rem; }
          .prose p { font-size: 1rem; line-height: 1.75; color: #333333; margin-bottom: 1rem; }
          .prose ul { list-style-type: disc; padding-left: 20px; color: #333333; }
          .prose ol { list-style-type: decimal; padding-left: 20px; color: #333333; }
          .prose li { margin-bottom: 8px; font-size: 1rem; line-height: 1.75; }
          .mobile-menu-nav { transition: all 0.3s ease; }
          .sidebar-ul li button { transition: background-color 0.2s ease; font-family: Arial, sans-serif; }
          .mobile-menu-nav button { font-family: Arial, sans-serif; }
          .group:hover .group-hover\\:block { display: block; }
          .disabled-input { background-color: #f5f5f5; cursor: not-allowed; opacity: 0.6; }
          .disabled-button { background-color: #d1d5db; cursor: not-allowed; opacity: 0.6; }
          .calendar-icon { pointer-events: none; }
          input[type="date"]::-webkit-calendar-picker-indicator {
            opacity: 0; position: absolute; right: 10px; width: 20px; height: 20px; cursor: pointer;
          }
          /* Responsive card styles */
          .post-card {
            width: 100%;
            box-sizing: border-box;
            min-height: 200px;
            display: flex;
            flex-direction: column;
          }
          .post-card h3 {
            font-size: clamp(1rem, 4vw, 1.25rem);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .post-card p {
            font-size: clamp(0.875rem, 3vw, 1rem);
            line-height: 1.5;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .post-card .date-container {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
          }
          .post-card .button-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-top: auto;
          }
          @media (min-width: 640px) {
            .post-card .button-container {
              flex-direction: row;
              flex-wrap: wrap;
              gap: 0.375rem;
            }
          }
          @media (max-width: 639px) {
            .post-card {
              padding: 0.75rem;
            }
            .post-card button, .post-card a {
              padding: 0.5rem 0.75rem;
              font-size: 0.75rem;
              min-height: 2.5rem;
            }
          }
          @media (min-width: 768px) {
            .post-card {
              padding: 1rem;
            }
            .post-card button, .post-card a {
              padding: 0.375rem 0.75rem;
              font-size: 0.875rem;
            }
          }
          @media (min-width: 1024px) {
            .post-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }
          @media (min-width: 640px) and (max-width: 767px) {
            .post-card .button-container {
              flex-wrap: wrap;
              gap: 0.375rem;
            }
            .post-card button, .post-card a {
              flex: 1 1 calc(50% - 0.375rem);
              min-width: 0;
            }
          }
        `}
      </style>

      <div className="md:hidden p-4 flex justify-between items-center bg-[#9E0B7F] text-white">
        <div className="flex items-center space-x-2">
          <img src="/Logo1.png" alt="NutriDietMitra Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">NutriDiet</h1>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="text-white p-2 rounded-md"
          aria-label="Toggle mobile menu"
        >
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
              {['Blog Editor', 'Preview', 'Published', 'Drafts'].map((section) => (
                <li key={section} className="mb-2">
                  <button
                    onClick={() => setSection(section)}
                    className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                      activeSection === section ? 'bg-[#ADD01C] text-[#333333]' : 'hover:bg-[#9E0B7F]/80'
                    }`}
                    aria-label={`Switch to ${section}`}
                  >
                    {section === 'Blog Editor' && <Edit className="mr-2" size={20} />}
                    {section === 'Preview' && <Eye className="mr-2" size={20} />}
                    {section === 'Published' && <CheckSquare className="mr-2" size={20} />}
                    {section === 'Drafts' && <Clock className="mr-2" size={20} />}
                    <span>{section}</span>
                  </button>
                </li>
              ))}
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
            {['Blog Editor', 'Preview', 'Published', 'Drafts'].map((section) => (
              <li key={section} className="mb-2">
                <button
                  onClick={() => setSection(section)}
                  className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                    activeSection === section ? 'bg-[#ADD01C] text-[#333333]' : 'hover:bg-[#9E0B7F]/80'
                  }`}
                  aria-label={`Switch to ${section}`}
                >
                  {section === 'Blog Editor' && <Edit className="mr-2" size={20} />}
                  {section === 'Preview' && <Eye className="mr-2" size={20} />}
                  {section === 'Published' && <CheckSquare className="mr-2" size={20} />}
                  {section === 'Drafts' && <Clock className="mr-2" size={20} />}
                  <span>{section}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-grow flex flex-col overflow-auto">
        <header className="bg-white p-4 border-b flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/Logo1.png" alt="NutriDietMitra Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-[#9E0B7F]">
              NutriDiet {viewOnly ? 'Blog' : activeSection}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            {hasUnsavedChanges && !viewOnly && (
              <span className="mr-4 flex items-center text-[#718096]">
                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                Unsaved changes
              </span>
            )}
            {activeSection === 'Blog Editor' && isAdmin && !viewOnly && (
              <button
                onClick={handleSaveWithJSON}
                className="px-4 py-2 rounded-md flex items-center bg-[#ADD01C] text-white hover:bg-opacity-90"
                aria-label={selectedPostId ? 'Update post' : 'Save post'}
              >
                <Save className="mr-2" size={16} />
                <span className="hidden sm:inline">{selectedPostId ? 'Update' : 'Save'}</span>
              </button>
            )}
            {activeSection === 'Blog Editor' && (!isAdmin || viewOnly) && (
              <button
                className="px-4 py-2 rounded-md flex items-center disabled-button"
                disabled
                aria-label="Save post (admin only)"
              >
                <Save className="mr-2" size={16} />
                <span className="hidden sm:inline">Save (Admin Only)</span>
              </button>
            )}
            {activeSection === 'Preview' && isAdmin && selectedPostId && !viewOnly && (
              <>
                <button
                  onClick={handleUpdateWithJSON}
                  className="px-4 py-2 rounded-md flex items-center bg-[#ADD01C] text-white hover:bg-opacity-90"
                  aria-label="Update post"
                >
                  <Edit className="mr-2" size={16} />
                  <span className="hidden sm:inline">Update</span>
                </button>
                <button
                  onClick={() => handleDeleteWithToken(selectedPostId)}
                  className={`px-4 py-2 rounded-md flex items-center bg-red-600 text-white hover:bg-opacity-90 ${deletingPostId === selectedPostId ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={deletingPostId === selectedPostId}
                  aria-label="Delete post"
                >
                  <Trash2 className="mr-2" size={16} />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </>
            )}
            {activeSection === 'Preview' && (!isAdmin || viewOnly) && selectedPostId && (
              <>
                <button
                  className="px-4 py-2 rounded-md flex items-center disabled-button"
                  disabled
                  aria-label="Update post (admin only)"
                >
                  <Edit className="mr-2" size={16} />
                  <span className="hidden sm:inline">Update (Admin Only)</span>
                </button>
                <button
                  className="px-4 py-2 rounded-md flex items-center disabled-button"
                  disabled
                  aria-label="Delete post (admin only)"
                >
                  <Trash2 className="mr-2" size={16} />
                  <span className="hidden sm:inline">Delete (Admin Only)</span>
                </button>
              </>
            )}
            {!viewOnly && (
              <button
                onClick={handleDashboardRedirect}
                className="px-4 py-2 rounded-md flex items-center bg-[#9E0B7F] text-white hover:bg-opacity-90"
                aria-label="Go to dashboard"
              >
                <LayoutDashboard className="mr-2" size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            )}
          </div>
        </header>

        {errorMessage && (
          <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-md mx-4 mt-4">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col md:flex-row flex-grow overflow-auto">
          {activeSection === 'Blog Editor' && !viewOnly && (
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
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                        inputErrors.title ? 'border-red-500' : 'border-gray-300'
                      } ${!isAdmin ? 'disabled-input' : ''}`}
                      placeholder={isAdmin ? 'Enter blog title' : 'View-only (Admin Only)'}
                      disabled={!isAdmin}
                      autoComplete="off"
                      aria-invalid={!!inputErrors.title}
                      aria-describedby={inputErrors.title ? 'title-error' : undefined}
                    />
                    {inputErrors.title && (
                      <p id="title-error" className="text-red-500 text-xs mt-1">
                        {inputErrors.title}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 font-medium text-[#333333]">
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={handleDescriptionChange}
                      className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                        inputErrors.description ? 'border-red-500' : 'border-gray-300'
                      } ${!isAdmin ? 'disabled-input' : ''}`}
                      placeholder={isAdmin ? 'Enter blog description' : 'View-only (Admin Only)'}
                      disabled={!isAdmin}
                      rows={4}
                      aria-invalid={!!inputErrors.description}
                      aria-describedby={inputErrors.description ? 'description-error' : undefined}
                    />
                    {inputErrors.description && (
                      <p id="description-error" className="text-red-500 text-xs mt-1">
                        {inputErrors.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <label htmlFor="slug" className="block mb-2 font-medium text-[#333333]">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={handleSlugChange}
                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                          inputErrors.slug ? 'border-red-500' : 'border-gray-300'
                        } ${!isAdmin ? 'disabled-input' : ''}`}
                        placeholder={isAdmin ? 'enter-slug-here' : 'View-only (Admin Only)'}
                        disabled={!isAdmin}
                        autoComplete="off"
                        aria-invalid={!!inputErrors.slug}
                        aria-describedby={inputErrors.slug ? 'slug-error' : undefined}
                      />
                      {inputErrors.slug && (
                        <p id="slug-error" className="text-red-500 text-xs mt-1">{inputErrors.slug}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="publishDate" className="block mb-2 font-medium text-[#333333]">
                        Publish Date
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="publishDate"
                          value={publishDate}
                          onChange={handleDateChange}
                          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] pr-10 ${
                            inputErrors.publishDate ? 'border-red-500' : 'border-gray-300'
                          } ${!isAdmin ? 'disabled-input' : ''}`}
                          disabled={!isAdmin}
                          aria-invalid={!!inputErrors.publishDate}
                          aria-describedby={inputErrors.publishDate ? 'publishDate-error' : undefined}
                        />
                        <Calendar
                          className="absolute right-3 top-2.5 text-[#718096] calendar-icon"
                          size={20}
                        />
                      </div>
                      {inputErrors.publishDate && (
                        <p id="publishDate-error" className="text-red-500 text-xs mt-1">
                          {inputErrors.publishDate}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="categories" className="block mb-2 font-medium text-[#333333]">
                      Categories
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        id="categories"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                          inputErrors.categories ? 'border-red-500' : 'border-gray-300'
                        } ${!isAdmin ? 'disabled-input' : ''}`}
                        placeholder={isAdmin ? 'Add a category' : 'View-only (Admin Only)'}
                        disabled={!isAdmin}
                        autoComplete="off"
                        aria-invalid={!!inputErrors.categories}
                        aria-describedby={inputErrors.categories ? 'categories-error' : undefined}
                      />
                      {isAdmin && (
                        <button
                          onClick={handleAddCategory}
                          className="px-4 py-2 rounded-md bg-[#ADD01C] text-white hover:bg-opacity-90"
                          aria-label="Add category"
                        >
                          Add
                        </button>
                      )}
                      {!isAdmin && (
                        <button
                          className="px-4 py-2 rounded-md disabled-button"
                          disabled
                          aria-label="Add category (admin only)"
                        >
                          Add
                        </button>
                      )}
                    </div>
                    {inputErrors.categories && (
                      <p id="categories-error" className="text-red-500 text-xs mt-1">
                        {inputErrors.categories}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {categories.map((category, index) => (
                        <div
                          key={`${category}-${index}`}
                          className="flex items-center px-3 py-1 rounded-full bg-[#FCF0F8] text-[#9E0B7F]"
                        >
                          <span>{category}</span>
                          {isAdmin && (
                            <button
                              onClick={() => handleRemoveCategory(category)}
                              className="ml-2 text-[#9E0B7F] hover:text-red-600"
                              aria-label={`Remove category ${category}`}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <EditorControls
                  isAdmin={isAdmin}
                  viewOnly={viewOnly}
                  editorRef={editorRef}
                  fileInputRef={fileInputRef}
                  images={images}
                  lockAspectRatio={lockAspectRatio}
                  inputErrors={inputErrors}
                  activeFormatButtons={activeFormatButtons}
                  handleFormat={handleFormat}
                  updateImageAlignment={updateImageAlignment}
                  handleContentChange={handleContentChange}
                  handleImageUpload={handleImageUpload}
                  updateImageSize={updateImageSize}
                  removeImage={removeImage}
                  toggleAspectRatioLock={toggleAspectRatioLock}
                  handleKeyDown={handleKeyDown}
                  handleEditorClick={handleEditorClick}
                />
              </div>
              <div className="w-full md:w-1/2 p-4 md:p-6 bg-gray-50 overflow-auto">
                <h2 className="text-xl font-bold text-[#9E0B7F] mb-4">Preview</h2>
                <div className="bg-white rounded-md p-4 md:p-6 shadow-sm prose max-w-none">
                  <h1 className="preview-title text-3xl font-bold text-[#9E0B7F] mb-4">
                    {title || 'Blog Title'}
                  </h1>
                  <div className="preview-meta flex items-center text-[#718096] mb-4">
                    <span className="flex items-center mr-4">
                      <Calendar className="mr-2" size={16} />
                      {publishDate || 'Select a date'}
                    </span>
                    <span className="flex items-center">
                      <Tag className="mr-2" size={16} />
                      {categories.length > 0 ? categories.join(', ') : 'No categories'}
                    </span>
                  </div>
                  <p className="preview-description text-lg text-[#333333] mb-6">
                    {description || 'Blog description'}
                  </p>
                  <div className="preview-content" dangerouslySetInnerHTML={{ __html: renderPreviewContent }} />
                  <p className="preview-url text-[#718096] mt-4">
                    URL: {slug ? `${window.location.origin}/blog/${slug}` : 'Enter a slug'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {(activeSection === 'Published' || activeSection === 'Drafts') && !viewOnly && (
            <div className="w-full p-4 md:p-6 overflow-auto">
              <h2 className="text-xl font-bold text-[#9E0B7F] mb-4">{activeSection}</h2>
              <div className="post-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{renderPosts}</div>
            </div>
          )}

          {activeSection === 'Preview' && (
            <div className="w-full p-4 md:p-6 overflow-auto preview-container">
              <div className="bg-white rounded-md p-4 md:p-6 shadow-sm prose max-w-none">
                <h1 className="preview-title text-3xl font-bold text-[#9E0B7F] mb-4">
                  {title || 'Blog Title'}
                </h1>
                <div className="preview-meta flex items-center text-[#718096] mb-4">
                  <span className="flex items-center mr-4">
                    <Calendar className="mr-2" size={16} />
                    {publishDate || 'Select a date'}
                  </span>
                  <span className="flex items-center">
                    <Tag className="mr-2" size={16} />
                    {categories.length > 0 ? categories.join(', ') : 'No categories'}
                  </span>
                </div>
                <p className="preview-description text-lg text-[#333333] mb-6">
                  {description || 'Blog description'}
                </p>
                <div className="preview-content" dangerouslySetInnerHTML={{ __html: renderPreviewContent }} />
                <p className="preview-url text-[#718096] mt-4">
                  URL: {slug ? `${window.location.origin}/blog/${slug}` : 'Enter a slug'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

EditorContent.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  newCategory: PropTypes.string.isRequired,
  hasUnsavedChanges: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      file: PropTypes.instanceOf(File),
      url: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    })
  ).isRequired,
  lockAspectRatio: PropTypes.bool.isRequired,
  inputErrors: PropTypes.object.isRequired,
  activeFormatButtons: PropTypes.object.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  activeSection: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  publishedPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
      slug: PropTypes.string,
    })
  ).isRequired,
  draftPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
    })
  ).isRequired,
  selectedPostId: PropTypes.string,
  editorRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  fileInputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
  imageRatios: PropTypes.shape({ current: PropTypes.object }).isRequired,
  imageUrls: PropTypes.shape({ current: PropTypes.object }).isRequired,
  debouncedSetContent: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  setSlug: PropTypes.func.isRequired,
  setPublishDate: PropTypes.func.isRequired,
  setCategories: PropTypes.func.isRequired,
  setNewCategory: PropTypes.func.isRequired,
  setHasUnsavedChanges: PropTypes.func.isRequired,
  setImages: PropTypes.func.isRequired,
  setLockAspectRatio: PropTypes.func.isRequired,
  setInputErrors: PropTypes.func.isRequired,
  setActiveFormatButtons: PropTypes.func.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  setSelectedPostId: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleDescriptionChange: PropTypes.func.isRequired,
  handleSlugChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleAddCategory: PropTypes.func.isRequired,
  handleRemoveCategory: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  toggleMobileMenu: PropTypes.func.isRequired,
  setSection: PropTypes.func.isRequired,
  fetchBlogById: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  viewOnly: PropTypes.bool.isRequired,
  setContent: PropTypes.func.isRequired,
};

export default EditorContent;