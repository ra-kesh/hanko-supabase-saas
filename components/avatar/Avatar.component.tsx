import * as AvatarPrimitive from "@radix-ui/react-avatar";

const Avatar = ({ ...props }) => {
  return (
    <AvatarPrimitive.Root
      className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
      {...props}
    />
  );
};

const AvatarFallback = ({ ...props }) => {
  return (
    <AvatarPrimitive.Fallback
      className="flex h-full w-full items-center justify-center rounded-full border "
      {...props}
    />
  );
};

export { Avatar, AvatarFallback };
