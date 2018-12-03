/**
 * Store all GQL queries in central file
 */

import { gql } from 'apollo-boost';

export const GET_POSTS = gql`
    query {
      getPosts {
        _id
        title
        imageUrl
        description
      }
    }
    `;

export const GET_POST = gql`
    query($postId: ID!){
      getPost(postId: $postId)   {
          _id
          title
          imageUrl
          categories
          description
          likes
          createdDate
          messages {
            _id
            messageBody
            messageDate
            messageUser {
              _id
              username
              avatar
            }
          }
      }
    }
    `;

export const ADD_POST = gql`
    mutation(
      $title: String!,
      $imageUrl:String!,
      $categories: [String]!,
      $description: String!,
      $userId:ID!
    ) {
      addPost(
        title:$title
        imageUrl:$imageUrl
        categories:$categories
        description:$description
        userId:$userId
      ){
        _id
        title
        imageUrl
        categories
        description
      }
    }
    `;

export const ADD_POST_MESSAGE = gql`
    mutation(
      $messageBody: String!,
      $userId:ID!,
      $postId:ID!
    ) {
      addPostMessage(messageBody: $messageBody, userId: $userId, postId: $postId){
        _id
        messageBody
        messageDate
        messageUser
      }
}
`;

export const INFINITE_SCROLL_POSTS = gql`
    query(
      $pageNum: Int!,
      $pageSize: Int!,
    
    ) {
      infiniteScrollPosts(
        pageNum:$pageNum
        pageSize:$pageSize
      ){
        hasMore
        posts {
          _id
          title
          imageUrl
          categories
          description
          likes
          createdDate
          messages {
            _id
          }
          userId {
            _id
            username
            avatar
          }
        }
      }
    }
    `;


export const LOGIN_USER = gql`
    mutation($email: String!, $password: String!) {
      loginUser(
        email: $email
        password: $password
      ) {
        token
      }
    }
    `;

export const REGISTER_USER = gql`
    mutation($username: String!, $email: String!, $password: String!) {
      registerUser(
        username: $username
        email: $email
        password: $password
      ) {
        token
      }
    }
    `;

export const GET_CURRENT_USER = gql`
    query {
      getCurrentUser {
        _id
        username
        email
        avatar
        favorites {
            _id
            title
            imageUrl
        }
        joinDate
      }
    }
    `;
