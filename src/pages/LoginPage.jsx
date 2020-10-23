import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { Row, Col, Button, Form, Input, Card, Modal } from 'antd';
import { useAuth } from '../context/AuthContext'
import { LOGIN } from '../gql/mutations/auth.mutations'

const LoginPage = () => {
    const auth = useAuth()
    const [mutate, { loading }] = useMutation(LOGIN, {
        onCompleted: ({ signin }) => {
            auth.loginSuccess(signin.token);
        },
        onError: () => {
            Modal.error({ content: 'wrong username or password' })
        }
    })

    const onFinish = async user => {
        mutate({ variables: { user } })
    };

    return (
        <div className="container" >
            <Row justify="center">
                <Col span={24}>
                    <div style={{ textAlign: 'center', }}>
                        <Card
                            title="Login"
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
                                    label="Password"
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please input your password!' }
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 4, span: 16 }} name="remember" valuePropName="checked">
                                    <Button type="link">
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

export default LoginPage
