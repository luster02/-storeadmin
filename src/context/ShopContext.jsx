import React, { useState } from 'react'

const ShopContext = React.createContext()

export function ShopProvider(props) {
    const [AccountDrawer, setAccountDrawer] = useState(false)
    const [ShopDrawer, setShopDrawer] = useState(false)
    const [ImageDrawer, setImageDrawer] = useState(false)

    const value = {
        AccountDrawer,
        ShopDrawer,
        setAccountDrawer,
        setShopDrawer,
        ImageDrawer,
        setImageDrawer
    }

    return <ShopContext.Provider value={value} {...props} />
}

export function useShop() {
    const context = React.useContext(ShopContext)
    if (!context) throw new Error('context is out from provider')
    return context
}