import jwt from 'jsonwebtoken'
export const tokenJWT = {
    createToken: (userData) => {
        let token = jwt.sign(userData, "hackathon", {
            expiresIn: '1d'
        })
        return token
    },
    decodeToken: (token) => {
        return jwt.verify(token, "hackathon")
    }
}