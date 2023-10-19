import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-gray-200 p-12 sm:rounded-lg sm:border sm:shadow-lg">
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
