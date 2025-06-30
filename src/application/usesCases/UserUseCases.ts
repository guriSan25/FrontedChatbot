import { UserRepository } from 
"@/domain/repositories/userRepository"; 
 
import User, { LoginRequest, LoginResponse } from "@/domain/entities/User"; 
 
class UserUseCases { 
    private userRepository: UserRepository; 
 
    constructor(userRepository: UserRepository) { 
        this.userRepository = userRepository; 
    } 
 
    async getUsers(): Promise<User[]> { 
        return await this.userRepository.getUsers(); 
    } 
 
    async getUserByID(id: number): Promise<User | null> { 
        return await this.userRepository.getUserbyId(id); 
    }
     async addUser(user: User): Promise<User> { 
        return await this.userRepository.addUser(user); 
    } 
 
    async updateUser(user: User): Promise<User> { 
        return await this.userRepository.updateUser(user); 
    } 
 
    async deleteUser(id: number): Promise<void> { 
        await this.userRepository.deleteUser(id); 
    } 

    async login(username: string, password: string): Promise<LoginResponse>{
        const request: LoginRequest = {
            username, 
            password
        }
        return await this.userRepository.login(request); 
    }
} 
 
export default UserUseCases; 