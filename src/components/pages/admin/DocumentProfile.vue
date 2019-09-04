<template>
    <div>
        <BLToolbar/>
        <BLSubHeader>
            <div class="headline font-weight-bold white--text mt-3 mb-3">User Document Profile</div>
        </BLSubHeader>
        <v-content class="">
            <div align="center" v-if="loading" class="pa-4">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            <BLCenterWrap v-if="!loading">
                <v-layout wrap my-4>
                    <v-flex xs12 sm12>
                        <v-form ref="form">
                            <div class="headline">{{ team.name }}</div>
                            <div class="title mt-1 grey--text">{{ team.university }}</div>
                            <v-card class="mt-3">
                                <DocumentTeamMember :user="user" v-for="user in users" :key="user.user_id"></DocumentTeamMember>
                            </v-card>
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
    import BLToolbar from "../../partials/BLToolbar";
    import BLSubHeader from "../../partials/BLSubHeader";
    import BLCenterWrap from "../../partials/BLCenterWrap";
    import DocumentTeamMember from "./partials/DocumentTeamMember";

    const axios = require('axios');

    export default {
        name: "DocumentProfile",
        components: {DocumentTeamMember, BLCenterWrap, BLSubHeader, BLToolbar},
        data() {
            return {
                loading: false,
                snackbar: false,
                snackbar_text: '',
                snackbar_color: 'success',
                team: {},
                users: []
            }
        },
        mounted: function () {
            this.load();
        },
        methods: {
            show_snackbar: function (text, color) {
                this.snackbar = true;
                this.snackbar_text = text;
                this.snackbar_color = color;
            },
            load() {
                this.loading = true;
                axios.get(`${process.env.VUE_APP_API_BASE_URL}/v1/admin/documents/team?team_id=${this.$route.params.teamId}`, {
                    headers: {'Authorization': `Bearer ${this.$store.getters.jwt}`},
                })
                    .then((response) => {
                        const data = response.data;

                        if (data.error) {
                            this.show_snackbar(data.error.toString(), 'error');
                        }

                        this.team = data.team;
                        this.users = data.users;
                    })
                    .catch((err) => {
                        this.show_snackbar(err.toString(), 'error');
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        }
    }
</script>

<style scoped>
    .radio-group-full-width >>> .v-input__control {
        width: 100%
    }

    .radio-group-full-width >>> .v-input__slot {
        margin-bottom: 0 !important;
    }

    .radio-group-full-width >>> .v-messages {
        display: none !important;
    }
</style>