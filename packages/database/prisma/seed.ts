import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.upsert({
        where: { email: "user@demo.com" },
        update: {},
        create: {
            email: "user@demo.com",
            name: "User Name",
            password: bcrypt.hashSync("password", 10),
            userSettings: {
                create: {
                    theme: "dark",
                    language: "en",
                },
            },
        },
    });
    console.log({ user });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
