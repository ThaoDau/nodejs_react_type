import { useEffect, useState } from 'react'
import {Routes,Route} from "react-router-dom"
import HomePage from './page/HomePage'
import ProductPage from './page/ProductPage'
import {  createProduct, deleteCategorybyProduct, deleteOne, getAll, updateProduct } from './api/product';
import { Iproduct } from './types/product';
import ProductDetail from './page/ProductDetail';
import BaseLayout from './page/admin/BaseLayout';
import AdminPageManager from './page/admin/AdminPageManager';
import AddAdminPage from './page/admin/AddAdminPage';
import UpdateAdminPage from './page/admin/UpdateAdminPage';
import Dashboard from './page/admin/Dashboard';
import { iCategory } from './types/category';
import { createCategories, deleteCategories, getCategories, updateCategories } from './api/category';
import ListCategories from './page/admin/categories/ListCategories';
import AddCategory from './page/admin/categories/AddCategory';
import UpdateCategory from './page/admin/categories/UpdateCategory';
import Signin from './page/signin/Signin';
import Signup from './page/signup/Signup';
import { IUser } from './types/user';
import BaseLayoutClient from './page/BaseLayoutClient';

// import './App.css'

function App() {
    const [products,setproduct]= useState<Iproduct[]>([]);
    const [categories,setcategory] = useState<iCategory[]>([]);
    useEffect(()=>{

      getAll().then(( { data: { products }})=>setproduct(products))
    },[]) 
    useEffect(()=>{
      // const {data} = getCategories();
      // console.log(data);
      
      getCategories().then(({data: {categories}})=>setcategory(categories))
    },[]) 
    const onHandleRemove =(id:any)=>{
      deleteOne(id).then(()=>setproduct(products.filter((item)=> item._id !== id)))
      
    }
    const onHandleRemoveCategory =async (id: string |number) => {
      deleteCategories(id).then(() => {
        setcategory(categories.filter((item) => item._id !== id));
      });        
    };

    const onHandleAdd = (product:any)=>{
      // console.log(products);
      createProduct(product).then(()=>setproduct([...products,product]))
    }
    const onHandleAddCategory = async(category:any)=>{
      createCategories(category).then(()=>setcategory([...categories,category]))
      
    }
    const onHandleUpdate = (product:any)=>{
      updateProduct(product).then(() => setproduct(products.map((item) => item._id == product._id ? product : item))) // cập nhật lại sản phẩm
    }
    const onHandleUpdatecategory = async(category:any)=>{
      updateCategories(category).then(() => setcategory(categories.map((item) => item._id == category._id ? category : item))) // cập nhật lại sản phẩm
      
    }
    /* User  */
    const [users,setuser] = useState<IUser[]>([])
    
    // const onHandleAddUser = (user:any)=>{
    //   // console.log(products);  
    //   // createUser(user).then(()=>setuser([...users,user])
      
    // }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<BaseLayoutClient  />}>
          <Route index element={<HomePage products={products} categories={categories}/>}/>
          <Route path='products'>
          <Route index element={<ProductPage products={products} categories={categories} />}/>
            <Route path=':id'>
              <Route index element={<ProductDetail  />}/>
            </Route>
          </Route>
          
          
        </Route>
        <Route path='/signin'>
              <Route index element={<Signin  users={users} />}/>
            </Route>
            <Route path='/signup'>
              <Route index element={<Signup />}/>
            </Route>
        <Route path='/admin' element={<BaseLayout />}>
              <Route index element = {<Dashboard/>}/>
              <Route path='products'>
                <Route index element={<AdminPageManager products={products} onremove={onHandleRemove}  categories={categories}/>}/>
                      <Route path='add'>
                        <Route index element={<AddAdminPage products={products} onAdd={onHandleAdd} categories={categories}/>}/>
                      </Route>
                      <Route path=':id/update'>
                        <Route index element={<UpdateAdminPage products={products} onupdate={onHandleUpdate} categories={categories}/>}/>
                      </Route>
              </Route>
              <Route path='categories'>
                      <Route index element={< ListCategories categories={categories} onremove={onHandleRemoveCategory}/>}/>
                      <Route path='add'>
                        <Route index element={<AddCategory categories={categories} onAdd={onHandleAddCategory} />}/>
                      </Route>
                      <Route path=':id/update'>
                        <Route index element={<UpdateCategory  categories={categories} onupdate={onHandleUpdatecategory}  />}/>
                      </Route>
              </Route>
          </Route>
      </Routes>
    </div>
  )
}

export default App
// Bước 1: Tạo điều hướng chính /
// Bước 2: Tạo điều hướng phụ
// Bước 3: Truyền file vào 
// Bước 4: tạo các function làm việc

// Bước 5: 