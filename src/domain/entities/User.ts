interface User { 
id: number; 
username: string;
full_name: string;
dateofBirth: Date; 
email: string; 
password: string; 
} 
export interface LoginRequest{
    username: string, 
    password: string
}

export interface LoginResponse {
    token: string;
    userId: number;
}

export default User;