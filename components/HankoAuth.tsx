"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, Hanko } from "@teamhanko/hanko-elements";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL || "";

export default function HankoAuth() {
  const router = useRouter();

  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    register(hankoApi).catch((error) => {
      console.error("Hanko registration error", error);
    });
  }, []);

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi))
    );
  }, []);

  const redirectAfterLogin = useCallback(
    (user: any) => {
      let redirectURL;

      if (!user) {
        redirectURL = "/login";
      } else if (!user.name) {
        redirectURL = "/dashboard/profile";
      } else {
        redirectURL = "/dashboard";
      }

      router.replace(redirectURL);
    },
    [router]
  );

  useEffect(
    () =>
      hanko?.onAuthFlowCompleted(async () => {
        try {
          const { id, email } = await hanko.user.getCurrent();

          const { user } = await createUserOnDB(id, email);

          redirectAfterLogin(user);
        } catch (error) {
          console.error(error);
        }
      }),
    [hanko, redirectAfterLogin]
  );

  return <hanko-auth />;
}

const createUserOnDB = async (id: string, email: string) => {
  const response = await fetch(`/api/user`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      email,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.error("User creation failed");
    return null;
  }
};
