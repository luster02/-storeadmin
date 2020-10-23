import { lazy } from 'react'

export const routes = {
    Home: lazy(() => import('../pages/home/HomeContainer')),
    Login: lazy(() => import('../pages/LoginPage')),
    Register: lazy(() => import('../pages/RegisterPage')),
    Products: lazy(() => import('../pages/products/ProductsContainer')),
    Assets: lazy(() => import('../pages/assets/AssetsContainer')),
    Shop: lazy(() => import('../pages/shop/ShopContainer')),
    Orders: lazy(() => import('../pages/orders/OrdersContainer')),
    Customers: lazy(() => import('../pages/customers/CustomersContainer'))
}