import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { saveToken, removeToken } from '../global/storage'
import { CURRENT_USER_AUTH } from '../gql/queries/auth.queries'

const AuthContext = React.createContext()

export function AuthProvider(props) {
    const { data, loading } = useQuery(CURRENT_USER_AUTH)
    const [isAuth, setIsAuth] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        if (data !== undefined) setIsAuth(true)
    }, [data, reload])

    function loginSuccess(token = "") {
        saveToken(token)
        setIsAuth(true)
        setReload(true)
    }

    function onAuthSuccess() {
        setIsAuth(true)
    }

    function logOut() {
        removeToken()
        setIsAuth(false)
    }


    const value = {
        isAuth,
        loading,
        loginSuccess,
        onAuthSuccess,
        logOut
    }

    return <AuthContext.Provider value={value} {...props} />
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (!context) throw new Error('useAuth is out from provider')
    return context
}