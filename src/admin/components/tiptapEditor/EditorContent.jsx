import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Tag,
  CheckSquare,
  Clock,
  Edit,
  Trash2,
  Save,
  ArrowLeft,
  ArrowRight,
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image,
  Link,
  Eye,
  Lock,
  Unlock,
  LayoutDashboard,
} from 'lucide-react';
import DOMPurify from 'dompurify';

function EditorContent({
  isAdmin,
  title,
  description,
  slug,
  publishDate,
  categories,
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
}) {
  useEffect(() => {
    if (activeSection === 'Preview') {
      console.log('Preview content:', content);
    }
  }, [activeSection, content]);

  useEffect(() => {
    if (editorRef.current && activeSection === 'Blog Editor' && !viewOnly) {
      const sanitizedContent = DOMPurify.sanitize(content || '<p>Start writing your blog post...</p>', {
        ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img', 'div', 'br', 'strong', 'em', 'u', 'a'],
        ALLOWED_ATTR: ['src', 'alt', 'class', 'style', 'data-image-id', 'href', 'contenteditable'],
        ADD_ATTR: ['src', 'href', 'contenteditable'],
        ADD_URI_SAFE_ATTR: ['src', 'href'],
      });
      if (editorRef.current.innerHTML !== sanitizedContent) {
        editorRef.current.innerHTML = sanitizedContent;
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, [editorRef, content, activeSection, viewOnly]);

  const navigate = useNavigate();

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      return { range: range.cloneRange() };
    }
    return null;
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
          const items = Array.from(node.querySelectorAll('li')).map((li) => {
            let text = li.textContent.trim();
            if (text.startsWith('• ') || /^\d+\.\s/.test(text)) {
              text = text.replace(/^•\s|^\d+\.\s/, '');
            }
            return text;
          });
          jsonContent.push({
            type: 'list',
            style: tagName === 'ul' ? 'bullet' : 'ordered',
            items,
          });
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
              width: width,
              height: height,
            });
          }
        }
      }
    });

    return jsonContent;
  };

  const handleFormat = (command, value = null) => {
    if (isAdmin && editorRef.current && !viewOnly) {
      editorRef.current.focus();
      const position = saveCursorPosition();

      if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
        const isBulletList = command === 'insertUnorderedList';
        const listTag = isBulletList ? 'UL' : 'OL';

        let blockNode = window.getSelection().getRangeAt(0).commonAncestorContainer;
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
            listItems.forEach((li) => {
              const newLi = document.createElement('li');
              let text = li.textContent.trim();
              if (text.startsWith('• ') || /^\d+\.\s/.test(text)) {
                text = text.replace(/^•\s|^\d+\.\s/, '');
              }
              newLi.textContent = text;
              newList.appendChild(newLi);
            });
            listNode.parentNode.replaceChild(newList, listNode);
          }
        } else {
          if (!blockNode || blockNode === editorRef.current) {
            const p = document.createElement('p');
            const contents = window.getSelection().getRangeAt(0).extractContents();
            p.appendChild(contents);
            window.getSelection().getRangeAt(0).insertNode(p);
            blockNode = p;
          }

          const selectedText = window.getSelection().getRangeAt(0).toString().trim();
          if (!selectedText) return;

          const lines = selectedText.split(/\r?\n/).filter((line) => line.trim() !== '');

          const list = document.createElement(listTag);
          lines.forEach((line) => {
            const li = document.createElement('li');
            li.textContent = line.trim();
            list.appendChild(li);
          });

          blockNode.parentNode.replaceChild(list, blockNode);
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
      debouncedSetContent(editorRef.current.innerHTML);
      setHasUnsavedChanges(true);
      restoreCursorPosition(position);
    }
  };

  const updateImageAlignment = (alignment) => {
    if (!isAdmin || !editorRef.current || viewOnly) return;
    const position = saveCursorPosition();
    const selection = window.getSelection();
    let node = selection.focusNode;
    if (node.nodeType !== 1) {
      node = node.parentNode;
    }
    const imageContainer = node.closest('.image-container');
    if (imageContainer) {
      imageContainer.classList.remove('image-align-left', 'image-align-center', 'image-align-right');
      imageContainer.classList.add(`image-align-${alignment}`);
      debouncedSetContent(editorRef.current.innerHTML);
      setHasUnsavedChanges(true);
      restoreCursorPosition(position);
    }
  };

  const handleContentChange = () => {
    if (isAdmin && editorRef.current && !viewOnly) {
      debouncedSetContent(editorRef.current.innerHTML);
      setHasUnsavedChanges(true);
      updateActiveFormattingStates();
    }
  };

  const handleImageUpload = (e) => {
    if (!isAdmin || viewOnly) return;
    const position = saveCursorPosition();
    const files = Array.from(e.target.files);
    const newImages = files.map((file, index) => {
      const id = `${Date.now()}-${index}`;
      const url = URL.createObjectURL(file);
      imageUrls.current[id] = url;

      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = url;
        img.onload = () => {
          const ratio = img.width / img.height;
          imageRatios.current[id] = ratio;
          resolve({
            id,
            file,
            url,
            width: 100,
            height: 100 / ratio,
          });
        };
      });
    });

    Promise.all(newImages).then((resolvedImages) => {
      setImages((prevImages) => [...prevImages, ...resolvedImages]);
      resolvedImages.forEach((image) => {
        const imgHtml = `<div class="image-container image-align-center" contenteditable="false"><img src="${image.url}" alt="Blog Image" style="width: ${image.width}%; height: auto; max-width: 100%;" class="my-2.5" /></div>`;
        const selection = window.getSelection();
        let range;
        if (selection.rangeCount > 0) {
          range = selection.getRangeAt(0);
        } else {
          range = document.createRange();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
        }

        const imgNode = document.createElement('div');
        imgNode.innerHTML = imgHtml;
        const imageContainer = imgNode.firstChild;
        range.insertNode(imageContainer);

        const newP = document.createElement('p');
        newP.innerHTML = '<br>';
        imageContainer.insertAdjacentElement('afterend', newP);

        range.setStart(newP, 0);
        range.setEnd(newP, 0);

        selection.removeAllRanges();
        selection.addRange(range);
      });

      debouncedSetContent(editorRef.current.innerHTML);
      setHasUnsavedChanges(true);
      restoreCursorPosition(position);
      e.target.value = '';
    });
  };

  const updateImageSize = (id, dimension, value) => {
    if (!isAdmin || viewOnly) return;
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

    const imageContainers = editorRef.current.querySelectorAll(`.image-container img`);
    imageContainers.forEach((img) => {
      const src = img.getAttribute('src');
      const matchingImage = images.find((image) => image.url === src);
      if (matchingImage && matchingImage.id === id) {
        img.style.width = `${dimension === 'width' ? parsedValue : matchingImage.width}%`;
        img.style.height = lockAspectRatio ? 'auto' : `${dimension === 'height' ? parsedValue : matchingImage.height}%`;
      }
    });

    debouncedSetContent(editorRef.current.innerHTML);
    setHasUnsavedChanges(true);
  };

  const removeImage = (id) => {
    if (!isAdmin || viewOnly) return;
    const image = images.find((img) => img.id === id);
    if (image && imageUrls.current[id]) {
      URL.revokeObjectURL(imageUrls.current[id]);
      delete imageUrls.current[id];
      delete imageRatios.current[id];
    }
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
    const imageContainers = editorRef.current.querySelectorAll(`.image-container img[src="${image.url}"]`);
    imageContainers.forEach((img) => {
      const container = img.closest('.image-container');
      if (container) container.remove();
    });
    debouncedSetContent(editorRef.current.innerHTML);
    setHasUnsavedChanges(true);
  };

  const toggleAspectRatioLock = () => {
    if (isAdmin && !viewOnly) {
      setLockAspectRatio(!lockAspectRatio);
      setHasUnsavedChanges(true);
    }
  };

  const handleKeyDown = (e) => {
    if (isAdmin && !viewOnly) {
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
    }
  };

  const handleEditorClick = () => {
    if (isAdmin && !viewOnly) {
      updateActiveFormattingStates();
    }
  };

  const updateActiveFormattingStates = () => {
    if (isAdmin && editorRef.current && !viewOnly) {
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
          } else if (node.tagName === 'H5') {
            heading5 = true;
            break;
          } else if (node.tagName === 'H6') {
            heading6 = true;
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
        heading5,
        heading6,
      });
    }
  };

  const handleSaveWithJSON = () => {
    if (isAdmin && editorRef.current && !viewOnly) {
      const htmlContent = editorRef.current.innerHTML;
      const jsonContent = parseEditorContentToJSON(htmlContent);
      console.log('Parsed JSON content:', jsonContent);
      handleSave({ htmlContent, jsonContent });
    }
  };

  const handleUpdateWithJSON = () => {
    if (isAdmin && editorRef.current && !viewOnly) {
      const htmlContent = editorRef.current.innerHTML;
      const jsonContent = parseEditorContentToJSON(htmlContent);
      console.log('Parsed JSON content for update:', jsonContent);
      handleUpdate({ htmlContent, jsonContent });
    }
  };

  const handleDashboardRedirect = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#FCF0F8]" style={{ fontFamily: 'Arial, sans-serif' }}>
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
          .mobile-menu-nav {
            transition: all 0.3s ease;
          }
          .sidebar-ul li button {
            transition: background-color 0.2s ease;
            font-family: Arial, sans-serif;
          }
          .mobile-menu-nav button {
            font-family: Arial, sans-serif;
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
            .image-container {
              margin: 8px 0;
            }
            .image-container img {
              width: 100%;
              height: auto;
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
                  onClick={handleDashboardRedirect}
                  className="flex items-center px-4 py-3 rounded-md w-full text-left hover:bg-[#9E0B7F]/80"
                >
                  <LayoutDashboard className="mr-2" size={20} />
                  <span>Dashboard</span>
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setSection('Blog Editor')}
                  className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                    activeSection === 'Blog Editor' ? 'bg-[#ADD01C] text-[#333333]' : 'hover:bg-[#9E0B7F]/80'
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
                    activeSection === 'Preview' ? 'bg-[#ADD01C] text-[#333333]' : 'hover:bg-[#9E0B7F]/80'
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
                    activeSection === 'Published' ? 'bg-[#ADD01C] text-[#333333]' : 'hover:bg-[#9E0B7F]/80'
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
                    activeSection === 'Drafts' ? 'bg-[#ADD01C] text-[#333333]' : 'hover:bg-[#9E0B7F]/80'
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
            {/* <li className="mb-2">
              <button
                onClick={handleDashboardRedirect}
                className="flex items-center px-4 py-3 rounded-md w-full text-left hover:bg-[#9E0B7F]/80"
              >
                <LayoutDashboard className="mr-2" size={20} />
                <span>Dashboard</span>
              </button>
            </li> */}
            <li className="mb-2">
              <button
                onClick={() => setSection('Blog Editor')}
                className={`flex items-center px-4 py-3 rounded-md w-full text-left ${
                  activeSection === 'Blog Editor' ? 'bg-[#ADD01C] text-[#333333]' : 'hover:bg-[#9E0B7F]/80'
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
                  activeSection === 'Preview' ? 'bg-[#ADD01C] text-[#333333]' : 'hover:bg-[#9E0B7F]/80'
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
                  activeSection === 'Published' ? 'bg-[#ADD01C] text-[#333333]' : 'hover:bg-[#9E0B7F]/80'
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
                  activeSection === 'Drafts' ? 'bg-[#ADD01C] text-[#333333]' : 'hover:bg-[#9E0B7F]/80'
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
              >
                <Save className="mr-2" size={16} />
                <span className="hidden sm:inline">{selectedPostId ? 'Update' : 'Save'}</span>
              </button>
            )}
            {activeSection === 'Blog Editor' && (!isAdmin || viewOnly) && (
              <button className="px-4 py-2 rounded-md flex items-center disabled-button" disabled>
                <Save className="mr-2" size={16} />
                <span className="hidden sm:inline">Save (Admin Only)</span>
              </button>
            )}
            {activeSection === 'Preview' && isAdmin && selectedPostId && !viewOnly && (
              <>
                <button
                  onClick={handleUpdateWithJSON}
                  className="px-4 py-2 rounded-md flex items-center bg-[#ADD01C] text-white hover:bg-opacity-90"
                >
                  <Edit className="mr-2" size={16} />
                  <span className="hidden sm:inline">Update</span>
                </button>
                <button
                  onClick={() => handleDelete(selectedPostId)}
                  className={`px-4 py-2 rounded-md flex items-center bg-red-600 text-white hover:bg-opacity-90 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isDeleting}
                >
                  <Trash2 className="mr-2" size={16} />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </>
            )}
            {activeSection === 'Preview' && (!isAdmin || viewOnly) && selectedPostId && (
              <>
                <button className="px-4 py-2 rounded-md flex items-center disabled-button" disabled>
                  <Edit className="mr-2" size={16} />
                  <span className="hidden sm:inline">Update (Admin Only)</span>
                </button>
                <button className="px-4 py-2 rounded-md flex items-center disabled-button" disabled>
                  <Trash2 className="mr-2" size={16} />
                  <span className="hidden sm:inline">Delete (Admin Only)</span>
                </button>
              </>
            )}
            {!viewOnly && (
              <button
                onClick={handleDashboardRedirect}
                className="px-4 py-2 rounded-md flex items-center bg-[#9E0B7F] text-white hover:bg-opacity-90"
              >
                <LayoutDashboard className="mr-2" size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
            )}
          </div>
        </header>

        {errorMessage && (
          <div className="p-4 bg-red-100 text-red-700 border border-red-300 rounded-md mx-4 mt-4">{errorMessage}</div>
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
                    />
                    {inputErrors.title && <p className="text-red-500 text-xs mt-1">{inputErrors.title}</p>}
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
                    />
                    {inputErrors.description && (
                      <p className="text-red-500 text-xs mt-1">{inputErrors.description}</p>
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
                      />
                      {inputErrors.slug && <p className="text-red-500 text-xs mt-1">{inputErrors.slug}</p>}
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
                          className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                            inputErrors.publishDate ? 'border-red-500' : 'border-gray-300'
                          } ${!isAdmin ? 'disabled-input' : ''}`}
                          disabled={!isAdmin}
                        />
                        <Calendar className="absolute right-3 top-2.5 text-[#718096]" size={20} />
                      </div>
                      {inputErrors.publishDate && (
                        <p className="text-red-500 text-xs mt-1">{inputErrors.publishDate}</p>
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
                      />
                      {isAdmin && (
                        <button
                          onClick={handleAddCategory}
                          className="px-4 py-2 rounded-md bg-[#ADD01C] text-white hover:bg-opacity-90"
                        >
                          Add
                        </button>
                      )}
                      {!isAdmin && (
                        <button className="px-4 py-2 rounded-md disabled-button" disabled>
                          Add
                        </button>
                      )}
                    </div>
                    {inputErrors.categories && (
                      <p className="text-red-500 text-xs mt-1">{inputErrors.categories}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {categories.map((category) => (
                        <div
                          key={category}
                          className="flex items-center px-3 py-1 rounded-full bg-[#FCF0F8] text-[#9E0B7F]"
                        >
                          <span>{category}</span>
                          {isAdmin && (
                            <button
                              onClick={() => handleRemoveCategory(category)}
                              className="ml-2 text-[#9E0B7F] hover:text-red-600"
                            >
                              &times;
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-md p-4 md:p-6 shadow-sm">
                  <div className="mb-4">
                    <label className="block mb-2 font-medium text-[#333333]">Content</label>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleFormat('bold')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.bold ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Bold"
                      >
                        <Bold size={16} />
                      </button>
                      <button
                        onClick={() => handleFormat('italic')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.italic ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Italic"
                      >
                        <Italic size={16} />
                      </button>
                      <button
                        onClick={() => handleFormat('underline')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.underline ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Underline"
                      >
                        <Underline size={16} />
                      </button>
                      <button
                        onClick={() => handleFormat('insertUnorderedList')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.bulletList ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Bullet List"
                      >
                        <List size={16} />
                      </button>
                      <button
                        onClick={() => handleFormat('insertOrderedList')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.numberedList ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Numbered List"
                      >
                        <List size={16} />
                      </button>
                      <button
                        onClick={() => handleFormat('justifyLeft')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.alignLeft ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Align Left"
                      >
                        <AlignLeft size={16} />
                      </button>
                      <button
                        onClick={() => handleFormat('justifyCenter')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.alignCenter ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Align Center"
                      >
                        <AlignCenter size={16} />
                      </button>
                      <button
                        onClick={() => handleFormat('justifyRight')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.alignRight ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Align Right"
                      >
                        <AlignRight size={16} />
                      </button>
                      <button
                        onClick={() => fileInputRef.current.click()}
                        className={`p-2 rounded-md bg-gray-100 ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Insert Image"
                      >
                        <Image size={16} />
                      </button>
                      <button
                        onClick={() => {
                          const url = prompt('Enter the URL:');
                          if (url) handleFormat('createLink', url);
                        }}
                        className={`p-2 rounded-md bg-gray-100 ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Insert Link"
                      >
                        <Link size={16} />
                      </button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        multiple
                      />
                    </div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleFormat('formatBlock', 'h1')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.heading1 ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Heading 1"
                      >
                        H1
                      </button>
                      <button
                        onClick={() => handleFormat('formatBlock', 'h2')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.heading2 ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Heading 2"
                      >
                        H2
                      </button>
                      <button
                        onClick={() => handleFormat('formatBlock', 'h3')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.heading3 ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Heading 3"
                      >
                        H3
                      </button>
                      <button
                        onClick={() => handleFormat('formatBlock', 'h4')}
                        className={`p-2 rounded-md ${
                          activeFormatButtons.heading4 ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
                        } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Heading 4"
                      >
                        H4
                      </button>
                    </div>
                    <div className="mb-2 flex gap-2">
                      <button
                        onClick={() => updateImageAlignment('left')}
                        className={`p-2 rounded-md bg-gray-100 ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Align Image Left"
                      >
                        <AlignLeft size={16} />
                      </button>
                      <button
                        onClick={() => updateImageAlignment('center')}
                        className={`p-2 rounded-md bg-gray-100 ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Align Image Center"
                      >
                        <AlignCenter size={16} />
                      </button>
                      <button
                        onClick={() => updateImageAlignment('right')}
                        className={`p-2 rounded-md bg-gray-100 ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
                        disabled={!isAdmin || viewOnly}
                        title="Align Image Right"
                      >
                        <AlignRight size={16} />
                      </button>
                    </div>
                    <div
                      ref={editorRef}
                      contentEditable={isAdmin && !viewOnly}
                      onInput={handleContentChange}
                      onClick={handleEditorClick}
                      onKeyDown={handleKeyDown}
                      className={`w-full min-h-[400px] border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${
                        inputErrors.content ? 'border-red-500' : 'border-gray-300'
                      } ${!isAdmin || viewOnly ? 'bg-gray-50 cursor-default' : 'bg-white'}`}
                      style={{ whiteSpace: 'pre-wrap', fontFamily: 'Arial, sans-serif' }}
                    />
                    {inputErrors.content && <p className="text-red-500 text-xs mt-1">{inputErrors.content}</p>}
                  </div>
                  {images.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-[#333333] mb-2">Image Settings</h3>
                      <div className="flex items-center mb-2">
                        <button
                          onClick={toggleAspectRatioLock}
                          className="p-2 rounded-md bg-gray-100 mr-2"
                          disabled={!isAdmin || viewOnly}
                        >
                          {lockAspectRatio ? <Lock size={16} /> : <Unlock size={16} />}
                        </button>
                        <span className="text-[#718096]">
                          {lockAspectRatio ? 'Unlock Aspect Ratio' : 'Lock Aspect Ratio'}
                        </span>
                      </div>
                      {images.map((image) => (
                        <div key={image.id} className="mb-4 p-4 border rounded-md">
                          <img src={image.url} alt="Preview" className="w-32 h-auto mb-2" />
                          <div className="flex gap-4 mb-2">
                            <div>
                              <label className="block text-sm text-[#333333]">Width (%)</label>
                              <input
                                type="number"
                                value={image.width}
                                onChange={(e) => updateImageSize(image.id, 'width', e.target.value)}
                                className={`w-full border rounded-md px-2 py-1 ${
                                  inputErrors[`${image.id}-width`] ? 'border-red-500' : 'border-gray-300'
                                } ${!isAdmin || viewOnly ? 'disabled-input' : ''}`}
                                disabled={!isAdmin || viewOnly}
                              />
                              {inputErrors[`${image.id}-width`] && (
                                <p className="text-red-500 text-xs mt-1">{inputErrors[`${image.id}-width`]}</p>
                              )}
                            </div>
                            <div>
                              <label className="block text-sm text-[#333333]">Height</label>
                              <input
                                type="number"
                                value={image.height}
                                onChange={(e) => updateImageSize(image.id, 'height', e.target.value)}
                                className={`w-full border rounded-md px-2 py-1 ${
                                  inputErrors[`${image.id}-height`] ? 'border-red-500' : 'border-gray-300'
                                } ${!isAdmin || viewOnly ? 'disabled-input' : ''}`}
                                disabled={!isAdmin || viewOnly || lockAspectRatio}
                              />
                              {inputErrors[`${image.id}-height`] && (
                                <p className="text-red-500 text-xs mt-1">{inputErrors[`${image.id}-height`]}</p>
                              )}
                            </div>
                          </div>
                          {isAdmin && !viewOnly && (
                            <button
                              onClick={() => removeImage(image.id)}
                              className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-opacity-90"
                            >
                              Remove Image
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-1/2 p-4 md:p-6 overflow-auto">
                <div className="bg-white rounded-md p-4 md:p-6 shadow-sm preview-container">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#9E0B7F] mb-4 preview-title">{title || 'Blog Title'}</h2>
                  <div className="flex items-center gap-2 text-sm text-[#718096] mb-4 preview-meta">
                    <span>{publishDate || 'Publish Date'}</span>
                    <span>|</span>
                    <span>{categories.join(', ') || 'Categories'}</span>
                  </div>
                  <p className="text-base text-[#333333] mb-4 preview-description">{description || 'Blog Description'}</p>
                  <div
                    className="prose preview-content"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(content || '<p>Blog content goes here...</p>', {
                        ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img', 'div', 'br', 'strong', 'em', 'u', 'a'],
                        ALLOWED_ATTR: ['src', 'alt', 'class', 'style', 'href'],
                      }),
                    }}
                  />
                  <div className="flex items-center gap-2 text-sm text-[#718096] mt-4 preview-url">
                    <span>URL:</span>
                    <a
                      href={`/blog/${slug || 'no-slug'}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9E0B7F] hover:underline"
                    >
                      /blog/{slug || 'no-slug'}
                    </a>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/blog/${slug}`);
                        alert('URL copied to clipboard!');
                      }}
                      className="px-2 py-1 rounded-md bg-[#ADD01C] text-white hover:bg-opacity-90"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 preview-categories">
                    {categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 rounded-full bg-[#FCF0F8] text-[#9E0B7F] text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Preview' && (
            <div className="w-full p-4 md:p-6 overflow-auto">
              <div className="bg-white rounded-md p-4 md:p-6 shadow-sm max-w-4xl mx-auto preview-container">
                <h2 className="text-2xl md:text-3xl font-bold text-[#9E0B7F] mb-4 preview-title">{title || 'Blog Title'}</h2>
                <div className="flex items-center gap-2 text-sm text-[#718096] mb-4 preview-meta">
                  <span>{publishDate || 'Publish Date'}</span>
                  <span>|</span>
                  <span>{categories.join(', ') || 'Categories'}</span>
                </div>
                <p className="text-base text-[#333333] mb-4 preview-description">{description || 'Blog Description'}</p>
                <div
                  className="prose preview-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content || '<p>Blog content goes here...</p>', {
                      ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img', 'div', 'br', 'strong', 'em', 'u', 'a'],
                      ALLOWED_ATTR: ['src', 'alt', 'class', 'style', 'href'],
                    }),
                  }}
                />
                <div className="flex items-center gap-2 text-sm text-[#718096] mt-4 preview-url">
                  <span>URL:</span>
                  <a
                    href={`/blog/${slug || 'no-slug'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9E0B7F] hover:underline"
                  >
                    /blog/{slug || 'no-slug'}
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/blog/${slug}`);
                      alert('URL copied to clipboard!');
                    }}
                    className="px-2 py-1 rounded-md bg-[#ADD01C] text-white hover:bg-opacity-90"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 preview-categories">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 rounded-full bg-[#FCF0F8] text-[#9E0B7F] text-sm"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(activeSection === 'Published' || activeSection === 'Drafts') && (
            <div className="w-full p-4 md:p-6 overflow-auto">
              <div className="bg-white rounded-md p-4 md:p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#9E0B7F] mb-4">{activeSection}</h2>
                {activeSection === 'Published' && publishedPosts.length === 0 && (
                  <p className="text-[#718096]">No published posts available.</p>
                )}
                {activeSection === 'Drafts' && draftPosts.length === 0 && (
                  <p className="text-[#718096]">No drafts available.</p>
                )}
                {(activeSection === 'Published' ? publishedPosts : draftPosts).map((post) => (
                  <div
                    key={post.id}
                    className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-[#333333]">{post.title}</h3>
                      <p className="text-sm text-[#718096]">{post.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          fetchBlogById(post.id);
                          setSection('Blog Editor');
                        }}
                        className="px-3 py-1 rounded-md bg-[#ADD01C] text-white hover:bg-opacity-90"
                      >
                        View
                      </button>
                      <button
                        onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                        className="px-3 py-1 rounded-md bg-[#9E0B7F] text-white hover:bg-opacity-90"
                      >
                        Open
                      </button>
                      {isAdmin && (
                        <>
                          <button
                            onClick={() => navigate(`/blog/${post.slug}/edit`)}
                            className="px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-opacity-90"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className={`px-3 py-1 rounded-md bg-red-600 text-white hover:bg-opacity-90 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isDeleting}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorContent;