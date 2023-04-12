import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
dotenv.config();

export const checkPermission = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        // Lấy token 
        const token = req.headers.authorization.split(" ")[1];
        // Sử dụng biến môi trường để chuyển đổi dữ liệu code
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        // check user có đủ quyền thực hiện hành động đấy không 
        if (user.role !== "admin") {
            return res.status(401).json({
                message: "Bạn không có quyền truy cập tài nguyên",
            });
        }
        //  lưu thông tin vào user vào request để sử dụng trong các middleware khác

        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};