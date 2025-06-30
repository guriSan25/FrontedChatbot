"use client";

import { useState } from 'react';
import Chat from './Chat';
import styles from './layout.module.css';
import SettingsMenu from './SettingsMenu';  // importa el menú
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function MainContent() {

  const params = useParams();
  const router = useRouter();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget as HTMLFormElement);
    
  
    const content = form.get('content') as string;
    const conversationId = params.id; 
    
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content, // Obtiene el valor del input
        is_bot: false, // Puedes cambiar esto según tu lógica
        conversation_id: conversationId, // Cambia esto según tu lógica
      }),
    })


    const data = await response.json();
    if (data.success && location.pathname === '/chat/new') {
      router.push(`/chat/${data.conversationId}`);
    }

    if (!response.ok) {
      console.error('Error al enviar el mensaje');
      return;
    }

        
    setRefreshTrigger(prev => prev + 1); // Dispara la recarga
    
  }


  return (
    <main className="relative flex flex-col justify-between items-center gap-8 flex-grow p-8 bg-[#121417] text-white max-w-full mx-auto min-h-screen">
      
      {/* Botón menú en esquina derecha arriba */}
      <div className="absolute top-4 right-4 z-50">
        <SettingsMenu />
      </div>

      <Chat refreshTrigger={refreshTrigger}/>

     

      <form className={styles.formCentered} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe lo que necesites..."
          required
          name='content'
          className={`${styles.inputBig} flex-grow font-semibold rounded-full bg-transparent`}
        />

        <button
          type="submit"
          className="ml-10 bg-gray-700 hover:bg-gray-600 p-4 rounded-full transition-colors duration-300 shadow-md"
          aria-label="Enviar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 10l7-7 7 7M12 3v18" />
          </svg>
        </button>
      </form>
    </main>
  );
}
