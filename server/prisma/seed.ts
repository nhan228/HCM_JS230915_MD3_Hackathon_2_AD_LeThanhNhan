import { userRole, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

(async () => {
    await prisma.users.createMany({
        data: [
            {
                username: 'admin',
                password: '123',
                role: userRole.admin
            },
            {
                username: 'user',
                password: '123',
                role: userRole.user,
            },
        ],
    });
})();
