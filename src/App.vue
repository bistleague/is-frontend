<template>
  <transition name="fade">
    <v-app>
      <router-view></router-view>
    </v-app>
  </transition>
</template>

<style>
  @import url('https://fonts.googleapis.com/css?family=Nunito+Sans:400,700');
  @import url('./assets/main.module.css');
</style>

<script>
    import HelloWorld from './components/HelloWorld';
    import VueRouter from 'vue-router';

    import Login from './components/pages/Login'
    import SignUp from './components/pages/SignUp'
    import Registration from './components/pages/competition/Registration'
    import Preliminary from './components/pages/competition/Preliminary'
    import Semifinal from './components/pages/competition/Semifinal'
    import Final from './components/pages/competition/Final'
    import Profile from './components/pages/Profile'
    import Competition from './components/pages/Competition'

    const routes = [
        {path: "/hello", component: HelloWorld},
        {path: "/login", component: Login},
        {path: "/register", component: SignUp},
        {path: "/profile", component: Profile},
        {path: "/competition/register", component: Registration},
        {path: "/competition/preliminary", component: Preliminary},
        {path: "/competition/semifinal", component: Semifinal},
        {path: "/competition/final", component: Final},
        {path: "/competition", component: Competition},
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