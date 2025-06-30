import MessageUseCases from "@/application/usesCases/MessageUseCases";
import Message, { MessageExistintg, MessageRequest } from "@/domain/entities/Message";
import MessageRepositoryAPI from "@/insfractructure/repositories/messageRepositoryImpl";

const messageRepository = new MessageRepositoryAPI();

const messageUseCases = new MessageUseCases(messageRepository);
import { NextResponse } from "next/server";

export async function POST(
  request: Request
) {
  const { is_bot, content,conversation_id } = await request.json();
    
   if(!conversation_id){

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