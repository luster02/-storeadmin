import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Empty, Button, Modal, Input, message } from 'antd';
import { CREATE_GALLERY } from '../../../gql/mutations/assets.mutations'
import { GET_GALLERY } from '../../../gql/queries/assets.queries'

export const CreateGallery = ({ user = {} }) => {
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [mutate] = useMutation(CREATE_GALLERY, {
        errorPolicy: 'all',
        onCompleted: () => {
            handleCancel()
            message.success('Gallery created successfully')
        },
        onError: () => {
            message.error('internal server error')
        }
    })

    const showModal = () => {
        setVisible(true)
    };

    const handleOk = e => {
        mutate({
            variables: {
                galleryData: {
                    folder: name
                },
                id: user.gallery.id
            },
            refetchQueries: [{ query: GET_GALLERY, variables: { id: user.gallery.id } }],
            awaitRefetchQueries: true
        })
    };

    const handleCancel = e => {
        setVisible(false)
    };

    return (
        <div>
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                    height: 60,
                }}
                description={
                    <span>
                        You need create a gallery for upload images
                    </span>
                }
            >
                <Button onClick={showModal} type="primary">Create Now</Button>
            </Empty>

            <Modal
                title="Create gallery"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input placeholder="Gallery name" onChange={e => setName(e.target.value)} />
            </Modal>
        </div>
    )
}
