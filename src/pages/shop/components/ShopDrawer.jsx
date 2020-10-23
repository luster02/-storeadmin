import React from 'react'
import { useMutation } from '@apollo/client'
import { Button, Drawer, Form, Col, Row, Input, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useShop } from '../../../context/ShopContext'
import { UPDATE_SHOP, DELETE_LOGO } from '../../../gql/mutations/shop.mutations'
import { GET_SHOP } from '../../../gql/queries/shop.queries'

export const ShopDrawerComponent = ({ shop }) => {
    const [form] = Form.useForm();
    const { ShopDrawer, setShopDrawer, setImageDrawer } = useShop()
    const [mutate_shop] = useMutation(UPDATE_SHOP, {
        errorPolicy: 'all',
        onCompleted: () => {
            message.success('user data updated')
            onClose()
        },
        onError: () => {
            message.error('internal server error')
            onClose()
        }
    })


    const [mutate_delete_logo] = useMutation(DELETE_LOGO, {
        errorPolicy: 'all',
        awaitRefetchQueries: true,
        refetchQueries: [{ query: GET_SHOP }],
        variables: { id: shop.id }
    })

    function send(shopData) {
        mutate_shop({
            variables: {
                shopData,
                id: shop.id
            }
        })
    }

    function delete_logo() {
        Modal.confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure to delete logo',
            okText: 'delete',
            cancelText: 'cancel',
            onOk: () => {
                mutate_delete_logo()
            }
        });
    }

    function openImageDrawer() {
        onClose()
        setImageDrawer(true)
    }

    const onClose = () => {
        setShopDrawer(false)
    };

    return (
        <Drawer
            title="Shop settings"
            width={500}
            onClose={onClose}
            visible={ShopDrawer}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
                <div
                    style={{
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button onClick={form.submit} type="primary">
                        Submit
                    </Button>
                </div>
            }
        >
            <Form
                layout="vertical"
                hideRequiredMark
                form={form}
                onFinish={send}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter shop name' }]}
                        >
                            <Input placeholder="Please enter your name" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please enter your lastname' }]}
                        >
                            <Input placeholder="Please enter shop description" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Row gutter={16}>
                <Col span={24}>
                    {!shop.logo && <Button block onClick={openImageDrawer} >Update Logo</Button>}
                    {shop.logo && <Button block onClick={delete_logo} danger>Delete Logo</Button>}
                </Col>
            </Row>
        </Drawer>
    )
}
