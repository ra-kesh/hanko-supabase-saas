import { buttonVariants } from "@/components/button/Button.component";
import Footer from "@/components/footer/Footer.component";
import MainNav from "@/components/nav/MainNav.component";
import { cn } from "@/lib/utils";
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
          <MainNav />
          <nav>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
