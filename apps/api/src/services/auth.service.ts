import { User, RegisterData, UserWithPassword } from "@typetempo/models";
import { HttpException } from "../utils/exceptions";

export class AuthService {
    private users: UserWithPassword[] = [];

    async createUser(userData: RegisterData): Promise<User> {
        const existingUser = await this.findUserByEmail(userData.email);

        if (existingUser) {
            throw new HttpException(400, "User with this email already exists");
        }

        const user: User = {
            id: Date.now(),
            ...userData,
        };

        this.users.push(user as UserWithPassword);
        return user;
    }

    async findUserByEmail(email: string): Promise<UserWithPassword | undefined> {
        return this.users.find((user) => user.email === email);
    }

    async findUserById(id: number): Promise<UserWithPassword | undefined> {
        return this.users.find((user) => user.id === id);
    }
}
