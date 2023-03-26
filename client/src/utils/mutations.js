import { gql } from '@apollo/client';

export const ADD_User = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: String!, $bookId: String!) {
    saveBook(userId: $userId, bookId: $bookId) {
 
    }
  }
`;
export const REMOVE_BOOK = gql`
  mutation removeBook($userId: String!, $bookId: String!) {
    removeBook(userId: $userId, bookId: $bookId) {

    }
  }
`;