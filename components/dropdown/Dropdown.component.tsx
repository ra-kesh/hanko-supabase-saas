"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuContent = ({ ...props }) => {
  return (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        className="z-50 min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md"
        {...props}
      />
    </DropdownMenuPortal>
  );
};

const DropdownMenuItem = ({ ...props }) => {
  return (
    <DropdownMenuPrimitive.Item
      className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none"
      {...props}
    />
  );
};

const DropdownMenuSeparator = ({ ...props }) => {
  return (
    <DropdownMenuPrimitive.Separator className="-mx-1 my-1 h-px " {...props} />
  );
};

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
};
