<template>
    <div>
        <v-layout>
            <v-flex>
                <div>Email address</div>
                <div><b>{{item.email}}</b></div>
            </v-flex>
            <v-flex shrink class="pa-0">
                <v-menu bottom left origin="top right" transition="scale-transition">
                    <template v-slot:activator="{ on }">
                        <v-btn class="ma-0 pa-0" icon small v-on="on"><v-icon small color="grey darken-1">more_vert</v-icon></v-btn>
                    </template>

                    <v-list>
                        <v-list-tile @click="deleteMember">
                            <v-list-tile-title v-if="item.is_user">Leave team</v-list-tile-title> <!-- TODO fix -->
                            <v-list-tile-title v-if="!item.is_user">Delete member</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-flex>
        </v-layout>
        <div class="mt-3">Student ID</div>
        <v-btn outline small block color="grey darken-1" class="text-none" v-if="!item.student_id.uploaded" :loading="uploading_student_id" @click.prevent="() => $refs.file_stdid.click()">Upload</v-btn>
        <div v-if="item.student_id.status === 'PENDING'"><b class="orange--text">Pending verification</b></div>
        <div v-if="item.student_id.status === 'VERIFIED'"><b class="green--text text--darken-1">We have verified your student ID</b></div>
        <div v-if="item.student_id.status === 'REJECTED'"><b class="red--text text--darken-1">Your student ID is inadequate. Please upload another one.</b></div>
        <input type="file" ref="file_stdid" v-on:change="handleFileUploadStudentId" style="display: none"/>

        <div v-if="item.student_id.url" class="mt-1">
            <v-layout align-center>
                <v-flex shrink>
                    <v-icon small class="mr-1">attachment</v-icon>
                </v-flex>
                <v-flex>
                    <a target="_blank" :href="item.student_id.url">{{item.student_id.filename}}</a>
                </v-flex>
                <v-flex shrink>
                    <v-btn icon small class="ma-0" v-if="item.student_id.status === 'PENDING' || item.student_id.status === 'REJECTED'" :loading="deleting_student_id" @click.prevent="deleteStudentId"><v-icon small color="red">delete</v-icon></v-btn>
                </v-flex>
            </v-layout>
        </div>

        <div class="mt-3">
            Proof of enrollment
            <v-menu
                    :close-on-content-click="false"
                    transition="slide-y-transition"
                    bottom>
                <template v-slot:activator="{ on }">
                    <v-btn small icon v-on="on" class="pa-0 ma-0">
                        <v-icon small>help</v-icon>
                    </v-btn>
                </template>

                <v-card class="pa-3" max-width="350">
                    <p>Proof of enrollment is required to ensure all participants are still active undergraduate students until the end of the competition.</p>
                    <p>You can upload your student study card (Kartu Studi Mahasiswa) if available, or you can upload a screenshot from your study plan that shows your name, enrollment year, and the semester that you're currently attending.</p>
                    <p class="mb-0">You can also upload a letter from your university stating that you are still an undergraduate student by <b>November 2019</b>.</p>
                </v-card>
            </v-menu>
        </div>
        <v-btn outline small block color="grey darken-1" class="text-none" v-if="!item.proof_of_enrollment.uploaded" :loading="uploading_proof_of_enrollment" @click.prevent="() => $refs.file_poe.click()">Upload</v-btn>
        <div v-if="item.proof_of_enrollment.status === 'PENDING'"><b class="orange--text">Pending verification</b></div>
        <div v-if="item.proof_of_enrollment.status === 'VERIFIED'"><b class="green--text text--darken-1">We have verified your proof of enrollment</b></div>
        <div v-if="item.proof_of_enrollment.status === 'REJECTED'"><b class="red--text text--darken-1">We can't accept your proof of enrollment. Please upload another one.</b></div>
        <input type="file" ref="file_poe" v-on:change="handleFileUploadPoe" style="display: none"/>

        <div v-if="item.proof_of_enrollment.url" class="mt-1">
            <v-layout align-center>
                <v-flex shrink>
                    <v-icon small class="mr-1">attachment</v-icon>
                </v-flex>
                <v-flex>
                    <a target="_blank" :href="item.proof_of_enrollment.url">{{item.proof_of_enrollment.filename}}</a>
                </v-flex>
                <v-flex shrink>
                    <v-btn icon small class="ma-0" v-if="item.proof_of_enrollment.status === 'PENDING' || item.proof_of_enrollment.status === 'REJECTED'" :loading="deleting_proof_of_enrollment" @click.prevent="deletePoe"><v-icon small color="red">delete</v-icon></v-btn>
                </v-flex>
            </v-layout>
        </div>
    </div>
</template>

<script>
    const axios = require('axios');
    export default {
        name: "TeamMember",
        props: ['item'],
        data() {
            return {
                uploading_student_id: false,
                uploading_proof_of_enrollment: false,
                deleting_student_id: false,
                deleting_proof_of_enrollment: false,
                leaving_team: false
            }
        },
        methods: {
            handleFileUploadStudentId() {
                const file = this.$refs.file_stdid.files[0];

                let formData = new FormData();
                formData.append('file', file);

                this.uploading_student_id = true;
                axios.post(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/student_id?user=${this.item.id}`, formData,
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
                    this.uploading_student_id = false;
                });
            },
            deleteStudentId() {
                this.deleting_student_id = true;
                axios.delete(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/student_id?user=${this.item.id}`,
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
                    this.deleting_student_id = false;
                });
            },
            handleFileUploadPoe() {
                const file = this.$refs.file_poe.files[0];

                let formData = new FormData();
                formData.append('file', file);

                this.uploading_proof_of_enrollment = true;
                axios.post(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/poe?user=${this.item.id}`, formData,
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
                    this.uploading_proof_of_enrollment = false;
                });
            },
            deletePoe() {
                this.deleting_proof_of_enrollment = true;
                axios.delete(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/poe?user=${this.item.id}`,
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
                    this.deleting_proof_of_enrollment = false;
                });
            },
            deleteMember() {
                this.leaving_team = true;
                axios.delete(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/member?user=${(this.item.is_user) ? '' : this.item.id}`,
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
                    this.leaving_team = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>