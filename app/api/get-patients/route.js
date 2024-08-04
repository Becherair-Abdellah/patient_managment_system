import { cookies } from "next/headers";
import { login } from "@/lib/actions/login-action";
import { getAccount } from "@/lib/actions/register-actions";
import { getPatients } from "@/lib/actions/dashboard-actions";

export async function GET(request) {
try {
  const patients = await getPatients();
  return Response.json(patients);
} catch (error) {
  return Response.json('');
}
}
