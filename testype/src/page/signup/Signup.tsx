import { Form, Input, Button,message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { IUser } from '../../types/user';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/instance';
import axios from 'axios';
import { resgister } from '../../api/user';
// import './SignupForm.css';

export interface SignupValues {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role:string,
}
interface IProps{
    users: IUser[],
    
    
}

const Signin = () => {
    const navigate = useNavigate();
  const onFinish =async (values: SignupValues) => {
    console.log(values);
    

    try {
      if (!values) return;
      const response = await resgister(values);
      if (response && response.data) {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }

   message.success('Dang ky thanh cong');
   navigate('/signin')
  };
  

  return (
    <div className="signup-page" style={{
    height: '100vh',
    backgroundImage: 'url(https://wallpapers.com/images/high/anime-forest-ttmu2d8617iv96p1.webp)',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    opacity: '0.9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center' }}>
      <div className="signup-box" style={{
        maxWidth: '800px',
        padding: '70px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }}>
        <h1 className="signup-title" >Create an Account</h1>
        <p className="signup-subtitle">Fill in the form below to get started</p>
        <Form
        
          name="signup_form"
          className="signup-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email address!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters!',
              },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          {/* <Form.Item
              name="role"
              initialValue="member"
            >
              <Input type="hidden" />
            </Form.Item> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="signup-button">
              Sign Up 
            </Button>
            <span> or <a href="/">Home</a></span>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
