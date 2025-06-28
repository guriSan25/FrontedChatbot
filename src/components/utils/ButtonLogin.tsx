import { ButtonHTMLAttributes } from 'react';

type ButtonLoginProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function ButtonLogin({ className = '', ...props }: ButtonLoginProps) {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${className}`}
      {...props}
    />
  );
}