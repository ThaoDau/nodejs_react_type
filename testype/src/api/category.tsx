import instance from "./instance";
interface iCategory{
    _id?: number| string,
      name:string,
}
export const getCategories = ()=>{
    return instance.get('/categories');
}
export const getOneCategories = (id:number| string)=>{
    return instance.get('/categories'+id);
}
export const deleteCategories = (id:number| string)=>{
    return instance.delete('/categories/'+id);
}
export const updateCategories = (categories:iCategory)=>{
    return instance.put('/categories/'+categories._id,categories);
}
export const createCategories = (categories: iCategory)=>{
    return instance.post('/categories',categories);
}