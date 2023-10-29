// @ts-nocheck

import { Extension } from "@tiptap/react";
import { ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  TextQuote,
} from "lucide-react";
import { useCallback } from "react";
import tippy from "tippy.js";

const Command = Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({ editor, range, props }) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

const getSuggestionItems = () => {
  return [
    {
      title: "Heading 1",
      icon: <Heading1 />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      title: "Heading 2",
      icon: <Heading2 />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      title: "Heading 3",
      icon: <Heading3 />,
      command: ({ editor, range }) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      title: "Bold",
      icon: <Bold />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("bold").run();
      },
    },
    {
      title: "Italic",
      icon: <Italic />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).setMark("italic").run();
      },
    },
    {
      title: "Unordered List",
      icon: <List />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: "Ordered List",
      icon: <ListOrdered />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: "Quote",
      icon: <TextQuote />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleBlockquote().run();
      },
    },
    {
      title: "Code",
      icon: <Code size={18} />,
      command: ({ editor, range }) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
  ];
};

const CommandList = ({ items, command, editor, range }) => {
  const selectItem = useCallback(
    (index) => {
      const item = items[index];
      if (item) {
        command(item);
      }
    },
    [command, items]
  );

  return items.length > 0 ? (
    <div className="h-auto max-h-[300px] w-72 overflow-auto rounded-md border bg-background p-2 shadow-md">
      {items.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => selectItem(index)}
            className="flex w-full items-center space-x-2 rounded-md p-2 text-left text-sm hover:bg-stone-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-background">
              {item.icon}
            </div>
            <div>
              <p>{item.title}</p>
              <p>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};

const renderItems = () => {
  let component;
  let popup;

  return {
    onStart: (props) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      });

      popup: tippy(document.body, {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: "manual",
        placement: "bottom-start",
      });
    },
    onUpdate(props) {
      component.updateProps(props);

      popup &&
        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
    },
    onkeydown(props) {
      if (props.event.key === "Escape") {
        popup[0].hide();
        return true;
      }

      return component.ref?.onKeyDown(props);
    },

    onExit() {
      popup && popup[0].destroy();
      component?.destroy();
    },
  };
};

export const SlashCommand = Command.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
});
