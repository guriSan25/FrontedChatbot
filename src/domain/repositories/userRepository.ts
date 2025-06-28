import User from "@entities/User" 
 
export interface UserRepository { 
    getUsers(): Promise<User[]>;  
    getUserbyId(id: number): Promise<User | null>;  
    addUser(user: User): Promise<User>;  
    updateUser(user: User): Promise<User>;  
    deleteUser(id: number): Promise<void>;
    login(request: LoginRequest): Promise<string>; 
}

export interface LoginRequest{
    username: string, 
    password: string
}