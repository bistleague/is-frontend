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
                        <v-form ref="form" @submit.prevent="submit" v-if="!expired && valid && !success && loading">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>
                            <div class="headline" style="margin-top: 24px">Please wait</div>
                            <p class="mt-3">We're currently doing our magic to verify your email address...</p>

                            <v-progress-linear class="mt-5" color="primary" indeterminate></v-progress-linear>
                        </v-form>
                        <div v-if="expired">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>

                            <div class="headline" style="margin-top: 24px">Link expired</div>
                            <p class="mt-4">The link you opened is expired.</p>
                        </div>
                        <div v-if="!valid">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>

                            <div class="headline" style="margin-top: 24px">Invalid link</div>
                            <p class="mt-4">The link you opened is invalid.</p>
                        </div>
                        <div v-if="success">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>

                            <div class="headline" style="margin-top: 24px">Email verified!</div>
                            <p class="mt-4">Your email address is now verified. You can close this page.</p>
                        </div>
                        <div v-if="!success && !loading">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>

                            <div class="headline" style="margin-top: 24px">Error</div>
                            <p class="mt-4">{{error}}</p>
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
                loading: true,
                success: false,
                snackbar: false,
                snackbar_text: '',
                snackbar_color: 'success',
                error: '',
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
        mounted() {
            this.submit();
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
                });

                let self = this;

                $.ajax({
                    contentType: 'application/json',
                    data: payload,
                    dataType: 'json',
                    type: 'POST',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/account/verify_email`
                }).done(function() {
                    // Email sent
                    self.show_snackbar("Email verified!", 'success');
                    self.loading = false;
                    self.$refs.form.reset();

                    self.success = true;
                }).fail(function(jqXHR) {
                    self.loading = false;
                    self.success = false;

                    if (jqXHR.readyState === 4) {
                        // HTTP error
                        let error = (jqXHR.responseJSON) ? jqXHR.responseJSON.error : "Something went wrong";
                        self.error = error;
                        self.show_snackbar(error, 'error');
                    } else if (jqXHR.readyState === 0) {
                        // Network error
                        let error = "We can't connect to our server, please check your internet connection";
                        self.error = error;
                        self.show_snackbar(error, 'error');
                    } else {
                        // something weird is happening
                        let error = "Something went wrong";
                        self.error = error;
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