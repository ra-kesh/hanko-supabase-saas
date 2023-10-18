import { cookies } from "next/headers";
import * as jose from "jose";

export async function useUserId() {
  const token = cookies().get("hanko")?.value;

  if (!token) {
    return null;
  } else {
    const payload = jose.decodeJwt(token);

    const userID = payload.sub;

    return userID;
  }
}
