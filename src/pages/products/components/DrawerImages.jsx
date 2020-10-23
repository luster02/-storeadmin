import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Button, Drawer, Space, Spin, message } from 'antd'
import { useApp } from '../../../context/AppContext'
import { useProducts } from '../../../context/ProductsContext'
import { GET_ALL_ASSETS } from '../../../gql/queries/assets.queries'
import { GET_PRODUCTS } from '../../../gql/queries/product.queries'
import { PUSH_ASSETS } from '../../../gql/mutations/product.mutations'

export const DrawerImages = () => {
    const { user_info } = useApp()
    const { DrawerImages, setDrawerImages, Current } = useProducts()
    const [ListFiles, setListFiles] = useState([])
    const { data, loading } = useQuery(GET_ALL_ASSETS, {
        variables: { gallery_id: user_info.data?.currentUser.gallery.id }
    })
    const { getAllAssets = [] } = data || {}

    const [mutate] = useMutation(PUSH_ASSETS, {
        errorPolicy: 'all',
        variables: {
            id: Current?.id,
            assets: ListFiles
        },
        onCompleted: () => {
            onClose()
            message.success('images added successfully')
        },
        onError: () => {
            message.error('internal server error')
        }
    })

    const onClose = () => {
        setDrawerImages(false)
        setListFiles([])
    };

    function PushImage(element) {
        if (ListFiles.includes(element)) {
            setListFiles(ListFiles.filter(el => el !== element))
        } else {
            setListFiles(ListFiles => [...ListFiles, element])
        }
    }

    function save() {
        mutate({
            refetchQueries: [{ query: GET_PRODUCTS }],
            awaitRefetchQueries: true
        })
    }

    return (
        <Drawer
            title="Add images to your product"
            width={800}
            onClose={onClose}
            visible={DrawerImages}
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
                    <Button onClick={save} type="primary" disabled={ListFiles.length === 0}>
                        Save
                    </Button>
                </div>
            }
        >
            {loading
                ? < Space size="middle">
                    <Spin size="large" />
                </Space>
                : <div className="grid-gallery mt-4">
                    {getAllAssets.map((el, index) => (
                        <div
                            className={ListFiles.includes(el.id)
                                ? "grid-gallery__item border-active cursor-pointer"
                                : "grid-gallery__item cursor-pointer"
                            }
                            key={index}
                        >
                            <img
                                onClick={() => PushImage(el.id)}
                                className="grid-gallery__image rounded-lg"
                                src={el.url}
                                alt="arr"
                            />
                        </div>
                    ))}
                </div>
            }
        </Drawer>
    )
}
