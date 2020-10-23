import React, { useState } from 'react'

const ProductsContext = React.createContext()

export function ProductsProvider(props) {
    const [Current, setCurrent] = useState(null)
    const [visible, setVisible] = useState(false)
    const [DrawerImages, setDrawerImages] = useState(false)

    const value = {
        Current,
        visible,
        setCurrent,
        setVisible,
        DrawerImages,
        setDrawerImages
    }

    return <ProductsContext.Provider value={value} {...props} />
}

export function useProducts() {
    const context = React.useContext(ProductsContext)
    if (!context) throw new Error('context is out from provider')
    return context
}