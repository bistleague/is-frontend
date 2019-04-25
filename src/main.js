import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import VuexPersist from 'vuex-persist'
import './stylus/main.styl';
import Vuex from 'vuex'

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

const vuexPersist = new VuexPersist({
    key: 'bistleague',
    storage: localStorage
});

const store = new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        userdata: {},
        token: null,
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

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');

const $ = require('jquery');
window.$ = $;