import { gql } from '@apollo/client'

export const Asset = gql`
    fragment AssetParts on Asset {
      id
      url
      public_id
    }
`