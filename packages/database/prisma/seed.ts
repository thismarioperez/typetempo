import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.upsert({
        where: { email: "user@demo.com" },
        update: {},
        create: {
            email: "user@demo.com",
            name: "User Name",
            password: "password",
            userSettings: {
                create: {
                    theme: "dark",
                    language: "es",
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
