import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {GET_POSTS} from './queries';
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
                    query: GET_POSTS
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
