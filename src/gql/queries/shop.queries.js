import { gql } from '@apollo/client';

export const GET_SHOP = gql`
  {
    getShop{
      id
      name
      description
      logo{
      url
      }
    }
  }
`