import { gql } from '@apollo/client'

export const Product = gql`
  fragment ProductParts on Product {
    id
    name
    description
    price
    category
  }
`