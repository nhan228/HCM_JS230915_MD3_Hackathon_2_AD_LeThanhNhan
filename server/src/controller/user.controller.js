import {userModel} from "../models/user.model";
import { tokenJWT } from "../services"
export const userController = {
    decodeToken: (req, res) => {
        return res.status(200).json({
            message: "Decode thành công!",
            data: req.tokenData
        })
    },
    login: async (req, res) => {
        try {
            let { data, message } = await userModel.findUser(req.body.username)
            console.log('data',data);
            if (!data) {
                throw {
                    message
                }
            }
            if (data.password != req.body.password) {
                throw {
                    message: "Mật khẩu không đúng"
                }
            }
            return res.status(200).json({
                token: tokenJWT.createToken(data),
                message: "Đăng nhập thành công!"
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message || "Lỗi server!"
            })
        }
    }
}
