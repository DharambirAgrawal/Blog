"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  KeyboardEvent,
} from "react";
import { updateMdxText } from "./actions";
import { template2 } from "@/lib/templates";
import {
  Bold,
  Italic,
  Link,
  Image,
  List,
  Heading1,
  Heading2,
  Code,
  Quote,
  Table,
  FileCode,
  Type,
  ListOrdered,
  CheckSquare,
  Undo,
  Redo,
  Save,
  Copy,
  Download,
  Upload,
} from "lucide-react";

interface MDXComponent {
  icon: React.ReactNode;
  label: string;
  insert: string;
  shortcut?: string;
  wrapper?: boolean;
}

interface EditorState {
  content: string;
  history: string[];
  currentIndex: number;
  isSaved: boolean;
  isModified: boolean;
}

interface EditorMetrics {
  lines: number;
  chars: number;
  words: number;
  selections: number;
}

const MAX_HISTORY = 100;
const TAB_SIZE = 2;

const MDXEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    content: template2,
    history: [template2],
    currentIndex: 0,
    isSaved: true,
    isModified: false,
  });

  const [metrics, setMetrics] = useState<EditorMetrics>({
    lines: 0,
    chars: 0,
    words: 0,
    selections: 0,
  });

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const mdxComponents: MDXComponent[] = [
    {
      icon: <Heading1 className="w-4 h-4" />,
      label: "H1",
      insert: "# ",
      shortcut: "alt+1",
    },
    {
      icon: <Heading2 className="w-4 h-4" />,
      label: "H2",
      insert: "## ",
      shortcut: "alt+2",
    },
    {
      icon: <Type className="w-4 h-4" />,
      label: "H3",
      insert: "### ",
      shortcut: "alt+3",
    },
    {
      icon: <Bold className="w-4 h-4" />,
      label: "Bold",
      insert: "**$selection**",
      wrapper: true,
      shortcut: "ctrl+b",
    },
    {
      icon: <Italic className="w-4 h-4" />,
      label: "Italic",
      insert: "*$selection*",
      wrapper: true,
      shortcut: "ctrl+i",
    },
    {
      icon: <Link className="w-4 h-4" />,
      label: "Link",
      insert: "[$selection](url)",
      wrapper: true,
      shortcut: "ctrl+k",
    },
    {
      icon: <Image className="w-4 h-4" />,
      label: "Image",
      insert: "![Alt text](image-url)",
      shortcut: "ctrl+shift+i",
    },
    {
      icon: <List className="w-4 h-4" />,
      label: "List",
      insert: "\n- $selection\n- ",
      wrapper: true,
    },
    {
      icon: <ListOrdered className="w-4 h-4" />,
      label: "Ordered List",
      insert: "\n1. $selection\n2. ",
      wrapper: true,
    },
    {
      icon: <Code className="w-4 h-4" />,
      label: "Code",
      insert: "\n```tsx\n$selection\n```\n",
      wrapper: true,
    },
    {
      icon: <Quote className="w-4 h-4" />,
      label: "Quote",
      insert: "\n> $selection\n",
      wrapper: true,
    },
    {
      icon: <Table className="w-4 h-4" />,
      label: "Table",
      insert:
        "\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n",
    },
    {
      icon: <CheckSquare className="w-4 h-4" />,
      label: "Task List",
      insert: "\n- [ ] $selection\n- [ ] ",
      wrapper: true,
    },
    {
      icon: <FileCode className="w-4 h-4" />,
      label: "Component",
      insert: '<Component prop="value">\n  $selection\n</Component>',
      wrapper: true,
    },
  ];

  const updateMetrics = useCallback(() => {
    if (!editorRef.current) return;
    const content = editorRef.current.value;
    const lines = content.split("\n").length;
    const chars = content.length;
    const words = content.trim().split(/\s+/).length;
    const selections =
      editorRef.current.selectionEnd - editorRef.current.selectionStart;

    setMetrics({ lines, chars, words, selections });
  }, []);

  const addToHistory = useCallback((content: string) => {
    setEditorState((prev) => {
      const newHistory = [
        ...prev.history.slice(0, prev.currentIndex + 1),
        content,
      ];
      if (newHistory.length > MAX_HISTORY) newHistory.shift();

      return {
        ...prev,
        content,
        history: newHistory,
        currentIndex: newHistory.length - 1,
        isModified: true,
      };
    });
  }, []);

  const handleUndo = useCallback(() => {
    setEditorState((prev) => {
      if (prev.currentIndex > 0) {
        return {
          ...prev,
          content: prev.history[prev.currentIndex - 1],
          currentIndex: prev.currentIndex - 1,
          isModified: true,
        };
      }
      return prev;
    });
  }, []);

  const handleRedo = useCallback(() => {
    setEditorState((prev) => {
      if (prev.currentIndex < prev.history.length - 1) {
        return {
          ...prev,
          content: prev.history[prev.currentIndex + 1],
          currentIndex: prev.currentIndex + 1,
          isModified: true,
        };
      }
      return prev;
    });
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;

    if (e.key === "Tab") {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const spaces = " ".repeat(TAB_SIZE);

      if (start === end) {
        const newContent =
          textarea.value.substring(0, start) +
          spaces +
          textarea.value.substring(end);

        setEditorState((prev) => ({
          ...prev,
          content: newContent,
          isModified: true,
        }));

        textarea.selectionStart = textarea.selectionEnd = start + TAB_SIZE;
      } else {
        const selectedText = textarea.value.substring(start, end);
        const indentedText = selectedText.replace(/^/gm, spaces);
        const newContent =
          textarea.value.substring(0, start) +
          indentedText +
          textarea.value.substring(end);

        setEditorState((prev) => ({
          ...prev,
          content: newContent,
          isModified: true,
        }));

        textarea.selectionStart = start;
        textarea.selectionEnd =
          end + (indentedText.length - selectedText.length);
      }
    }
  }, []);

  const insertComponent = useCallback(
    (component: MDXComponent) => {
      const textarea = editorRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selection = textarea.value.substring(start, end);

      let insertText = component.insert;
      if (component.wrapper && selection) {
        insertText = component.insert.replace("$selection", selection);
      }

      const newContent =
        textarea.value.substring(0, start) +
        insertText +
        textarea.value.substring(end);

      addToHistory(newContent);

      requestAnimationFrame(() => {
        textarea.focus();
        const newPosition = start + insertText.length;
        textarea.setSelectionRange(newPosition, newPosition);
      });
    },
    [addToHistory]
  );

  useEffect(() => {
    if (editorState.isModified) {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
      const timer = setTimeout(async () => {
        try {
          await updateMdxText(editorState.content);
          setEditorState((prev) => ({ ...prev, isSaved: true }));
        } catch (error) {}
      }, 2000);
      setAutoSaveTimer(timer);
    }
  }, [editorState.content, editorState.isModified]);
  useEffect(() => {
    updateMdxText(editorState.content);
  }, []);

  const syncScroll = useCallback(
    (e: React.UIEvent<HTMLTextAreaElement>) => {
      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
      }
      updateMetrics();
    },
    [updateMetrics]
  );

  const exportMarkdown = useCallback(() => {
    const blob = new Blob([editorState.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.mdx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [editorState.content]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between p-2 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-1 flex-wrap">
            {mdxComponents.map((component, index) => (
              <button
                key={index}
                className="px-2 py-1 h-8 hover:bg-gray-100 rounded transition-colors"
                onClick={() => insertComponent(component)}
                title={`${component.label}${
                  component.shortcut ? ` (${component.shortcut})` : ""
                }`}
              >
                {component.icon}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              className="p-1 hover:bg-gray-100 rounded"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              className="p-1 hover:bg-gray-100 rounded"
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo className="w-4 h-4" />
            </button>
            <button
              onClick={exportMarkdown}
              className="p-1 hover:bg-gray-100 rounded"
              title="Export MDX"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="relative flex">
          <div
            ref={lineNumbersRef}
            className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 border-r border-gray-200 overflow-hidden"
            style={{ pointerEvents: "none" }}
          >
            <div className="text-right pr-2 text-gray-400 select-none font-mono">
              {editorState.content.split("\n").map((_, index) => (
                <div key={index} className="text-xs leading-6 h-6">
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          <textarea
            ref={editorRef}
            value={editorState.content}
            onChange={(e) => {
              addToHistory(e.target.value);
              updateMetrics();
            }}
            onScroll={syncScroll}
            onKeyDown={handleKeyDown}
            placeholder="Write your MDX content here..."
            className="w-full min-h-[32rem] pl-14 py-4 pr-4 font-mono text-sm bg-white focus:outline-none resize-y leading-6"
            spellCheck={false}
            style={{
              tabSize: TAB_SIZE,
              lineHeight: "1.5rem",
              height: Math.max(
                editorState.content.split("\n").length * 24 + 40,
                512
              ),
            }}
          />
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200 text-xs text-gray-500 bg-gray-50">
          <div className="flex gap-4">
            <span>{metrics.lines} lines</span>
            <span>{metrics.chars} characters</span>
            <span>{metrics.words} words</span>
            {metrics.selections > 0 && (
              <span>{metrics.selections} selected</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span>{editorState.isModified ? "Unsaved changes" : "Saved"}</span>
            <span>MDX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MDXEditor;
