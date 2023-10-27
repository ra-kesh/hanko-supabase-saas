import { Icons } from "@/components/Icons.component";
import { Avatar, AvatarFallback } from "@/components/avatar/Avatar.component";
import React from "react";

const UserAvatar = ({ userName }: { userName: string | null | undefined }) => {
  return (
    <Avatar>
      <AvatarFallback>
        {userName ? userName.charAt(0).toLocaleUpperCase() : <Icons.user />}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
