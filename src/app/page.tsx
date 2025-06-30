"use client";

import Head from 'next/head';
import { FiMessageSquare, FiClock, FiShield, FiZap, FiSun, FiMoon } from 'react-icons/fi';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';

export const translations = {
  es: {
    title: "Chapi, tu asistente inteligente 24/7",
    description: "Una experiencia conversacional fluida, rápida y segura para tus necesidades",
    login: "Iniciar sesión",
    register: "Registrarse",
    available: "Disponible 24/7",
    naturalLanguage: "Lenguaje natural",
    security: "Seguridad garantizada",
    fastResponses: "Respuestas rápidas",
    whyChooseChapi: "Por qué elegir Chapi",
    getStarted: "¿Listo para comenzar?",
    startNow: "Comenzar ahora",
    registedNow: "Regístrate ahora y descubre cómo Chapi puede simplificar tu vida.",
    footerText: "© Todos los derechos reservados.",
  },
  en: {
    title: "Chapi, your 24/7 smart assistant",
    description: "A fluid, fast and secure conversational experience for your needs",
    login: "Login",
    register: "Sign up",
    available: "Available 24/7",
    naturalLanguage: "Natural language",
    security: "Guaranteed security",
    fastResponses: "Fast responses",
    whyChooseChapi: "Why choose Chapi",
    getStarted: "Ready to get started?",
    registedNow: "Register now and discover how Chapi can simplify your life.",
    startNow: "Start now",
  }
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('es'); // Idioma por defecto

  useEffect(() => {
    // Comprobar preferencia del sistema o localStorage al cargar
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                  (!('darkMode' in localStorage) && 
                  window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);

  }, []);

  useEffect(() => {
    // Aplicar cambios al toggle
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'));
  }

  const router = useRouter();
  const goToLogin = () => {
    router.push('/auth/login');
  }

  const goToRegister = () => {
    router.push('/auth/register');
  };


  return (
    <>
      <Head>
        <title>Chapi - Tu Asistente Inteligente 24/7</title>
        <meta name="description" content="Una experiencia conversacional fluida, rápida y segura para tus necesidades" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 backdrop-blur-sm shadow-sm dark:shadow-gray-800">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Chapi</div>
            <nav className="flex items-center space-x-4">
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
              </button>
              <button onClick={toggleLanguage} className="px-4 py-2 rounded-xl text-amber-600 dark:text-amber-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {language === 'es' ? 'Español' : 'English'}
              </button>
              <button onClick={goToLogin} className="px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Login
              </button>

              <button onClick={goToRegister} className="px-4 py-2 rounded-xl bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                Registrarse
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex items-center">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                    {translations[language as keyof typeof translations].title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    {translations[language as keyof typeof translations].description}
                </p>
                <button onClick={goToLogin} className="px-8 py-4 rounded-xl bg-blue-600 dark:bg-blue-500 text-white text-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl dark:shadow-blue-500/20">
                  {translations[language as keyof typeof translations].login}
                </button>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30 rounded-3xl p-8 aspect-square flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
                    <div className="relative flex items-center justify-center h-full">
                      <img src="https://msmk.university/wp-content/uploads/2024/11/imagen-de-inteligencia-artificial.webp" alt="Chatbot Illustration" className="w-full h-full object-cover rounded-3xl shadow-lg dark:shadow-blue-500/20 transition-transform transform hover:scale-105" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800/30 transition-colors duration-300">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
              {translations[language as keyof typeof translations].whyChooseChapi}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md dark:shadow-gray-700/50 dark:hover:shadow-gray-700/70 transition-all">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4">
                  <FiClock className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{translations[language as keyof typeof translations].available}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Asistencia siempre disponible cuando la necesites, sin horarios ni esperas.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md dark:shadow-gray-700/50 dark:hover:shadow-gray-700/70 transition-all">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4">
                  <FiMessageSquare className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{translations[language as keyof typeof translations].naturalLanguage}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Conversaciones fluidas con comprensión avanzada del lenguaje humano.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md dark:shadow-gray-700/50 dark:hover:shadow-gray-700/70 transition-all">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4">
                  <FiShield className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{translations[language as keyof typeof translations].security}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Tus datos siempre protegidos con encriptación de última generación.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md dark:shadow-gray-700/50 dark:hover:shadow-gray-700/70 transition-all">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4">
                  <FiZap className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{translations[language as keyof typeof translations].fastResponses}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Tecnología optimizada para brindarte soluciones en segundos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 dark:bg-blue-700 text-white transition-colors duration-300">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <p className="text-xl mb-8 max-w-2xl mx-auto">
             {translations[language as keyof typeof translations].registedNow}
            </p>
            <button className="px-8 py-4 rounded-xl bg-white dark:bg-gray-100 text-blue-600 dark:text-blue-700 text-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors shadow-lg hover:shadow-xl">
              {translations[language as keyof typeof translations].getStarted}
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-white mb-2">Chapi</div>
              <p className="text-gray-400">© {new Date().getFullYear()} Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}