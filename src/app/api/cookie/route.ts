import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const cookie = JSON.parse(cookieStore.get('auth_token')?.value || "{token: '', userId: ''}"); // Default to empty token if not set
  return Response.json({ cookie: cookie.token, userId: cookie.userId });
}


export async function DELETE() {
    const cookieStore = await cookies();
    
    try {
      // Get and parse the auth token cookie
      const authCookie = cookieStore.get('auth_token')?.value;
      const parsedCookie = authCookie 
        ? JSON.parse(authCookie) 
        : { token: '', userId: '' };
  
      // Delete the cookie with proper attributes
      cookieStore.set('auth_token', '', {
        path: '/',
        expires: new Date(0), // Set to past date to expire immediately
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
  
      return NextResponse.json({ 
        success: true,
        message: 'Logged out successfully',
        userId: parsedCookie.userId 
      });
  
    } catch (error) {
      return NextResponse.json(
        { success: false, error: 'Failed to process logout' },
        { status: 500 }
      );
    }
  }
