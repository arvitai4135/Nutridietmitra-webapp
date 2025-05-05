import React from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image,
  Link,
  Lock,
  Unlock,
} from 'lucide-react';

function EditorControls({
  isAdmin,
  viewOnly,
  editorRef,
  fileInputRef,
  images,
  lockAspectRatio,
  inputErrors,
  activeFormatButtons,
  handleFormat,
  updateImageAlignment,
  handleContentChange,
  handleImageUpload,
  updateImageSize,
  removeImage,
  toggleAspectRatioLock,
  handleKeyDown,
  handleEditorClick,
}) {
  return (
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
          <button
            onClick={() => handleFormat('formatBlock', 'h5')}
            className={`p-2 rounded-md ${
              activeFormatButtons.heading5 ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
            } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
            disabled={!isAdmin || viewOnly}
            title="Heading 5"
          >
            H5
          </button>
          <button
            onClick={() => handleFormat('formatBlock', 'h6')}
            className={`p-2 rounded-md ${
              activeFormatButtons.heading6 ? 'bg-[#ADD01C] text-white' : 'bg-gray-100'
            } ${!isAdmin || viewOnly ? 'disabled-button' : ''}`}
            disabled={!isAdmin || viewOnly}
            title="Heading 6"
          >
            H6
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
                    } ${!isAdmin || viewOnly || lockAspectRatio ? 'disabled-input' : ''}`}
                    disabled={!isAdmin || viewOnly || lockAspectRatio}
                  />
                  {inputErrors[`${image.id}-height`] && (
                    <p className="text-red-500 text-xs mt-1">{inputErrors[`${image.id}-height`]}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeImage(image.id)}
                className={`px-4 py-2 rounded-md bg-red-600 text-white hover:bg-opacity-90 ${
                  !isAdmin || viewOnly ? 'disabled-button' : ''
                }`}
                disabled={!isAdmin || viewOnly}
              >
                Remove Image
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EditorControls;