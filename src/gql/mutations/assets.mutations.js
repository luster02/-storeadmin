import { gql } from '@apollo/client'

export const CREATE_GALLERY = gql`
    mutation CreateGallery($galleryData: GalleryDto!, $id: Int!) {
      createFoler(galleryData: $galleryData, id: $id) {
        success
      }
    }
`

export const DELETE_ASSET = gql`
    mutation DeleteAsset($id: Int!) {
      deleteAsset(id: $id) {
        success
      }
    }
`