<template>
  <transition name="fade">
    <v-app>
      <div style="position: absolute; left: 0; top: 0; width: 100%;">
        <v-progress-linear :indeterminate="true" class="ma-0" height="3" color="primary darken-1" v-if="loading"></v-progress-linear>
      </div>
      <router-view v-on:show-loading="showLoading" v-on:hide-loading="hideLoading"></router-view>
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
    import CompleteProfile from './components/pages/CompleteProfile'
    import Competition from './components/pages/Competition'

    const routes = [
        {path: "/hello", component: HelloWorld},
        {path: "/login", component: Login},
        {path: "/register", component: SignUp},
        {path: "/profile", component: Profile},
        {path: "/profile/complete", component: CompleteProfile},
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
                loading: true
            }
        },
        mounted () {
            //  [App.vue specific] When App.vue is finish loading finish the progress bar
            this.loading = false;
        },
        created () {
            this.loading = true;
            let self = this;
            //  hook the progress bar to start before we move router-view
            this.$router.beforeEach((to, from, next) => {
                //  does the page we want to go to have a meta.progress object
                /*if (to.meta.progress !== undefined) {
                    let meta = to.meta.progress
                    // parse meta tags
                    this.$Progress.parseMeta(meta)
                }*/
                self.showLoading();
                next()
            });

            //  hook the progress bar to finish after we've finished moving router-view
            this.$router.afterEach(() => {
                //  finish the progress bar
                self.hideLoading();
            })
        },
        methods: {
            showLoading() {
                this.loading = true;
            },
            hideLoading() {
                this.loading = false;
            }
        }
    }
</script>