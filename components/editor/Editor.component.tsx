"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { TiptapEditorProps } from "./props";
import { TiptapExtensions } from "./extension";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";

const Editor = ({ post }: { post: any }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(JSON.parse(post.content));
  const [saveStatus, setSaveStatus] = useState("saved");

  const router = useRouter();

  const editor = useEditor({
    content: content,
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("typing...");
      debouncedUpdates(e);
    },
  });

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor?.getJSON();
    setContent(json);
    try {
      await updatePostConent(json);
    } catch (error) {
      console.log(error);
    }
  }, 700);

  async function updatePostConent(content: string) {
    setSaveStatus("saving...");

    const response = await fetch(`/api/post/${post.postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setSaveStatus("saved");

    router.refresh();
  }

  async function updatePostTitle(updatedTitle: string) {
    setSaveStatus("saving...");

    const response = await fetch(`/api/post/${post.postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedTitle,
        content,
      }),
    });

    setSaveStatus("saved");

    router.refresh();
  }

  const debouncedTitleUpdate = useDebouncedCallback(updatePostTitle, 700);

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSaveStatus("typing...");
    setTitle(event.target.value);
    debouncedTitleUpdate(event.target.value);
  };

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg  p-12">
      <div className="absolute right-0 top-0 rounded-lg bg-gray-100 px-2 py-1 text-sm text-gray-400">
        {saveStatus}
      </div>
      <TextareaAutosize
        value={title}
        onChange={handleTitleChange}
        className="w-full text-5xl font-bold focus:outline-none overflow-hidden resize-none"
        placeholder="Enter title"
      />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
