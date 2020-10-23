import React from 'react'
import { useQuery } from '@apollo/client'
import ProductsContent from './ProductsContent'
import { GET_PRODUCTS } from '../../gql/queries/product.queries'
import { ProductsProvider } from '../../context/ProductsContext'

const ProductsContainer = () => {
    const { data, loading } = useQuery(GET_PRODUCTS)
    const { getAllProducts = [] } = data || {}

    return <ProductsProvider>
        <ProductsContent
            products={getAllProducts}
            loading={loading}
        />
    </ProductsProvider>
}

export default ProductsContainer
