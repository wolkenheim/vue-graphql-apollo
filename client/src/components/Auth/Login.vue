<template>
  <v-container text-xs-center mt-5 pt-5>
    <h1>Login</h1>
    <v-form>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <h1>Welcome back</h1>

        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <v-card color="secondary" dark>
            <v-container>
              <v-form @submit.prevent="loginUser">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field v-model="email"
                                  prepend-icon="face"
                                  label="Email"
                                  type="text"
                                  required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field v-model="password"
                                  prepend-icon="extension"
                                  label="Password"
                                  type="password"
                                  required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn color="accent" type="submit">Login</v-btn>
                    <h3>Not having an account yet?</h3>
                    <router-link class="text--primary font-weight-bold" to="/register">Register
                    </router-link>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "Login",
    data() {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {
      // if user values change, redirect to home
      user(value) {
        this.$router.push('/');
      }
    },
    methods: {
      loginUser() {
        this.$store.dispatch('loginUser', {
          email: this.email,
          password: this.password
        })
      }
    }
  };
</script>
