import axios from "axios";

export const userApi = {
    login: (data) => {
        return axios.post(`${import.meta.env.VITE_SERVER_HOST}/login`, data)
    },
    decodeToken: (token) => {
        return axios.post(`${import.meta.env.VITE_SERVER_HOST}/decode-token/${token}`)
    }
}