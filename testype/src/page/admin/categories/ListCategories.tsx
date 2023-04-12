import React, { useState } from 'react';
import { Space, Table, Tag, Button,message, Popconfirm,AutoComplete, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { iCategory } from '../../../types/category';

interface DataType {
    _id?: string | undefined;
    name: string;
    key: string | undefined;

}
interface IProps {
    // key: any;
    categories: iCategory[],
    onremove: (id: string) => void;

}
const ListCategories = (props: IProps) => {
    console.log(props);
    const data = props.categories.map((item: iCategory) => {
        return {
            key: item._id,
            ...item
        }
    })

    const columns: ColumnsType<DataType> = [
        
        {
            title: '',
            dataIndex: "",
            key: '',
        }
        ,{
            title: 'Name',
            dataIndex: "name",
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
   
                <Space size="middle">
                    <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }} > <Link to={`${record._id}/update`}>update</Link></Button>
                    <Popconfirm
                        placement="top"
                        title="Xóa?"
                        description="Xóa ư?"
                        
                        onConfirm={()=> props.onremove(record._id ?? '') }
                        okText="Yes"
                        cancelText="No">
                        <Button type='primary' danger>Remove</Button>
                    </Popconfirm>
                    

                </Space>
            ),
        },
    ];
    const [filterInput, setInput] = useState('');
    const filterData = () => {
        if(filterInput === '') {
            return data
        } 
        if(filterInput) {
          return data.filter(({ name }) =>name.toLowerCase().includes(filterInput.toLowerCase()))
        }
        
      }

    return (
        <div>
            <Space wrap style={{float: 'right',marginBottom: 40}}> <Button type="primary"><a href="/admin/categories/add">Add Categories</a></Button></Space>
            <AutoComplete
                style={{ width: "100%", maxWidth: "300px" }}
                filterOption={false}
                onSearch={setInput}
            >
                <Input
                    size="large"
                    placeholder="Search categories"
                    suffix={<SearchOutlined />}             
                />
            </AutoComplete>
            <Table columns={columns} dataSource={filterData()} />
        </div>
    )
}
export default ListCategories;