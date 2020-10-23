import React from 'react'
import { Row, Col, List, PageHeader, Button, Empty } from 'antd'
import { TagOutlined, PlusOutlined } from '@ant-design/icons'
import { DrawerForm } from './components/Drawer'
import { ProductDetail } from './components/ProductDetail'
import { DrawerImages } from './components/DrawerImages'
import { useProducts } from '../../context/ProductsContext'

const ProductsPage = ({ products = [], loading }) => {
    const { Current, setCurrent, setVisible } = useProducts()

    const showDrawer = () => {
        setVisible(true)
    };

    return (
        <div>
            <PageHeader
                title="Products"
                subTitle="here you can find all products"
                extra={[
                    <Button
                        type="primary"
                        key="1"
                        icon={<PlusOutlined />}
                        onClick={showDrawer}
                        disabled={Current}
                    >
                        New product
                    </Button>,
                ]}
            />
            <Row justify="center" gutter={6}>
                <Col span={8} style={{ padding: '5px' }}>
                    <List
                        itemLayout="vertical"
                        loading={loading}
                        dataSource={products}
                        pagination={{
                            pageSize: 10,
                        }}
                        renderItem={item => (
                            <List.Item
                                extra={
                                    <Button
                                        onClick={() => setCurrent(item)}
                                        type="ghost">
                                        View
                                    </Button>
                                }
                            >
                                <List.Item.Meta
                                    avatar={<TagOutlined />}
                                    title={item.name}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={16} style={{ padding: '5px' }}>
                    {!Current
                        ? <Empty description='Select any product for display data' />
                        : <ProductDetail Current={Current} handleCurrent={setCurrent} />
                    }
                </Col>
            </Row>

            <DrawerForm />
            <DrawerImages />

        </div>
    )
}

export default ProductsPage
