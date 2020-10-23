import React from 'react'
import { useQuery } from '@apollo/client'
import ShopContent from './ShopContent'
import { ShopProvider } from '../../context/ShopContext'
import { useApp } from '../../context/AppContext'
import { GET_SHOP } from '../../gql/queries/shop.queries'
import { GET_PRODUCTS } from '../../gql/queries/product.queries'
import { GET_ALL_ASSETS } from '../../gql/queries/assets.queries'

const ShopContainer = () => {
    const { user_info } = useApp()
    const { data } = useQuery(GET_SHOP, {
        errorPolicy: 'all',
        FetchPolicy: 'cache-and-network'
    })
    const { getShop } = data || {}
    const { data: products_data } = useQuery(GET_PRODUCTS, {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network'
    })
    const { getAllProducts = [] } = products_data || {}
    const { data: assets_data } = useQuery(GET_ALL_ASSETS, {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
        variables: { gallery_id: user_info.data?.currentUser.gallery.id }
    })
    const { getAllAssets = [] } = assets_data || {}


    return <ShopProvider>
        <ShopContent
            shop={getShop}
            assets={getAllAssets}
            products={getAllProducts}
        />
    </ShopProvider>
}

export default ShopContainer
