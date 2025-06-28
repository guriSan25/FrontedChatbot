'use client';

import { useState } from 'react';
import styles from './login.module.css';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

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

    if (value.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'La contraseña debe tener al menos 6 caracteres' }));
    } else {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
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
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          className={styles.loginInput}
        />
        {errors.username && <p className={styles.errorText}>{errors.username}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className={styles.loginInput}
        />
        {errors.password && <p className={styles.errorText}>{errors.password}</p>}

        <button type="submit" className={styles.loginButton}>Login</button>
      </form>
    </div>
  );
}