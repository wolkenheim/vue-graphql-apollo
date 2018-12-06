<template>
  <v-container text-xs-center mt-5 pt-5>

    <!-- Add Post Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary--text">{{ headline }}</h1>
      </v-flex>
    </v-layout>

    <!-- Add Post Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>

       <post-form></post-form>

      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import { mapState } from "vuex";
  import { PostForm } from "./Form"

  export default {
    name: "AddPost",
    components: { PostForm },
    data() {
      return {
        headline: 'Add Post',
      };
    },
    computed: {
      ...mapState(['user', 'error', 'loading'])
    },
    created(){

    },
    methods: {
      addPost() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('addPost', {
            title: this.title,
            imageUrl: this.imageUrl,
            categories: this.categories,
            description: this.description,
            userId: this.user._id,
          });
          this.$router.push("/");
        }
      }
    }
  };
</script>
