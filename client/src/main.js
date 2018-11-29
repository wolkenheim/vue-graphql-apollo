import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

Vue.use(VueApollo);

// Setup ApolloClient
// with token for auth routes
export const defaultClient = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        if(!localStorage.token){
            localStorage.setItem('token', '');
        }
        operation.setContext({
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    },
    onError: ({ graohQlErrors, networkError }) => {
        if(networkError){
            console.log(networkError);
        }
        if(graohQlErrors){
            for(let err of graohQlErrors){
                console.dir(err);
            }
        }
    }

});

const apolloProvider = new VueApollo({defaultClient});

Vue.config.productionTip = false;

new Vue({
    apolloProvider,
    router,
    store,
    render: h => h(App),
    created() {
        this.$store.dispatch('getCurrentUser');
    }
}).$mount("#app");
