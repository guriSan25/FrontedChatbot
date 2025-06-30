'use client';

import { useState } from 'react';
import styles from './login.module.css';
import User from '@/domain/entities/User';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const [user, setUser] = useState<Omit<User, 'id'>>({
    username: '',
    full_name: '',
    dateofBirth: new Date(),
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<{
    username?: string;
    full_name?: string;
    dateOfBirth?: string;
    email?: string;
    password?: string;
  }>({});

  const toLocalISODate = (date: Date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    if (!dateString) {
      setUser(prev => ({ ...prev, dateofBirth: new Date() }));
      return;
    }
    
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    
    setUser(prev => ({ 
      ...prev, 
      dateofBirth: date 
    }));
    
    validateField('dateOfBirth', dateString);
  };

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'username':
        setErrors(prev => ({
          ...prev,
          username: value.trim() === '' ? 'El nombre de usuario es obligatorio' : undefined
        }));
        break;
      case 'full_name':
        setErrors(prev => ({
          ...prev,
          full_name: value.trim() === '' ? 'El nombre completo es obligatorio' : undefined
        }));
        break;
      case 'email':
        setErrors(prev => ({
          ...prev,
          email: !/^\S+@\S+\.\S+$/.test(value) ? 'Ingrese un email válido' : undefined
        }));
        break;
      case 'password':
        setErrors(prev => ({
          ...prev,
          password: value.length < 6 ? 'La contraseña debe tener al menos 6 caracteres' : undefined
        }));
        break;
      case 'dateOfBirth':
        setErrors(prev => ({
          ...prev,
          dateOfBirth: !value ? 'La fecha de nacimiento es obligatoria' : undefined
        }));
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: "register",
        payload: user
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al registrar usuario:', errorData);
      return;
    }
    alert('Debe hacer login para comenzar ha usar el chat')
    router.push('/auth/login');
  };

  return (
    <div className={styles.loginBackground}>
      {}
      <div className={styles.blueShape1}></div>
      <div className={styles.blueShape2}></div>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Registro</h2>

        {}
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={user.username}
          onChange={handleChange}
          className={styles.loginInput}
        />
        {errors.username && <p className={styles.errorText}>{errors.username}</p>}

        {}
        <input
          type="text"
          name="full_name"
          placeholder="Nombre completo"
          value={user.full_name}
          onChange={handleChange}
          className={styles.loginInput}
        />
        {errors.full_name && <p className={styles.errorText}>{errors.full_name}</p>}

        {}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className={styles.loginInput}
        />
        {errors.email && <p className={styles.errorText}>{errors.email}</p>}

        {}
        <input
          type="date"
          name="dateofBirth"
          value={user.dateofBirth.toISOString().split('T')[0]}
          onChange={handleDateChange}
          className={styles.loginInput}
        />
        {errors.dateOfBirth && <p className={styles.errorText}>{errors.dateOfBirth}</p>}

        {}
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={user.password}
          onChange={handleChange}
          className={styles.loginInput}
        />
        {errors.password && <p className={styles.errorText}>{errors.password}</p>}

        <button type="submit" className={styles.loginButton}>
          Registrarse
        </button>
      </form>
    </div>
  );
}