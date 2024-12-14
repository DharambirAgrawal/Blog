"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Type,
  Plus,
  MinusSquare,
  PlusSquare,
  Heading1,
  Heading2,
} from "lucide-react";

const RichTextEditor = () => {
  const [content, setContent] = useState("");
  const [selection, setSelection] = useState(null);
  const editorRef = useRef(null);
  const [fontSize, setFontSize] = useState("16px");
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageSize, setImageSize] = useState({ width: 300, height: 200 });
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: "left",
  });

  const handleFormat = (format) => {
    document.execCommand(format, false, null);
    setFormats((prev) => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  const handleAlignment = (alignment) => {
    document.execCommand(`justify${alignment}`, false, null);
    setFormats((prev) => ({
      ...prev,
      align: alignment,
    }));
  };

  const handleFontSize = (change) => {
    const currentSize = parseInt(fontSize);
    const newSize = Math.max(8, Math.min(72, currentSize + change));
    setFontSize(`${newSize}px`);
    document.execCommand("fontSize", false, "7");
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontSize = `${newSize}px`;
      range.surroundContents(span);
    }
  };

  const insertImage = () => {
    if (imageUrl) {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.style.width = `${imageSize.width}px`;
      img.style.height = `${imageSize.height}px`;
      img.className = "editor-image";

      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.insertNode(img);
      }

      setShowImageModal(false);
      setImageUrl("");
    }
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = `${imageSize.width}px`;
        img.style.height = `${imageSize.height}px`;
        img.className = "editor-image";

        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          range.insertNode(img);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      document.execCommand("insertHTML", false, "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  };

  useEffect(() => {
    const saveSelection = () => {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        setSelection(selection.getRangeAt(0));
      }
    };

    editorRef.current.addEventListener("mouseup", saveSelection);
    editorRef.current.addEventListener("keyup", saveSelection);

    return () => {
      if (editorRef.current) {
        editorRef.current.removeEventListener("mouseup", saveSelection);
        editorRef.current.removeEventListener("keyup", saveSelection);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="border border-gray-300 rounded-lg shadow-sm">
        <div className="flex flex-wrap items-center gap-2 p-2 border-b border-gray-300 bg-gray-50">
          <button
            onClick={() => handleFormat("bold")}
            className={`p-2 rounded hover:bg-gray-200 ${
              formats.bold ? "bg-gray-200" : ""
            }`}
          >
            <Bold size={20} />
          </button>
          <button
            onClick={() => handleFormat("italic")}
            className={`p-2 rounded hover:bg-gray-200 ${
              formats.italic ? "bg-gray-200" : ""
            }`}
          >
            <Italic size={20} />
          </button>
          <button
            onClick={() => handleFormat("underline")}
            className={`p-2 rounded hover:bg-gray-200 ${
              formats.underline ? "bg-gray-200" : ""
            }`}
          >
            <Underline size={20} />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <button
            onClick={() => handleAlignment("Left")}
            className={`p-2 rounded hover:bg-gray-200 ${
              formats.align === "left" ? "bg-gray-200" : ""
            }`}
          >
            <AlignLeft size={20} />
          </button>
          <button
            onClick={() => handleAlignment("Center")}
            className={`p-2 rounded hover:bg-gray-200 ${
              formats.align === "center" ? "bg-gray-200" : ""
            }`}
          >
            <AlignCenter size={20} />
          </button>
          <button
            onClick={() => handleAlignment("Right")}
            className={`p-2 rounded hover:bg-gray-200 ${
              formats.align === "right" ? "bg-gray-200" : ""
            }`}
          >
            <AlignRight size={20} />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleFontSize(-2)}
              className="p-2 rounded hover:bg-gray-200"
            >
              <MinusSquare size={20} />
            </button>
            <span className="text-sm font-medium">{fontSize}</span>
            <button
              onClick={() => handleFontSize(2)}
              className="p-2 rounded hover:bg-gray-200"
            >
              <PlusSquare size={20} />
            </button>
          </div>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <button
            onClick={() => setShowImageModal(true)}
            className="p-2 rounded hover:bg-gray-200"
          >
            <ImageIcon size={20} />
          </button>
        </div>

        <div
          ref={editorRef}
          contentEditable
          className="min-h-96 p-4 focus:outline-none"
          style={{ fontSize }}
          onDrop={handleImageDrop}
          onDragOver={(e) => e.preventDefault()}
          onKeyDown={handleKeyDown}
        />
      </div>

      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Insert Image</h3>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex gap-4 mb-4">
              <div>
                <label className="block text-sm mb-1">Width (px)</label>
                <input
                  type="number"
                  value={imageSize.width}
                  onChange={(e) =>
                    setImageSize((prev) => ({ ...prev, width: e.target.value }))
                  }
                  className="w-24 p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Height (px)</label>
                <input
                  type="number"
                  value={imageSize.height}
                  onChange={(e) =>
                    setImageSize((prev) => ({
                      ...prev,
                      height: e.target.value,
                    }))
                  }
                  className="w-24 p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={insertImage}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
