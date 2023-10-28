"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown/Dropdown.component";
import Link from "next/link";
import { LogoutBtn } from "../hanko/LogoutButton";
import UserAvatar from "@/app/dashboard/components/UserAvatar";
import { User } from "@prisma/client";

const UserAccountnav = ({ user }: { user: User | null }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar userName={user?.name} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1">
            <p className="font-medium">{user?.name}</p>
            <p className="truncate text-sm">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountnav;
