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
                        <v-form ref="form" @submit.prevent="submit">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>
                            <div class="headline" style="margin-top: 24px">Forgot password?</div>
                            <p>Tell us your email address and we'll send the instructions to reset your password.</p>

                            <div style="height: 24px"></div>

                            <v-text-field label="Email address" v-model="email" :rules="requiredRules"></v-text-field>
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
                                        <v-btn ma-0 depressed style="text-transform: none" color="primary" type="submit" :loading="loading">Submit</v-btn>
                                    </div>
                                </v-flex>
                            </v-layout>
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
        name: "ForgotPassword",
        data() {
            return {
                expired: false,
                email: '',
                loading: false,
                snackbar: false,
                snackbar_text: '',
                snackbar_color: 'success',
                requiredRules: [
                    v => !!v || 'Email address is required',
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
                if(!this.$refs.form.validate()) {
                    return;
                }

                this.loading = true;

                let payload = JSON.stringify({
                    email: this.email,
                });

                let self = this;

                $.ajax({
                    contentType: 'application/json',
                    data: payload,
                    dataType: 'json',
                    type: 'POST',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/account/recover`
                }).done(function() {
                    // Email sent
                    self.show_snackbar("Instuctions to reset your password is sent to your email", 'success');
                    self.loading = false;
                    self.$refs.form.reset();
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
        padding: 24px;
    }
</style>