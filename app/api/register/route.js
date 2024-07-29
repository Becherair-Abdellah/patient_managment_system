import { cookies } from "next/headers";
import { register } from "@/lib/actions/register-actions";
export async function POST(request) {
try {
  const data = await request.json();
  const user = await register(data);
  cookies().set("session", user.secret, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(user.expire),
    path: "/",
  });
  return Response.json(user);
} catch (error) {
  return Response.json('');
  
}
}
