import Message, { MessageExistintg, MessageRequest } from "@/domain/entities/Message";
import MessageRepository from "@/domain/repositories/messageRepository";

class MessageUseCases {

    constructor(private messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    async getMessagesByConversationId(conversationId: string): Promise<Message[]> {
        console.log(`Fetching messages for conversation ID: ${conversationId}`);
        
        return await this.messageRepository.getMessagesByConversationId(conversationId);
    }

    async getMessageById(id: string): Promise<Message | null> {
        return await this.messageRepository.getMessageById(id);
    }

    async sendMessageToBot(message: MessageExistintg): Promise<string> {
        return await this.messageRepository.sendMessageToBot(message);
    }
}

export default MessageUseCases;