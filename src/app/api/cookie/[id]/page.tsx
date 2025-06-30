import { cookies } from 'next/headers';

export async function DELETE() {
    const cookieStore = await cookies();
    const cookie = JSON.parse(cookieStore.get('auth_token')?.value || "{token: '', userId: ''}"); // Default to empty token if not set
    cookieStore.delete('auth_token'); // Elimina la cookie de autenticación
    return Response.json({ cookie: cookie.token, userId: cookie.userId });
  }
  
  