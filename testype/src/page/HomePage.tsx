
import React, { useState } from 'react';
import { Card, Row, Col,Statistic  } from 'antd';
import type { CountdownProps } from 'antd';
import { Layout, Menu,Typography,Carousel ,Divider,Button,Rate,Input  } from 'antd';
import {UserOutlined,UserAddOutlined, StarOutlined} from '@ant-design/icons'
import { Iproduct } from '../types/product';
import { iCategory } from '../types/category';
import { Link } from 'react-router-dom';
interface DataType {
  id?: number | undefined;
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: number;
  key: number | undefined;
  
}
interface IProps {
  // key: any;

  products: Iproduct[],
  categories: iCategory[],

}

const HomePage = (props: IProps) => {
  // limit products
  const limitedProducts = props.products.slice(0,6);
  const products = limitedProducts.map((item: Iproduct,index) => {
    const category = props.categories.find((itemCate:any) => itemCate._id == item.categoryId)
    
    return {   
      key: index,
        ...item,
    }
})

  const ListCategories = props.categories.map((item: iCategory)=>{
    return{
      ...item,
    }
  })

  
  const ProductCard = ({ product }:any) => {

    return (
      <Card style={{ margin: '20px 0px', backgroundColor: 'white' }} >
        <img src={`${product.image}`} alt="" style={{width: '95%'}} />
        <Title level={5} style={{ marginBottom: '20px', fontFamily: 'poppins' }}><Link to={`/products/${product.id}`}>{product.name}</Link></Title>
        <p><Rate allowHalf defaultValue={3.5} character={<StarOutlined />} /></p>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#EA5455' ,fontFamily: 'poppins'}}>${product.price}</p>
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
  const onSearch = (value: string) => console.log(value);
  // const [filterInput, setInput] = useState('');
  // const [selectedCategory, setSelectedCategory] = useState("");

 
  // const filterData = () => {
  //   if (filterInput === "") {
  //     if (selectedCategory === "") {
  //       return products;
  //     } else {
  //       return products.filter((product) => product.categoryId === selectedCategory);
  //     }
  //   } else {
  //     if (selectedCategory === "") {
  //       return products.filter(({ name }) =>
  //         name.toLowerCase().includes(filterInput.toLowerCase())
  //       );
  //     } else {
  //       return products.filter(
  //         ({ name, categoryId }) =>
  //           name.toLowerCase().includes(filterInput.toLowerCase()) &&
  //           categoryId === selectedCategory
  //       );
  //     }
  //   }
  // };
  

  return (
    <div>
      <Layout.Content style={{padding: '0px 200px',backgroundColor: 'white', display : 'flex',justifyContent: 'space-between' , height: '400px'}}>
      <img src="https://preview.colorlib.com/theme/estore/assets/img/hero/hero_man.png" alt="" style={{height : '400px'}} />
      <div style={{width: '450px'}}>
      <Title level={3} style={{fontFamily : 'Yellowtail', fontStyle : 'italic'}}>Sale 60% discount</Title>
        <Title style={{fontFamily : 'poppins',fontSize : '50px'}}>Weekly Sale on 60% Off All Products</Title>
        <Countdown title="Countdown" value={deadline} onFinish={onFinish}  style={{fontFamily : 'Roboto'}}/>
      </div>
    </Layout.Content>
  <Divider orientation="center" style={{fontSize : '35px'}}>Shop by Thaodau</Divider>
    <Row style={{padding: '10px 150px ', display: 'flex', justifyContent: 'center'}} >
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
      <img src="https://preview.colorlib.com/theme/estore/assets/img/categori/cat1.jpg" alt="" style={{width: "400px"}}  />
    </Col>
    <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
    <img src="https://preview.colorlib.com/theme/estore/assets/img/categori/cat2.jpg" alt="" style={{width: "400px"}} />
    </Col>
    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
    <img src="https://preview.colorlib.com/theme/estore/assets/img/categori/cat1.jpg" alt="" style={{width: "400px"}} />
    </Col>
    </Row>
    <Divider orientation="center" style={{fontSize : '35px'}}>Arrival Product</Divider>
    {/* <Row style={{marginLeft: '900px',marginBottom: '30px'}} >
            {ListCategories.map((category,index)=>{
              return(
                <Col span={4} key={index} ><Button className={'custom-button'}type="text"  onChange={(value) => setSelectedCategory(value)}>{category.nameCategory}</Button></Col>
                
              )
             
            })}
              
              
              
            </Row> */}
            <Row gutter={16} style={{ padding: "0px 200px" }}>
  {products.map((product, index) => (
    <Col span={8} key={index}>
      <ProductCard product={product} />
    </Col>
  ))}
</Row>
      <Layout.Content style={{padding: '0px 200px',backgroundColor: 'white', display : 'flex',justifyContent: 'space-between' , height: '400px', margin: '30px 0px'}}>
      <img src="https://preview.colorlib.com/theme/estore/assets/img/collection/latest-man.png" alt="" style={{height : '500px'}} />
      <div style={{width: '450px'}}>
      <Title level={3} style={{fontFamily : 'Yellowtail', fontStyle : 'italic',fontSize : '50px'}}>Get Our
Latest Offers News</Title>
            <Search
      placeholder="Your email here"
      allowClear
      enterButton="Send"
      size="large"
      onSearch={onSearch}
    />
      </div>
    </Layout.Content>
      
    
    </div>

  )
}

export default HomePage
