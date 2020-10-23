import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { heroku_graph } from './endpoints'
import { getToken } from './storage'

const httpLink = createHttpLink({
    uri: heroku_graph,
})

const authLink = setContext((_, { headers }) => {
    const token = getToken()
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
})

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    assumeImmutableResults: true
})