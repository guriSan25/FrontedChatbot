'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // 1. Verificar si existe el token
    const token = localStorage.getItem('authToken') || 
                  document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    
    // 2. Si no hay token, redirigir al login
    if (!token) {
      router.push('/login?error=no_token');
    }
  }, []);

  // 3. Mostrar contenido solo si hay token
  return <>{children}</>;
}