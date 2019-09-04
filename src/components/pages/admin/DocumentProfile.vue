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
                <v-layout wrap mt-5>
                    <v-flex xs12 sm12>
                        <v-form ref="form">
                            <div class="headline">{{ team.name }}</div>
                            <div class="title mt-1 grey--text">{{ team.university }}</div>
                            <v-card class="mt-3">
                                <v-expansion-panel class="elevation-0" v-for="item in users" :key="item.user_id">
                                    <v-expansion-panel-content>
                                        <template v-slot:header>
                                            <div>{{item.name}} <span v-if="item.is_user">(You)</span></div>
                                        </template>
                                        <v-card>
                                            <v-card-text class="grey lighten-4 pl-4 pr-4">
                                                <v-layout>
                                                    <v-flex>
                                                        <div>Email address</div>
                                                        <div><b>{{item.email}}</b></div>
                                                    </v-flex>
                                                </v-layout>
                                                <div class="mt-3">Student ID</div>
                                                <div v-if="!item.student_id_file_url">
                                                    <b class="red--text">Not uploaded</b>
                                                </div>
                                                <div v-if="item.student_id_file_url" class="mt-1">
                                                    <v-layout align-center>
                                                        <v-flex shrink>
                                                            <v-icon small class="mr-1">attachment</v-icon>
                                                        </v-flex>
                                                        <v-flex>
                                                            <a target="_blank" :href="item.student_id_file_url">{{item.student_id_filename}}</a>
                                                        </v-flex>
                                                        <v-flex shrink>
                                                            <div v-if="student_id_loading">
                                                                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                                            </div>
                                                            <div v-if="!student_id_loading">
                                                                <v-btn outline small color="red" @click="() => studentIdReject(item.user_id)" v-if="!item.student_id_rejected">
                                                                    Reject
                                                                </v-btn>
                                                                <v-btn outline small color="green" @click="() => studentIdValidate(item.user_id)" v-if="!item.student_id_verified">
                                                                    Accept
                                                                </v-btn>
                                                            </div>
                                                        </v-flex>
                                                    </v-layout>
                                                </div>

                                                <div class="mt-3">
                                                    Proof of enrollment
                                                </div>
                                                <div v-if="!item.poe_file_url">
                                                    <b class="red--text">Not uploaded</b>
                                                </div>
                                                <div v-if="item.poe_file_url" class="mt-1">
                                                    <v-layout align-center>
                                                        <v-flex shrink>
                                                            <v-icon small class="mr-1">attachment</v-icon>
                                                        </v-flex>
                                                        <v-flex>
                                                            <a target="_blank" :href="item.poe_file_url">{{item.poe_filename}}</a>
                                                        </v-flex>
                                                        <v-flex shrink>
                                                            <div v-if="poe_loading">
                                                                <v-progress-circular indeterminate color="primary"></v-progress-circular>
                                                            </div>
                                                            <div v-if="!poe_loading">
                                                                <v-btn small outline color="red" @click="() => poeReject(item.user_id)" v-if="!item.poe_rejected">
                                                                    Reject
                                                                </v-btn>
                                                                <v-btn small outline color="green" @click="() => poeValidate(item.user_id)" v-if="!item.poe_verified">
                                                                    Accept
                                                                </v-btn>
                                                            </div>
                                                        </v-flex>
                                                    </v-layout>
                                                </div>
                                            </v-card-text>
                                        </v-card>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
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

    const axios = require('axios');

    export default {
        name: "DocumentProfile",
        components: {BLCenterWrap, BLSubHeader, BLToolbar},
        data() {
            return {
                loading: false,
                poe_loading: false,
                student_id_loading: false,
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
            poeValidate(userId) {
                this.poe_loading = true;
                this.postStatus(userId, 'poe', 'validate', (success) => {
                    this.poe_loading = false;
                    if(success) {
                        this.changePoeVerified(userId, true);
                        this.changePoeRejected(userId, false);
                    }
                });
            },
            poeReject(userId) {
                this.poe_loading = true;
                this.postStatus(userId, 'poe', 'reject', (success) => {
                    this.poe_loading = false;
                    if(success) {
                        this.changePoeVerified(userId, false);
                        this.changePoeRejected(userId, true);
                    }
                });
            },
            studentIdValidate(userId) {
                this.student_id_loading = true;
                this.postStatus(userId, 'student-id', 'validate', (success) => {
                    this.student_id_loading = false;
                    if(success) {
                        this.changeStudentIdVerified(userId, true);
                        this.changeStudentIdRejected(userId, false);
                    }
                });
            },
            studentIdReject(userId) {
                this.student_id_loading = true;
                this.postStatus(userId, 'student-id', 'reject', (success) => {
                    this.student_id_loading = false;
                    if(success) {
                        this.changeStudentIdVerified(userId, false);
                        this.changeStudentIdRejected(userId, true);
                    }
                });
            },
            postStatus(userId, doc, action, onFinished) {
                axios.post(`${process.env.VUE_APP_API_BASE_URL}/v1/admin/documents/${doc}/${action}`, {user_id: userId}, {
                    headers: {'Authorization': `Bearer ${this.$store.getters.jwt}`},
                })
                    .then((response) => {
                        const data = response.data;

                        if (data.error) {
                            this.show_snackbar(data.error.toString(), 'error');
                        }

                        onFinished(true);
                    })
                    .catch((err) => {
                        this.show_snackbar(err.toString(), 'error');
                        onFinished(false);
                    });
            },
            changePoeVerified(userId, verified) {
                const user = this.findUser(userId);
                user.poe_verified = verified;
            },
            changePoeRejected(userId, rejected) {
                const user = this.findUser(userId);
                user.poe_rejected = rejected;
            },
            changeStudentIdVerified(userId, verified) {
                const user = this.findUser(userId);
                user.student_id_verified = verified;
            },
            changeStudentIdRejected(userId, rejected) {
                const user = this.findUser(userId);
                user.student_id_rejected = rejected;
            },
            findUser(userId) {
                return this.users.find((user) => {
                    return user.user_id === userId;
                });
            }
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