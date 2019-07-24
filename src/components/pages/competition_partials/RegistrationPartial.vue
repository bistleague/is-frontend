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
                        <v-expansion-panel expand class="elevation-0">
                            <v-expansion-panel-content>
                                <template v-slot:header>
                                    <div>{{item.name}}</div>
                                </template>
                                <v-card>
                                    <v-card-text class="grey lighten-4 pl-4 pr-4">
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
                                                        <v-list-tile>
                                                            <v-list-tile-title v-if="true">Leave team</v-list-tile-title> <!-- TODO fix -->
                                                            <v-list-tile-title v-if="!true">Delete member</v-list-tile-title>
                                                        </v-list-tile>
                                                    </v-list>
                                                </v-menu>
                                            </v-flex>
                                        </v-layout>
                                        <div class="mt-3">Student ID</div>
                                        <v-btn outline small block color="grey darken-1" class="text-none" v-if="!item.student_id.uploaded">Upload</v-btn>
                                        <div v-if="item.student_id.status === 'PENDING'"><b class="orange--text">Pending verification</b></div>
                                        <div v-if="item.student_id.status === 'VERIFIED'"><b class="green--text text--darken-1">We have verified your student ID</b></div>
                                        <div v-if="item.student_id.status === 'REJECTED'"><b class="red--text text--darken-1">Your student ID is inadequate. Please upload another one.</b></div>

                                        <div v-if="item.student_id.url" class="mt-1">
                                            <v-layout align-center>
                                                <v-flex shrink>
                                                    <v-icon small class="mr-1">attachment</v-icon>
                                                </v-flex>
                                                <v-flex>
                                                    <a target="_blank" :href="item.student_id.url">{{item.student_id.filename}}</a>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-btn icon small class="ma-0" v-if="item.student_id.status === 'PENDING' || item.student_id.status === 'REJECTED'"><v-icon small color="red">delete</v-icon></v-btn>
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
                                        <v-btn outline small block color="grey darken-1" class="text-none" v-if="!item.proof_of_enrollment.uploaded">Upload</v-btn>
                                        <div v-if="item.proof_of_enrollment.status === 'PENDING'"><b class="orange--text">Pending verification</b></div>
                                        <div v-if="item.proof_of_enrollment.status === 'VERIFIED'"><b class="green--text text--darken-1">We have verified your proof of enrollment</b></div>
                                        <div v-if="item.proof_of_enrollment.status === 'REJECTED'"><b class="red--text text--darken-1">We can't accept your proof of enrollment. Please upload another one.</b></div>

                                        <div v-if="item.proof_of_enrollment.url" class="mt-1">
                                            <v-layout align-center>
                                                <v-flex shrink>
                                                    <v-icon small class="mr-1">attachment</v-icon>
                                                </v-flex>
                                                <v-flex>
                                                    <a target="_blank" :href="item.proof_of_enrollment.url">{{item.proof_of_enrollment.filename}}</a>
                                                </v-flex>
                                                <v-flex shrink>
                                                    <v-btn icon small class="ma-0" v-if="item.proof_of_enrollment.status === 'PENDING' || item.proof_of_enrollment.status === 'REJECTED'"><v-icon small color="red">delete</v-icon></v-btn>
                                                </v-flex>
                                            </v-layout>
                                        </div>

                                    </v-card-text>
                                </v-card>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-divider></v-divider>
                    </div>
                    <v-btn flat block color="grey darken-1" class="text-none mt-0" @click.stop="dialog = true"><v-icon>add</v-icon> &nbsp; Invite team member</v-btn>
                    <v-dialog v-model="dialog" max-width="400">
                        <v-card>
                            <v-card-title class="subheading primary white--text">Invite team member</v-card-title>
                            <v-card-text>
                                Ask your friend to sign up on Bistleague.com, and join a team with the invite code:
                                <v-sheet color="grey lighten-4" class="pa-1 mt-3 mb-1">
                                    <div class="headline font-weight-bold" align="center" style="letter-spacing: 8px !important;">{{data.invite_code}}</div>
                                </v-sheet>
                            </v-card-text>

                            <v-card-actions>
                                <v-btn color="grey darken-2" flat class="text-none" @click="dialog = false">
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
                                <a target="_blank" href="http://docs.bistleague.com/v/py/1182.png">IMG_0425.jpg</a>
                            </v-flex>
                            <v-flex shrink>
                                <v-btn icon small class="ma-0" v-if="data.payment.status !== 'VERIFIED'"><v-icon small color="red">delete</v-icon></v-btn>
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
    const $ = require('jquery');
    const axios = require('axios');

    export default {
        name: "RegistrationPartial",
        components: {BLCenterWrap},
        props: ["data"],
        mounted() {
            this.teamName = this.data.team_name;
            this.university = this.data.university;
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
                uploading_pop: false
            }
        },
        methods: {
            saveChanges() {
                const self = this;

                const payload = JSON.stringify({
                    name: this.teamName,
                    university: this.university
                });

                this.saving = true;
                $.ajax({
                    headers: {'Authorization': `Bearer ${self.$store.getters.jwt}`},
                    type: 'PUT',
                    contentType: 'application/json',
                    data: payload,
                    dataType: 'json',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/competition/team`
                }).done(function() {
                    self.show_snackbar("Changes saved!", "success");
                    self.saving = false;
                }).fail(function(e) {
                    self.show_snackbar(`Error: ${e.toString()}`, "error");
                    self.saving = false;
                });
            },
            handleFileUploadProofOfPayment() {
                const file = this.$refs.file_pop.files[0];

                let formData = new FormData();
                formData.append('file', file);

                this.uploading_pop = true;
                axios.post(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/upload_pop`, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${this.$store.getters.jwt}`
                        }
                    }
                ).then(() => {
                    this.$emit("competition-refetch");
                }).catch((e) => {
                    console.log(e);
                    this.show_snackbar("Error uploading file: " + e.toString(), 'error');
                }).finally(() => {
                    this.uploading_pop = false;
                });
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