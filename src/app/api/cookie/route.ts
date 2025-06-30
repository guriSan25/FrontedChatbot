import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const cookie = JSON.parse(cookieStore.get('auth_token')?.value || "{token: '', userId: ''}"); // Default to empty token if not set
  return Response.json({ cookie: cookie.token, userId: cookie.userId });
}