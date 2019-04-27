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
                    <v-card id="login-box" elevation="8" class="pa-4">
                        <v-form ref="form" @submit.prevent="submit" v-if="!expired && valid">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>
                            <div class="headline" style="margin-top: 24px">Reset your password</div>
                            <p>Simply enter your new password and we're good to go. The password should at least be {{pass_length}} characters long.</p>

                            <div style="height: 24px"></div>

                            <v-text-field label="New password" v-model="password" type="password" :rules="passwordRules"></v-text-field>
                            <v-text-field label="Retype new password" v-model="rePassword" type="password" :rules="rePasswordRules"></v-text-field>
                            <div style="height: 8px"></div>

                            <v-btn ma-0 depressed style="text-transform: none" color="primary" type="submit" block :loading="loading">Change password</v-btn>
                        </v-form>
                        <div v-if="expired">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>

                            <div class="headline" style="margin-top: 24px">Link expired</div>
                            <p class="mt-4">The link you opened is expired. If you still want to reset your password, just do a <router-link to="/recover">password reset</router-link> one more time.</p>
                        </div>
                        <div v-if="!valid">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>

                            <div class="headline" style="margin-top: 24px">Invalid link</div>
                            <p class="mt-4">The link you opened is invalid. If you still want to reset your password, just do a <router-link to="/recover">password reset</router-link> one more time.</p>
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
        name: "ForgotPassword",
        data() {
            return {
                password: '',
                rePassword: '',
                loading: false,
                snackbar: false,
                snackbar_text: '',
                snackbar_color: 'success',
                pass_length: parseInt(process.env.VUE_APP_PASSWORD_MIN_LENGTH),
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => v.replace(/\s/g, "").length >= this.pass_length || `Password must be at least ${this.pass_length} characters long`
                ],
                rePasswordRules: [
                    v => !!v || 'Password is required',
                    v => this.password === v || "Password doesn't match"
                ]
            }
        },
        computed: {
            expired() {
                const exp = this.$route.query.expires;
                const current = Math.round((new Date()).getTime() / 1000);

                if(!exp) return false;
                else return exp <= current;
            },
            valid() {
                return this.$route.query.email && this.$route.query.token;
            }
        },
        methods: {
            show_snackbar: function(text, color) {
                this.snackbar = true;
                this.snackbar_text = text;
                this.snackbar_color = color;
            },
            submit() {
                if(!this.$refs.form.validate()) {
                    return;
                }

                this.loading = true;

                let payload = JSON.stringify({
                    email: this.$route.query.email,
                    token: this.$route.query.token,
                    password: this.password
                });

                let self = this;

                $.ajax({
                    contentType: 'application/json',
                    data: payload,
                    dataType: 'json',
                    type: 'POST',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/account/reset`
                }).done(function() {
                    // Email sent
                    self.show_snackbar("Password changed! Redirecting you in 3 seconds", 'success');
                    self.loading = false;
                    self.$refs.form.reset();

                    setTimeout(function() {
                        self.$router.push('/login');
                    }, 3000);
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
    #login-box {
        max-width: 400px;
    }
</style>