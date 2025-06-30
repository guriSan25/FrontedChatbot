"use client";

import { useEffect, useState } from 'react';
import styles from './navbar.module.css';
import { FaRegComments, FaPen, FaShieldAlt } from "react-icons/fa";
import Conversation from '@/domain/entities/Conversations';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  
  const [conversations,setConversations] = useState<Conversation[]>([]);
  const router = useRouter();

  useEffect(() => {

    const fetchConversations = async () => {
      try {
        const response = await fetch('/api/conversations');
        if (!response.ok) throw new Error('Error al obtener conversaciones');
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchConversations();

  },[])

  const goToChat = (chatId: number) => {
    router.push(`/chat/${chatId}`);
  }

  const createNewChat = () => {
    router.push('/chat/new');
  }

  return (
    <>
      <aside className={styles.navbar}>
        <div className={styles.logo}>
          <FaRegComments size={28} />
          <h1 className="font-bold text-xl">CHAPI</h1>
        </div>

        <button className={styles.newChatButton} onClick={createNewChat}>
          <FaPen size={24} />
          <span>Nuevo Chat</span>
        </button>

        <hr className="border-gray-700 mb-6" />

        <nav className={styles.chatList}>
          {conversations.map((chat, i) => (
            <button key={i} className={styles.chatItem} onClick={() => {
              goToChat(chat.id);
            }}>
              <FaRegComments size={20} />
              <span>{chat.title}</span>
            </button>
          ))}
        </nav>

        <div className={styles.premiumBox}>
          <FaShieldAlt size={26} className="mx-auto mb-1" />
          <p>Acceder al plan premium<br />¡Usa la IA sin límite!</p>
        </div>
      </aside>
    </>
  );
}
