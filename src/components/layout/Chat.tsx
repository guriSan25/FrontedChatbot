"use client";

import Message from "@/domain/entities/Message";
import { useEffect, useState } from "react";
import MessageComponent from "./MessageComponent";
import styles from './layout.module.css';

import { useParams } from "next/navigation";

function Chat({refreshTrigger} : {refreshTrigger: number}) {

    const [messages, setMessages] = useState<Message[]>([]);
    const params = useParams();

    useEffect(() => {

        const fetchMessages = async () => {
            try {
            
                console.log("probando a obtener mensajes");
                
                
                const conversationId = params.id; // Asegúrate de que estás obteniendo el ID de conversación correctamente
                console.log('Fetching messages for conversation ID:', conversationId);
                
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

    
    return (
        <div className="flex flex-col gap-4 justify-start mt-24 w-full overflow-y-scroll max-h-10/12  text-white">
            {
                messages.length > 0 ? (
                    messages.map((message, index) => (
                        <MessageComponent key={index} content={message.content} is_bot={message.is_bot} username="admin"/>
                    ))
                ) :  <div className="flex-grow flex items-center justify-center text-center">
                <h2 className={`${styles.textShadowWhite} text-6xl font-extrabold max-w-full`}>
                  Bienvenido Sebastián,<br />
                  ¿Qué idea tienes hoy?
                </h2>
              </div>
            }
        </div>
    );
    

}

export default Chat;