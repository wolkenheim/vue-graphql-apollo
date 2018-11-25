import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";

import AddPost from './components/Posts/AddPost.vue'
import Posts from './components/Posts/Posts.vue'

import Profile from './components/Auth/Profile.vue'
import Login from './components/Auth/Login.vue'
import Register from './components/Auth/Register.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/posts",
      name: "Posts",
      component: Posts
    },
    {
      path: "/post/add",
      name: "AddPost",
      component: AddPost
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    }
  ]
});
