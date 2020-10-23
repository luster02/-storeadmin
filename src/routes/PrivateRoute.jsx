import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

export const PrivateRoute = ({ component: Component, data, ...rest }) => {
    const auth = useAuth()
    return (
        <Route {...rest} render={props => (
            (auth.isAuth)
                ? <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};