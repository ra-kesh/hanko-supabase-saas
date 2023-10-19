import { notFound } from "next/navigation";
import { userId } from "../api/user/route";

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
        <div className="container flex h-16 items-center justify-between py-4">
          <h1>Something</h1>
          <p>{userID}</p>
        </div>
      </header>
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
}
