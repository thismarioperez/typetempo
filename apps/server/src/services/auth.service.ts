import { User, RegisterData } from "../types/auth.types";
import { HttpException } from "../utils/exceptions";

export class AuthService {
    private users: User[] = [];

    async createUser(userData: RegisterData): Promise<User> {
        const existingUser = await this.findUserByEmail(userData.email);

        if (existingUser) {
            throw new HttpException(400, "User with this email already exists");
        }

        const user: User = {
            id: Date.now().toString(),
            ...userData,
        };

        this.users.push(user);
        return user;
    }

    async findUserByEmail(email: string): Promise<User | undefined> {
        return this.users.find((user) => user.email === email);
    }

    async findUserById(id: string): Promise<User | undefined> {
        return this.users.find((user) => user.id === id);
    }
}
