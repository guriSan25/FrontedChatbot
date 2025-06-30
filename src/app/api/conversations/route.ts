import ConversationUseCases from "@/application/usesCases/ConversationUseCases";
import ConversationApiImpl from "@/insfractructure/repositories/conversationRepositoryImpl";


const conversationRepository = new ConversationApiImpl();
const conversationUseCases = new ConversationUseCases(conversationRepository);

import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const conversations = await conversationUseCases.getConversationsByUserId("1"); // Assuming "1" is the userId for demonstration purposes
    return NextResponse.json(conversations);
}

export async function POST(req: Request) {
    const { action, payload } = await req.json();

    if (!action) {
        return NextResponse.json({ error: "Action is required" }, { status: 400 });
    }

    if (!payload) {
        return NextResponse.json({ error: "Payload is required" }, { status: 400 });
    }

    if (action === "add") {
        const newConversation = await conversationUseCases.addConversation(payload);
        return NextResponse.json(newConversation);
    }

    if (action === "update") {
        const updatedConversation = await conversationUseCases.updateConversation(payload);
        return NextResponse.json(updatedConversation);
    }

    if (action === "delete") {
        await conversationUseCases.deleteConversation(payload.id);
        return NextResponse.json({ message: "Conversation deleted successfully" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

