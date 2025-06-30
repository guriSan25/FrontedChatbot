import Message, { MessageExistintg, MessageRequest } from "../entities/Message";

interface MessageRepository {
    getMessagesByConversationId(conversationId: string): Promise<Message[]>;
    getMessageById(id: string): Promise<Message | null>;
    addMessage(message: Message): Promise<Message>;
    updateMessage(message: Message): Promise<Message>;
    deleteMessage(id: string): Promise<void>;
    getMessagesByUserId(userId: string): Promise<Message[]>;
    getMessagesByConversationId(conversationId: string): Promise<Message[]>;
    sendMessageToBot(message: MessageExistintg): Promise<string>;
}

export default MessageRepository;