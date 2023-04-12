
import React from 'react';
import { Card, Row, Col,Statistic  } from 'antd';
import type { CountdownProps } from 'antd';
import { Layout, Menu,Typography,Carousel ,Divider,Button,Rate  } from 'antd';
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

const ProductPage = (props: IProps) => {
  // limit products
  // const limitedProducts = props.products.slice(0,5);
  const products = props.products.map((item: Iproduct) => {
    const category = props.categories.find((itemCate) => itemCate._id == item.categoryId)
    
    return {   
        ...item,
    }
})
// category
  const ListCategories = props.categories.map((item: iCategory)=>{
    return{
      ...item,
    }
  })
  console.log(ListCategories);
  
  const ProductCard = ({ product }:any) => {
    return (
      <Card style={{ margin: '20px 0px', backgroundColor: 'white' }} >
        <img src={`${product.image}`} alt="" style={{width: '95%'}} />
        <Title level={4} style={{ marginBottom: '20px', fontFamily: 'poppins' }}><Link to ={`/products/${product.id}`}>{product.name}</Link></Title>
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
  return (
    <div>
 
    <Divider orientation="center" style={{fontSize : '35px'}}>Arrival Product</Divider>

    
    {/* <Row style={{marginLeft: '900px',marginBottom: '30px'}} >
            {ListCategories.map((category,index)=>{
              
              return(
                <Col span={4} key={index} ><Button className={'custom-button'}type="text" >{category.nameCategory}</Button></Col>
                
              )
             
            })}
              
              
              
            </Row> */}
      <Row gutter={16}style={{padding: '0px 200px'}} >
        {products.map((product, index) => (
          <Col span={8} key={index}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      
    
    </div>

  )
}

export default ProductPage
