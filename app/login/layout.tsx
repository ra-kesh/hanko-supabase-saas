import Link from "next/link";
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
          <div className="flex gap-6 md:gap-10">
            <Link className="hidden items-center space-x-2 md:flex" href="">
              logo
            </Link>
            <span className="hidden font-bold sm:inline-block">name</span>
          </div>
          {/* <nav>
            <Link href="/login">Login</Link>
          </nav> */}
        </div>
      </header>
      <main className="flex-1 mx-auto">{children}</main>
    </div>
  );
}
