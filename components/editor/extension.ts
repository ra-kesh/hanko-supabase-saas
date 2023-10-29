import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { SlashCommand } from "./SlashCommand";

export const TiptapExtensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: "press '/' for commands",
  }),
  SlashCommand,
];
