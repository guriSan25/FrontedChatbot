import Conversation from "@/domain/entities/Conversations";
import ConversationRepository from "@/domain/repositories/conversationRepository";

import https from "https";

import axios from "axios";

const API_URL = "https://localhost:7162/api/Conversations";

const httpsAgent =
  process.env.NODE_ENV === "development"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;


class ConversationApiImpl implements ConversationRepository {
    getConversations(): Promise<Conversation[]> {
        throw new Error("Method not implemented.");
    }
    getConversationById(id: string): Promise<Conversation | null> {
        throw new Error("Method not implemented.");
    }
    addConversation(conversation: Conversation): Promise<Conversation> {
        throw new Error("Method not implemented.");
    }
    updateConversation(conversation: Conversation): Promise<Conversation> {
        throw new Error("Method not implemented.");
    }
    deleteConversation(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getConversationsByUserId(userId: string): Promise<Conversation[]> {
        const url = `${API_URL}/user/${userId}`;

        const res = await axios.get(url,{
            httpsAgent,
            headers: { "Content-Type": "application/json" }
        });
        if (res.status !== 200) throw new Error("Error al obtener conversaciones por usuario");
        return res.data as Promise<Conversation[]>;
    }
  
}

export default ConversationApiImpl;