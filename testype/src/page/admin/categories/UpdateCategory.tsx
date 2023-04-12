import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Form, Input,InputNumber,Select } from 'antd';
import { Option } from 'antd/es/mentions';
import { useNavigate, useParams } from 'react-router-dom';
import { iCategory } from '../../../types/category';
interface iProps{
  categories: iCategory[];
  onupdate: (category: iCategory) => void;
}
const UpdateCategory = (props:iProps) => {
  // console.log(props);
  // return
  
  const {id} = useParams();  
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const currentCategories = props.categories.find((item) => item._id === id);
    form.setFieldsValue(currentCategories);
  }, [form, props]);
  const onFinish = (values: any) => {
    const updatedCategories: iCategory = {
      ...values,
      _id: id,
    };
    console.log(values);
    
      props.onupdate(updatedCategories);
      navigate('/admin/categories')
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
                label="Category Name"
                name="name"
                rules={[{ required: true, message: 'Please enter field' }]}
            >
                <Input />
            </Form.Item>
  
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Update Categories
                </Button>
            </Form.Item>
        </Form>
    </div>
  )
  }


export default UpdateCategory
