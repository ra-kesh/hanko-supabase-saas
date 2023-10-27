import { notFound } from "next/navigation";
import { userId } from "../api/user/route";
import { LogoutBtn } from "@/components/hanko/LogoutButton";
import MainNav from "@/components/nav/MainNav.component";

export default async function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const userID = await userId();

  if (!userID) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-20 border-b">
        <div className="container mx-auto flex h-16 items-center justify-between py-4">
          <MainNav />
          <LogoutBtn />
        </div>
      </header>
      <div className="container mx-auto">
        <main>{children}</main>
      </div>
    </div>
  );
}
