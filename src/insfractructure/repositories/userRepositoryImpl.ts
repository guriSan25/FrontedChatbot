import User from "@entities/User";
import { LoginRequest, UserRepository } from 
"@repositories/userRepository"; 
 
const API_URL = "http://localhost:5000/api/user"; 

class UserRepositoryAPI implements UserRepository { 
    async getUsers(): Promise<User[]> { 
        const res = await fetch(`${API_URL}/`); 
        if (!res.ok) throw new Error("Error al obtener usuarios"); 
        return res.json(); 
    } 
 
    async getUserbyId(id: number): Promise<User | null> { 
        const res = await fetch(`${API_URL}/${id}`); 
        if (!res.ok) return null; 
        return res.json(); 
    } 
 
    async addUser(user: User): Promise<User> { 
        const res = await fetch(`${API_URL}/crear`, { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify(user), 
        }); 
        if (!res.ok) throw new Error("Error al crear usuario"); 
     
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
        const res = await fetch(`${API_URL}/api/Users/login`, {
            method: "POST", 
            body: JSON.stringify(request),
            headers: { "Content-Type": "application/json" }
        });
        if(!res.ok) return "login invalid"; 
        return "login succesfully"
    }
} 
 
export default UserRepositoryAPI;