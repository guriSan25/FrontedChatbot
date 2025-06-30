interface Message { 
is_bot: boolean; 
content: string;
message_id: number;
conversation_id: string;
} 

export interface MessageRequest {
    is_bot: boolean; 
    content: string;
    conversationId: string;
    conversation: {
        userId: string;
        title: string;
        createdAt: Date;
    }
}

export interface MessageExistintg {
    is_bot: boolean; 
    content: string;
    conversationId: string;
}



export default Message;