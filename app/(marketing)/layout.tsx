import Link from "next/link";
import { ReactNode } from "react";

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col ">
      <header className="container z-40 mx-auto">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10">
            <Link className="hidden items-center space-x-2 md:flex" href="">
              logo
            </Link>
            <span className="hidden font-bold sm:inline-block">name</span>
          </div>
          <nav>
            <Link href="/login">Login</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto">{children}</main>
      <footer className="">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 mx-auto">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            logo
          </div>
          <p>Built by rakesh . source code can be found here on github</p>
        </div>
      </footer>
    </div>
  );
}
