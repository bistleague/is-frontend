<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app>
        <BLToolbar />
        <BLStepper step="2" />
        <v-content class="pl-3 pr-3">
            <v-layout v-if="!loading">
                <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
                    <PreliminaryAwait :team-name="predata.team_name" v-if="!predata.started && !predata.stage_closed"></PreliminaryAwait>
                    <PreliminaryClosed v-if="predata.stage_closed"></PreliminaryClosed>
                    <v-layout wrap mt-5 v-if="predata.started && !predata.stage_closed">
                        <v-flex xs12 sm12 md5 lg5 order-xs2 order-sm2 order-md1>
                            <div class="headline font-weight-bold grey--text text--darken-1">Preliminary Round</div>
                            <p class="mt-3 grey--text text--darken-1">Welcome to Preliminary Round! You are given a case, which you can download by clicking the button below, and you'll need to make a presentation with an audio narration talking about the case.</p>

                            <a target="_blank" :href="predata.case_url" style="text-decoration: none">
                                <v-btn outline block class="text-none"><v-icon class="mr-2">save_alt</v-icon>Download preliminary case</v-btn>
                            </a>

                            <v-card>
                                <div class="green pa-3 mt-4 white--text" v-if="predata.submission.uploaded">
                                    <v-layout align-center>
                                        <v-flex>
                                            Submitted
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-icon small dark class="ma-0">check_circle</v-icon>
                                        </v-flex>
                                    </v-layout>
                                </div>
                                <div class="red pa-3 mt-4 white--text" v-if="!predata.submission.uploaded">
                                    <v-layout align-center>
                                        <v-flex>
                                            Not submitted
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-icon small dark class="ma-0">report</v-icon>
                                        </v-flex>
                                    </v-layout>
                                </div>
                                <v-card-text class="pa-3" v-if="predata.submission.uploaded">
                                    Last uploaded {{parse_time(predata.submission.last_submitted_at)}} by <b>{{predata.submission.last_submitted_by}}</b>.
                                    <v-layout align-center class="mt-2">
                                        <v-flex shrink>
                                            <v-icon small class="mr-1">attachment</v-icon>
                                        </v-flex>
                                        <v-flex>
                                            <a target="_blank" :href="predata.submission.file_url">{{predata.submission.filename}}</a>
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-btn icon small class="ma-0" v-if="!predata.submission.closed"><v-icon small color="red">delete</v-icon></v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                                <v-card-text class="pa-3" v-if="!predata.submission.uploaded">
                                    Your team hasn't submitted anything.
                                    <v-btn outline color="primary" class="text-none mt-3" block>Upload submission</v-btn>
                                </v-card-text>
                                <div class="pa-3 grey lighten-4">
                                    <p class="ma-0" v-if="!predata.submission.closed">No worries! You can edit the submission until the deadline is up.</p>
                                    <p class="ma-0" v-if="predata.submission.closed && !predata.submission.uploaded">Whoops, time's up. You can still upload the submission, but you can't edit it later. <b>Your late submission will subject to score deduction.</b></p>
                                    <p class="ma-0" v-if="predata.submission.closed && predata.submission.uploaded">Time's up! We'll review your submission. In the meantime, just wish for the best :)</p>
                                </div>
                            </v-card>
                        </v-flex>
                        <v-flex xs1 sm1 md1 lg1 order-xs3 order-sm3 order-md2></v-flex>
                        <v-flex xs12 sm12 md6 lg6 order-xs1 order-sm1 order-md3 class="grey--text text--darken-1">

                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-content>
    </v-app>

</template>

<script>
    import PreliminaryClosed from "../../partials/competition/PreliminaryClosed";
    const $ = require("jquery");
    import BLToolbar from "../../partials/BLToolbar";
    import BLStepper from "../../partials/BLStepper";
    import PreliminaryAwait from "../../partials/competition/PreliminaryAwait";
    const timeago = require("timeago.js");

    export default {
        name: "Preliminary",
        components: {PreliminaryClosed, PreliminaryAwait, BLStepper, BLToolbar},
        data() {
            return {
                loading: true,
                predata: {}
            }
        },
        mounted: function() {
            this.load();
        },
        methods: {
            parse_time: function(time) {
                return timeago.format(time);
            },
            load: function() {
                let self = this;
                // TODO change URL
                $.get("/data/preliminary.json").done(function(data) {
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

</style>