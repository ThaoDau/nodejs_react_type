// folder controller chứa code xử lý dữ liệu như lấy ra, lấy 1 phần tử, thêm , sửa , xóa...
import dotenv from "dotenv";
import axios from "axios";
import joi from "joi";
import Product from "../models/product";
import category from "../models/category";

dotenv.config();

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    description: joi.string(),
    image: joi.string(),
    categoryId: joi.string().required(),

});
/*
Bước 1: validate đối tượng gồm loại thuộc tính gì-> dùng joi kiểm tra
Bước 2: Tạo biến cho từng crud 
2.1 -> tạo req client gửi lên server, sử dụng try catch để check lỗi
*/
export const getAll = async (req, res) => {
    try {
        // const { data: products } = await axios.get(`${process.env.API_URL}/products`);
        const products = await Product.find().populate("categoryId");
        // console.log(products);
        // return
        // console.log(products);
        if (products.length === 0) {
            return res.status(404).json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json({
            message: "Lấy danh sách sản phẩm thành công",
            products,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};


export const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("categoryId");
        
        if (!product) {
            return res.json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.json({
            message: "Lấy sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const create = async (req, res) => {
    try {
        // validate
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        // const { data: product } = await axios.post(`${process.env.API_URL}/products`, req.body);
        const product = await Product.create(req.body);
        // Thêm vào categories
        await category.findByIdAndUpdate(product.categoryId,
            {$addToSet: {product: product._id}})
        // console.log(product);
        // return
        if (!product) {
            return res.json({
                message: "Thêm sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            product,
        });
        
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const update = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};