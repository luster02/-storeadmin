import React from 'react'
import Axios from 'axios'
import { useQuery, useMutation } from '@apollo/client'
import AssetsContent from './AssetsContent'
import { useApp } from '../../context/AppContext'
import { heroku_rest } from '../../global/endpoints'
import { getToken } from '../../global/storage'
import { GET_ALL_ASSETS } from '../../gql/queries/assets.queries'
import { DELETE_ASSET } from '../../gql/mutations/assets.mutations'

const AssetsContainer = () => {
    const { user_info } = useApp()
    const { data, loading, refetch } = useQuery(GET_ALL_ASSETS, {
        variables: { gallery_id: user_info.data?.currentUser.gallery.id }
    })
    const { getAllAssets = [] } = data || {}
    const [mutate_delete] = useMutation(DELETE_ASSET, {
        errorPolicy: 'all'
    })

    async function upload(file) {
        const token = getToken() || ''
        return await Axios.post(
            `${heroku_rest}/asset/${user_info.data?.currentUser.gallery.id}`,
            file,
            {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }
        )
    }

    async function deleteAsset(id) {
        await mutate_delete({
            variables: { id }
        })
        refetch()
    }

    return <AssetsContent
        assets={getAllAssets}
        loading={loading}
        upload={upload}
        deleteAsset={deleteAsset}
        refetch_assets={refetch}
    />
}

export default AssetsContainer
