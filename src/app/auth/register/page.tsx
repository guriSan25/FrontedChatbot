// src/app/register/page.tsx
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#1A1B1F] grid place-items-center p-4">
      <RegisterForm />
    </div>
  );
}