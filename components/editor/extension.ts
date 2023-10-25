import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export const TiptapExtensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "Write something...",
  }),
];
