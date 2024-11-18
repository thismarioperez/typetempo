import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const alice = await prisma.user.upsert({
        where: { email: "alice@prisma.io" },
        update: {},
        create: {
            email: "alice@prisma.io",
            name: "Alice",
            password: "secret",
            userSettings: {
                create: {
                    theme: "dark",
                    language: "es",
                },
            },
        },
    });
    const bob = await prisma.user.upsert({
        where: { email: "bob@prisma.io" },
        update: {},
        create: {
            email: "bob@prisma.io",
            name: "Bob",
            password: "secret",
            userSettings: {
                create: {
                    theme: "light",
                    language: "en",
                },
            },
        },
    });
    console.log({ alice, bob });
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
