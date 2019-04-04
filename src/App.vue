<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank">
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
    import HelloWorld from './components/HelloWorld'
    import VueRouter from 'vue-router'

    const routes = [
        {path: "/hello", component: HelloWorld},
    ];

    const router = new VueRouter({
        routes: routes,
        mode: 'history',
    });

    export default {
        name: 'App',
        router,
        components: {

        },
        data () {
            return {
                //
            }
        }
    }
</script>