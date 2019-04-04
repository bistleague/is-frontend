<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Nunito:400,700');
</style>

<script>
    import HelloWorld from './components/HelloWorld'
    import Login from './components/Login'
    import VueRouter from 'vue-router'

    const routes = [
        {path: "/hello", component: HelloWorld},
        {path: "/login", component: Login},
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