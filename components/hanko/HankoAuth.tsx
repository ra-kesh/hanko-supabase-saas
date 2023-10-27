"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, Hanko } from "@teamhanko/hanko-elements";
import { User } from "@prisma/client";
import { toast } from "sonner";

const hankoApi = process.env.NEXT_PUBLIC_HANKO_API_URL || "";

export default function HankoAuth() {
  const router = useRouter();

  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    register(hankoApi).catch((error) => {
      toast.error("Hanko registration error", error);
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

      toast.success("you have logged in successfully");
    },
    [router]
  );

  useEffect(
    () =>
      hanko?.onAuthFlowCompleted(async () => {
        const { id, email } = await hanko.user.getCurrent();

        const user = await getUserFromDB(id, email);

        redirectAfterLogin(user);
      }),
    [hanko, redirectAfterLogin]
  );

  return <hanko-auth />;
}

const getUserFromDB = async (
  id: string,
  email: string
): Promise<User | void> => {
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

  if (!response.ok) {
    throw new Error("could not get user");
  }

  const { user } = await response.json();

  return user;
};
