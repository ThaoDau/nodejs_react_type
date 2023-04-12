import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Form, Input, InputNumber, Select, message } from 'antd';
import { Option } from 'antd/es/mentions';
import { useNavigate, useParams } from 'react-router-dom';
import { Iproduct } from '../../types/product';
import { iCategory } from '../../types/category';
interface iProps {
  products: Iproduct[];
  onupdate: (product: Iproduct) => void;
  categories: iCategory[];
}

const UpdateAdminPage = (props: iProps) => {
  console.log(props.categories);
  
  
  const { id } = useParams();
  // console.log(id);
  
  
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const currentProduct = props.products.find((item) => item._id === id);
    console.log(currentProduct);
    currentProduct
    form.setFieldsValue(currentProduct);
  }, [form, props]);

  const onFinish = (values: any) => {
    
    const updatedProduct: Iproduct = {
      
      ...values,
      _id: id,

    };
    console.log(values);
    
    props.onupdate(updatedProduct);
    message.success('Update Success');
    navigate('/admin/products')
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800, margin: '0' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please enter field' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"

          rules={[{ required: true, message: 'Please enter field' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter field' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Image"
          name="image"
          rules={[{ required: true, message: 'Please enter field' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select
                        placeholder="Select a option and change input text above"
                        
                        allowClear
                      >
                        {props.categories.map((item:any)=>{ 
                          return(
                              <Select.Option key={item._id}  value={`${item._id}`}>{item.name}</Select.Option>
                          )
                        })}
                      </Select>

        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div> 
  )
}

export default UpdateAdminPage
