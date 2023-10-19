import useLocalStorage from "@/lib/useLocalStorage";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const Editor = () => {
  const [content, setContent] = useLocalStorage("content", []);
  const [saveStatus, setSaveStatus] = useState("saved");
  const [hydrated, setHydrated] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: (e) => {
      setSaveStatus("typing...");
      debouncedUpdates(e);
    },
  });

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor?.getJSON();
    setSaveStatus("saving...");
    setContent(json);
    setTimeout(() => {
      setSaveStatus("saved");
    }, 500);
  }, 700);

  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content);
      setHydrated(true);
    }
  }, [editor, content, hydrated]);

  return (
    <div className="relative min-h-[500px] w-full max-w-screen-lg border-gray-200 p-12 sm:rounded-lg sm:border sm:shadow-lg">
      <EditorContent editor={editor} />
      <div className="absolute right-5 bottom-5 rounded-lg bg-gray-100 px-2 py-1 text-sm text-gray-400">
        {saveStatus}
      </div>
    </div>
  );
};

export default Editor;
