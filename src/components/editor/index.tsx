"use client";

import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { useEditor, EditorContent } from "@tiptap/react";
import EditorMenuBar from "./EditorMenuBar";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import History from "@tiptap/extension-history";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import HardBreak from "@tiptap/extension-hard-break";
import { Markdown } from "tiptap-markdown";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Youtube from "@tiptap/extension-youtube";
import CodeBlock from "@tiptap/extension-code-block";
import { Spacer } from "@nextui-org/react";
import { useTheme } from "next-themes";

type EditorProps = {
  content: string;
  setContent: (content: string) => void;
};

const limit = 200;

export default function Editor({ content, setContent }: EditorProps) {
  const { theme } = useTheme();

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      CharacterCount.configure({
        limit,
      }),
      Bold,
      Italic,
      Underline,
      Highlight,
      Strike,
      Subscript,
      Superscript,
      History,
      HorizontalRule,
      Blockquote,
      Heading,
      ListItem,
      OrderedList,
      BulletList,
      HardBreak,
      Markdown.configure({
        transformCopiedText: true,
        transformPastedText: true,
      }),
      Typography,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Dropcursor,
      Image,
      TaskItem,
      TaskList,
      Table,
      TableHeader,
      TableRow,
      TableCell,
      Youtube,
      CodeBlock,
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert min-h-[150px] max-h-[400px] overflow-y-auto cursor-text rounded-md border p-5 focus-within:outline-none focus-within:border-blue-500 transform-all duration-500 ease-in-out",
      },
    },
  });

  return (
    <div className="w-full">
      <EditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
      <Spacer y={3} />
      {editor && (
        <div
          className={`${
            editor.storage.characterCount.characters() === limit
              ? "text-red-500"
              : editor.storage.characterCount.characters() > limit / 2
              ? "text-yellow-500"
              : "text-[#888] dark:text-[#555]"
          } transform-color duration-500 ease-in-out flex items-center gap-3`}
        >
          <svg width="30" height="30" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke={theme === "dark" ? "#333" : "#eee"}
              strokeWidth="3"
              className="transform-all duration-500 ease-in-out"
            />
            <circle
              id="progress-circle"
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke={
                editor.storage.characterCount.characters() === limit
                  ? "#de362a"
                  : editor.storage.characterCount.characters() > limit / 2
                  ? "#eab308"
                  : "#26d1ff"
              }
              strokeWidth="3"
              strokeDasharray="100, 100"
              strokeDashoffset={
                (1 - editor.storage.characterCount.characters() / limit) * 100
              }
              transform="rotate(-90 18 18)"
              className="transform-all duration-500 ease-in-out"
            />
          </svg>
          {editor.storage.characterCount.characters()} / {limit} characters
          <br />
          {editor.storage.characterCount.words()} words
        </div>
      )}
    </div>
  );
}