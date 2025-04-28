import React, { useEffect, useRef } from 'react';
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
  handleTitleChange,
  handleDescriptionChange,
  handleSlugChange,
  handleDateChange,
  handleAddCategory,
  handleRemoveCategory,
  handleSave,
  toggleMobileMenu,
  setSection,
  fetchBlogById,
}) {
  const isInitialMount = useRef(true);

  // Log content for debugging when in Preview section
  useEffect(() => {
    if (activeSection === 'Preview') {
      console.log('Preview content:', content);
    }
  }, [activeSection, content]);

  // Initialize editor content only on mount
  useEffect(() => {
    if (isInitialMount.current && editorRef.current) {
      editorRef.current.innerHTML = DOMPurify.sanitize(content || '<p>Start writing your blog post...</p>', {
        ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img', 'div', 'br', 'strong', 'em', 'u', 'a'],
        ALLOWED_ATTR: ['src', 'alt', 'class', 'style', 'data-image-id', 'href', 'contenteditable'],
        ADD_ATTR: ['src', 'href', 'contenteditable'],
        ADD_URI_SAFE_ATTR: ['src', 'href'],
      });
      isInitialMount.current = false;
    }
  }, [editorRef, content]);

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
            jsonContent.push({
              type: 'image',
              url: img.src,
              caption: img.alt || 'No caption',
            });
          }
        }
      }
    });

    return jsonContent;
  };

  const handleFormat = (command, value = null) => {
    if (isAdmin && editorRef.current) {
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

          const range = window.getSelection().getRangeAt(0);
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

        if (!blockNode || blockNode === editorRef.current) {
          const p = document.createElement('p');
          const contents = window.getSelection().getRangeAt(0).extractContents();
          p.appendChild(contents);
          window.getSelection().getRangeAt(0).insertNode(p);
          blockNode = p;
        }

        const selectedText = window.getSelection().getRangeAt(0).toString().trim();
        if (!selectedText) {
          document.execCommand('formatBlock', false, value);
        } else {
          const range = window.getSelection().getRangeAt(0);
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
      const newContent = editorRef.current.innerHTML;
      debouncedSetContent(newContent);
      setHasUnsavedChanges(true);
    }
  };

  const handleImageUpload = (e) => {
    if (isAdmin) {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        const position = saveCursorPosition();
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

            const imgNode = document.createElement('div');
            imgNode.innerHTML = imgHtml;
            const imageContainer = imgNode.firstChild;
            range.insertNode(imageContainer);

            const newP = document.createElement('p');
            newP.innerHTML = '<br>';
            if (imageContainer) {
              imageContainer.insertAdjacentElement('afterend', newP);
            } else {
              console.error('Failed to insert image container');
              return;
            }

            range.setStart(newP, 0);
            range.setEnd(newP, 0);

            selection.removeAllRanges();
            selection.addRange(range);
            debouncedSetContent(editorRef.current.innerHTML);
          }
        });
        setHasUnsavedChanges(true);
        restoreCursorPosition(position);
        e.target.value = null;
      }
    }
  };

  const updateImageSize = (imageId, dimension, value) => {
    if (isAdmin) {
      const position = saveCursorPosition();
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
      restoreCursorPosition(position);
    }
  };

  const updateImageAlignment = (alignment) => {
    if (isAdmin && editorRef.current) {
      const position = saveCursorPosition();
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
      restoreCursorPosition(position);
    }
  };

  const removeImage = (imageId) => {
    if (isAdmin) {
      const position = saveCursorPosition();
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
      restoreCursorPosition(position);
    }
  };

  const insertImageAtCursor = (image) => {
    if (isAdmin && editorRef.current) {
      const position = saveCursorPosition();
      const imgHtml = `<div class="image-container image-align-${image.alignment}" data-image-id="${image.id}" contenteditable="false"><img src="${image.url}" alt="Blog Image" style="width: ${image.width}%; height: auto; max-width: 100%;" class="my-2.5" /></div>`;
      
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
      debouncedSetContent(editorRef.current.innerHTML);
      setHasUnsavedChanges(true);
      restoreCursorPosition(position);
    }
  };

  const toggleAspectRatioLock = () => {
    if (isAdmin) {
      setLockAspectRatio(!lockAspectRatio);
      setHasUnsavedChanges(true);
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
    if (isAdmin && editorRef.current) {
      const htmlContent = editorRef.current.innerHTML;
      const jsonContent = parseEditorContentToJSON(htmlContent);
      console.log('Parsed JSON content:', jsonContent); // Debugging log
      handleSave({ htmlContent, jsonContent });
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#FCF0F8]">
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
            viewBox="0 24 24"
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
                onClick={handleSaveWithJSON}
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
                      Description
                    </label>
                    <textarea
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
                        <option value="h5">Heading 5</option>
                        <option value="h6">Heading 6</option>
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
                    <div className="w-px h-6 bg-white/30"></div>
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
                            onClick={() => isAdmin && insertImageAtCursor(image)}
                            title="Insert Image into Editor"
                            disabled={!isAdmin}
                          >
                            <Image size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 p-4 md:p-6 bg-[#FCF0F8] overflow-auto">
                <div className="preview-container bg-white rounded-md p-6 shadow-sm">
                  <h1 className="preview-title text-3xl font-bold text-[#9E0B7F] mb-4">{title || 'Blog Title'}</h1>
                  <div className="preview-meta flex items-center text-[#718096] mb-4">
                    <span className="mr-4 flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {publishDate || 'Publish Date'}
                    </span>
                    <div className="preview-categories flex flex-wrap gap-2">
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <span
                            key={category}
                            className="px-2 py-1 rounded-full bg-[#FCF0F8] text-[#9E0B7F] text-sm"
                          >
                            {category}
                          </span>
                        ))
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-[#FCF0F8] text-[#9E0B7F] text-sm">
                          No categories
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="preview-description text-[#333333] mb-6">{description || 'Blog Description'}</p>
                  <div
                    className="preview-content prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(content || '<p>No content available</p>', {
                        ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img', 'div', 'br', 'strong', 'em', 'u', 'a'],
                        ALLOWED_ATTR: ['src', 'alt', 'class', 'style', 'data-image-id', 'href', 'contenteditable'],
                        ADD_ATTR: ['src', 'href', 'contenteditable'],
                        ADD_URI_SAFE_ATTR: ['src', 'href'],
                      }),
                    }}
                  />
                  <p className="preview-url text-[#718096] mt-6">
                    URL: <span className="text-[#9E0B7F]">{slug ? `/blog/${slug}` : '/blog/enter-slug-here'}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'Preview' && (
            <div className="w-full p-4 md:p-6 overflow-auto">
              <div className="preview-container bg-white rounded-md p-6 shadow-sm">
                <h1 className="preview-title text-3xl font-bold text-[#9E0B7F] mb-4">{title || 'Blog Title'}</h1>
                <div className="preview-meta flex items-center text-[#718096] mb-4">
                  <span className="mr-4 flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {publishDate || 'Publish Date'}
                  </span>
                  <div className="preview-categories flex flex-wrap gap-2">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 rounded-full bg-[#FCF0F8] text-[#9E0B7F] text-sm"
                        >
                          {category}
                        </span>
                      ))
                    ) : (
                      <span className="px-2 py-1 rounded-full bg-[#FCF0F8] text-[#9E0B7F] text-sm">
                        No categories
                      </span>
                    )}
                  </div>
                </div>
                <p className="preview-description text-[#333333] mb-6">{description || 'Blog Description'}</p>
                <div
                  className="preview-content prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content || '<p>No content available</p>', {
                      ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'img', 'div', 'br', 'strong', 'em', 'u', 'a'],
                      ALLOWED_ATTR: ['src', 'alt', 'class', 'style', 'data-image-id', 'href', 'contenteditable'],
                      ADD_ATTR: ['src', 'href', 'contenteditable'],
                      ADD_URI_SAFE_ATTR: ['src', 'href'],
                    }),
                  }}
                />
                <p className="preview-url text-[#718096] mt-6">
                  URL: <span className="text-[#9E0B7F]">{slug ? `/blog/${slug}` : '/blog/enter-slug-here'}</span>
                </p>
              </div>
            </div>
          )}

          {activeSection === 'Published' && (
            <div className="w-full p-4 md:p-6 overflow-auto">
              <h2 className="text-2xl font-bold text-[#9E0B7F] mb-6">Published Posts</h2>
              {publishedPosts.length === 0 ? (
                <p className="text-[#718096]">No published posts available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {publishedPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-md p-4 shadow-sm">
                      <h3 className="text-lg font-medium text-[#333333]">{post.title}</h3>
                      <p className="text-[#718096] text-sm mb-2">{post.date}</p>
                      <button
                        onClick={() => fetchBlogById(post.id)}
                        className="px-4 py-2 rounded-md bg-[#9E0B7F] text-white hover:bg-opacity-90"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === 'Drafts' && (
            <div className="w-full p-4 md:p-6 overflow-auto">
              <h2 className="text-2xl font-bold text-[#9E0B7F] mb-6">Draft Posts</h2>
              {draftPosts.length === 0 ? (
                <p className="text-[#718096]">No draft posts available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {draftPosts.map((post) => (
                    <div key={post.id} className="bg-white rounded-md p-4 shadow-sm">
                      <h3 className="text-lg font-medium text-[#333333]">{post.title}</h3>
                      <p className="text-[#718096] text-sm mb-2">{post.date}</p>
                      <button
                        onClick={() => fetchBlogById(post.id)}
                        className="px-4 py-2 rounded-md bg-[#9E0B7F] text-white hover:bg-opacity-90"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditorContent;