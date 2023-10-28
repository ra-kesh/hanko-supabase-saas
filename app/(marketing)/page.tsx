import { Icons } from "@/components/Icons.component";
import { buttonVariants } from "@/components/button/Button.component";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-40">
        <div className="container flex max-w-[64rem] flex-col items-center gap-16 text-center">
          <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl ">
            An open source app built using Hanko,Supabase and Next.js 14 App
            router.
          </h1>
          <div className="space-x-4">
            <Link
              href="/login"
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              Get Started
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.github}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Github
            </Link>
          </div>
        </div>
      </section>

      <section className="container space-y-6 py-8 md:py-12 lg:py-40 ">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-bold text-3xl sm:text-3xl md:text-6xl">
            Tech Stack
          </h2>
          <p className="sm:text-lg text-muted-foreground">
            List of all the technologies that are being used currently
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem]">
          <div className="relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[100px] gap-4 rounded-md p-6">
              <Icons.hanko />
              <div>
                <h3 className="font-bold">Hanko</h3>
                <p className="text-sm text-muted-foreground">
                  for passwordless authentication.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[100px] gap-4 rounded-md p-6">
              <Icons.supabase />
              <div>
                <h3 className="font-bold">Supabase </h3>
                <p className="text-sm text-muted-foreground">
                  for postgres database.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[100px] gap-4 rounded-md p-6">
              <Icons.next />
              <div>
                <h3 className="font-bold">Next.js 13</h3>
                <p className="text-sm text-muted-foreground">
                  For routing, layouts, and api routes.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border p-2">
            <div className="flex h-[100px] gap-4 rounded-md p-6">
              <Icons.tailwind />
              <div>
                <h3 className="font-bold">Tailwind</h3>
                <p className="text-sm text-muted-foreground">
                  for styling components
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
