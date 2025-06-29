import User, { LoginRequest } from "@entities/User";
import { UserRepository } from "@repositories/userRepository";

import https from "https";
import axios from "axios";

const httpsAgent =
  process.env.NODE_ENV === "development"
    ? new https.Agent({ rejectUnauthorized: false })
    : undefined;

const API_URL = "https://localhost:7162/api/Users";

class UserRepositoryAPI implements UserRepository {
  async getUsers(): Promise<User[]> {
    const res = await fetch(`${API_URL}/`);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return res.json() as Promise<User[]>;
  }

  async getUserbyId(id: number): Promise<User | null> {
    const res = await axios.get(`${API_URL}/${id}`);
    if (res.status !== 200) return null;
    return res.data as User;
  }

  async addUser(user: User): Promise<User> {
    const { username, full_name, dateofBirth, email, password } = user;

    const userData = {
      username,
      fullName: full_name,
      dateofBirth,
      email,
      password,
    };

    try {
      const res = await axios.post(`${API_URL}/register`, userData, {
        httpsAgent,
        headers: { "Content-Type": "application/json" },
      });
      if (res.status !== 200) throw new Error("Error al crear usuario");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Detalles del error:", {
          status: error.response?.status,
          data: error.response?.data, // ← Mensaje de error del backend
          headers: error.response?.headers,
          errors: error.response?.data.errors, // ← Errores específicos del modelo
        });
      }
    }

    return user;
  }

  async updateUser(user: User): Promise<User> {
    const res = await fetch(`${API_URL}/editar/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");

    return user;
  }

  async deleteUser(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/eliminar/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar usuario");
  }

  async login(request: LoginRequest): Promise<string> {
    try {
      const res = await axios.post(`${API_URL}/login`, request , {
        headers: { "Content-Type": "application/json" },
        httpsAgent,
      });

      return res.data?.token || "login invalid"; // Retorna el token o un mensaje de error si no se obtiene un token
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);

        console.error("Detalles del error:", {
          status: error.response?.status,
          data: error.response?.data, // ← Mensaje de error del backend
          headers: error.response?.headers,
          errors: error.response?.data.errors, // ← Errores específicos del modelo
        });
      }
      return "login invalid";
    }
  }
}

export default UserRepositoryAPI;
