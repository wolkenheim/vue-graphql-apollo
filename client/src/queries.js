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