import React, { useEffect, useState } from 'react';

import { Iproduct } from '../types/product';
import { useParams } from 'react-router-dom';
import { getOne } from '../api/product';
import { Card, Row, Col, Image, Button } from 'antd';
interface IProps {
  // key: any;
  products: Iproduct[],
  
}

const ProductDetail = () => {
 

  const [product, setProduct] = useState<any>({});

  const { id }:any = useParams();

  useEffect(() => {
    getOne(id).then(({ data }) => setProduct(data));
  }, []);


  return (
    <Row gutter={[16, 16]} style={{padding: '0px 200px', display:'flex', alignItems:'center'}}>
    <Col xs={24} md={12}>
      <Image src={product.image} alt={product.name} style={{width: '400px'}} />
    </Col>
    <Col xs={24} md={12}>
      <Card title={product.name} bordered={false} style={{border: '1px solid gray'}}>
        <p>{product.description}</p>
        <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{product.price}</p>
        <Button type="primary">Add to Cart</Button>
      </Card>
    </Col>
  </Row>
  );
};

export default ProductDetail;
