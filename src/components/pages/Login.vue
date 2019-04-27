<template>
    <v-container bg fill-height grid-list-md text-xs-center flex class="primary darken-3">
        <v-snackbar v-model="snackbar" top :color="snackbar_color" multi-line>
            {{ snackbar_text }}
            <v-btn dark flat @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
        <v-layout row wrap align-center>
            <v-flex>
                <div align="center">
                    <v-card id="login-box" elevation="8">
                        <v-form @submit.prevent="login">
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
                                                    <router-link to="recover" style="text-decoration: none;">Forgot password?</router-link>
                                                    <br />
                                                    <router-link to="register" style="text-decoration: none;">New user? <b>Sign up</b></router-link>
                                                </div>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex xs6 pa-0>
                                        <div align="right">
                                            <v-btn ma-0 depressed style="text-transform: none" color="primary" :loading="loading" type="submit">Sign in</v-btn>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </div>
                        </v-form>
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
                snackbar: false,
                snackbar_text: '',
                snackbar_color: 'success'
            }
        },
        methods: {
            show_snackbar: function(text, color) {
                this.snackbar = true;
                this.snackbar_text = text;
                this.snackbar_color = color;
            },
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
                    self.$router.push(self.$route.query.continue || '/profile');

                    self.loading = false;
                }).fail(function(jqXHR) {
                    self.loading = false;

                    if (jqXHR.readyState === 4) {
                        // HTTP error
                        let error = (jqXHR.responseJSON) ? jqXHR.responseJSON.error : "Something went wrong";
                        self.show_snackbar(error, 'error');
                    } else if (jqXHR.readyState === 0) {
                        // Network error
                        let error = "We can't connect to our server, please check your internet connection";
                        self.show_snackbar(error, 'error');
                    } else {
                        // something weird is happening
                        let error = "Something went wrong";
                        self.show_snackbar(error, 'error');
                    }
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