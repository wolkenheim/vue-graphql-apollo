<template>
  <v-app>
    <v-navigation-drawer app temporary fixed v-model="showSideNav">
      <v-toolbar color="accent" flat dark>
        <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer;">
          <h1>Vue Share</h1>
        </router-link>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile ripple v-for="item in sideNavbar" :key="item.title" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>

          </v-list-tile-action>
          <v-list-tile-content>
            <span>{{ item.title }}</span>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>
    <v-toolbar fixed color="primary" dark>
      <v-toolbar-side-icon @click="toggleSideNav"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer;">Vue Share</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field id="header_search" flex prepend-icon="search" placeholder="Search posts" color="accent" single-line
                    hide-details></v-text-field>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat v-for="(item, index) in horizontalNavbar" :to="item.link" :key="index">
          <v-icon left>{{ item.icon }}</v-icon>
          <span class="hidden-xs-only">{{ item.title }}</span>
        </v-btn>
        <v-btn flat to="/profile" v-if="user">
          <v-icon class="hidden-sm-only" left>account_box</v-icon>
          <v-badge right color="blue darken-2">
            <span slot="badge">1</span>
            Profile
          </v-badge>
        </v-btn>
        <v-btn flat @click="onLogoutUser" v-if="user">
          <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>
          <v-badge right color="blue darken-2">
            Log out
          </v-badge>
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <main>
      <v-container class="mt-4">
        <transition name="fade"></transition>

        <router-view/>

        <v-snackbar v-model="authSnackbar" color="success" :timeout='5000' bottom left>
          <v-icon class="mr-3">check_circle</v-icon>
          <h3>You are now signed in!</h3>
          <v-btn dark flat @click="authSnackbar = false">Close</v-btn>
        </v-snackbar>

        <v-snackbar v-if="authError" v-model="authErrorSnackbar" color="error" :timeout='10000' bottom left>
          <v-icon class="mr-3">cancel</v-icon>
          <h3>{{authError.message}}</h3>
          <v-btn dark flat to="/login">Log in</v-btn>
        </v-snackbar>

      </v-container>
    </main>

  </v-app>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'App',
    data() {
      return {
        authErrorSnackbar: false,
        authSnackbar: false,
        showSideNav: false,
      }
    },
    computed: {
      ...mapState(['user', 'authError']),
      horizontalNavbar() {
        let items = [
          { icon: 'create', title: 'Register', link: '/register' },
          { icon: 'lock_open', title: 'Login', link: '/login' },
        ];
        if (this.user) {
          items = [
            { icon: 'chat', title: 'Posts', link: '/posts' },
          ];
        }
        return items;
      },
      sideNavbar() {
        let items = [
          { icon: 'chat', title: 'Posts', link: '/posts' },
          { icon: 'create', title: 'Register', link: '/register' },
          { icon: 'lock_open', title: 'Login', link: '/login' },
        ];
        if (this.user) {
          items = [
            { icon: 'chat', title: 'Posts', link: '/posts' },
            { icon: 'stars', title: 'Create Posts', link: '/post/add' },
            { icon: 'account_box', title: 'Profile', link: '/profile' },
          ];
        }
        return items;
      }
    },
    watch: {
      user(newValue, oldValue) {
        if (oldValue === null) {
          this.authSnackbar = true;
        }
      },
      authError(value) {
        if (value !== null) {
          this.authErrorSnackbar = true;
        }
      }
    },
    methods: {
      toggleSideNav() {
        this.showSideNav = !this.showSideNav;
      },
      onLogoutUser() {
        this.$store.dispatch('logoutUser');
      }
    }
  }
</script>
<style>
  #header_search {
    padding-top: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition-property: opacity;
    transition-duration: 0.45s;
  }

  .fade-enter-active {
    transition-delay: 0.45s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
