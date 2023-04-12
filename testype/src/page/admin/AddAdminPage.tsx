import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Form, Input,InputNumber,Select,Upload  } from 'antd';
import type { UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProductPage = (props:any) => {
  const navigate = useNavigate();
  
    const onFinish = (values: any) => {
        console.log(values);
        
        props.onAdd(values);
        navigate('/admin/products')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    

    return (
        <div>
            <Form
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
                    <Input  />
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
                   {/* <Upload {...propsUpload} className='fileUpload'>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload> */}
                 <Input />
                </Form.Item>

                
                <Form.Item
                    label="Categry"
                    name="categoryId"
                    rules={[{ required: true, message: 'Please enter field' }]}
                >
                    <Select
                        placeholder="Select a option and change input text above"
                        
                        allowClear
                      >
                        {props.categories.map((item:any)=>{ 
                          return(
                              <Option value={`${item._id}`}>{item.name}</Option>
                          )
                        })}
                        
                        
                      </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddProductPage