export interface IUser{
    _id?: number,
    name: string,
    email: string,
    password: string,
    confirmPassword?: string,
    role:string
}