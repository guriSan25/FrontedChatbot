import Conversation from "../entities/Conversations";

interface ConversationRepository {
    getConversations(): Promise<Conversation[]>;
    getConversationById(id: string): Promise<Conversation | null>;
    addConversation(conversation: Conversation): Promise<Conversation>;
    updateConversation(conversation: Conversation): Promise<Conversation>;
    deleteConversation(id: string): Promise<void>;
    getConversationsByUserId(userId: string): Promise<Conversation[]>;
}

export default ConversationRepository;