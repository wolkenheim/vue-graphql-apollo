import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {gql} from 'apollo-boost';
import {defaultClient as apolloClient} from './main';

export default new Vuex.Store({
    state: {
        posts: [],
        loading: true,
    },
    mutations: {
        setPosts: (state, posts) => {
            state.posts = posts;
        },
        setLoading: (state, value) => {
            state.loading = value;
        }
    },
    actions: {
        getPosts: ({commit}) => {
            commit('setLoading', true);
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
                commit('setPosts', data.getPosts);
                commit('setLoading', false);
            }).catch(err => {
                console.log(err)
                commit('setLoading', false);
            });

        }
    }
})
