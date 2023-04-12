import { SignupValues } from "../page/signup/Signup";
import instance, { instanceDemo } from "./instance";
// Định nghĩa kiểu dữ liệu cho object ko thì nó lỗi tòe loe nha con
interface IUser{
    _id?: string,
    name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role:string,
}
// tip 2: cho type cac tham so truyen vao

export const signIn = (users: IUser)=>{
    return instance.post('/signin',users)
}
export const signUp = (users: IUser)=>{
    return instance.post('/signup',users)
}

export const resgister = async (users: SignupValues)=>{
    console.log(users)
    try {
        const response = await instanceDemo.post(`/signup`, users)
        if (response && response.data) {
            return response
        }
    } catch (error) {
        console.log(error)
    }
}