import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {gql} from 'apollo-boost';
import {defaultClient as apolloClient} from './main';

export default new Vuex.Store({
  state: {
    posts: []
  },
  mutations: {
    setPosts: (state, posts) => {
      state.posts = posts;
    }
  },
  actions: {
    getPosts: ({commit}) => {
      apolloClient
        .query({
          query: gql`
            query {
              getPosts {
                _id
                title
                imageUrl
                description
              }
            }
          `
        }).then(({data}) => {
        commit('setPosts', data.getPosts)
      }).catch(err => console.log(err));

    }
  }
})
