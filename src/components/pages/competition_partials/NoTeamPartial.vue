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
                        <v-btn flat block class="text-none text-md-left px-2">
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
    </BLCenterWrap>
</template>

<script>
    import BLCenterWrap from "../../partials/BLCenterWrap";
    const $ = require('jquery');

    export default {
        name: "NoTeamPartial",
        components: {BLCenterWrap},
        data() {
            return {
                creatingTeam: false
            }
        },
        methods: {
            createTeam() {
                const self = this;
                self.creatingTeam = true;

                this.$emit("show-loading");
                $.ajax({
                    headers: {'Authorization': `Bearer ${self.$store.getters.jwt}`},
                    type: 'POST',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/competition/team`
                }).done(function() {
                    self.$emit("hide-loading");
                    self.$emit("competition-refetch");
                }).fail(function() {
                    // TODO show error
                    self.$emit("hide-loading");
                });
            }
        }
    }
</script>

<style scoped>

</style>