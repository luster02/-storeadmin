import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
    HomeOutlined,
    InboxOutlined,
    CameraOutlined,
    UsergroupAddOutlined,
    ContainerOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
const { Sider, } = Layout;

export const SideNav = () => {
    return (
        <Sider trigger={null} collapsible collapsed={true}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/">
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<InboxOutlined />}>
                    <Link to="/products">
                        Products
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<CameraOutlined />}>
                    <Link to="/assets">
                        Assets
                   </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<UsergroupAddOutlined />}>
                    <Link to="/customers">
                        Customers
                    </Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<ContainerOutlined />}>
                    <Link to="/orders">
                        Orders
                    </Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<AppstoreOutlined />}>
                    <Link to="/shop">
                        Shop
                   </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}
