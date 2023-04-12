import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Form, Input,InputNumber,Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';
import { iCategory } from '../../../types/category';

interface IProps{
    categories: iCategory[],
    onAdd: (categories: iCategory)=>void;
    
}

const AddCategory = (props:IProps) => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log(values);
    
      props.onAdd(values);
      navigate('/admin/categories')
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
                label="Category Name"
                name="name"
                rules={[{ required: true, message: 'Please enter field' }]}
            >
                <Input />
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


  



export default AddCategory
