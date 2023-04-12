import React, { useState } from 'react';
import { Space, Table, Tag, Button, message, Popconfirm, AutoComplete, Input, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Iproduct } from '../../types/product';
import { Link, useNavigate } from 'react-router-dom';
import { iCategory } from '../../types/category';
import { SearchOutlined } from "@ant-design/icons";

interface DataType {
    category: string;
    _id?: number;
    name: string;
    price: number;
    description: string;
    image: string;
    categoryId: number;
    key: string | undefined;
}
interface IProps {
    // key: any;

    products: Iproduct[],
    onremove: (id: number) => void;
    categories: iCategory[],

}

const AdminPageManager = (props: IProps) => {
    const navigate = useNavigate();
    const validateClick = ()=>{
        const user = localStorage.getItem("accessToken");

        if(!user){
            message.error('You need login to crud product');
            navigate('/admin/products')
        }
    }
    const data = props.products.map((item: Iproduct) => {
        const { name } = item.categoryId;
        return {
            key: item._id,
            ...item,
            category: name ? name : 'ko co du lieu'
        }
    })
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: "name",
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: "price",
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: "description",
            key: 'description',
        },
        {
            title: 'Image',
            render: (_, record) => (
                <Image width={200} src={`${record.image}`} />
            ),
            key: 'image',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}  onClick={validateClick}> <Link to={`${record._id}/update`}>update</Link></Button>
                    <Popconfirm
                        placement="top"
                        title="Xóa?"
                        description="Xóa ư?"
                        
                        onConfirm={() => props.onremove(record._id ?? 0)}
                        
                        okText="Yes"
                        cancelText="No">
                        <Button type='primary' danger onClick={validateClick}>Remove</Button>
                    </Popconfirm>


                </Space>
            ),
        },
    ];

    const [filterInput, setInput] = useState('');
    const filterData = () => {
        if (filterInput === '') {
            return data
        }
        if (filterInput) {
            return data.filter(({ name }) => name.toLowerCase().includes(filterInput.toLowerCase()))
        }
    }
    return (
        <div>
            <Space wrap style={{ float: 'right', marginBottom: 40 }}> <Button type="primary"><a href="/admin/products/add">Add new</a></Button></Space>
            <AutoComplete
                style={{ width: "100%", maxWidth: "300px" }}
                filterOption={false}
                onSearch={setInput}
            >
                <Input
                    size="large"
                    placeholder="Search products"
                    suffix={<SearchOutlined />}
                />
            </AutoComplete>
            <Table columns={columns} dataSource={filterData()} />
        </div>
    )


}
export default AdminPageManager;