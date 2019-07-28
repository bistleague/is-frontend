<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <BLCenterWrap>
        <v-snackbar v-model="snackbar" top :color="snackbar_color" multi-line>
            {{ snackbar_text }}
            <v-btn dark flat @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
        <v-layout wrap mt-5>
            <v-flex xs12 sm12 md5 lg5 order-xs2 order-sm2 order-md1>
                <div class="mb-1 grey--text">Team Name</div>
                <v-text-field label="Team Name" solo v-model="teamName"></v-text-field>

                <div class="mb-1 grey--text">University</div>
                <v-text-field label="University" solo v-model="university"></v-text-field>

                <div class="mb-1 grey--text">Team Members</div>

                <v-card elevation-2>
                    <div v-for="item in data.team_members" :key="item.id">
                        <TeamMember :item="item" @competition-refetch="$emit('competition-refetch')"></TeamMember>
                    </div>
                    <v-btn flat block color="grey darken-1" class="text-none mt-0" @click.stop="dialog = true"><v-icon>add</v-icon> &nbsp; Invite team member</v-btn>
                    <v-dialog v-model="dialog" max-width="400">
                        <v-card>
                            <v-card-title class="subheading primary white--text">Invite team member</v-card-title>
                            <v-card-text>
                                Ask your friend to sign up on Bistleague.com, and join a team with the invite code:
                                <v-sheet color="grey lighten-4" class="pa-1 mt-3 mb-1">
                                    <div class="headline font-weight-bold" align="center" style="letter-spacing: 8px !important;">{{inviteCode}}</div>
                                </v-sheet>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn color="grey darken-2" flat class="text-none" @click="recreateInviteCode" :loading="recreatingInviteCode">
                                    Recreate code
                                </v-btn>
                                <v-spacer></v-spacer>

                                <v-btn color="primary" outline class="text-none" @click="dialog = false">
                                    Close
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card>


                <div class="mb-1 mt-4 grey--text">Proof of payment</div>
                <v-card>
                    <div class="red pa-3 white--text" v-if="!data.payment.uploaded">
                        <v-layout align-center>
                            <v-flex>
                                Not uploaded
                            </v-flex>
                            <v-flex shrink>
                                <v-icon small dark class="ma-0">report</v-icon>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div class="orange pa-3 white--text" v-if="data.payment.uploaded && data.payment.status === 'PENDING'">
                        <v-layout align-center>
                            <v-flex>
                                Pending verification
                            </v-flex>
                            <v-flex shrink>
                                <v-icon small dark class="ma-0">access_time</v-icon>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div class="green pa-3 white--text" v-if="data.payment.uploaded && data.payment.status === 'VERIFIED'">
                        <v-layout align-center>
                            <v-flex>
                                Verified
                            </v-flex>
                            <v-flex shrink>
                                <v-icon small dark class="ma-0">check_circle</v-icon>
                            </v-flex>
                        </v-layout>
                    </div>
                    <div class="red pa-3 white--text" v-if="data.payment.uploaded && data.payment.status === 'REJECTED'">
                        <v-layout align-center>
                            <v-flex>
                                Rejected
                            </v-flex>
                            <v-flex shrink>
                                <v-icon small dark class="ma-0">highlight_off</v-icon>
                            </v-flex>
                        </v-layout>
                    </div>
                    <v-card-text class="pa-3">
                        <div v-if="!data.payment.uploaded">Upload your proof of payment here. It can be a photo of the ATM receipt, or a screenshot of an e-receipt clearly showing the nominal, date, and recipient of the transfer.</div>
                        <div v-if="data.payment.uploaded && data.payment.status === 'PENDING'">The proof of payment you uploaded is being reviewed.</div>
                        <div v-if="data.payment.uploaded && data.payment.status === 'VERIFIED'">We have verified your proof of payment.</div>
                        <div v-if="data.payment.uploaded && data.payment.status === 'REJECTED'">We can't accept your proof of payment.</div>

                        <v-layout align-center class="mt-2" v-if="data.payment.uploaded">
                            <v-flex shrink>
                                <v-icon small class="mr-1">attachment</v-icon>
                            </v-flex>
                            <v-flex>
                                <a target="_blank" :href="data.payment.url">{{data.payment.filename}}</a>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn icon small class="ma-0" v-if="data.payment.status !== 'VERIFIED'" :loading="deleting_pop" @click.prevent="deleteProofOfPayment"><v-icon small color="red">delete</v-icon></v-btn>
                            </v-flex>
                        </v-layout>
                        <v-btn outline block class="mt-3 text-none" v-if="!data.payment.uploaded" :loading="uploading_pop" @click.prevent="$refs.file_pop.click()">Upload</v-btn>
                        <input type="file" id="file_pop" ref="file_pop" v-on:change="handleFileUploadProofOfPayment" style="display: none"/>
                    </v-card-text>
                </v-card>

                <v-btn block color="primary" class="text-none mt-4" v-on:click="saveChanges" :loading="saving">Save</v-btn>
            </v-flex>
            <v-flex xs1 sm1 md1 lg1 order-xs3 order-sm3 order-md2></v-flex>
            <v-flex xs12 sm12 md6 lg6 order-xs1 order-sm1 order-md3 class="grey--text text--darken-1">
                <div class="headline font-weight-bold">Welcome aboard!</div>
                <p class="mt-3">Your journey of participating in BIST League 2.0 begins here. Kindly fill in all the information required in the form.</p>
                <p>You can freely change your registration data before the deadline is up. Just click "Save" when you make any changes. Don't worry if the status of your application is still pending when the deadline is up, we'll still receive it.</p>
                <v-img :src="require('../../../assets/welcome.svg')"></v-img>
            </v-flex>
        </v-layout>
    </BLCenterWrap>
</template>

<script>
    import BLCenterWrap from "../../partials/BLCenterWrap";
    import TeamMember from "./registration/TeamMember";
    const axios = require('axios');

    export default {
        name: "RegistrationPartial",
        components: {TeamMember, BLCenterWrap},
        props: ["data"],
        mounted() {
            this.teamName = this.data.team_name;
            this.university = this.data.university;
            this.inviteCode = this.data.invite_code;
        },
        data () {
            return {
                dialog: false,
                saving: false,
                teamName: '',
                university: '',
                snackbar: false,
                snackbar_text: '',
                snackbar_color: 'success',
                uploading_pop: false,
                deleting_pop: false,
                uploading_student_id: {},
                deleting_student_id: {},
                recreatingInviteCode: false,
                inviteCode: ''
            }
        },
        methods: {
            saveChanges() {
                const payload = {
                    name: this.teamName,
                    university: this.university
                };

                this.saving = true;

                axios.put(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team`, payload, {
                    headers: {'Authorization': `Bearer ${this.$store.getters.jwt}`}
                }).then(() => {
                    this.show_snackbar("Changes saved!", "success");
                }).catch((e) => {
                    this.show_snackbar(`Error: ${e.toString()}`, "error");
                }).finally(() => {
                    this.saving = false;
                });
            },
            handleFileUploadProofOfPayment() {
                const file = this.$refs.file_pop.files[0];

                let formData = new FormData();
                formData.append('file', file);

                this.uploading_pop = true;
                axios.post(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/pop`, formData,
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
                    this.uploading_pop = false;
                });
            },
            deleteProofOfPayment() {
                this.deleting_pop = true;
                axios.delete(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/pop`,
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
                    this.deleting_pop = false;
                });
            },
            recreateInviteCode() {
                this.recreatingInviteCode = true;
                axios.post(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/invite_code`, {}, {
                    headers: {'Authorization': `Bearer ${this.$store.getters.jwt}`}
                }).then((response) => {
                    this.inviteCode = response.data.code;
                }).catch(() => {
                    // TODO show error
                }).finally(() => {
                    this.recreatingInviteCode = false;
                })
            },
            show_snackbar(text, color) {
                this.snackbar = true;
                this.snackbar_text = text;
                this.snackbar_color = color;
            },
        }
    }
</script>

<style scoped>

</style>