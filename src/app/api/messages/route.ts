import MessageUseCases from "@/application/usesCases/MessageUseCases";
import Message, { MessageExistintg, MessageRequest } from "@/domain/entities/Message";
import MessageRepositoryAPI from "@/insfractructure/repositories/messageRepositoryImpl";

import { cookies } from "next/headers";

const messageRepository = new MessageRepositoryAPI();

const messageUseCases = new MessageUseCases(messageRepository);
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const { is_bot, content,conversation_id } = await request.json();
    console.log(`Received POST request with is_bot: ${is_bot}, content: ${content}, conversation_id: ${conversation_id}`);
  
    const cookieStore = await cookies();
    const cookie = JSON.parse(cookieStore.get('auth_token')?.value || "0"); // Default user ID if not set

   if(!conversation_id){
    const message : MessageRequest = {
        is_bot,
        content,
        conversationId: '0',
        conversation: {
            userId: cookie.userId, // Replace with actual user ID logic
            title: "Default Conversation Title", // Replace with actual title logic
            createdAt: new Date() // Set current date and time
        }
    };

    

    const conversationId = await messageUseCases.sendMessageToBot(message);
    
    // Devuelve el ID para que el cliente redirija
    return NextResponse.json({ 
      success: true, 
      conversationId 
    }, { status: 200 });
   }
   const message : MessageExistintg = {
       is_bot,
       content,
       conversationId: conversation_id
   };



  const messages = await messageUseCases.sendMessageToBot(message);

  console.log(messages);
  

  return NextResponse.json({});
}


// export async function GET(
//   request: Request,
//   { params }: { params: { conversationId: string } }
// ) {
//   const messages = await messageUseCases.getMessagesByConversationId(params.conversationId);
//   return NextResponse.json(messages);
// }