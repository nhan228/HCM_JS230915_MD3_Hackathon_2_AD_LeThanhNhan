import { todoModel } from "../models/todo.model";

export const todoController = {
    create: async (req, res) => {
        if (req.tokenData.role != 'admin') {
            throw {
                message: "Không có quyền thực thi!"
            }
        }
        try {
            const { status, data, message } = await todoModel.create(req.body);
            console.log('s',status, 'd',data, 'm',message);
            if (status) {
                return res.status(200).json({
                    message,
                    data
                })
            } else {
                throw {
                    message
                }
            }
        } catch (err) {
            console.log('err', err);
            return res.status(500).json({
                message: err.message || "Server bảo trì!",
            })
        }
    },
    findAll: async (req, res) => {
        if (!req.tokenData) {
            throw {
                message: "Không có quyền thực thi!"
            }
        }
        try {
            let { data, message, status } = await todoModel.findAll();
            if (status) {
                return res.status(200).json({
                    message,
                    data
                })
            } else {
                throw {
                    message
                }
            }
        } catch (err) {
            console.log('err', err);
            return res.status(500).json({
                message: err.message || "Server bảo trì!",
            })
        }

    },
    update: async (req, res) => {
        if (req.tokenData.role != 'admin') {
            throw {
                message: "Không có quyền thực thi!"
            }
        }
        try {
            const { data, message, status } = await todoModel.update(req.params.id, req.body)
            if (status) {
                return res.status(200).json({
                    message,
                    data
                })
            } else {
                throw {
                    message
                }
            }
        } catch (err) {
            return res.status(500).json({
                message: err.message || "Server bảo trì!",
            })
        }
    },
    delete: async (req, res) => {
        if (req.tokenData.role != 'admin') {
            throw {
                message: "Không có quyền thực thi!"
            }
        }
        try {
            const { data, message, status } = await todoModel.delete(req.params.id)
            if (status) {
                return res.status(200).json({
                    message,
                    data
                })
            } else {
                throw {
                    message
                }
            }
        } catch (err) {
            return res.status(500).json({
                message: err.message || "Server bảo trì!",
            })
        }
    }
}


