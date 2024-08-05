import { cookies } from "next/headers";
import { login } from "@/lib/actions/login-action";
import { getAccount } from "@/lib/actions/register-actions";

export async function POST(request) {
try {
  const data = await request.json();
  const user = await login(data);
  cookies().set("session", user.secret, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(user.expire),
    path: "/",
  });
  return Response.json(user);
} catch (error) {
  return Response.json({"error":error});
}
}
