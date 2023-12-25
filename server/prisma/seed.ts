import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

(async () => {
    await prisma.user.createMany({
        data: [
            {
                username: 'admin',
                password: '123',
                role: true,
            },
            {
                username: 'member',
                password: '123',
                role: false,
            },
        ],
    });
})();
