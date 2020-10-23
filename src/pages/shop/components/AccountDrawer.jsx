import React from 'react'
import { useMutation } from '@apollo/client'
import { Button, Drawer, Form, Col, Row, Input, message } from 'antd';
import { useShop } from '../../../context/ShopContext'
import { UPDATE_USER } from '../../../gql/mutations/auth.mutations'

export const AccountDrawerComponent = () => {
    const [form] = Form.useForm();
    const { AccountDrawer, setAccountDrawer } = useShop()
    const [mutate_user] = useMutation(UPDATE_USER, {
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

    function send(userData) {
        mutate_user({
            variables: { userData }
        })
    }

    const onClose = () => {
        setAccountDrawer(false)
    };

    return (
        <Drawer
            title="Account settings"
            width={500}
            onClose={onClose}
            visible={AccountDrawer}
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
                            rules={[{ required: true, message: 'Please enter your name' }]}
                        >
                            <Input placeholder="Please enter your name" />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="lastname"
                            label="Lastname"
                            rules={[{ required: true, message: 'Please enter your lastname' }]}
                        >
                            <Input placeholder="Please enter your lastname" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}
