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
