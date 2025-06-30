import ConversationUseCases from "@/application/usesCases/ConversationUseCases";
import ConversationApiImpl from "@/insfractructure/repositories/conversationRepositoryImpl";
import { NextResponse } from "next/server";

const conversationRepository = new ConversationApiImpl();
const conversationUseCases = new ConversationUseCases(conversationRepository);


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const usuario = await conversationUseCases.getConversationById(params.id);
  return NextResponse.json(usuario);
}

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const usuario = await request.json();
//   usuario.id = Number(params.id);
//   const usuarioActualizado = await usuarioUseCases.actualizarUsuario(usuario);
//   return NextResponse.json(usuarioActualizado);
// }
