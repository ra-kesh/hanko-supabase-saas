"use client";

import { LogoutBtn } from "@/components/LogoutButton";
import { Hanko } from "@teamhanko/hanko-elements";
import { useEffect, useState } from "react";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL as string;
const hanko = new Hanko(hankoApi);

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    async function getEmailFromHanko() {
      const { email } = await hanko.user.getCurrent();
      setEmail(email);
    }
    getEmailFromHanko();
  }, []);

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetch(`/api/user`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border w-full"
              />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border w-full"
              />
            </div>
            <button type="submit" className="border px-5 pl-3">
              Submit
            </button>
            <LogoutBtn />
          </div>
        </form>
      </div>
    </main>
  );
}
