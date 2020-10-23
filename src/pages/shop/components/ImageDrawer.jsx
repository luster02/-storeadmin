import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { Button, Drawer, Space, Spin, message } from 'antd'
import { useApp } from '../../../context/AppContext'
import { useShop } from '../../../context/ShopContext'
import { GET_ALL_ASSETS } from '../../../gql/queries/assets.queries'
import { GET_SHOP } from '../../../gql/queries/shop.queries'
import { UPDATE_LOGO } from '../../../gql/mutations/shop.mutations'

export const ImageDrawerComponent = () => {
    const { user_info } = useApp()
    const { ImageDrawer, setImageDrawer } = useShop()
    const [SelectedFile, setSelectedFile] = useState(null)
    const { data, loading } = useQuery(GET_ALL_ASSETS, {
        variables: { gallery_id: user_info.data?.currentUser.gallery.id }
    })
    const { getAllAssets = [] } = data || {}

    const [mutate] = useMutation(UPDATE_LOGO, {
        errorPolicy: 'all',
        variables: {
            id: user_info.data?.currentUser.shop.id,
            logo: SelectedFile
        },
        onCompleted: () => {
            onClose()
            message.success('logo updated')
        },
        onError: () => {
            message.error('internal server error')
        }
    })

    const onClose = () => {
        setImageDrawer(false)
        setSelectedFile(null)
    };

    function save() {
        mutate({
            refetchQueries: [{ query: GET_SHOP }],
            awaitRefetchQueries: true
        })
    }

    return (
        <Drawer
            title="Select your logo"
            width={750}
            onClose={onClose}
            visible={ImageDrawer}
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
                    <Button onClick={save} type="primary" disabled={SelectedFile === null}>
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
                            className={SelectedFile === el.id
                                ? "grid-gallery__item border-active cursor-pointer"
                                : "grid-gallery__item cursor-pointer"
                            }
                            key={index}
                        >
                            <img
                                onClick={() => setSelectedFile(el.id)}
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
