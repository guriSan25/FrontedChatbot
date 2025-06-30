import MessageUseCases from "@/application/usesCases/MessageUseCases";
import MessageRepositoryAPI from "@/insfractructure/repositories/messageRepositoryImpl";

const messageRepository = new MessageRepositoryAPI();

const messageUseCases = new MessageUseCases(messageRepository);
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { conversationId: string } }
  ) {
    const { conversationId } = await params;
    
    const messages = await messageUseCases.getMessagesByConversationId(conversationId);

    return NextResponse.json(messages);
  }