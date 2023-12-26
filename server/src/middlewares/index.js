import { tokenJWT } from "../services"
import { userModel } from "../models/user.model"

export const userMiddleware = {
    tokenValidate: async (req, res, next) => {
        try {
            let tokenData = tokenJWT.decodeToken(req.params.token || req.headers.token)
            if (!tokenData) {
                console.log('Token is not valid 1!');
                return res.status(500).json({
                    message: "Token is not valid 1!"
                })
            }
            let { data, message } = await userModel.findUser(tokenData.username)
            console.log('userModel data', data);
            if (!data) {
                console.log('Token is not valid 2!');
                return res.status(500).json({
                    message: "Token is not valid 2!"
                })
            }
            req.tokenData = data
            next()
        } catch (err) {
            return res.status(500).json({
                message: "Token is not valid 3!"
            })
        }
    }
    
}