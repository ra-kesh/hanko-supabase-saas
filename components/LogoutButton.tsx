"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Hanko } from "@teamhanko/hanko-elements";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL as string;

export function LogoutBtn() {
  const router = useRouter();
  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi ?? ""))
    );
  }, []);

  hanko?.onUserLoggedOut(() => {
    router.push("/login");
  });

  const logout = async () => await hanko?.user.logout();

  return <button onClick={logout}>Logout</button>;
}
