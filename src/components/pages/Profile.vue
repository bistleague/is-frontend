<template>
    <div>
        <BLToolbar />
        <BLSubHeader>
            <div class="headline font-weight-bold white--text mt-3 mb-3">Profile</div>
        </BLSubHeader>
        <v-card flat color="primary darken-1" v-if="!loading" tile>
            <BLCenterWrap>
                <v-tabs v-model="tab" color="primary darken-1" dark>
                    <v-tabs-slider color="yellow"></v-tabs-slider>

                    <v-tab @click="$router.push('/profile')" key="profile" class="font-weight-bold text-none">
                        My Profile
                    </v-tab>
                    <v-tab @click="$router.push('/profile/account')" key="account" class="font-weight-bold text-none">
                        Account
                    </v-tab>
                </v-tabs>
            </BLCenterWrap>
        </v-card>
        <v-tabs-items v-model="tab" v-if="!loading" touchless>
            <v-tab-item key="profile">
                <BLCenterWrap>
                    <v-layout wrap mt-2>
                        <v-flex xs12 sm12 md6 lg6 order-xs2 order-sm2 order-md1>
                            <v-form ref="form">
                                <div class="mb-1 mt-4">Full Name</div>
                                <v-text-field label="Full Name" hint="Please write your full name using proper capitalization." persistent-hint single-line solo v-model="data.name" required :rules="requiredRules"></v-text-field>

                                <div class="mb-1 mt-4">Mobile phone number</div>
                                <v-text-field solo label="08xxxxxxxxxx" single-line v-model="data.mobile_no" :rules="mobileRules" persistent-hint
                                              hint="Please write your <b>mobile</b> number in all numbers (i.e. no characters or letters)."></v-text-field>

                                <div class="mb-1 mt-4">Gender</div>
                                <v-card>
                                    <v-radio-group v-model="data.gender" class="ma-0 pa-0 radio-group-full-width">
                                        <v-radio color="primary darken-1" value="1" label="Male" class="pa-3 ma-0"></v-radio>
                                        <v-divider></v-divider>
                                        <v-radio color="primary darken-1" value="2" label="Female" class="pa-3 ma-0"></v-radio>

                                    </v-radio-group>
                                </v-card>

                                <div class="grey--text text--darken-1 mt-2 pl-3 pr-3 caption">Please fill the gender according to what is stated on your identity card.</div>

                                <div class="mb-1 mt-4">Your study</div>
                                <v-card>
                                    <v-text-field label="University" full-width hide-details v-model="data.university"></v-text-field>
                                    <v-divider></v-divider>
                                    <v-text-field label="Major" full-width hide-details v-model="data.major"></v-text-field>
                                </v-card>
                                <div class="grey--text text--darken-1 mt-2 pl-3 pr-3 caption">Please write your institution/school name without abbreviating its name and in its official name. For example, write Institut Teknologi Bandung instead of Bandung Institute of Technology.</div>

                                <v-btn color="primary" block class="text-none font-weight-bold mt-4 mb-5" :loading="saving" @click="save">Save</v-btn>
                            </v-form>
                        </v-flex>
                    </v-layout>
                </BLCenterWrap>
            </v-tab-item>
            <v-tab-item key="account">
                <BLCenterWrap>
                    <v-layout wrap mt-2>
                        <v-flex xs12 sm12 md6 lg6 order-xs2 order-sm2 order-md1>
                            <v-card class="mt-3">
                                <v-card flat tile color="grey lighten-4 grey--text text--darken-1 pa-3" class="font-weight-bold">
                                    E-mail address
                                </v-card>
                                <v-divider></v-divider>
                                <div class="pa-3">
                                    <b>{{data.email}}</b><v-icon small color="green" class="ml-2" v-if="data.email_verified">check_circle</v-icon>
                                    <div class="red--text mt-1" v-if="!data.email_verified && !email_verifying && !email_verify_sent">You haven't verified your email address. <a @click="send_verification_mail">Verify my email.</a></div>
                                    <div class="green--text darken-4 mt-1" v-if="!data.email_verified && email_verify_sent">We've sent an email to {{data.email}} with instructions to verify the email address.</div>
                                    <v-progress-linear indeterminate height="2" v-if="email_verifying"></v-progress-linear>
                                </div>
                            </v-card>

                            <v-card class="mt-4">
                                <v-card flat tile color="grey lighten-4 grey--text text--darken-1 pa-3" class="font-weight-bold">
                                    Change your password
                                </v-card>
                                <v-divider></v-divider>
                                <v-form ref="chgpass" class="pa-3" @submit.prevent="change_password">
                                    Enter your current and new password to change your password. Your new password must have at least {{pass_length}} characters.
                                    <v-text-field label="Current password" type="password" class="mt-3" v-model="oldPassword" :rules="passwordRules"></v-text-field>
                                    <v-text-field label="New password" type="password" class="mt-1" v-model="newPassword" :rules="passwordRules"></v-text-field>
                                    <v-text-field label="Repeat new password" type="password" class="mt-1" v-model="reNewPassword" :rules="rePasswordRules"></v-text-field>

                                    <v-btn color="primary" block class="text-none font-weight-bold mt-4" :loading="saving_pass" type="submit">Change password</v-btn>
                                </v-form>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </BLCenterWrap>
            </v-tab-item>
        </v-tabs-items>
        <v-snackbar v-model="snackbar" top :color="snackbar_color" multi-line>
            {{ snackbar_text }}
            <v-btn dark flat @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
    import BLToolbar from "../partials/BLToolbar";
    import BLSubHeader from "../partials/BLSubHeader";
    import BLCenterWrap from "../partials/BLCenterWrap";
    const $ = require("jquery");
    export default {
        name: "Profile",
        components: {BLCenterWrap, BLSubHeader, BLToolbar},
        data() {
            return {
                loading: true,
                saving: false,
                saving_pass: false,
                email_verifying: false,
                email_verify_sent: false,
                data: {},
                snackbar: false,
                snackbar_text: '',
                snackbar_color: 'success',
                tab: (this.$router.currentRoute.path === '/profile/account') ? 1 : 0,
                pass_length: parseInt(process.env.VUE_APP_PASSWORD_MIN_LENGTH),
                requiredRules: [
                    v => !!v || 'Field is required',
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                mobileRules: [
                    v => (/^[0-9]+$|^$/.test(v) || !v) || 'Mobile phone number must be valid'
                ],
                oldPassword: '',
                newPassword: '',
                reNewPassword: '',
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => v.replace(/\s/g, "").length >= this.pass_length || `Password must be at least ${this.pass_length} characters long`
                ],
                rePasswordRules: [
                    v => !!v || 'Password is required',
                    v => this.newPassword === v || "Password doesn't match"
                ]
            }
        },
        mounted: function() {
            this.load();
        },
        watch:{
            $route (to){
                this.tab = (to.path === '/profile/account') ? 1 : 0
            }
        },
        methods: {
            show_snackbar: function(text, color) {
                this.snackbar = true;
                this.snackbar_text = text;
                this.snackbar_color = color;
            },
            load: function() {
                this.$emit("show-loading");

                let self = this;
                $.ajax({
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${self.$store.getters.jwt}`},
                    type: 'GET',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/user/profile`
                }).done(function(data) {
                    self.data = data;
                    self.loading = false;
                    self.$emit("hide-loading");
                }).fail(function() {
                    // TODO show error
                    self.$emit("hide-loading");
                });
            },
            save: function() {
                // Validate form
                if (!this.$refs.form.validate()) {
                    this.show_snackbar("Incomplete and/or incorrect form", 'error');
                    return;
                }

                let self = this;
                this.saving = true;
                $.ajax({
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${self.$store.getters.jwt}`},
                    type: 'PUT',
                    data: JSON.stringify(self.data),
                    dataType: 'json',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/user/profile`
                }).done(function() {
                    self.saving = false;
                    self.show_snackbar('Profile saved!', 'success');
                }).fail(function(jqXHR) {
                    self.saving = false;

                    if (jqXHR.readyState === 4) {
                        // HTTP error
                        const error = (jqXHR.responseJSON) ? jqXHR.responseJSON.error : "Something went wrong";
                        self.show_snackbar(error, 'error');
                    } else if (jqXHR.readyState === 0) {
                        // Network error
                        const error = "We can't connect to our server, please check your internet connection";
                        self.show_snackbar(error, 'error');
                    } else {
                        // something weird is happening
                        const error = "Something went wrong";
                        self.show_snackbar(error, 'error');
                    }
                });
            },
            send_verification_mail: function() {
                let self = this;
                this.email_verifying = true;
                this.email_verify_sent = false;
                $.ajax({
                    headers: {'Authorization': `Bearer ${self.$store.getters.jwt}`},
                    type: 'POST',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/user/email_verify`
                }).done(function() {
                    self.email_verifying = false;
                    self.email_verify_sent = true;
                }).fail(function(jqXHR) {
                    self.email_verifying = false;

                    if (jqXHR.readyState === 4) {
                        // HTTP error
                        const error = (jqXHR.responseJSON) ? jqXHR.responseJSON.error : "Something went wrong";
                        self.show_snackbar(error, 'error');
                    } else if (jqXHR.readyState === 0) {
                        // Network error
                        const error = "We can't connect to our server, please check your internet connection";
                        self.show_snackbar(error, 'error');
                    } else {
                        // something weird is happening
                        const error = "Something went wrong";
                        self.show_snackbar(error, 'error');
                    }
                });
            },
            change_password: function() {
                // Validate form
                if (!this.$refs.chgpass.validate()) {
                    return;
                }

                let self = this;
                this.saving_pass = true;
                $.ajax({
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${self.$store.getters.jwt}`},
                    type: 'POST',
                    data: JSON.stringify({
                        old_password: self.oldPassword,
                        new_password: self.newPassword
                    }),
                    dataType: 'json',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/user/password`
                }).done(function() {
                    self.saving_pass = false;
                    self.show_snackbar('Password changed!', 'success');
                    self.$refs.chgpass.reset();
                }).fail(function(jqXHR) {
                    self.saving_pass = false;

                    if (jqXHR.readyState === 4) {
                        // HTTP error
                        const error = (jqXHR.responseJSON) ? jqXHR.responseJSON.error : "Something went wrong";
                        self.show_snackbar(error, 'error');
                    } else if (jqXHR.readyState === 0) {
                        // Network error
                        const error = "We can't connect to our server, please check your internet connection";
                        self.show_snackbar(error, 'error');
                    } else {
                        // something weird is happening
                        const error = "Something went wrong";
                        self.show_snackbar(error, 'error');
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .radio-group-full-width >>>.v-input__control {
        width: 100%
    }

    .radio-group-full-width >>> .v-input__slot {
        margin-bottom: 0 !important;
    }

    .radio-group-full-width >>> .v-messages {
        display: none !important;
    }
</style>