<template>
  <v-container text-xs-center v-if="posts.length > 0">
    <v-flex xs12>
      <v-carousel v-bind="{ 'cycle': true }" interval="3000">
        <v-carousel-item v-for="post in posts" :key="post._id" :src="post.imageUrl">
          <h2 class="carousel_title">{{ post.title }}</h2>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        //posts: []
      }
    },
    created() {
      this.handleCarouselPosts();
    },
    computed: {
      posts() {
        return this.$store.state.posts;
      }
    },
    methods: {
      handleCarouselPosts() {
        this.$store.dispatch('getPosts');
      }
    },
  };
</script>
<style>
  .carousel_title {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 5px 5px 0 0;
    padding: 0 0.5em;
    margin: 0 auto;
    bottom: 50px;
    left: 0;
    right: 0;
  }
</style>
