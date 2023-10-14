import Link from "next/link";
import { LogoutBtn } from "@/components/LogoutButton";
import { useUserId } from "./hooks/useUserId";

export default async function Home() {
  const userID = await useUserId();

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      {userID ? (
        <>
          <LogoutBtn />
        </>
      ) : (
        <Link href="/login"> Login </Link>
      )}
    </main>
  );
}
