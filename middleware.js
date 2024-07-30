// app/middleware.js
import { NextResponse } from 'next/server';
import { createSessionClient } from "@/lib/appwrite.config";

export async function middleware(request) {
    const { account } = await createSessionClient(request);
    console.log(request);
    try {
       const user =  await account.get();
       console.log("HERE TIME HEREIN OTHER TIMED",user)
        // If the user is authenticated, continue
        return NextResponse.next();
    } catch (error) {
        // If the user is not authenticated, redirect to the login page
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

// Configure the matcher to apply the middleware to the appropriate routes
export const config = {
    matcher: ['/patient/:id/register'], // Apply middleware to the home page and other protected routes
};
