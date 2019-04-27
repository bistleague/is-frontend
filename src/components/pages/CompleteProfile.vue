<template>
    <div>
        <BLToolbar />
        <BLSubHeader>
            <div class="headline font-weight-bold white--text mt-3 mb-3">Complete Your Profile</div>
        </BLSubHeader>
        <v-content class="pl-3 pr-3">
            <BLCenterWrap v-if="!loading">
                <v-layout wrap mt-5>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-form @submit.prevent="save" v-model="valid" ref="form">
                            <div class="headline font-weight-bold grey--text text--darken-1">Hi, {{data.name}}!</div>
                            <p class="mt-3 grey--text text--darken-1">We promise we’ll make this quick, but we need you to complete your profile first.</p>

                            <div class="mb-1 mt-4">Mobile phone number</div>
                            <v-text-field solo label="08xxxxxxxxxx" single-line v-model="data.mobile_no" :rules="mobileRules" persistent-hint
                                          hint="Please write your <b>mobile</b> number in all numbers (i.e. no characters or letters)."></v-text-field>

                            <div class="mb-1 mt-4">Gender</div>
                            <v-card>
                                <v-radio-group v-model="data.gender" class="ma-0 pa-0 radio-group-full-width" :rules="requiredRules">
                                    <v-radio color="primary darken-1" value="1" label="Male" class="pa-3 ma-0"></v-radio>
                                    <v-divider></v-divider>
                                    <v-radio color="primary darken-1" value="2" label="Female" class="pa-3 ma-0"></v-radio>

                                </v-radio-group>
                            </v-card>

                            <div class="grey--text text--darken-1 mt-2 pl-3 pr-3 caption">Please fill the gender according to what is stated on your identity card.</div>

                            <div class="mb-1 mt-4">Your study</div>
                            <v-card>
                                <v-text-field label="University" full-width hide-details v-model="data.university" :rules="requiredRules"></v-text-field>
                                <v-divider></v-divider>
                                <v-text-field label="Major" full-width hide-details v-model="data.major" :rules="requiredRules"></v-text-field>
                            </v-card>
                            <div class="grey--text text--darken-1 mt-2 pl-3 pr-3 caption">Please write your institution/school name without abbreviating its name and in its official name. For example, write Institut Teknologi Bandung instead of Bandung Institute of Technology.</div>

                            <v-btn color="primary" block class="text-none font-weight-bold mt-4 mb-5" type="submit" :loading="saving">Continue</v-btn>
                        </v-form>
                    </v-flex>
                </v-layout>
            </BLCenterWrap>
        </v-content>
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
        name: "CompleteProfile",
        components: {BLCenterWrap, BLSubHeader, BLToolbar},
        data() {
            return {
                valid: false,
                loading: true,
                saving: false,
                data: {},
                snackbar: false,
                snackbar_text: '',
                snackbar_color: 'success',
                requiredRules: [
                    v => !!v || 'Field is required',
                ],
                mobileRules: [
                    v => !!v || 'Mobile phone number is required',
                    v => /^(\s*|\d+)$/.test(v) || 'Mobile phone number must be valid'
                ]
            }
        },
        mounted: function() {
            this.load();
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

                    // Profile saved, redirect
                    let path = self.$route.query.continue;
                    if(!path) path = "/profile";
                    self.$router.push({path: path});
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