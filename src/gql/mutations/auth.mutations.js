import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($user: SigninDto!) {
        signin(userData: $user) {
          success
          token
        }
    }
`
export const REGISTER = gql`
    mutation register($user: SignupDto!){
      signup(userData: $user){
        success
      }
    }
`
export const UPDATE_USER = gql`
  mutation UpdateUser($userData: UserDetailDto!) {
  updateUser(userData: $userData) {
    success
  }
}
`