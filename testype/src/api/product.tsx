import { Iproduct } from "../types/product";
import instance from "./instance";
// Định nghĩa kiểu dữ liệu cho object ko thì nó lỗi tòe loe nha con

// tip 2: cho type cac tham so truyen vao
export const getAll = ()=>{
    return instance.get('/products');
}
export const getOne = (id: number| string)=>{
    return instance.get('/products/'+id);
}
export const deleteOne = (id: number| string)=>{
    return instance.delete('/products/'+id);
}
export const createProduct = (products: Iproduct )=>{
    return instance.post('/products', products)
} 
export const updateProduct = (products: Iproduct)=>{
    return instance.put('/products/'+products._id, products)
}
export const deleteCategorybyProduct =(id:number| string)=>{
    return instance.delete(`products?categoryId=_${id}`)
}