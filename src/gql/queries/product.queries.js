import { gql } from '@apollo/client'
import { Product } from '../fragments/products.fragments'
import { Asset } from '../fragments/assets.fragments'

export const GET_PRODUCTS = gql`
    {
      getAllProducts{
        ...ProductParts
        assets {
          ...AssetParts
        }       
      }
    }
    ${Product}
    ${Asset}
`

export const GET_PRODUCTS_BY_NAME = gql`
  query getProductsByName($name: String!) {
    getProductsByName(name: $name) {
      ...ProductParts 
      assets {
        ...AssetParts
      }       
    }
  }
  ${Product}
  ${Asset}
`

export const GET_PRODUCTS_BY_DESCRIPTION = gql`
  query GetProductsByDescription($description: String!) {
    getProductsByDescription(description: $description) {
      ...ProductParts
      assets {
        ...AssetParts
      } 
    }
  }
  ${Product}
  ${Asset}
`

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String!) {
    getProductsByCategory(category: $category) {
      ...ProductParts
      assets {
        ...AssetParts
      } 
    }
  }
  ${Product}
  ${Asset}
`