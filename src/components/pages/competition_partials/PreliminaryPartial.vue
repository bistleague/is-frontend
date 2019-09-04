<template>
    <BLCenterWrap v-if="!loading">
        <PreliminaryAwait :team-name="data.team_name" v-if="!data.started && !data.stage_closed"></PreliminaryAwait>
        <PreliminaryClosed v-if="data.stage_closed"></PreliminaryClosed>
        <v-layout wrap mt-5 v-if="data.started && !data.stage_closed">
            <v-flex xs12 sm12 md5 lg5>
                <div class="headline font-weight-bold grey--text text--darken-1">Preliminary Round</div>
                <p class="mt-3 grey--text text--darken-1">Welcome to Preliminary Round! You are given a case, which you can download by clicking the button below, and you'll need to make a presentation with an audio narration talking about the case.</p>

                <a target="_blank" :href="data.case_url" style="text-decoration: none">
                    <v-btn outline block class="text-none"><v-icon class="mr-2">save_alt</v-icon>Download preliminary case</v-btn>
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
                                <v-btn icon small class="ma-0" v-if="!data.submission.closed" :loading="deleting_submission" @click.prevent="deleteSubmission"><v-icon small color="red">delete</v-icon></v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-text class="pa-3" v-if="!data.submission.uploaded">
                        Your team hasn't submitted anything.
                        <v-btn outline color="primary" class="text-none mt-3" block :loading="uploading_submission" @click.prevent="$refs.file_submission.click()">Upload submission</v-btn>
                        <input type="file" id="file_submission" ref="file_submission" v-on:change="handleFileUploadSubmission" style="display: none"/>
                    </v-card-text>
                    <div class="pa-3 grey lighten-4">
                        <p class="ma-0" v-if="!data.submission.closed">No worries! You can edit the submission until the deadline is up.</p>
                        <p class="ma-0" v-if="data.submission.closed && !data.submission.uploaded">Whoops, time's up. You can still upload the submission, but you can't edit it later. <b>Your late submission will subject to score deduction.</b></p>
                        <p class="ma-0" v-if="data.submission.closed && data.submission.uploaded">Time's up! We'll review your submission. In the meantime, just wish for the best :)</p>
                    </div>
                </v-card>
            </v-flex>
            <v-flex xs1 sm1 md1 lg1></v-flex>
            <v-flex xs12 sm12 md6 lg6 py-4 class="grey--text text--darken-1">
                <v-img :src="require('../../../assets/submission.svg')"></v-img>
            </v-flex>
        </v-layout>
    </BLCenterWrap>
</template>

<script>
    import PreliminaryAwait from "../../partials/competition/PreliminaryAwait";
    import PreliminaryClosed from "../../partials/competition/PreliminaryClosed";
    import BLCenterWrap from "../../partials/BLCenterWrap";
    const timeago = require("timeago.js");
    const axios = require('axios');

    export default {
        name: "PreliminaryPartial",
        components: {BLCenterWrap, PreliminaryClosed, PreliminaryAwait},
        props: ["data"],
        data() {
            return {
                uploading_submission: false,
                deleting_submission: false
            }
        },
        methods: {
            parse_time: function (time) {
                return timeago.format(time);
            },
            handleFileUploadSubmission() {
                const file = this.$refs.file_submission.files[0];

                let formData = new FormData();
                formData.append('file', file);

                this.uploading_submission = true;
                axios.post(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/submission`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${this.$store.getters.jwt}`
                        }
                    }
                ).then(() => {
                    this.$emit("competition-refetch");
                }).catch((e) => {
                    this.show_snackbar("Error uploading file: " + e.toString(), 'error');
                }).finally(() => {
                    this.uploading_submission = false;
                });
            },
            deleteSubmission() {
                this.deleting_submission = true;
                axios.delete(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/submission`,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${this.$store.getters.jwt}`
                        }
                    }
                ).then(() => {
                    this.$emit("competition-refetch");
                }).catch((e) => {
                    this.show_snackbar("Error: " + e.toString(), 'error');
                }).finally(() => {
                    this.deleting_submission = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>