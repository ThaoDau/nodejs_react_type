
import React, { useEffect, useState } from 'react';
import { Card, Row, Col,Statistic, message, Spin  } from 'antd';
import type { CountdownProps } from 'antd';
import { Layout, Menu,Typography,Carousel ,Divider,Button, Input, Space} from 'antd';
import {UserOutlined,UserAddOutlined} from '@ant-design/icons'
import { Link, Outlet, useNavigate,} from 'react-router-dom';

const ProductCard = ({ product }:any) => {
 
  return (
    <Card title={product.name} style={{ marginBottom: '20px' }}>
      <p>{product.description}</p>
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{product.price}</p>
    </Card>
  );
};
const { Title } = Typography;
const { Countdown } = Statistic;
const deadline = Date.now() + 100 * 60 * 24 *24 * 24 * 2 + 1000 * 30 * 60; // Dayjs is also OK
const onFinish: CountdownProps['onFinish'] = () => {
  console.log('finished!');
};
const { Search } = Input;





const BaseLayoutClient = () => {
  const navigate = useNavigate();
  const getlocal = localStorage.getItem('accessToken');

  const onHandleSignout = ()=>{
    return localStorage.removeItem('accessToken');
  }
  const actionRemoveSignout = ()=>{
    onHandleSignout();
    
    message.success('Bạn đã đăng xuất thành công');
    navigate('/')
  }
  
  const {Footer} = Layout;
    return (
        <div>
          
           <Layout.Header style={{ display: 'flex', alignItems: 'center', justifyContent : 'space-between' }}>
          <div className="logo">
            <Typography.Title style={{ color: '#fff' }} level={3}>
              Thaodaushop
            </Typography.Title>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ marginRight: '100px' }}>
            <Menu.Item key="1"><Link to={`/`}>Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to={`/products`}>Products</Link></Menu.Item>
            {getlocal ? (
              <Menu.Item key="4" onClick={actionRemoveSignout}>
                Đăng xuất <UserOutlined style={{ fontSize: '18px' }} />
              </Menu.Item>
            ) : (
              <>
                <Menu.Item key="4">
                  <Link to={`/signin`}>Signin</Link> <UserOutlined style={{ fontSize: '18px' }} />
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to={`/signup`}>Signup</Link> <UserAddOutlined style={{ fontSize: '18px' }} />
                </Menu.Item>
              </>
             )} 
            
          </Menu>
        </Layout.Header>
        
        <Layout.Content style={{ paddingBottom: '30px' }}>
          <div >
          <Carousel autoplay >
        <div>
          <img src="https://file.hstatic.net/200000037048/file/bannerbia1_5a78d24644c046a0b334114e4492b04c.jpg" alt="" style={{width: '100%'}}/>
        </div>
        <div>
        <img src="https://file.hstatic.net/200000037048/file/bannerbia_29a3c3e944844265996e9bd7f463df07.jpg" alt="" style={{width: '100%'}}/>
        </div>
        <div>
        <img src="https://file.hstatic.net/200000037048/file/bannerbia1_c79e411d8d144ad8bc53499603da8e90.jpg" alt="" style={{width: '100%'}}/>
        </div>
        <div>
        <img src="https://file.hstatic.net/200000037048/file/bannerbia2_76ea6a681cfb4f34bd2d6d16470b8f5a.jpg" alt="" style={{width: '100%'}}/>
        </div>
      </Carousel>
      </div>
      </Layout.Content>
      <Layout.Content >
      
      <Outlet/>
        </Layout.Content>
        <Footer style={{ textAlign: 'center', marginTop: '150px', backgroundColor: 'gray' }}>ThaoDau 2003</Footer>
    
        </div>
    
      )
}

export default BaseLayoutClient
