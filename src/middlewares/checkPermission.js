import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/User"
dotenv.config()

const { SECRET_CODE} =  process.env
export const checkPermission = async (req, res, next) => {
    try {
        // Bước 1:  Tìm kiếm token từ headers
        const bearToken = req.headers.authorization
        if(!bearToken) {
            throw new Error("Bạn chưa đăng nhập!")
        }
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            // Bear 
            throw new Error("Token rỗng!")
        }

        // Bước 2: Giải mã token (ngắn gọn)
        const decoded =  jwt.verify(token, SECRET_CODE)

        // Cách 2: chi tiết
        // jwt.verify(token, SECRET_CODE, async (err, decoded) => {
        //     if(err) {
        //         if(err.name === "TokenExpiredError") {
        //             return res.status(401).json({
        //                 message: "Token hết hạn!" || err.message
        //             })
        //         }
        //         if(err.name === "JsonWebTokenError") {
        //             return res.status(401).json({
        //                 message: "Token lỗi!" || err.message
        //             })
        //         }

        //         if(err.name === "NotBeforeError") {
        //             return res.status(401).json({
        //                 message: "Token không hoạt động!" || err.message
        //             })
        //         }

        //     }
        //     const user = await User.findById(decoded._id)
        // })
        
        // Bước 3: tìm user dựa trên token.payload đã giải mã.
        const user = await User.findById(decoded._id)

        // Bước 4: Kiểm tra user và user.role
        if(!user || user.role !== "admin") {
            throw new Error("Bạn không có quyền làm việc này!")
        }

        // if(!user) {
        //     throw new Error("Tài khoản không tồn tại!")
        // }
        // if(user.role === "member"){
        // } else if( user.role === "VIP")


        // Sử dụng case switch để check quyền cho từng loại quyền.
        // quyền lớn nhất
        // quyền chủ đại lý
        // quyền thu ngân
        // Mỗi quyền là đặc thù của bussiness.
        // Next:
        next()

    } catch (error) {
        return res.status(401).json({
            message: error.message || "Bạn không có quyền!"
        })
    }
}