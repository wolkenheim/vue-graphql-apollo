import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';

Vue.use(Vuex)

import { GET_POSTS, LOGIN_USER, REGISTER_USER, GET_CURRENT_USER } from './queries';
import { defaultClient as apolloClient } from './main';

export default new Vuex.Store({
  state: {
    posts: [],
    loading: true,
    user: null,
    error: null,
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
    },
    setError: (state, error) => {
      state.error = error;
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null)
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading');
      apolloClient.query({
        query: GET_CURRENT_USER
      }).then(({ data }) => {
        commit('setUser', data.getCurrentUser);
        commit('setLoading', false);
      }).catch(err => {
        console.log(err)
        commit('setLoading', false);
      });

    },
    getPosts: ({ commit }) => {
      localStorage.setItem('token', '');
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_POSTS
        }).then(({ data }) => {
        commit('setPosts', data.getPosts);
        commit('setLoading', false);
      }).catch(err => {
        console.log(err)
        commit('setLoading', false);
      });
    },
    loginUser: ({ commit }, payload) => {
      commit('clearError');
      apolloClient
        .mutate({
          mutation: LOGIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.loginUser.token);
          router.go();
        }).catch(err => {
        commit('setError', err);
        console.log(err)

      });
    },
    logoutUser: async ({ commit }, payload) => {
      commit('clearUser');
      localStorage.setItem('token', '');
      await apolloClient.resetStore();
      router.push('/');
    }
  }
})
