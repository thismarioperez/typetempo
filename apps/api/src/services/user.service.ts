import { RegisterData, User, UserWithPassword } from "@typetempo/models";
import { prisma } from "@typetempo/db/src/client";
import { HttpException } from "src/utils/exceptions";

export class UserService {
    async findUserById(id: number): Promise<UserWithPassword | undefined> {
        const user = await prisma.user.findUnique({ where: { id } });

        if (user) {
            return user;
        }

        return new Promise<undefined>((resolve) => resolve(undefined));
    }

    async findUserByEmail(email: string): Promise<UserWithPassword | undefined> {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            return user;
        }

        return new Promise<undefined>((resolve) => resolve(undefined));
    }

    async createUser(userData: RegisterData): Promise<User> {
        const existingUser = await this.findUserByEmail(userData.email);

        if (existingUser) {
            throw new HttpException(400, "User with this email already exists");
        }

        const user = await prisma.user.create({
            data: {
                ...userData,
            },
        });

        return user;
    }
}
