import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Row, Col, Button, Drawer, Form, Input } from 'antd'
import { useProducts } from '../../../context/ProductsContext'
import { useApp } from '../../../context/AppContext'
import { CREATE_PRODUCT, EDIT_PRODUCT } from '../../../gql/mutations/product.mutations'
import { GET_PRODUCTS } from '../../../gql/queries/product.queries'

export const DrawerForm = () => {
    const [form] = Form.useForm();
    const { user_info } = useApp() || []
    const { visible, setVisible, Current = {} } = useProducts()
    const [mutate_create] = useMutation(CREATE_PRODUCT, {
        errorPolicy: 'all',
        onCompleted: () => {
            onClose()
        }
    })
    const [mutate_edit] = useMutation(EDIT_PRODUCT, {
        errorPolicy: 'all',
        onCompleted: () => {
            onClose()
        }
    })

    const onClose = () => {
        setVisible(false)
        form.resetFields()
    };

    const onSubmit = productData => {
        if (Current) {
            mutate_edit({
                variables: { productData, id: Current.id },
                refetchQueries: [{ query: GET_PRODUCTS }],
                awaitRefetchQueries: true
            })
        } else {
            mutate_create({
                variables: {
                    productData: { ...productData, price: parseFloat(productData.price) },
                    id: user_info.data?.currentUser.shop.id
                },
                refetchQueries: [{ query: GET_PRODUCTS }],
                awaitRefetchQueries: true
            })
        }
    }

    useEffect(() => {
        form.resetFields()
        if (Current) {
            form.setFieldsValue({ name: Current.name })
            form.setFieldsValue({ price: Current.price })
            form.setFieldsValue({ category: Current.category })
            form.setFieldsValue({ description: Current.description })
        }
    }, [Current, form])

    return (
        <Drawer
            title={Current ? "Edit your product" : "Create new product"}
            width={600}
            onClose={onClose}
            visible={visible}
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
                form={form}
                hideRequiredMark
                onFinish={onSubmit}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please enter user name' }]}
                        >
                            <Input placeholder="Please enter user name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="price"
                            label="price"
                            rules={[{ required: true, message: 'Please enter price' }]}
                        >
                            <Input type="number" placeholder="Please enter url" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="category"
                            label="category"
                            rules={[{ required: true, message: 'Please enter the category' }]}
                        >
                            <Input placeholder="Please enter the category" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: 'please enter url description',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="please enter url description" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    )
}
