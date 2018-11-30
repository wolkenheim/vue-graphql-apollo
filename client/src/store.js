import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';

Vue.use(Vuex)

import { GET_POSTS, ADD_POST, INFINITE_SCROLL_POSTS, LOGIN_USER, REGISTER_USER, GET_CURRENT_USER } from './queries';
import { defaultClient as apolloClient } from './main';

export default new Vuex.Store({
  state: {
    posts: [],
    loading: true,
    user: null,
    error: null,
    authError: null,
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
    setAuthError: (state, error) => {
      state.authError = error;
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
    addPost: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_POST,
          variables: payload,
          update: (cache, { data: { addPost } }) => {
            // First read the query you want to update
            const data = cache.readQuery({ query: GET_POSTS });
            // Create updated data
            data.getPosts.unshift(addPost);
            // Write updated data back to query
            console.log(data);
            cache.writeQuery({
              query: GET_POSTS,
              data
            });
          },
          // optimistic response ensures data is added immediately as we specified for the update function
          optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
              __typename: 'Post',
              _id: -1,
              ...payload
            }
          }
        })
        .then(({ data }) => {
          console.log(data.addPost);
        })
        .catch(err => {
          console.error(err);
        });
    },
    loginUser: ({ commit }, payload) => {
      commit('clearError');
      commit("setLoading", true);
      // prevent malformed token
      localStorage.setItem("token", "");
      apolloClient
        .mutate({
          mutation: LOGIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          localStorage.setItem('token', data.loginUser.token);
          router.push('/');
        }).catch(err => {
        commit('setError', err);
        console.log(err)

      });
    },
    registerUser: ({ commit }, payload) => {
      commit('clearError');
      commit('setLoading', true);
      apolloClient
        .mutate({
          mutation: REGISTER_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false);
          localStorage.setItem("token", data.registerUser.token);
          router.go();
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
          console.error(err);
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
