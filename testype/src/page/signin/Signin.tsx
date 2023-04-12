import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { IUser } from '../../types/user';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/instance';
import axios from 'axios';
import { signIn } from '../../api/user';

interface IProps{
  users: IUser[],
}

const Signin = (props: IProps) => {
  
  const navigate = useNavigate();
  
  const onFinish =async (values: any) => {
    try {
      console.log(values);
      const response = await axios.post(`http://localhost:8080/api/signin`,values);
      const {data} = await signIn(values);
      
      const user = data.user;
      // console.log(data);
      
      if(user.role === "admin"){ 
        message.success("Wellcome to administrator !");
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        navigate('/admin/products')
      }else{
        message.success("Đăng nhập thành công !");
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        navigate('/')
      }
      if(response && response.data){
        console.log(response);
      }
    }catch(error){
      console.log(error);
      
    }
   };
  
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundImage: 'url(https://wallpapers.com/images/high/4k-anime-art-165yg9wq7mhz6rtv.webp)',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      opacity: '0.9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
    }}>
      <div style={{
        maxWidth: '900px',
        padding: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}>
        <h1 style={{ fontSize: '3rem' }}>Sign in</h1>
        <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" >
                Log in
              </Button>
            </Form.Item>
            <span style={{ fontSize: '1rem' }}>Chưa có tài khoản thì <a href="/signup">Đăng ký</a> đi</span>
          </div>
        </Form>
      </div>
    </div>
    
    
    
  );
};

export default Signin;
