import { LogoutBtn } from "@/components/LogoutButton";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div>
        <LogoutBtn />
      </div>
    </main>
  );
}
