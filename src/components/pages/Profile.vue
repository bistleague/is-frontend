<template>
    <div>
        <BLToolbar />
        <BLSubHeader>
            <div class="headline font-weight-bold white--text mt-3 mb-3">Profile</div>
        </BLSubHeader>
        <v-content class="pl-3 pr-3">
            <v-layout v-if="!loading">
                <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
                    <v-layout wrap mt-5>
                        <v-flex xs12 sm12 md6 lg6 order-xs2 order-sm2 order-md1>
                            <div class="mb-1">Full Name</div>
                            <v-card>
                                <v-text-field label="Full Name" single-line full-width hide-details></v-text-field>
                            </v-card>
                            <div class="grey--text mt-3">Please write your full name using proper capitalization.</div>

                            <div class="mb-1 mt-4">E-mail address</div>
                            <v-card>
                                <v-text-field label="email@example.com" single-line full-width hide-details></v-text-field>
                            </v-card>

                            <div class="mb-1 mt-4">Mobile phone number</div>
                            <v-card>
                                <v-text-field label="08xxxxxxxxxx" single-line full-width hide-details></v-text-field>
                            </v-card>
                            <div class="grey--text mt-3">Please write your <b>mobile</b> number in all numbers (i.e. no characters or letters).</div>

                            <div class="mb-1 mt-4">Gender</div>
                            <v-card>
                                <v-radio-group v-model="gender" class="ma-0 pa-0 radio-group-full-width">
                                    <v-radio color="primary darken-1" value="0" label="Male" class="pa-3 ma-0"></v-radio>
                                    <v-divider></v-divider>
                                    <v-radio color="primary darken-1" value="1" label="Female" class="pa-3 ma-0"></v-radio>

                                </v-radio-group>
                            </v-card>

                            <div class="grey--text mt-3">Please fill the gender according to what is stated on your identity card.</div>

                            <div class="mb-1 mt-4">Your study</div>
                            <v-card>
                                <v-text-field label="University" full-width hide-details></v-text-field>
                                <v-divider></v-divider>
                                <v-text-field label="Major" full-width hide-details></v-text-field>
                            </v-card>
                            <div class="grey--text mt-3">Please write your institution/school name without abbreviating its name and  in its official name. For example, write Institut Teknologi Bandung instead of Bandung Institute of Technology.</div>

                            <v-btn color="primary" block class="text-none font-weight-bold mt-4 mb-5">Save</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-content>
    </div>
</template>

<script>
    import BLToolbar from "../partials/BLToolbar";
    import BLSubHeader from "../partials/BLSubHeader";
    const $ = require("jquery");

    export default {
        name: "Profile",
        components: {BLSubHeader, BLToolbar},
        data() {
            return {
                gender: '0',
                loading: true,
                predata: {}
            }
        },
        mounted: function() {
            this.load();
        },
        methods: {
            load: function() {
                let self = this;
                // TODO change URL
                $.get("/data/final.json").done(function(data) {
                    self.predata = data;
                    self.loading = false;
                }).fail(function() {
                    alert("error");
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