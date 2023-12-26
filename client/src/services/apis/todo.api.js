import axios from 'axios'

export const todoApi = {
    findAll: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/todos`)
    },
    create: async (data) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/todos`, data)
    },
    update: async (taskId, data) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/todos/${taskId}`, data)
    },
    delete: async (taskId) => {
        return await axios.delete(`${import.meta.env.VITE_SERVER_HOST}/todos/${taskId}`)
    }
}