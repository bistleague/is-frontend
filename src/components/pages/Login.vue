<template>
    <v-container bg fill-height grid-list-md text-xs-center flex class="primary darken-1">
        <v-layout row wrap align-center>
            <v-flex>
                <div align="center">
                    <v-card id="login-box" elevation="8">
                        <v-alert
                                v-model="alert"
                                color="warning"
                                icon="warning"
                                dismissible
                        >
                            <div align="left">
                                {{error}}
                            </div>
                        </v-alert>

                        <div class="pa-4">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>
                            <div class="headline" style="margin-top: 24px">Welcome!</div>
                            <p>Type in your email and password to sign in</p>

                            <div style="height: 48px"></div>
                            <v-text-field label="Email address" v-model="email"></v-text-field>
                            <v-text-field label="Password" type="password" v-model="password"></v-text-field>
                            <div style="height: 8px"></div>

                            <v-layout pa-0 fill-height>
                                <v-flex xs6>
                                    <v-layout row wrap align-center fill-height>
                                        <v-flex>
                                            <div align="left">
                                                <a>Forgot password?</a>
                                                <br />
                                                <router-link to="register" style="text-decoration: none;">New user? <b>Sign up</b></router-link>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs6 pa-0>
                                    <div align="right">
                                        <v-btn ma-0 depressed style="text-transform: none" color="primary" :loading="loading" @click="login">Sign in</v-btn>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </div>
                    </v-card>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    const $ = require('jquery');

    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                loading: false,
                error: '',
                alert: false
            }
        },
        methods: {
            login() {
                this.loading = true;

                let payload = JSON.stringify({
                    email: this.email,
                    password: this.password
                });

                let self = this;

                $.ajax({
                    contentType: 'application/json',
                    data: payload,
                    dataType: 'json',
                    type: 'POST',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/auth/login`
                }).done(function(data) {
                    let user = data.user;
                    let token = data.token;
                    let exp = data.expires_at;

                    // Commit to Vuex
                    self.$store.commit('login', {userdata: user, jwt: token, exp: exp});
                    self.$router.push('/competition');

                    self.loading = false;
                }).fail(function(jqXHR) {
                    self.error = jqXHR.responseJSON.error;
                    self.alert = true;
                    self.loading = false;
                });
            }
        }
    }
</script>

<style scoped>
    #login-box {
        max-width: 400px;
    }
</style>