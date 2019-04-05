<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app>
        <BLToolbar />
        <BLStepper step="1" />
        <v-content class="pl-3 pr-3">
            <v-layout>
                <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
                    <v-layout wrap mt-5>
                        <v-flex xs12 sm12 md5 lg5 order-xs2 order-sm2 order-md1>
                            <div class="mb-1 grey--text">Team Name</div>
                            <v-text-field label="Team Name" solo>{{team_name}}</v-text-field>

                            <div class="mb-1 grey--text">University</div>
                            <v-text-field label="University" solo></v-text-field>

                            <div class="mb-1 grey--text">Team Members</div>

                            <v-card elevation-2>
                                <v-expansion-panel expand="true" class="elevation-0">
                                    <v-expansion-panel-content>
                                        <template v-slot:header>
                                            <div>Muhammad Aditya Hilmy (You)</div>
                                        </template>
                                        <v-card>
                                            <ParticipantCard is-user email="email@example.com"></ParticipantCard>
                                        </v-card>
                                    </v-expansion-panel-content>
                                    <v-expansion-panel-content>
                                        <template v-slot:header>
                                            <div>Alfian Maulana Ibrahim</div>
                                        </template>
                                        <v-card>
                                            <ParticipantCard email="email@example.com" doc-poe-status="pending" doc-poe-link="https://docs.bistleague.com/poe/3f22d5ba7.png" doc-poe-name="New Doc 10-01-2019.pdf"></ParticipantCard>
                                        </v-card>
                                    </v-expansion-panel-content>
                                    <v-expansion-panel-content>
                                        <template v-slot:header>
                                            <div>Muhammad Fiqri Fatriansyah</div>
                                        </template>
                                        <v-card>
                                            <ParticipantCard email="email@example.com" doc-poe-status="verified" doc-poe-link="https://docs.bistleague.com/poe/3f22d5ba7.png" doc-poe-name="New Doc 10-01-2019.pdf" doc-std-id-link="https://docs.bistleague.com/poe/3f22d5ba7.png" doc-std-id-name="ktm.png" doc-std-id-status="verified"></ParticipantCard>
                                        </v-card>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-divider></v-divider>
                                <v-btn flat block color="grey darken-1" class="text-none mt-0" @click.stop="dialog = true"><v-icon>add</v-icon> &nbsp; Invite team member</v-btn>
                                <v-dialog v-model="dialog" max-width="400">
                                    <v-card>
                                        <v-card-title class="subheading primary white--text">Invite team member</v-card-title>
                                        <v-card-text>
                                            Ask your friend to sign up on Bistleague.com, and join a team with the invite code:
                                            <v-sheet color="grey lighten-4" class="pa-1 mt-3 mb-1">
                                                <div class="headline font-weight-bold" align="center" style="letter-spacing: 8px !important;">ABXBDC</div>
                                            </v-sheet>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-btn color="grey darken-2" flat class="text-none" flat="flat" @click="dialog = false">
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
                                <div class="orange pa-3 white--text">
                                    <v-layout align-center>
                                        <v-flex>
                                            Pending verification
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-icon small dark class="ma-0">check_circle</v-icon>
                                        </v-flex>
                                    </v-layout>
                                </div>
                                <v-card-text class="pa-3">
                                    The proof of payment you uploaded is being reviewed.
                                    <v-layout align-center class="mt-2">
                                        <v-flex shrink>
                                            <v-icon small class="mr-1">attachment</v-icon>
                                        </v-flex>
                                        <v-flex>
                                            <a target="_blank" href="http://docs.bistleague.com/v/py/1182.png">IMG_0425.jpg</a>
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-btn icon small class="ma-0"><v-icon small color="red">delete</v-icon></v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-card-text>
                            </v-card>

                            <v-btn block color="primary" class="text-none mt-4">Save</v-btn>
                        </v-flex>
                        <v-flex xs1 sm1 md1 lg1 order-xs3 order-sm3 order-md2></v-flex>
                        <v-flex xs12 sm12 md6 lg6 order-xs1 order-sm1 order-md3 class="grey--text text--darken-1">
                            <div class="headline font-weight-bold">Welcome aboard!</div>
                            <p class="mt-3">Your journey of participating in BIST League 2019 begins here. Kindly fill in all the information required in the form.</p>
                            <p>You can freely change your registration data before the deadline is up. Just click "Save" when you make any changes. Don't worry if the status of your application is still pending when the deadline is up, we'll still receive it.</p>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-content>
    </v-app>

</template>

<script>
    import BLToolbar from "../partials/BLToolbar";
    import BLStepper from "../partials/BLStepper";
    import ParticipantCard from "../partials/teamreg/ParticipantCard";

    export default {
        name: "Registration",
        components: {ParticipantCard, BLStepper, BLToolbar},
        data () {
            return {
                dialog: false,
                registration: {
                    team_name: "My Awesome Team",
                    university: "Institut Teknologi Bandung",
                    payment: {
                        uploaded: true,
                        status: 'PENDING',   // PENDING, VERIFIED, REJECTED
                        filename: 'IMG_2052.png',
                        url: 'https://docs.bistleague.com/f/p/73fd5528aab312/IMG_2052.png'
                    },
                    team_members: [
                        {
                            name: "Muhammad Aditya Hilmy",
                            id: 'bf2didit',
                            email: 'email@example.com',
                            student_id: {
                                uploaded: true,
                                status: 'VERIFIED',   // PENDING, VERIFIED, REJECTED
                                filename: 'IMG_4094.png',
                                url: 'https://docs.bistleague.com/f/p/73fd5528aab312/IMG_4094.png'
                            },
                            proof_of_enrollment: {
                                uploaded: true,
                                status: 'VERIFIED',   // PENDING, VERIFIED, REJECTED
                                filename: 'IMG_4094.png',
                                url: 'https://docs.bistleague.com/f/p/73fd5528aab312/IMG_4094.png'
                            }
                        },
                        {
                            name: "Alfian Maulana Ibrahim",
                            id: 'bf2alfin',
                            email: 'email@example.com',
                            student_id: {
                                uploaded: true,
                                status: 'REJECTED',   // PENDING, VERIFIED, REJECTED
                                filename: 'IMG_4094.png',
                                url: 'https://docs.bistleague.com/f/p/73fd5528aab312/IMG_4094.png'
                            },
                            proof_of_enrollment: {
                                uploaded: true,
                                status: 'VERIFIED',   // PENDING, VERIFIED, REJECTED
                                filename: 'IMG_4094.png',
                                url: 'https://docs.bistleague.com/f/p/73fd5528aab312/IMG_4094.png'
                            }
                        }
                    ]
                }
            }
        }
    }
</script>

<style scoped>
</style>