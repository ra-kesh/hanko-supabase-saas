import { EditorProps } from "@tiptap/pm/view";

export const TiptapEditorProps: EditorProps = {
  attributes: {
    class:
      "prose-lg prose-headings:font-vercel font-default focus:outline-none",
  },
  handleDOMEvents: {
    keydown: (_view, event) => {
      return event.key === "Enter";
    },
  },
};
