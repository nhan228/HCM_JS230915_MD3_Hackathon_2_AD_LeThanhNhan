import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const userModel = {
    findUser: async function (username) {
        try {
            let user = await prisma.users.findUnique({
                where: {
                    username: username
                },
            })
            if (!user) {
                throw {
                    message: "Không tìm thấy user"
                }
            }
            return {
                status: true,
                message:'Accept',
                data: user
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi server",
                data: null
            }
        }
    }
}

