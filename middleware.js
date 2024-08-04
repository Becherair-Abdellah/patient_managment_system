// app/middleware.js
import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/appwrite.config";
import { getPatients } from "./lib/actions/dashboard-actions";



// let r=true;
export async function middleware(request) {
  const { account } = await createSessionClient(request);
  
  try {
    const user = await account.get();
    console.log("HERE TIME HEREIN OTHER TIMED", user);
    //    labels
    // Router.push();
    //                                                                                                                          DDC
    return NextResponse.next();
    //  return NextResponse.redirect(new URL('/login?admin=true', request.url));
    // If the user is authenticated, continue
  } catch (error) {
    // If the user is not authenticated, redirect to the login page
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Configure the matcher to apply the middleware to the appropriate routes

export const config = {
  matcher: ["/patient/:id/register","/patient/:id/appointment/:id/" ,"/admin/:path*"], // Apply middleware to the home page and other protected routes
};
