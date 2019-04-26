<template>
    <v-container bg fill-height grid-list-md text-xs-center flex class="primary darken-1">
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
                        <v-form @submit.prevent="submit" ref="form" v-model="valid" class="pa-4">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>
                            <div class="headline" style="margin-top: 24px">Sign up</div>
                            <p>Hi there! Let’s get to know you first</p>

                            <v-text-field label="Full name" v-model="name" required :rules="nameRules"></v-text-field>
                            <v-text-field label="Email address" v-model="email" required :rules="emailRules"></v-text-field>
                            <v-text-field label="Password" type="password" v-model="password" required :rules="passwordRules"></v-text-field>

                            <div style="height: 8px"></div>

                            <v-layout pa-0 fill-height>
                                <v-flex xs6>
                                    <v-layout row wrap align-center fill-height>
                                        <v-flex>
                                            <div align="left">
                                                <router-link to="login" style="text-decoration: none;">Have an account? <b>Sign in</b></router-link>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs6 pa-0>
                                    <div align="right">
                                        <v-btn ma-0 depressed style="text-transform: none" color="primary" type="submit" :loading="loading">Sign up</v-btn>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-form>
                        <!--<div class="pa-3 pl-4 pr-4 grey lighten-4 grey--text caption">
                            This site is protected by reCAPTCHA and the Google
                            <a href="https://policies.google.com/privacy">Privacy Policy</a> and
                            <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                        </div>-->
                    </v-card>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    const $ = require('jquery');

    export default {
        name: "SignUp",
        data() {
            return {
                valid: false,
                loading: false,
                name: '',
                email: '',
                password: '',
                snackbar: false,
                snackbar_text: '',
                snackbar_color: 'success',
                nameRules: [
                    v => !!v || 'Your name is required',
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => v.replace(/\s/g, "").length >= 8 || 'Password must be at least 8 characters long'
                ],
            }
        },
        methods: {
            show_snackbar: function(text, color) {
                this.snackbar = true;
                this.snackbar_text = text;
                this.snackbar_color = color;
            },
            submit() {
                // Validate form
                if (!this.$refs.form.validate()) {
                    return;
                }

                if(!this.email || !this.name || !this.password) {
                    this.show_snackbar("All fields are required", 'error');
                    return;
                }

                this.loading = true;

                let payload = JSON.stringify({
                    email: this.email,
                    password: this.password,
                    name: this.name
                });

                let self = this;

                $.ajax({
                    contentType: 'application/json',
                    data: payload,
                    dataType: 'json',
                    type: 'POST',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/account/create`
                }).done(function() {
                    // Registration OK, go to login page
                    // Show success snackbar
                    self.show_snackbar("Registration success! Redirecting you in 3 seconds", 'success');

                    // Redirect in 3 seconds
                    setTimeout(function() {
                        self.$router.push(self.$route.query.continue || '/login');
                    }, 3000);

                    self.loading = false;
                }).fail(function(jqXHR) {
                    self.alert = true;
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
    #app {
        background-color: var(--v-primary-darken1)
    }

    #login-box {
        max-width: 400px;
    }
</style>