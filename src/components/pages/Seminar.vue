<template>
    <div>
        <BLToolbar />
        <BLSubHeader>
            <div class="headline font-weight-bold white--text mt-3 mb-3">Seminar</div>
        </BLSubHeader>
        <v-content class="pl-3 pr-3">
            <v-layout v-if="!loading">
                <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
                    <v-layout wrap mt-5>
                        <v-flex xs12 sm6 offset-sm3>
                            <div class="headline font-weight-bold grey--text text--darken-1">You haven’t bought a ticket.</div>
                            <p class="mt-3 grey--text text--darken-1">Looks like you haven’t bought a seminar ticket.</p>
                            <p class="mt-3 grey--text text--darken-1">If you want to know what the seminar is about, head over to the seminar details page.</p>
                            <p class="mt-3 grey--text text--darken-1">When you’re ready to buy one, simply click on the button below, and we’ll give you instructions on how to pay for it.</p>

                            <v-btn color="primary" block class="text-none font-weight-bold mt-4 mb-5" @click="submit">Get me a seminar ticket!</v-btn>
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
        name: "CompleteProfile",
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
            },
            submit() {
                // TODO buy
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