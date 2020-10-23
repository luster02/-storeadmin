import React from 'react'
import { PageHeader, Button, Descriptions, Statistic, Card, Row, Col } from 'antd';
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import { AccountDrawerComponent } from './components/AccountDrawer'
import { ShopDrawerComponent } from './components/ShopDrawer'
import { ImageDrawerComponent } from './components/ImageDrawer'
import { useShop } from '../../context/ShopContext'
import { useApp } from '../../context/AppContext'
import PLACE from '../../assets/placeholder.png'

const ShopContent = ({ shop = {}, assets = [], products = [] }) => {
    const { user_info } = useApp() || {}
    const { setAccountDrawer, setShopDrawer } = useShop()
    const { currentUser } = user_info.data || {}

    const openShopDrawer = () => {
        setShopDrawer(true)
    }
    const openAccountDrawer = () => {
        setAccountDrawer(true)
    }

    //console.log(shop)

    return (
        <div>
            <PageHeader
                title="Shop"
                subTitle="info shop"
                extra={[
                    <Button
                        key="1"
                        onClick={openAccountDrawer}
                        icon={<UserOutlined />}
                    >
                        Account settings
                    </Button>,
                    <Button
                        key="2"
                        onClick={openShopDrawer}
                        icon={<SettingOutlined />}
                    >
                        Shop settings
                    </Button>,
                ]}
                avatar={{ src: shop.logo ? shop.logo.url : PLACE, size: 'large' }}
            >
                <Descriptions size="small" column={3}>
                    <Descriptions.Item label="name">{currentUser?.details?.name ? currentUser?.details?.name : 'username'}</Descriptions.Item>
                    <Descriptions.Item label="lastname">{currentUser?.details?.lastname ? currentUser?.details?.lastname : 'lastname'}</Descriptions.Item>
                    <Descriptions.Item label="shop name">{shop.name ? shop.name : 'shop name'}</Descriptions.Item>
                    <Descriptions.Item label="shop description">{shop.description ? shop.description : 'shop description'}</Descriptions.Item>
                </Descriptions>
            </PageHeader>

            <div className="site-statistic-demo-card">
                <Row gutter={16}>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Products"
                                value={products.length}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Assets"
                                value={assets.length}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={16} style={{ marginTop: '10px' }}>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Orders"
                                value={0}
                            />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card>
                            <Statistic
                                title="Customers"
                                value={0}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>


            <AccountDrawerComponent />
            <ShopDrawerComponent shop={shop} />
            <ImageDrawerComponent />

        </div>
    )
}

export default ShopContent
