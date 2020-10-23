import { gql } from '@apollo/client';

export const CURRENT_USER_AUTH = gql`
  query getCurrentUser {
    currentUser{
      id
    }
  }
`

export const CURRENT_USER = gql`
  query getCurrentUser {
    currentUser{
      id
      username
      email
      details {
        id
        name
        lastname
      }
      shop {
        id
      }
      gallery {
        id
        folder
      }
    }
  }
`