<template>
    <div>
        <v-expansion-panel class="elevation-0" v-if="item">
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
        <v-divider></v-divider>
    </div>
</template>

<script>
    const axios = require('axios');

    export default {
        name: "DocumentTeamMember",
        props: ["user"],
        data() {
            return {
                poe_loading: false,
                student_id_loading: false,
                item: null
            }
        },
        mounted() {
            this.item = this.user;
        },
        methods: {
            poeValidate() {
                this.poe_loading = true;
                this.postStatus('poe', 'validate', (success) => {
                    this.poe_loading = false;
                    if(success) {
                        this.item.poe_verified = true;
                        this.item.poe_rejected = false;
                    }
                });
            },
            poeReject() {
                this.poe_loading = true;
                this.postStatus('poe', 'reject', (success) => {
                    this.poe_loading = false;
                    if(success) {
                        this.item.poe_verified = false;
                        this.item.poe_rejected = true;
                    }
                });
            },
            studentIdValidate() {
                this.student_id_loading = true;
                this.postStatus('student-id', 'validate', (success) => {
                    this.student_id_loading = false;
                    if(success) {
                        this.item.student_id_verified = true;
                        this.item.student_id_rejected = false;
                    }
                });
            },
            studentIdReject() {
                this.student_id_loading = true;
                this.postStatus('student-id', 'reject', (success) => {
                    this.student_id_loading = false;
                    if(success) {
                        this.item.student_id_verified = false;
                        this.item.student_id_rejected = true;
                    }
                });
            },
            postStatus(doc, action, onFinished) {
                const userId = this.item.user_id;
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
        }
    }
</script>

<style scoped>

</style>