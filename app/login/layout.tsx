import MainNav from "@/components/nav/MainNav.component";
import { ReactNode } from "react";

export default async function LoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="container fixed">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav />
        </div>
      </header>
      <main className="flex-1 mx-auto">{children}</main>
    </div>
  );
}
