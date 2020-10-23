import { gql } from '@apollo/client'

export const CREATE_PRODUCT = gql`
    mutation createProduct($productData: ProductDto!, $id: Int!){
      createProduct(productData: $productData, id: $id){
        success
      }
    }
`
export const EDIT_PRODUCT = gql`
  mutation EditProduct($productData: ProductDto!, $id: Int!){
    editProduct(productData: $productData, id: $id){
      success
    }
  }
`
export const PUSH_ASSETS = gql `
  mutation PushAssets($assets: [Int!]!, $id: Int!) {
    pushAssets(assets: $assets, id: $id) {
      success
    }
  }
`

export const PULL_ASSETS = gql `
  mutation PullAssets($assets: [Int!]!, $id: Int!) {
    pullAssets(assets: $assets, id: $id) {
      success
    }
  }
`

export const DELETE_PRODUCT = gql `
  mutation DeleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      success
    }
  }
`