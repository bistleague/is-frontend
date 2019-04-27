<template>
  <transition name="fade">
    <v-app>
      <div style="position: fixed; left: 0; top: 0; width: 100%; z-index: 1000">
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
    import VueRouter from 'vue-router';

    const routes = [
        {path: "/login", component: () => import('./components/pages/Login')},
        {path: "/register", component: () => import('./components/pages/SignUp')},
        {path: "/recover", component: () => import('./components/pages/ForgotPassword')},
        {path: "/reset", component: () => import('./components/pages/ResetPassword')},
        {path: "/profile", component: () => import('./components/pages/Profile')},
        {path: "/profile/complete", component: () => import('./components/pages/CompleteProfile')},
        {path: "/competition/register", component: () => import('./components/pages/competition/Registration')},
        {path: "/competition/preliminary", component: () => import('./components/pages/competition/Preliminary')},
        {path: "/competition/semifinal", component: () => import('./components/pages/competition/Semifinal')},
        {path: "/competition/final", component: () => import('./components/pages/competition/Final')},
        {path: "/competition", component: () => import('./components/pages/Competition')},
        {path: "/seminar", component: () => import('./components/pages/Seminar')},
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