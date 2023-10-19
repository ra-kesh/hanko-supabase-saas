"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { TiptapEditorProps } from "./props";
import { TiptapExtensions } from "./extension";
import { useRouter } from "next/navigation";

const Editor = ({ post }) => {
  const [title, setTitle] = useState(post.title);
  const [saveStatus, setSaveStatus] = useState("saved");
  const [hydrated, setHydrated] = useState(false);

  const router = useRouter();

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("typing...");
      debouncedUpdates(e);
    },
  });

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

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor?.getJSON();
    try {
      await updatePostConent(json);
    } catch (error) {
      console.log(error);
    }
  }, 700);

  // useEffect(() => {
  //   const saveInterval = setInterval(() => {
  //     debouncedUpdates({ editor });
  //   }, 1 * 60 * 1000);

  //   return () => {
  //     clearInterval(saveInterval);
  //   };
  // }, [debouncedUpdates]);

  useEffect(() => {
    if (editor && post && !hydrated) {
      editor.commands.setContent(JSON.parse(post.content));
      editor.commands.focus("end");
      setHydrated(true);
    }
  }, [editor, post, hydrated]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg  p-12">
      <textarea
        value={title}
        onChange={handleTitleChange}
        className="w-full rounded-md mb-2 focus:outline-none"
        placeholder="Enter the title"
      />
      <EditorContent editor={editor} />
      <div className="absolute right-5 bottom-5 rounded-lg bg-gray-100 px-2 py-1 text-sm text-gray-400">
        {saveStatus}
      </div>
    </div>
  );
};

export default Editor;
