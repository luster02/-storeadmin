import React, { useState } from 'react'
import { FilePicker } from 'react-file-picker'
import { PageHeader, Image, Space, Spin, message, Button, Modal } from 'antd';
import { CloudUploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { CreateGallery } from './components/CreateGallery'
import { useApp } from '../../context/AppContext'

const AssetsContent = ({ assets = [], loading = true, upload, deleteAsset, refetch_assets }) => {
    const { user_info } = useApp()
    const [Preview, setPreview] = useState(null)

    async function onChange(file) {
        try {
            const fm = new FormData()
            fm.append('file', file)
            await upload(fm)
            refetch_assets()
            message.success('file upload successfully');
        } catch (error) {
            message.error('internal server error');
        }
    }

    const showModal = (url) => {
        setPreview(url)
    };

    const handleOk = e => {
        setPreview(null)
    };

    const handleCancel = e => {
        setPreview(null)
    };

    function confirm() {
        Modal.confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'are you sure to delete this?',
            okText: 'delete',
            cancelText: 'cancel',
            onOk: () => {
                handleOk()
                deleteAsset(Preview.id)
            }
        });
    }

    return (
        <div>
            <PageHeader
                title="Assets"
                subTitle="here you can find all assets"
                extra={[
                    <FilePicker
                        extensions={['jpg', 'jpeg', 'png']}
                        dims={{ minWidth: 100, maxWidth: 5000, minHeight: 100, maxHeight: 5000 }}
                        onChange={file => onChange(file)}
                        onError={error => message.error(error)}
                        key={1}
                    >
                        <Button icon={<CloudUploadOutlined />} type="primary" disabled={!user_info.data?.currentUser.gallery.folder}>
                            upload file
                        </Button>
                    </FilePicker>
                ]}
            />

            <div>
                {loading
                    ? < Space size="middle">
                        <Spin size="large" />
                    </Space>
                    : !user_info.data?.currentUser.gallery.folder
                        ? < CreateGallery user={user_info.data?.currentUser} />
                        : <div className="grid-gallery mt-4">
                            {assets.map((el, index) => (
                                <div className="grid-gallery__item " key={index} >
                                    <img
                                        onClick={() => showModal(el)}
                                        className="grid-gallery__image cursor-pointer"
                                        src={el.url}
                                        alt="arr"
                                    />
                                </div>
                            ))}
                        </div>
                }
            </div>

            <Modal
                title="Preview asset"
                visible={Preview}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        close
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={confirm} danger>
                        delete
                    </Button>,
                ]}
            >
                <Image
                    style={{ height: '350px' }}
                    src={Preview?.url}
                    preview={false}
                    alt="arr"
                />
            </Modal>
        </div >
    )
}

export default AssetsContent
