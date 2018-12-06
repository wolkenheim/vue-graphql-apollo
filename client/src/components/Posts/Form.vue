<template>

  <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="submitForm">

    <!-- Title Input -->
    <v-layout row>
      <v-flex xs12>
        <v-text-field :rules="titleRules" v-model="title" label="Post Title" type="text" required></v-text-field>
      </v-flex>
    </v-layout>

    <!-- Image Url Input -->
    <v-layout row>
      <v-flex xs12>
        <v-text-field :rules="imageRules" v-model="imageUrl" label="Image URL" type="text"
                      required></v-text-field>
      </v-flex>
    </v-layout>

    <!-- Image Preview -->
    <v-layout row v-if="imageUrl">
      <v-flex xs12>
        <img :src="imageUrl" height="300px">
      </v-flex>
    </v-layout>

    <!-- Categories Select -->
    <v-layout row>
      <v-flex xs12>
        <v-select v-model="categories" :rules="categoriesRules"
                  :items="['Art', 'Education', 'Travel', 'Photography', 'Technology']" multiple
                  label="Categories"></v-select>
      </v-flex>
    </v-layout>

    <!-- Description Text Area -->
    <v-layout row>
      <v-flex xs12>
        <v-textarea v-model="description" :rules="descRules" label="Description" type="text"
                    required></v-textarea>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <v-btn :loading="loading" :disabled="!isFormValid || loading" color="info" type="submit">
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
          Submit
        </v-btn>
      </v-flex>
    </v-layout>

  </v-form>
</template>

<script>
  import { mapState } from "vuex";
  import { EventBus } from "../../event";

  export default {
    name: "PostForm",
    props: {
      userId: String,
      post: {
        type: Object,
        default: () => {
          return {
            title: "",
            imageUrl: "",
            categories: [],
            description: "",
          }
        }
      }
    },
    watch: {
      post({ _id, title, imageUrl, categories, description }) {
        this.postId = _id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.categories = categories;
        this.description = description;
      }
    },
    data() {
      return {
        isFormValid: true,
        postId: null,
        title: "",
        imageUrl: "",
        categories: [],
        description: "",
        titleRules: [
          title => !!title || "Title is required",
          title => title.length < 20 || "Title must have less than 20 characters"
        ],
        imageRules: [image => !!image || "Image is required"],
        categoriesRules: [
          categories =>
            categories.length >= 1 || "At least one category is required"
        ],
        descRules: [
          desc => !!desc || "Description is required",
          desc =>
            desc.length < 200 || "Description must have less than 200 characters"
        ]
      };
    },
    computed: {
      ...mapState(['user', 'error', 'loading'])
    },
    methods: {
      submitForm() {
        if (this.$refs.form.validate()) {
          EventBus.$emit('submitPostForm', {
            postId: this.postId,
            userId: this.userId,
            title: this.title,
            imageUrl: this.imageUrl,
            categories: this.categories,
            description: this.description
          });
        }
      }
    }
  };
</script>
