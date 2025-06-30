import Conversation from "@/domain/entities/Conversations";
import ConversationRepository from "@/domain/repositories/conversationRepository";

class ConversationUseCases {

    constructor(private conversationRepository: ConversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    async getConversations(): Promise<Conversation[]> {
        return await this.conversationRepository.getConversations();
    }

    async getConversationById(id: string): Promise<Conversation | null> {
        return await this.conversationRepository.getConversationById(id);
    }

    async addConversation(conversation: Conversation): Promise<Conversation> {
        return await this.conversationRepository.addConversation(conversation);
    }

    async updateConversation(conversation: Conversation): Promise<Conversation> {
        return await this.conversationRepository.updateConversation(conversation);
    }

    async deleteConversation(id: string): Promise<void> {
        await this.conversationRepository.deleteConversation(id);
    }

    async getConversationsByUserId(userId: string): Promise<Conversation[]> {
        return await this.conversationRepository.getConversationsByUserId(userId);
    }

}

export default ConversationUseCases;