import { NextResponse } from "next/server";
import UsuarioUseCases from "@/application/usesCases/UserUseCases";
import UserRepositoryAPI from "@/insfractructure/repositories/userRepositoryImpl";

import { cookies } from "next/headers";

const userRepository = new UserRepositoryAPI();
const UserUseCases = new UsuarioUseCases(userRepository);

export async function GET() {
  const users = await UserUseCases.getUsers();
  return NextResponse.json(users);
}

export async function POST(req: RequestWithAction) {
  
  const { action,payload } = await req.json();  

  if (!action){
    return NextResponse.json({ error: "Action is required" }, { status: 400 });
  }

  if (!payload) {
    return NextResponse.json({ error: "Payload is required" }, { status: 400 });
  }

  if (action === "register") {

    const { username, full_name, dateofBirth, email, password } = payload;

    if (!username || !full_name || !dateofBirth || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
      const newUser = await UserUseCases.addUser(payload);
      return NextResponse.json(newUser);
    } catch (error: any) {
      if (
        error.message?.includes("usuario o email ya existe") ||
        error?.toString().includes("usuario o email ya existe")
      ) {
        return NextResponse.json({ error: "El usuario o email ya existe." }, { status: 400 });
      }
      return NextResponse.json({ error: "Error al registrar usuario." }, { status: 500 });
    }
  }

  if (action === "login") {
    const { username, password } = payload;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }
    try {
      const response = await UserUseCases.login(username, password);
      (await cookies()).set("auth_token", JSON.stringify({token: response.token,userId: response.userId}),{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Asegura que la cookie sea segura en producción
        sameSite: "strict", // Mejora la seguridad contra ataques CSRF
        maxAge: 60 * 60 * 24, // 1 día en segundos
        path: "/", // Asegura que la cookie esté disponible en todo el sitio
      })
      
      return NextResponse.json({ message: "Login successful" });
    } catch (error: any) {
      if (error.message?.includes("Usuario o contraseña incorrectos") || error?.toString().includes("Usuario o contraseña incorrectos")) {
        return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
      }
      return NextResponse.json({ error: "Error al iniciar sesión" }, { status: 500 });
    }

  }
}

