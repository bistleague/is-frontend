<template>
    <Protected continue="/profile">
        <BLToolbar />
        <BLSubHeader>
            <div class="headline font-weight-bold white--text mt-3 mb-3">Profile</div>
        </BLSubHeader>
        <v-content class="pl-3 pr-3">
            <v-layout v-if="!loading">
                <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
                    <v-layout wrap mt-5>
                        <v-flex xs12 sm12 md6 lg6 order-xs2 order-sm2 order-md1>
                            <v-form ref="form" v-model="valid">
                                <div class="mb-1">Full Name</div>
                                <v-card>
                                    <v-text-field label="Full Name" single-line full-width hide-details v-model="data.name" required :rules="requiredRules"></v-text-field>
                                </v-card>
                                <div class="grey--text mt-3">Please write your full name using proper capitalization.</div>

                                <div class="mb-1 mt-4">E-mail address</div>
                                <v-card>
                                    <v-text-field label="email@example.com" single-line full-width hide-details v-model="data.email" required :rules="emailRules"></v-text-field>
                                </v-card>

                                <div class="mb-1 mt-4">Mobile phone number</div>
                                <v-card>
                                    <v-text-field label="08xxxxxxxxxx" single-line full-width hide-details v-model="data.mobile_no" :rules="mobileRules"></v-text-field>
                                </v-card>
                                <div class="grey--text mt-3">Please write your <b>mobile</b> number in all numbers (i.e. no characters or letters).</div>

                                <div class="mb-1 mt-4">Gender</div>
                                <v-card>
                                    <v-radio-group v-model="data.gender" class="ma-0 pa-0 radio-group-full-width">
                                        <v-radio color="primary darken-1" value="1" label="Male" class="pa-3 ma-0"></v-radio>
                                        <v-divider></v-divider>
                                        <v-radio color="primary darken-1" value="2" label="Female" class="pa-3 ma-0"></v-radio>

                                    </v-radio-group>
                                </v-card>

                                <div class="grey--text mt-3">Please fill the gender according to what is stated on your identity card.</div>

                                <div class="mb-1 mt-4">Your study</div>
                                <v-card>
                                    <v-text-field label="University" full-width hide-details v-model="data.university"></v-text-field>
                                    <v-divider></v-divider>
                                    <v-text-field label="Major" full-width hide-details v-model="data.major"></v-text-field>
                                </v-card>
                                <div class="grey--text mt-3">Please write your institution/school name without abbreviating its name and in its official name. For example, write Institut Teknologi Bandung instead of Bandung Institute of Technology.</div>

                                <v-btn color="primary" block class="text-none font-weight-bold mt-4 mb-5" :loading="saving" @click="save">Save</v-btn>
                            </v-form>

                            <v-snackbar v-model="snackbar" top :color="snackbar_color" multi-line>
                                {{ snackbar_text }}
                                <v-btn dark flat @click="snackbar = false">
                                    Close
                                </v-btn>
                            </v-snackbar>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-content>
    </Protected>
</template>

<script>
    import BLToolbar from "../partials/BLToolbar";
    import BLSubHeader from "../partials/BLSubHeader";
    import Protected from "../Protected";
    const $ = require("jquery");

    // TODO form validation

    export default {
        name: "Profile",
        components: {Protected, BLSubHeader, BLToolbar},
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
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
                mobileRules: [
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