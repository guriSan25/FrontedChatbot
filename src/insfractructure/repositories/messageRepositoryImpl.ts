import Message, { MessageExistintg, MessageRequest } from "@/domain/entities/Message";
import MessageRepository from "@/domain/repositories/messageRepository";
import axios from "axios";
import https from "https";

const API_URL = "https://localhost:7162/api/Mesagges";

const httpsAgent =
  process.env.NODE_ENV === "development"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

class MessageRepositoryAPI implements MessageRepository {
  async getMessagesByConversationId(
    conversationId: string
  ): Promise<Message[]> {
    if (!conversationId) {
      console.error("Conversation ID is required to fetch messages.");
      return [];
    }

    
    const url = `${API_URL}/conversation/${conversationId}`;

    try {
      const res = await axios.get(url, {
        httpsAgent,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status !== 200)
        throw new Error("Error al obtener mensajes por conversación");
      return res.data as Message[];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Detalles del error:", {
          status: error.response?.status,
          data: error.response?.data || "No data returned",
          headers: error.response?.headers,
          errors: error.response?.data || "No specific errors",
        });
      }
      return [];
    }
  }
  getMessageById(id: string): Promise<Message | null> {
    throw new Error("Method not implemented.");
  }
  addMessage(message: Message): Promise<Message> {
    throw new Error("Method not implemented.");
  }
  updateMessage(message: Message): Promise<Message> {
    throw new Error("Method not implemented.");
  }
  deleteMessage(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getMessagesByUserId(userId: string): Promise<Message[]> {
    const url = `${API_URL}/user/${userId}`;

    try {
      const res = await axios.get(url, {
        httpsAgent,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status !== 200)
        throw new Error("Error al obtener mensajes por usuario");
      return res.data as Message[];
    } catch (error) {
      console.error("Error fetching messages by user ID:", error);
      throw error;
    }
  }

  async sendMessageToBot(message: MessageExistintg): Promise<string> {
    const url = `${API_URL}/send-message`;

    console.log("Enviando mensaje al bot:", message);
    

    try {
      const res = await axios.post(url, message, {
        httpsAgent,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status !== 200)
        throw new Error("Error al enviar mensaje al bot");

      console.log("Respuesta del bot en impl:", res.data.data.conversationId);

      return res.data.data.conversationId;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Detalles del error:", {
          status: error.response?.status,
          data: error.response?.data || "No data returned",
          headers: error.response?.headers,
          errors: error.response?.data.errors || "No specific errors",
        });
      }

      return "0"; // Retorna "0" en caso de error
    }
  }
}

export default MessageRepositoryAPI;
