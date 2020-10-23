import React, { Suspense } from 'react'
import { Spin } from 'antd';
import { Switch } from 'react-router-dom'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'
import { routes } from './routes'

export function Navigation() {
    return (
        <Switch>
            <Suspense fallback={<Spin />}>
                <PrivateRoute exact path="/" component={routes.Home} />
                <PrivateRoute exact path="/products" component={routes.Products} />
                <PrivateRoute exact path="/assets" component={routes.Assets} />
                <PrivateRoute exact path="/shop" component={routes.Shop} />
                <PrivateRoute exact path="/orders" component={routes.Orders} />
                <PrivateRoute exact path="/customers" component={routes.Customers} />
                <PublicRoute exact path="/login" component={routes.Login} />
                <PublicRoute exact path="/register" component={routes.Register} />
            </Suspense>
        </Switch>
    )
}