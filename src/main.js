import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import VuexPersist from 'vuex-persist'
import VueAnalytics from 'vue-analytics'
import './stylus/main.styl';
import Vuex from 'vuex'
import VuetifyConfirm from 'vuetify-confirm'

Vue.config.productionTip = false;

// Setup Vuex
Vue.use(Vuex);
Vue.use(VuetifyConfirm);

const vuexPersist = new VuexPersist({
    key: 'bistleague',
    storage: localStorage
});

let store = new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        userdata: {},
        jwt: null,
        expires_at: 0
    },
    mutations: {
        login(state, data) {
            state.userdata = data.userdata;
            state.jwt = data.jwt;
            state.expires_at = data.exp;
        },
        logout(state) {
            state.userdata = {};
            state.jwt = null;
            state.expires_at = 0;
        }
    },
    getters: {
        isLoggedIn: state => {
            // Check if JWT is assigned
            if(!state.jwt) {
                return false;
            }

            // Check if JWT is expired
            const current = Math.round((new Date()).getTime() / 1000);
            if(state.expires_at < current) {
                return false;
            }

            // All is well
            return true;
        },
        jwt: state => {
            return state.jwt;
        },
        user: state => {
            return state.userdata;
        }
    }
});

// Setup routes
const routes = [
    {path: '/', redirect: '/profile'},
    {path: "/login", component: () => import('./components/pages/Login')},
    {path: "/register", component: () => import('./components/pages/SignUp')},
    {path: "/recover", component: () => import('./components/pages/ForgotPassword')},
    {path: "/reset", component: () => import('./components/pages/ResetPassword')},
    {path: "/email/verify", component: () => import('./components/pages/VerifyEmail')},
    {path: "/profile", alias:["/profile/account"], meta: {auth: true, admin: false}, component: () => import('./components/pages/Profile')},
    {path: "/profile/complete", meta: {auth: true, admin: false}, component: () => import('./components/pages/CompleteProfile')},
    // {path: "/competition/register", meta: {auth: true, admin: false}, component: () => import('./components/pages/competition/Registration')},
    // {path: "/competition/preliminary", meta: {auth: true, admin: false}, component: () => import('./components/pages/competition/Preliminary')},
    // {path: "/competition/semifinal", meta: {auth: true, admin: false}, component: () => import('./components/pages/competition/Semifinal')},
    // {path: "/competition/final", meta: {auth: true, admin: false}, component: () => import('./components/pages/competition/Final')},
    // {path: "/competition/noteam", meta: {auth: true, admin: false}, component: () => import('./components/pages/competition/NoTeam')},
    {path: "/competition", meta: {auth: true, admin: false}, component: () => import('./components/pages/Competition')},
    {path: "/admin/document", meta: {auth: true, admin: true}, component: () => import('./components/pages/admin/DocumentProfile')},
    // {path: "/seminar", meta: {auth: true, admin: false}, component: () => import('./components/pages/Seminar')},
];

const router = new VueRouter({
    routes: routes,
    mode: 'history',
});

Vue.use(VueRouter);

router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        // This route requires auth, check if logged in. Else, redirect to login
        if (!store.getters.isLoggedIn) {
            next({ path: `/login?continue=${to.path}` });
            return;
        }

        // User logged in
        // Check if has admin access is requested AND fulfilled
        if(to.meta.admin && store.getters.user.is_admin !== true) {
            next({ path: `/unauthorized` });
            return;
        }

        next();
    } else {
        next(); // does not require auth, make sure to always call next()!
    }
});

// Setup Google Analytics
if(process.env.VUE_APP_GA_ID) {
    Vue.use(VueAnalytics, {
        id: process.env.VUE_APP_GA_ID,
        router
    });
}

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app');