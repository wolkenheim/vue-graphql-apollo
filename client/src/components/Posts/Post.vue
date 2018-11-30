<template>
  <v-container v-if="getPost" class="mt-3" flexbox center>

    <!-- Post Card -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover>
          <v-card-title>
            <h1>{{getPost.title}}</h1>
            <v-btn large icon v-if="user">
              <v-icon large color="grey">favorite</v-icon>
            </v-btn>
            <h3 class="ml-3 font-weight-thin">{{getPost.likes}} LIKES</h3>
            <v-spacer></v-spacer>
            <v-icon @click="goToPreviousPage" color="info" large>arrow_back</v-icon>
          </v-card-title>

          <v-tooltip right>
            <span>Click to enlarge image</span>
            <v-img @click="toggleImageDialog" slot="activator" :src="getPost.imageUrl" id="post__image"></v-img>
          </v-tooltip>

          <!-- Post Image Dialog -->
          <v-dialog v-model="dialog">
            <v-card>
              <v-img :src="getPost.imageUrl" height="80vh"></v-img>
            </v-card>
          </v-dialog>

          <v-card-text>
            <span v-for="(category, index) in getPost.categories" :key="index">
              <v-chip class="mb-3" color="accent" text-color="white">{{category}}</v-chip>
            </span>
            <h3>{{getPost.description}}</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Messages Section -->
    <div class="mt-3">
      <!-- Message Input -->
      <v-layout class="mb-3" v-if="user">
        <v-flex xs12>
          <v-form>
            <v-layout row>
              <v-flex xs12>
                <v-text-field clearable append-outer-icon="send" label="Add Message" type="text" prepend-icon="email" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-flex>
      </v-layout>

      <!-- Messages -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-list subheader two-line>
            <v-subheader>Messages ({{getPost.messages.length}})</v-subheader>

            <template v-for="message in getPost.messages">
              <v-divider :key="message._id"></v-divider>

              <v-list-tile avatar inset :key="message.title">
                <v-list-tile-avatar>
                  <img :src="message.messageUser.avatar">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>
                    {{message.messageBody}}
                  </v-list-tile-title>
                  <v-list-tile-sub-title>
                    {{message.messageUser.username}}
                    <span class="grey--text text--lighten-1 hidden-xs-only">{{message.messageDate}}</span>
                  </v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action class='hidden-xs-only'>
                  <v-icon color="grey">chat_bubble</v-icon>
                </v-list-tile-action>

              </v-list-tile>
            </template>
          </v-list>
        </v-flex>
      </v-layout>

    </div>

  </v-container>
</template>

<script>
  import { mapState } from "vuex";
  import { GET_POST } from "../../queries";

  export default {
    name: "Post",
    props: ["postId"],
    data() {
      return {
        dialog: false
      };
    },
    apollo: {
      getPost: {
        query: GET_POST,
        variables() {
          return {
            postId: this.postId
          };
        }
      }
    },
    computed: {
      ...mapState(["user"])
    },
    methods: {
      goToPreviousPage() {
        this.$router.go(-1);
      },
      toggleImageDialog() {
        if (window.innerWidth > 500) {
          this.dialog = !this.dialog;
        }
      }
    }
  };
</script>

<style scoped>
  #post__image {
    height: 400px !important;
  }
</style>
