// app/middleware.js
import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/appwrite.config";

export async function middleware(request) {
    console.log('RED TIME FOR ALLS');
}

// Configure the matcher to apply the middleware to the appropriate routes

export const config = {
  matcher: [""], // Apply middleware to the home page and other protected routes
};
