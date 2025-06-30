"use client";

import Message from "@/domain/entities/Message";
import { useEffect, useRef, useState } from "react";
import MessageComponent from "./MessageComponent";
import styles from './layout.module.css';

import { useParams } from "next/navigation";

function Chat({refreshTrigger} : {refreshTrigger: number}) {

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const params = useParams();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

    useEffect(() => {

        const fetchMessages = async () => {
            try {
            
                console.log("probando a obtener mensajes");
                
                
                const conversationId = params.id; // Asegúrate de que estás obteniendo el ID de conversación correctamente

                const response = await fetch(`/api/messages/${conversationId}`); // Asegúrate de que el endpoint sea correcto
                if (!response.ok) throw new Error('Error al obtener mensajes');
                const data = await response.json();
                setMessages(data);
                
                
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

    },[params.conversationId, refreshTrigger]); // Dependencia añadida para que se vuelva a ejecutar cuando isSendMessage cambie

    useEffect(() => {
        scrollToBottom();
      }, [messages]); // Se activa cada vez que 'messages' cambie
    
      return (
        <div className="flex flex-col gap-4 justify-start mt-24 w-full overflow-y-auto max-h-[calc(100vh-10rem)] text-white">
          {messages.length > 0 ? (
            <>
              {messages.map((message, index) => (
                <MessageComponent 
                  key={index} 
                  content={message.content} 
                  is_bot={message.is_bot} 
                  username="admin"
                />
              ))}
              {/* Elemento invisible para el scroll */}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="flex-grow flex items-center justify-center text-center">
              <h2 className={`${styles.textShadowWhite} text-xl font-extrabold max-w-full`}>
                Bienvenido a CHAPI,<br />
                ¿Qué idea tienes hoy?
              </h2>
            </div>
          )}
        </div>
      );
    

}

export default Chat;