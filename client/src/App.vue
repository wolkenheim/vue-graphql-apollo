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

      <v-text-field flex prepend-icon="search" placeholder="Search Posts" color="accent" single-line hide-details>
      </v-text-field>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat v-for="(item, index) in horizontalNavbar" :to="item.link" :key="index">
          <v-icon left>{{ item.icon }}</v-icon>
          <span class="hidden-xs-only">{{ item.title }}</span>
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <main>
      <v-container class="mt-4">
        <transition name="fade"></transition>
        <router-view/>
      </v-container>
    </main>

  </v-app>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        showSideNav: false,
      }
    },
    computed: {
      horizontalNavbar(){
        return [
          { icon: 'chat', title: 'Posts', link: '/posts' },
          { icon: 'create', title: 'Register', link: '/register' },
          { icon: 'lock_open', title: 'Login', link: '/login' },
        ]
      },
      sideNavbar(){
        return [
          { icon: 'chat', title: 'Posts', link: '/posts' },
          { icon: 'create', title: 'Register', link: '/register' },
          { icon: 'lock_open', title: 'Login', link: '/login' },
        ]
      }
    },
    methods: {
      toggleSideNav() {
        this.showSideNav = !this.showSideNav;
      }
    }
  }
</script>
<style>
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