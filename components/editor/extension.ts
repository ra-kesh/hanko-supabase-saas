import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { SlashCommand } from "./SlashCommand";

export const TiptapExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc list-outside leading-3",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal list-outside leading-3",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "border-l-4 border-gray-300 pl-4",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-md bg-muted p-5 font-mono font-medium text-gray-800",
      },
    },
    code: {
      HTMLAttributes: {
        class:
          "rounded-md bg-muted px-1.5 py-1 font-mono font-medium text-black",
      },
    },
  }),
  Placeholder.configure({
    placeholder: "use mdx or press '/' for commands",
  }),
  SlashCommand,
];
