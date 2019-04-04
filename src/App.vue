<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Nunito:400,700');
  @import url('./assets/main.module.css');
</style>

<script>
    import HelloWorld from './components/HelloWorld';
    import VueRouter from 'vue-router';

    import Login from './components/pages/Login'
    import SignUp from './components/pages/SignUp'
    import Registration from './components/pages/Registration'

    const routes = [
        {path: "/hello", component: HelloWorld},
        {path: "/login", component: Login},
        {path: "/register", component: SignUp},
        {path: "/dashboard/onboarding", component: Registration},
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