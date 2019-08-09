<template>
    <BLCenterWrap>
        <v-layout wrap mt-4>
            <v-flex xs12 sm6 offset-sm3>
                <div class="headline font-weight-bold grey--text text--darken-1">Craving for some challenges?</div>
                <p class="mt-3 grey--text text--darken-1">
                    Glad we found you! Oh but wait, you can't do it alone. Thank God, we've prepared this one :D. Please
                    choose to create or join a team.
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
                        <v-btn flat block class="text-none text-md-left px-2" :disabled="creatingTeam"
                               v-on:click="openCreateDialog">
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
                            <p>Join a team that your teammate has created. Ask for the invite code of your team to
                                join.</p>
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
        <v-dialog persistent v-model="dialogJoin" max-width="400">
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
                    <v-btn color="grey darken-2" flat class="text-none" @click="dialogJoin = false"
                           :disabled="joiningTeam">
                        Cancel
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn color="indigo" outline class="text-none" @click="joinTeam" :loading="joiningTeam">
                        Join
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog persistent v-model="dialogCreate" max-width="400">
            <v-card>
                <v-card-title class="subheading blue white--text">Create a team</v-card-title>
                <v-card-text>
                    Create a new team for you and your friends to join. Please enter your team name and university.
                    Don't worry, you can change it later.

                    <v-text-field
                            style="margin-top: 8px"
                            label="Team name"
                            v-model="teamName"
                            :error-messages="createError ? [createError] : null"
                            required
                    ></v-text-field>

                    <v-text-field
                            style="margin-top: 8px"
                            label="University"
                            v-model="teamUniversity"
                            required
                    ></v-text-field>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="grey darken-2" flat class="text-none" @click="dialogCreate = false"
                           :disabled="creatingTeam">
                        Cancel
                    </v-btn>
                    <v-spacer></v-spacer>

                    <v-btn color="blue" outline class="text-none" @click="createTeam" :loading="creatingTeam">
                        Create
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
                dialogCreate: false,
                createError: null,
                creatingTeam: false,
                teamName: '',
                teamUniversity: '',
                joiningTeam: false,
                dialogJoin: false,
                inviteCode: '',
                joinError: null
            }
        },
        methods: {
            openCreateDialog() {
                this.dialogCreate = true;
                this.createError = null;
            },
            createTeam() {
                if (!this.teamName || !this.teamUniversity) {
                    this.createError = "Team name and university cannot be empty";
                    return;
                }

                this.creatingTeam = true;

                axios.post(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team`, {
                    name: this.teamName,
                    university: this.teamUniversity
                }, {
                    headers: {'Authorization': `Bearer ${this.$store.getters.jwt}`}
                }).then(() => {
                    this.$emit("competition-refetch");
                }).catch((error) => {
                    this.creatingTeam = false;

                    if (error.response) {
                        this.createError = error.response.body.error;
                    } else {
                        this.createError = error.toString();
                    }
                });
            },
            openJoinDialog() {
                this.dialogJoin = true;
                this.joinError = null;
            },
            joinTeam() {
                this.joiningTeam = true;

                axios.post(`${process.env.VUE_APP_API_BASE_URL}/v1/competition/team/member`, {invite_code: this.inviteCode.toUpperCase()}, {
                    headers: {'Authorization': `Bearer ${this.$store.getters.jwt}`},
                }).then(() => {
                    this.$emit("competition-refetch");
                }).catch((error) => {
                    if (error.response) {
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