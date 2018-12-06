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

        <post-form :userId="user._id"></post-form>

      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import { mapState } from "vuex";
  import { EventBus } from "@/event";
  import PostForm from "@/components/Posts/Form";

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
    created() {
      EventBus.$on('submitPostForm', post => {
        this.addPost(post);
      })
    },
    methods: {
      addPost() {
          this.$store.dispatch('addPost', post);
          console.log("add post", post);
          this.$router.push("/");
        }

    }
  };
</script>
