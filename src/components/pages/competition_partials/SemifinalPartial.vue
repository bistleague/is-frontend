<template>
    <v-layout>
        <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
            <!-- Show screen if Stage is not started AND Stage is not closed, OR team is not qualified -->
            <SemifinalAwait :team-name="data.team_name" v-if="(!data.started && !data.stage_closed) || !data.qualified" :qualified="data.qualified"></SemifinalAwait>

            <!-- Show screen if Stage is closed AND team is qualified -->
            <SemifinalClosed v-if="data.stage_closed && data.qualified"></SemifinalClosed>

            <!-- Show submission screen if Stage is started AND Stage is not closed AND team is qualified -->
            <v-layout wrap mt-5 v-if="data.started && !data.stage_closed && data.qualified">
                <v-flex xs12 sm12 md5 lg5 order-xs2 order-sm2 order-md1>
                    <div class="headline font-weight-bold grey--text text--darken-1">Semifinal Round</div>
                    <p class="mt-3 grey--text text--darken-1">Welcome to Semifinal Round! You are given a case, which you can download by clicking the button below, and you'll need to make a presentation with an audio narration talking about the case.</p>

                    <a target="_blank" :href="data.case_url" style="text-decoration: none">
                        <v-btn outline block class="text-none"><v-icon class="mr-2">save_alt</v-icon>Download semifinal case</v-btn>
                    </a>

                    <v-card>
                        <div class="green pa-3 mt-4 white--text" v-if="data.submission.uploaded">
                            <v-layout align-center>
                                <v-flex>
                                    Submitted
                                </v-flex>
                                <v-flex shrink>
                                    <v-icon small dark class="ma-0">check_circle</v-icon>
                                </v-flex>
                            </v-layout>
                        </div>
                        <div class="red pa-3 mt-4 white--text" v-if="!data.submission.uploaded">
                            <v-layout align-center>
                                <v-flex>
                                    Not submitted
                                </v-flex>
                                <v-flex shrink>
                                    <v-icon small dark class="ma-0">report</v-icon>
                                </v-flex>
                            </v-layout>
                        </div>
                        <v-card-text class="pa-3" v-if="data.submission.uploaded">
                            Last uploaded {{parse_time(data.submission.last_submitted_at)}} by <b>{{data.submission.last_submitted_by}}</b>.
                            <v-layout align-center class="mt-2">
                                <v-flex shrink>
                                    <v-icon small class="mr-1">attachment</v-icon>
                                </v-flex>
                                <v-flex>
                                    <a target="_blank" :href="data.submission.file_url">{{data.submission.filename}}</a>
                                </v-flex>
                                <v-flex shrink>
                                    <v-btn icon small class="ma-0" v-if="!data.submission.closed"><v-icon small color="red">delete</v-icon></v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                        <v-card-text class="pa-3" v-if="!data.submission.uploaded">
                            Your team hasn't submitted anything.
                            <v-btn outline color="primary" class="text-none mt-3" block>Upload submission</v-btn>
                        </v-card-text>
                        <div class="pa-3 grey lighten-4">
                            <p class="ma-0" v-if="!data.submission.closed">No worries! You can edit the submission until the deadline is up.</p>
                            <p class="ma-0" v-if="data.submission.closed && !data.submission.uploaded">Whoops, time's up. You can still upload the submission, but you can't edit it later. <b>Your late submission will subject to score deduction.</b></p>
                            <p class="ma-0" v-if="data.submission.closed && data.submission.uploaded">Time's up! We'll review your submission. In the meantime, just wish for the best :)</p>
                        </div>
                    </v-card>
                </v-flex>
                <v-flex xs1 sm1 md1 lg1 order-xs3 order-sm3 order-md2></v-flex>
                <v-flex xs12 sm12 md6 lg6 order-xs1 order-sm1 order-md3 class="grey--text text--darken-1">

                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import SemifinalAwait from "../../partials/competition/SemifinalAwait";
    import SemifinalClosed from "../../partials/competition/SemifinalClosed";
    const timeago = require("timeago.js");

    export default {
        name: "SemifinalPartial",
        components: {SemifinalClosed, SemifinalAwait},
        props: ["data"],
        methods: {
            parse_time: function (time) {
                return timeago.format(time);
            }
        }
    }
</script>

<style scoped>

</style>