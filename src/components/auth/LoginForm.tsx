'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';
import styles from './login.module.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if (value.trim() === '') {
      setErrors((prev) => ({ ...prev, username: 'El nombre de usuario es obligatorio' }));
    } else {
      setErrors((prev) => ({ ...prev, username: undefined }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  
    if (value.trim() === '') {
      setErrors((prev) => ({ ...prev, password: 'La contraseña es obligatoria' }));
    } else {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payload: {username, password} , action: "login" })
    })

    if (!response.ok) {
      setServerError("Error al iniciar sesión. Por favor, verifica tus credenciales."); 
      return;
    }
    
    console.log("Datos del login: " + await response.json());
    

    if (response.ok) {
      router.push('/chat/new'); // Redirigir al home si el login es exitoso
    }
  };

  return (
    <div className={styles.loginBackground}>
      {/* Figuras azules generadas con CSS */}
      <div className={styles.blueShape1}></div>
      <div className={styles.blueShape2}></div>
      <div className={styles.blueShape3}></div>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Login</h2>

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={handleUsernameChange}
          className={styles.loginInput}
        />
        {errors.username && <p className={styles.errorText}>{errors.username}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={handlePasswordChange}
          className={styles.loginInput}
        />
        {errors.password && <p className={styles.errorText}>{errors.password}</p>}

        {serverError && <p className={styles.errorText}>{serverError}</p>}

        <button type="submit" className={styles.loginButton}>Acceder</button>

        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <span>¿No tiene una cuenta? </span>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => router.push('/auth/register')}
            style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          >
            Regístrate
          </button>
        </div>
      </form>
    </div>
  );
}