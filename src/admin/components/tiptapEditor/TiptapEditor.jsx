import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Tag, CheckSquare, Clock, Edit, Trash2, Save, ArrowLeft, ArrowRight, Bold, Italic, Underline, List, AlignLeft, AlignCenter, AlignRight, Image, Link, Eye, Lock, Unlock } from 'lucide-react';

function NutriDietBlogEditor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [content, setContent] = useState("");
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
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Blog Editor");

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageRatios = useRef({});
  const imageUrls = useRef({});

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = content;
    }
    return () => {
      Object.values(imageUrls.current).forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleSlugChange = (e) => {
    setSlug(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleDateChange = (e) => {
    setPublishDate(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setHasUnsavedChanges(true);
    }
  };

  const handleRemoveCategory = (category) => {
    setCategories(categories.filter(c => c !== category));
    setHasUnsavedChanges(true);
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
      setHasUnsavedChanges(true);
    }
  };

  const handleFormat = (command, value = null) => {
    if (!editorRef.current) return;

    editorRef.current.focus();
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    if (command === 'insertUnorderedList' || command === 'insertOrderedList') {
      const isBulletList = command === 'insertUnorderedList';
      const listTag = isBulletList ? 'UL' : 'OL';

      let blockNode = range.commonAncestorContainer;
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
          const contents = range.extractContents();
          p.appendChild(contents);
          range.insertNode(p);
          blockNode = p;
        }

        const selectedText = range.toString().trim();
        if (!selectedText) return;

        const lines = selectedText.split(/\r?\n/).filter(line => line.trim() !== '');

        const list = document.createElement(listTag);
        lines.forEach((line, index) => {
          const li = document.createElement('li');
          li.textContent = isBulletList ? `• ${line.trim()}` : `${index + 1}. ${line.trim()}`;
          list.appendChild(li);
        });

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

        const newRange = document.createRange();
        newRange.selectNodeContents(list);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    } else {
      document.execCommand(command, false, value);
    }

    setContent(editorRef.current.innerHTML);
    updateActiveFormattingStates();
    setHasUnsavedChanges(true);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map(file => {
        const url = URL.createObjectURL(file);
        const img = new window.Image();
        img.src = url;
        img.onload = (() => {
          imageRatios.current[file.name] = img.width / img.height;
        });
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
      setImages(prev => [...prev, ...newImages]);
      newImages.forEach(image => {
        const imgHtml = `<div class="image-container image-align-${image.alignment}" data-image-id="${image.id}"><img src="${image.url}" alt="${image.name}" style="width: ${image.width}%; height: ${image.height}%; max-width: 100%;" class="my-2.5" /></div>`;
        if (editorRef.current) {
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const imgNode = document.createElement('div');
            imgNode.innerHTML = imgHtml;
            range.insertNode(imgNode.firstChild);
            range.collapse(false);
          } else {
            editorRef.current.innerHTML += imgHtml;
          }
          setContent(editorRef.current.innerHTML);
        }
      });
      setHasUnsavedChanges(true);
      e.target.value = null;
    }
  };

  const updateImageSize = (imageId, dimension, value) => {
    const parsedValue = parseFloat(value);
    const isValid = !isNaN(parsedValue) && parsedValue >= 0;
    const newValue = isValid ? parsedValue : 100;

    setInputErrors(prev => ({
      ...prev,
      [`${imageId}-${dimension}`]: !isValid,
    }));

    const updatedImages = images.map(img => {
      if (img.id === imageId) {
        return { ...img, [dimension]: newValue };
      }
      return img;
    });
    setImages(updatedImages);

    if (editorRef.current) {
      const imageContainers = editorRef.current.querySelectorAll(`.image-container[data-image-id="${imageId}"]`);
      imageContainers.forEach(container => {
        const img = container.querySelector('img');
        if (img) {
          const updatedImg = updatedImages.find(i => i.id === imageId);
          img.style.width = `${updatedImg.width}%`;
          img.style.height = `${updatedImg.height}%`;
          img.style.maxWidth = '100%';
        }
      });
      setContent(editorRef.current.innerHTML);
    }
    setHasUnsavedChanges(true);
  };

  const updateImageAlignment = (alignment) => {
    if (!editorRef.current) return;

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

    const updatedImages = images.map(img => {
      if (img.id === imageId) {
        return { ...img, alignment };
      }
      return img;
    });
    setImages(updatedImages);

    setContent(editorRef.current.innerHTML);
    setHasUnsavedChanges(true);
  };

  const removeImage = (imageId) => {
    const image = images.find(img => img.id === imageId);
    if (image) {
      if (imageRatios.current[image.name]) {
        delete imageRatios.current[image.name];
      }
      if (imageUrls.current[image.name]) {
        URL.revokeObjectURL(imageUrls.current[image.name]);
        delete imageUrls.current[image.name];
      }
      setInputErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${imageId}-width`];
        delete newErrors[`${imageId}-height`];
        return newErrors;
      });
    }
    setImages(images.filter(img => img.id !== imageId));
    if (editorRef.current) {
      const imageContainers = editorRef.current.querySelectorAll(`.image-container[data-image-id="${imageId}"]`);
      imageContainers.forEach(container => {
        container.remove();
      });
      setContent(editorRef.current.innerHTML);
    }
    setHasUnsavedChanges(true);
  };

  const toggleAspectRatioLock = () => {
    setLockAspectRatio(!lockAspectRatio);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    alert('Changes saved successfully!');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '    ');
    }
  };

  const handleEditorClick = () => {
    updateActiveFormattingStates();
  };

  const updateActiveFormattingStates = () => {
    const selection = window.getSelection();
    let bulletList = false;
    let numberedList = false;

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
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const setSection = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const publishedPosts = [
    { id: 1, title: "Sample Published Post", date: "2025-04-20" },
    { id: 2, title: "Another Published Post", date: "2025-04-19" },
  ];
  const draftPosts = [
    { id: 1, title: "Sample Draft", date: "2025-04-21" },
  ];

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
            max-width: 100%;
            height: auto;
          }
          .prose img {
            max-width: 100%;
            height: auto;
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
          /* Mobile-specific styles for preview */
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
        `}
      </style>

      <div className="md:hidden p-4 flex justify-between items-center bg-[#9E0B7F] text-white">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="NutriDietMitra Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">NutriDiet</h1>
        </div>
        <button
          onClick={toggleMobileMenu}
          className="text-white p-2 rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mobile-menu-nav bg-[#9E0B7F] text-white px-4 py-2">
          <nav>
            <ul className="sidebar-ul list-none p-0 m-0">
              <li className="mb-2">
                <button
                  onClick={() => setSection("Blog Editor")}
                  className={`flex items-center px-4 py-3 rounded-md w-full text-left ${activeSection === "Blog Editor" ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'}`}
                >
                  <Edit className="mr-2" size={20} />
                  <span>Blog Editor</span>
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setSection("Preview")}
                  className={`flex items-center px-4 py-3 rounded-md w-full text-left ${activeSection === "Preview" ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'}`}
                >
                  <Eye className="mr-2" size={20} />
                  <span>Preview</span>
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setSection("Published")}
                  className={`flex items-center px-4 py-3 rounded-md w-full text-left ${activeSection === "Published" ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'}`}
                >
                  <CheckSquare className="mr-2" size={20} />
                  <span>Published</span>
                </button>
              </li>
              <li className="mb-2">
                <button
                  onClick={() => setSection("Drafts")}
                  className={`flex items-center px-4 py-3 rounded-md w-full text-left ${activeSection === "Drafts" ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'}`}
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
          <img src="/logo.png" alt="NutriDietMitra Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold">NutriDiet</h1>
        </div>

        <nav>
          <ul className="sidebar-ul list-none p-0 m-0">
            <li className="mb-2">
              <button
                onClick={() => setSection("Blog Editor")}
                className={`flex items-center px-4 py-3 rounded-md w-full text-left ${activeSection === "Blog Editor" ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'}`}
              >
                <Edit className="mr-2" size={20} />
                <span>Blog Editor</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setSection("Preview")}
                className={`flex items-center px-4 py-3 rounded-md w-full text-left ${activeSection === "Preview" ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'}`}
              >
                <Eye className="mr-2" size={20} />
                <span>Preview</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setSection("Published")}
                className={`flex items-center px-4 py-3 rounded-md w-full text-left ${activeSection === "Published" ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'}`}
              >
                <CheckSquare className="mr-2" size={20} />
                <span>Published</span>
              </button>
            </li>
            <li className="mb-2">
              <button
                onClick={() => setSection("Drafts")}
                className={`flex items-center px-4 py-3 rounded-md w-full text-left ${activeSection === "Drafts" ? 'bg-[#ADD01C] text-white' : 'hover:bg-opacity-80'}`}
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
            <img src="logo.png" alt="NutriDietMitra Logo" className="w-10 h-10" />
            <h1 className="text-2xl font-bold text-[#9E0B7F]">NutriDiet {activeSection}</h1>
          </div>
          <div className="flex items-center">
            {hasUnsavedChanges && (
              <span className="mr-4 flex items-center text-[#718096]">
                <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                Unsaved changes
              </span>
            )}
            {activeSection === "Blog Editor" && (
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-md flex items-center bg-[#ADD01C] text-white hover:bg-opacity-90"
              >
                <Save className="mr-2" size={16} />
                <span className="hidden sm:inline">Save</span>
              </button>
            )}
          </div>
        </header>

        <div className="flex flex-col md:flex-row flex-grow overflow-auto">
          {activeSection === "Blog Editor" && (
            <div className="flex flex-col md:flex-row w-full overflow-auto">
              <div className="w-full md:w-1/2 p-4 md:p-6 overflow-auto">
                <div className="bg-white rounded-md p-4 md:p-6 mb-6 shadow-sm">
                  <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 font-medium text-[#333333]">Blog Title</label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={handleTitleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1]"
                      placeholder="Enter blog title"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 font-medium text-[#333333]">Blog Description</label>
                    <input
                      type="text"
                      id="description"
                      value={description}
                      onChange={handleDescriptionChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1]"
                      placeholder="Enter blog description"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="flex-1">
                      <label htmlFor="slug" className="block mb-2 font-medium text-[#333333]">URL Slug</label>
                      <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={handleSlugChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1]"
                        placeholder="enter-slug-here"
                      />
                    </div>

                    <div className="flex-1">
                      <label htmlFor="publishDate" className="block mb-2 font-medium text-[#333333]">Publish Date</label>
                      <div className="relative flex border border-gray-300 rounded-md">
                        <div className="border-r border-gray-300 p-2 bg-gray-100 flex items-center justify-center">
                          <Calendar size={20} className="text-[#718096]" />
                        </div>
                        <input
                          type="date"
                          id="publishDate"
                          value={publishDate}
                          onChange={handleDateChange}
                          className="flex-grow px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1] rounded-r-md bg-white"
                          style={{ colorScheme: 'light' }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 font-medium text-[#333333]">Categories</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {categories.map(category => (
                        <div key={category} className="px-3 py-1 rounded-full flex items-center bg-[#FCF0F8] text-[#9E0B7F]">
                          {category}
                          <button
                            onClick={() => handleRemoveCategory(category)}
                            className="ml-2 hover:opacity-80 text-[#9E0B7F]"
                          >
                            ×
                          </button>
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
                          placeholder="Add category"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="flex-grow px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D93BB1]"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddCategory();
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                      <button
                        onClick={handleAddCategory}
                        className="px-4 md:px-6 py-2 rounded-r-md bg-[#9E0B7F] text-white hover:bg-opacity-90"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-md overflow-hidden mb-6">
                  <div className="p-2 flex flex-wrap items-center gap-2 bg-gradient-to-r from-[#D93BB1] via-[#9E0B7F] to-[#ADD01C]">
                    <div className="flex gap-1 md:gap-2">
                      <button 
                        className="p-1 md:p-2 rounded hover:bg-white/20 relative group" 
                        onClick={() => document.execCommand('undo')}
                        title="Undo"
                      >
                        <ArrowLeft size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Undo</span>
                      </button>
                      <button 
                        className="p-1 md:p-2 rounded hover:bg-white/20 relative group" 
                        onClick={() => document.execCommand('redo')}
                        title="Redo"
                      >
                        <ArrowRight size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Redo</span>
                      </button>
                    </div>
                    <div className="hidden md:block w-px h-6 bg-white/30"></div>
                    <div className="hidden md:block">
                      <select
                        className="bg-white rounded px-2 py-1 text-sm w-32"
                        onChange={(e) => handleFormat('fontName', e.target.value)}
                      >
                        <option value="Arial">Arial</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Verdana">Verdana</option>
                      </select>
                    </div>
                    <div className="hidden md:block w-px h-6 bg-white/30"></div>
                    <div className="flex gap-1 md:gap-2">
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${activeFormatButtons.bold ? 'bg-white/30' : ''}`}
                        onClick={() => handleFormat('bold')}
                        title="Bold"
                      >
                        <Bold size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Bold</span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${activeFormatButtons.italic ? 'bg-white/30' : ''}`}
                        onClick={() => handleFormat('italic')}
                        title="Italic"
                      >
                        <Italic size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Italic</span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${activeFormatButtons.underline ? 'bg-white/30' : ''}`}
                        onClick={() => handleFormat('underline')}
                        title="Underline"
                      >
                        <Underline size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Underline</span>
                      </button>
                    </div>
                    <div className="w-px h-6 bg-white/30"></div>
                    <div className="flex gap-1 md:gap-2">
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${activeFormatButtons.bulletList ? 'bg-white/30' : ''}`}
                        onClick={() => handleFormat('insertUnorderedList')}
                        title="Bullet List"
                      >
                        <List size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Bullet List</span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${activeFormatButtons.numberedList ? 'bg-white/30' : ''}`}
                        onClick={() => handleFormat('insertOrderedList')}
                        title="Numbered List"
                      >
                        <List size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Numbered List</span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${activeFormatButtons.alignLeft ? 'bg-white/30' : ''}`}
                        onClick={() => handleFormat('justifyLeft')}
                        title="Align Text Left"
                      >
                        <AlignLeft size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Align Text Left</span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${activeFormatButtons.alignCenter ? 'bg-white/30' : ''}`}
                        onClick={() => handleFormat('justifyCenter')}
                        title="Align Text Center"
                      >
                        <AlignCenter size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Align Text Center</span>
                      </button>
                      <button
                        className={`p-1 md:p-2 rounded hover:bg-white/20 relative group ${activeFormatButtons.alignRight ? 'bg-white/30' : ''}`}
                        onClick={() => handleFormat('justifyRight')}
                        title="Align Text Right"
                      >
                        <AlignRight size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Align Text Right</span>
                      </button>
                    </div>
                    <div className="w-px h-6 bg-white/30"></div>
                    <div className="flex gap-1 md:gap-2">
                      <button
                        className="p-1 md:p-2 rounded hover:bg-white/20 relative group"
                        onClick={() => updateImageAlignment('left')}
                        title="Align Image Left"
                      >
                        <AlignLeft size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Align Image Left</span>
                      </button>
                      <button
                        className="p-1 md:p-2 rounded hover:bg-white/20 relative group"
                        onClick={() => updateImageAlignment('center')}
                        title="Align Image Center"
                      >
                        <AlignCenter size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Align Image Center</span>
                      </button>
                      <button
                        className="p-1 md:p-2 rounded hover:bg-white/20 relative group"
                        onClick={() => updateImageAlignment('right')}
                        title="Align Image Right"
                      >
                        <AlignRight size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Align Image Right</span>
                      </button>
                    </div>
                    <div className="flex gap-1 md:gap-2 ml-auto">
                      <button
                        className="p-1 md:p-2 rounded hover:bg-white/20 relative group"
                        onClick={() => fileInputRef.current?.click()}
                        title="Insert Image"
                      >
                        <Image size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Insert Image</span>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleImageUpload}
                          multiple
                          accept="image/*"
                        />
                      </button>
                      <button
                        className="p-1 md:p-2 rounded hover:bg-white/20 relative group"
                        onClick={() => {
                          const url = prompt('Enter link URL:');
                          if (url) handleFormat('createLink', url);
                        }}
                        title="Insert Link"
                      >
                        <Link size={16} className="text-white" />
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Insert Link</span>
                      </button>
                    </div>
                  </div>

                  <div
                    className="bg-white p-4 min-h-64"
                    ref={editorRef}
                    contentEditable
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
                        className={`p-2 rounded ${lockAspectRatio ? 'bg-[#9E0B7F] text-white' : 'bg-gray-200 text-[#333333]'} hover:opacity-90`}
                        title={lockAspectRatio ? 'Unlock Aspect Ratio' : 'Lock Aspect Ratio'}
                      >
                        {lockAspectRatio ? <Lock size={16} /> : <Unlock size={16} />}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {images.map(image => (
                        <div key={image.id} className="border rounded-md p-2 relative group">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-32 object-cover rounded"
                          />
                          <div className="mt-2 flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm truncate flex-1 text-[#718096]">{image.name}</span>
                              <button
                                onClick={() => removeImage(image.id)}
                                className="text-red-500 hover:text-red-700"
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
                                  onChange={(e) => updateImageSize(image.id, 'width', e.target.value)}
                                  className={`w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${inputErrors[`${image.id}-width`] ? 'border-red-500' : 'border-gray-300'}`}
                                  placeholder="Enter width"
                                />
                              </div>
                              <div className="flex-1">
                                <label className="text-xs text-[#333333]">Height (%)</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  value={image.height}
                                  onChange={(e) => updateImageSize(image.id, 'height', e.target.value)}
                                  className={`w-full border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#D93BB1] ${inputErrors[`${image.id}-height`] ? 'border-red-500' : 'border-gray-300'}`}
                                  placeholder="Enter height"
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            className="absolute top-2 right-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity bg-[#9E0B7F] text-white"
                            onClick={() => {
                              if (editorRef.current) {
                                const selection = window.getSelection();
                                if (selection.rangeCount > 0) {
                                  const range = selection.getRangeAt(0);
                                  const imgHtml = `<div class="image-container image-align-${image.alignment}" data-image-id="${image.id}"><img src="${image.url}" alt="${image.name}" style="width: ${image.width}%; height: ${image.height}%; max-width: 100%;" class="my-2.5" /></div>`;
                                  const imgNode = document.createElement('div');
                                  imgNode.innerHTML = imgHtml;
                                  range.insertNode(imgNode.firstChild);
                                  range.collapse(false);
                                  handleContentChange();
                                }
                              }
                            }}
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
                        categories.map(category => (
                          <span key={category} className="px-2 py-0.5 rounded-full text-sm bg-[#FCF0F8] text-[#9E0B7F]">
                            {category}
                          </span>
                        ))
                      ) : (
                        <span>No categories</span>
                      )}
                    </div>
                  </div>
                  <p className="mb-4 text-[#718096] preview-description">{description || 'No description provided'}</p>
                  <div className="prose max-w-none bg-white p-4 rounded-md shadow-sm preview-content" dangerouslySetInnerHTML={{ __html: content || '<p>Start writing your blog post...</p>' }} />
                  <p className="text-sm mt-4 text-[#718096] preview-url">URL: nutridietmitra.com/blog/{slug || 'slug-not-set'}</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "Preview" && (
            <div className="w-full p-4 md:p-6 overflow-auto bg-[#FCF0F8] preview-container">
              <h2 className="text-xl font-bold mb-4 text-[#9E0B7F]">Blog Preview</h2>
              <div className="border-t border-gray-200 pt-4">
                <h1 className="text-3xl font-bold mb-2 text-[#9E0B7F] preview-title">{title || 'Untitled'}</h1>
                <div className="flex items-center mb-2 flex-wrap text-[#718096] preview-meta">
                  <Calendar size={16} className="mr-1" />
                  <span>{publishDate || 'Not set'}</span>
                  <span className="mx-2">•</span>
                  <div className="flex flex-wrap gap-2 preview-categories">
                    {categories.length > 0 ? (
                      categories.map(category => (
                        <span key={category} className="px-2 py-0.5 rounded-full text-sm bg-[#FCF0F8] text-[#9E0B7F]">
                          {category}
                        </span>
                      ))
                    ) : (
                      <span>No categories</span>
                    )}
                  </div>
                </div>
                <p className="mb-4 text-[#718096] preview-description">{description || 'No description provided'}</p>
                <div className="prose max-w-none bg-white p-4 rounded-md shadow-sm preview-content" dangerouslySetInnerHTML={{ __html: content || '<p>Start writing your blog post...</p>' }} />
                <p className="text-sm mt-4 text-[#718096] preview-url">URL: nutridietmitra.com/blog/{slug || 'slug-not-set'}</p>
              </div>
            </div>
          )}

          {activeSection === "Published" && (
            <div className="w-full p-4 md:p-6 overflow-auto bg-[#FCF0F8]">
              <h2 className="text-xl font-bold mb-4 text-[#9E0B7F]">Published Posts</h2>
              <div className="border-t border-gray-200 pt-4">
                {publishedPosts.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {publishedPosts.map(post => (
                      <li key={post.id} className="mb-4 p-4 bg-white rounded-md shadow-sm">
                        <h3 className="text-lg font-medium text-[#333333]">{post.title}</h3>
                        <p className="text-[#718096]">Published: {post.date}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#718096]">No published posts yet.</p>
                )}
              </div>
            </div>
          )}

          {activeSection === "Drafts" && (
            <div className="w-full p-4 md:p-6 overflow-auto bg-[#FCF0F8]">
              <h2 className="text-xl font-bold mb-4 text-[#9E0B7F]">Drafts</h2>
              <div className="border-t border-gray-200 pt-4">
                {draftPosts.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {draftPosts.map(post => (
                      <li key={post.id} className="mb-4 p-4 bg-white rounded-md shadow-sm">
                        <h3 className="text-lg font-medium text-[#333333]">{post.title}</h3>
                        <p className="text-[#718096]">Last Edited: {post.date}</p>
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

export default NutriDietBlogEditor;   