import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Row, Col, Button, Form, Input, Card, Modal } from 'antd';
import { REGISTER } from '../gql/mutations/auth.mutations'

const RegisterPage = () => {
    const { push } = useHistory()
    const [mutate, { loading }] = useMutation(REGISTER, {
        errorPolicy: 'all',
        onCompleted: () => {
            Modal.success({ content: 'you are alreadey registered', onOk: () => { push('/login') } })
        },
        onError: () => {
            Modal.error({ content: 'internal server error' })
        }
    })

    const onFinish = async ({ password, password2, username, email }) => {
        if (password !== password2) {
            Modal.error({ content: 'passwords do not match' })
            return
        }
        mutate({
            variables: { user: { username, email, password } }
        })
    };

    return (
        <div className="container" >
            <Row justify="center">
                <Col span={24}>
                    <div style={{ textAlign: 'center', }}>
                        <Card
                            title="Register"
                            bordered={true}
                            hoverable={true}
                        >
                            <Form
                                layout="vertical"
                                name="contact"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        { required: true, message: 'Please input your username!' }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Please input your username!' },
                                        { pattern: /\S+@\S+\.\S+/, message: 'invalid email' }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please input your password!' }
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    label="Confirm Password"
                                    name="password2"
                                    rules={[
                                        { required: true, message: 'Please input your password!' }
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 4, span: 16 }} name="remember" valuePropName="checked">
                                    <Button type="link" loading={loading}>
                                        <Link to="/register">
                                            Register here
                                        </Link>
                                    </Button>
                                </Form.Item>


                                <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        Send
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default RegisterPage
