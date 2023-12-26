import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const todoModel = {
    create: async function (data) {
        try {
            const task = await prisma.tasks.create({
                data: {
                    ...data
                },
            });
            console.log('task',task);
            return {
                status: true,
                message: "Thành công",
                data: task
            }
        } catch (err) {
            let message = err.message || "Create Task failed";
            return {
                status: false,
                message: message,
                data: null
            }
        }
    },
    findAll: async () => {
        try {
            let data = await prisma.tasks.findMany()
            return {
                status: true,
                data,
                message: "Tìm thành công"
            }
        } catch (err) {
            return {
                status: false,
                data: null,
                message: "Tìm thất bại"
            }
        }

    },
    update: async (id, task) => {
        try {
            let data = await prisma.tasks.update({
                where: {
                    id: Number(id)
                },
                data: {
                    ...data,
                    ...task
                }
            })
            return {
                status: true,
                data,
                message: "Cập nhật thành công"
            }
        } catch (err) {
            return {
                status: false,
                data: null,
                message: "Cập nhật thất bại"
            }
        }
    },
    delete: async (id) => {
        try {
            let data = await prisma.tasks.delete({
                where: {
                    id: Number(id)
                }
            })
            return {
                status: true,
                data,
                message: "Xóa thành công"
            }
        } catch (err) {
            console.log('err', err);
            return {
                status: false,
                data: null,
                message: "Xóa thất bại"
            }
        }
    }
}



