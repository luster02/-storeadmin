import React from 'react'
import { useMutation } from '@apollo/client'
import { Row, Col, PageHeader, Button, Descriptions, Image, Modal } from 'antd'
import { DeleteOutlined, EditOutlined, CloseOutlined, ExclamationCircleOutlined, CameraOutlined } from '@ant-design/icons'
import { useProducts } from '../../../context/ProductsContext'
import { DELETE_PRODUCT } from '../../../gql/mutations/product.mutations'
import { GET_PRODUCTS } from '../../../gql/queries/product.queries'

export const ProductDetail = () => {
    const { Current, setCurrent, setVisible, setDrawerImages } = useProducts()
    const [mutate] = useMutation(DELETE_PRODUCT, {
        errorPolicy: 'all',
        onCompleted: () => {
            setCurrent(null)
            Modal.success({ content: 'product deleted successfully' })
        }
    })

    function deleteItem() {
        Modal.confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure to delete this product',
            okText: 'delete',
            cancelText: 'cancel',
            onOk: () => {
                mutate({
                    variables: { id: Current.id },
                    refetchQueries: [{ query: GET_PRODUCTS }],
                    awaitRefetchQueries: true,
                })
            }
        });
    }

    return (
        <>
            <PageHeader
                title={Current.name}
                extra={[
                    <Button key={1} onClick={() => setVisible(true)} icon={<EditOutlined />} />,
                    <Button key={2} onClick={() => setDrawerImages(true)} icon={<CameraOutlined />} />,
                    <Button key={3} onClick={() => setCurrent(null)} icon={<CloseOutlined />} />,
                    <Button key={4} onClick={() => deleteItem()} icon={<DeleteOutlined />} danger />,
                ]}
            />
            <Descriptions >
                <Descriptions.Item label="description">{Current.description}</Descriptions.Item>
                <Descriptions.Item label="category">{Current.category}</Descriptions.Item>
                <Descriptions.Item label="price">{Current.price}</Descriptions.Item>
            </Descriptions>
            <h3>images from this product</h3>
            <Row gutter={8} style={{ maxHeight: '50vh', overflow: 'auto' }}>
                {Current.assets.map((el, index) => (
                    <Col key={el.url} span={6}>
                        <Image
                            key={index}
                            height={250}
                            src={el.url}
                        />
                    </Col>
                ))}
            </Row>
        </>
    )
}
