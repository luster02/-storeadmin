import React from 'react'
import { useQuery } from '@apollo/client'
import { CURRENT_USER } from '../gql/queries/auth.queries'

const AppContext = React.createContext()

export function AppProvider(props) {
    const user_info = useQuery(CURRENT_USER)

    const value = {
        user_info
    }

    return <AppContext.Provider value={value} {...props} />
}

export function useApp() {
    const context = React.useContext(AppContext)
    if (!context) throw new Error('context is out from provider')
    return context
}