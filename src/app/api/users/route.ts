import { NextResponse } from "next/server";
import UsuarioUseCases from "@/application/usesCases/UserUseCases";
import UserRepositoryAPI from "@/insfractructure/repositories/userRepositoryImpl";

const userRepository = new UserRepositoryAPI();
const UserUseCases = new UsuarioUseCases(userRepository);

export async function GET() {
  const users = await UserUseCases.getUsers();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const user = await req.json();
  const newUser = await UserUseCases.addUser(user);
  return NextResponse.json(newUser);
}