import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  CopyrightOutlined ,
  PlusCircleOutlined,
  DatabaseOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { MenuProps,message} from 'antd';
import { Breadcrumb, Layout, Menu, theme,Button, Space,AutoComplete,Input  } from 'antd';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];


function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const BaseLayout = () => {
  const navigate = useNavigate();
  const onHandleSignout = ()=>{
    return localStorage.removeItem('accessToken');
  }
  const actionRemoveSignout = ()=>{
    onHandleSignout();
    message.success('Bạn đã đăng xuất thành công');
    navigate('/')
  }
  const items: MenuItem[] = [
    getItem(<NavLink to={`/admin`}>Dashboard</NavLink>, '1', <PieChartOutlined />),
    getItem("Products", '2', <DesktopOutlined />,[
      getItem(<NavLink to={`/admin/products`}>Products Manager</NavLink>, '3',<DatabaseOutlined />),
      getItem(<NavLink to={`/admin/products/add`}>Add Products</NavLink>, '4',<PlusCircleOutlined />),
      
    ]),
    getItem(<NavLink to={`/admin/categories`}>Categories Manager</NavLink>, '5', <CopyrightOutlined />),
    getItem(<NavLink to={`/`}>HomePage</NavLink>, '7', <CopyrightOutlined />),
    
    
    
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  
  
  return (
    <Layout style={{ minHeight: '100vh' }} >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} >
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        
      </Sider>
      <Layout className="site-layout">
        <Header style={{ paddingLeft: 24, background: colorBgContainer, display: 'flex' }} >
          <span>Chào mừng <span style={{color : 'red'}}></span> đã đến với trang quản trị Admin</span>
          <div style={{marginLeft:'900px'}}><Button type='primary'style={{backgroundColor : 'purple'}}><NavLink to={`/`} onClick={actionRemoveSignout}>Đăng xuất</NavLink></Button></div>
            </Header>
        <Content style={{ margin: '0 16px' }}>
          
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
          
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Thaodau @2003</Footer>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;