import { gql } from '@apollo/client'

export const UPDATE_SHOP = gql`
    mutation UpdateShop($shopData: ShopDto!, $id: Int!) {
      updateShop(shopData: $shopData, id: $id) {
        success
      }
    }
`
export const UPDATE_LOGO = gql`
  mutation UpdateLogo($logo: Int!,$id: Int!) {
    updateLogo(logo: $logo, id: $id){
      success
    }
  }
`

export const DELETE_LOGO = gql`
  mutation DeleteLogo($id:Int!) {
    deleteLogo(id: $id){
      success
    }
  }
`