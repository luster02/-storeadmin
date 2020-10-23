import { gql } from '@apollo/client'
import { Asset } from '../fragments/assets.fragments'

export const GET_ASSET = gql`
    query GetAsset($id: Int!) {
      getAsset(id: $id) {
        ...AssetParts
      }
    }
    ${Asset}
`
export const GET_ALL_ASSETS = gql`
    query GetAllAssets($gallery_id: Int!) {
      getAllAssets(gallery_id: $gallery_id) {
        ...AssetParts
      }
    }
    ${Asset}
`

export const GET_GALLERY = gql`
  query GetGallery($id: Int!) {
    getOneGallery(id: $id) {
      id
      folder
      assets{
        ...AssetParts
      }
    }
  }
  ${Asset}
`