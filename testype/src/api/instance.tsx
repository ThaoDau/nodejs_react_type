import { message } from "antd";
import axios from "axios";

const token =  localStorage.getItem("accessToken");
let headers: {Authorization? :string } = {};
try {
    headers.Authorization = `Bearer ${JSON.parse(token!)}`;
} catch (error) {
    message.error('Ban chua dang nhap');
    window.location.href="/signup";
}
const instance = axios.create({
    baseURL : "http://localhost:8080/api",
     headers
})
export default instance;

export const instanceDemo = axios.create({
    baseURL : "http://localhost:8080/api"
})