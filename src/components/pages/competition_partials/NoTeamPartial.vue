<template>
    <BLCenterWrap>
        <v-layout wrap mt-4>
            <v-flex xs12 sm6 offset-sm3>
                <div class="headline font-weight-bold grey--text text--darken-1">Craving for some challenges?</div>
                <p class="mt-3 grey--text text--darken-1">
                    Glad we found you! Lorem ipsum dolor sit amet. Petra tolong isiin captionnya dong thanks.
                </p>

                <v-card color="blue" dark class="mt-4">
                    <v-card-title>
                        <div>
                            <h3 class="headline">Create a team</h3>
                            <p>Create a new team if you haven't had one.</p>
                        </div>
                    </v-card-title>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn flat block class="text-none text-md-left px-2" :disabled="creatingTeam" v-on:click="createTeam">
                            Create
                            <v-spacer></v-spacer>
                            <v-icon right dark>arrow_forward</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card color="indigo" dark class="mt-4">
                    <v-card-title>
                        <div>
                            <h3 class="headline">Join a team</h3>
                            <p>Join a team that your teammate has created. Ask for the invite code of your team to join.</p>
                        </div>
                    </v-card-title>

                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn flat block class="text-none text-md-left px-2" @click.prevent="openJoinDialog">
                            Join
                            <v-spacer></v-spacer>
                            <v-icon right dark>arrow_forward</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog
                v-model="creatingTeam"
                persistent
                width="300"
        >
            <v-card
                    color="primary"
                    dark
            >
                <v-card-text>
                    Please wait while we're creating your team
                    <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dialogJoin" max-width="400">
            <v-card>
                <v-card-title class="subheading indigo white--text">Join a team</v-card-title>
                <v-card-text>
                    Join a team that your teammate has created. Ask for the invite code of your team to join.

                    <v-text-field
                            style="margin-top: 8px"
                            label="Invite code"
                            v-model="inviteCode"
                            :error-messages="joinError ? [joinError] : null"
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="grey darken-2" flat class="text-none" @click="dialogJoin = false" :disabled="joiningTeam">
                        Cancel
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" outline class="text-none" @click="joinTeam" :loading="joiningTeam">
                        Join
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </BLCenterWrap>
</template>

<script>
    import BLCenterWrap from "../../partials/BLCenterWrap";
    const axios = require('axios');

    export default {
        name: "NoTeamPartial",
        components: {BLCenterWrap},
        data() {
            return {
                creatingTeam: false,
                joiningTeam: false,
                dialogJoin: false,
                inviteCode: '',
                joinError: null
            }
        },
        methods: {
            createTeam() {
                this.creatingTeam = true;

                axios.post(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team`, {}, {
                    headers: {'Authorization': `Bearer ${this.$store.getters.jwt}`}
                }).then(() => {
                    this.$emit("competition-refetch");
                }).catch(() => {
                    // TODO show error
                    this.creatingTeam = false;
                });
            },
            openJoinDialog() {
                this.dialogJoin = true;
                this.joinError = null;
            },
            joinTeam() {
                this.joiningTeam = true;

                axios.post(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/member`, {invite_code: this.inviteCode}, {
                    headers: {'Authorization': `Bearer ${this.$store.getters.jwt}`},
                }).then(() => {
                    this.$emit("competition-refetch");
                }).catch((error) => {
                    if(error.response) {
                        this.joinError = error.response.status === 404 ? 'Invalid invite code, maybe try asking your friend again..?' : "Something's wrong..";
                    }

                    this.joiningTeam = false;
                });
            }
        }
    }
</script>

<style scoped>

</style>