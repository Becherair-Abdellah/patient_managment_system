import { createSessionClient } from "@/lib/appwrite.config";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const { account } = await createSessionClient(request);
        const session = request.cookies.get('session');

        if (session) {
            await account.deleteSession('current');

            // Clear the session cookie
            cookies().set('session', '', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: -1, // Setting maxAge to -1 will expire the cookie immediately
                path: '/'
            });

            return new Response(JSON.stringify({ msg: 'Logout successful' }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({ error: 'No session found' }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        console.error("Logout error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
