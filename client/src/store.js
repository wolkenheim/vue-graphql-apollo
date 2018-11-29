import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';

Vue.use(Vuex)

import {GET_POSTS, LOGIN_USER, REGISTER_USER, GET_CURRENT_USER} from './queries';
import {defaultClient as apolloClient} from './main';

export default new Vuex.Store({
    state: {
        posts: [],
        loading: true,
        user: null
    },
    mutations: {
        setPosts: (state, posts) => {
            state.posts = posts;
        },
        setLoading: (state, value) => {
            state.loading = value;
        },
        setUser: (state, user) => {
            state.user = user;
        }
    },
    actions: {
        getCurrentUser: ({commit}) => {
            commit('setLoading');
            apolloClient.query({
                query: GET_CURRENT_USER
            }).then(({data}) => {
                commit('setUser', data.getCurrentUser);
                commit('setLoading', false);
            }).catch(err => {
                console.log(err)
                commit('setLoading', false);
            });

        },
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

        },
        loginUser: ({commit}, payload) => {
            apolloClient
                .mutate({
                    mutation: LOGIN_USER,
                    variables: payload
                })
                .then(({data}) => {
                    localStorage.setItem('token', data.loginUser.token);
                    router.go();
                }).catch(err => {
                console.log(err)

            });

        }
    }
})
