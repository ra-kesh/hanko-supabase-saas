"use client";

import MainNav from "@/components/nav/MainNav.component";
import UserAccountnav from "@/components/nav/UserAccountNav.component";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { User } from "@prisma/client";

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUserDetails() {
      const response = await fetch("/api/user");

      if (!response.ok) {
        toast.error("could not fetch user details");
      }

      const { user } = await response.json();

      setUser(user ?? null);
    }
    getUserDetails();
  }, []);

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-20 border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserAccountnav user={user} />
        </div>
      </header>
      <div className="container mx-auto ">
        <main>{children}</main>
      </div>
    </div>
  );
}
