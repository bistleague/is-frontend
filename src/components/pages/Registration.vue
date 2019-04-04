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
                            <v-text-field label="Team Name" solo></v-text-field>

                            <div class="mb-1 grey--text">University</div>
                            <v-text-field label="University" solo></v-text-field>

                            <div class="mb-1 grey--text">Team Members</div>
                            <v-expansion-panel expand="true" class="elevation-2">
                                <v-expansion-panel-content>
                                    <template v-slot:header>
                                        <div>Muhammad Aditya Hilmy (You)</div>
                                    </template>
                                    <v-card>
                                        <v-card-text class="grey lighten-4 pl-4 pr-4">
                                            <v-layout>
                                                <v-flex>
                                                    <div>Email address</div>
                                                    <div><b>example@domain.com</b></div>
                                                </v-flex>
                                                <v-flex shrink class="pa-0">
                                                    <v-menu bottom left origin="top right" transition="scale-transition">
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn class="ma-0 pa-0" icon small v-on="on"><v-icon small color="grey darken-1">more_vert</v-icon></v-btn>
                                                        </template>

                                                        <v-list>
                                                            <v-list-tile>
                                                                <v-list-tile-title>Leave team</v-list-tile-title>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-menu>
                                                </v-flex>
                                            </v-layout>
                                            <div class="mt-3">Student ID</div>
                                            <v-btn outline small block color="grey darken-1" class="text-none">Upload</v-btn>
                                        </v-card-text>
                                    </v-card>
                                </v-expansion-panel-content>
                                <v-expansion-panel-content>
                                    <template v-slot:header>
                                        <div>Alfian Maulana Ibrahim</div>
                                    </template>
                                    <v-card>
                                        <v-card-text class="grey lighten-4 pl-4 pr-4">
                                            <v-layout>
                                                <v-flex>
                                                    <div>Email address</div>
                                                    <div><b>example@domain.com</b></div>
                                                </v-flex>
                                                <v-flex shrink class="pa-0">
                                                    <v-menu bottom left origin="top right" transition="scale-transition">
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn class="ma-0 pa-0" icon small v-on="on"><v-icon small color="grey darken-1">more_vert</v-icon></v-btn>
                                                        </template>

                                                        <v-list>
                                                            <v-list-tile>
                                                                <v-list-tile-title>Delete member</v-list-tile-title>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-menu>
                                                </v-flex>
                                            </v-layout>
                                            <div class="mt-3">Student ID</div>
                                            <v-btn outline small block color="grey darken-1" class="text-none">Upload</v-btn>
                                        </v-card-text>
                                    </v-card>
                                </v-expansion-panel-content>
                                <v-expansion-panel-content>
                                    <template v-slot:header>
                                        <div>Muhammad Fiqri Fatriansyah</div>
                                    </template>
                                    <v-card>
                                        <v-card-text class="grey lighten-4 pl-4 pr-4">
                                            <v-layout>
                                                <v-flex>
                                                    <div>Email address</div>
                                                    <div><b>example@domain.com</b></div>
                                                </v-flex>
                                                <v-flex shrink class="pa-0">
                                                    <v-menu bottom left origin="top right" transition="scale-transition">
                                                        <template v-slot:activator="{ on }">
                                                            <v-btn class="ma-0 pa-0" icon small v-on="on"><v-icon small color="grey darken-1">more_vert</v-icon></v-btn>
                                                        </template>

                                                        <v-list>
                                                            <v-list-tile>
                                                                <v-list-tile-title>Delete member</v-list-tile-title>
                                                            </v-list-tile>
                                                        </v-list>
                                                    </v-menu>
                                                </v-flex>
                                            </v-layout>
                                            <div class="mt-3">Student ID</div>
                                            <v-btn outline small block color="grey darken-1" class="text-none">Upload</v-btn>
                                        </v-card-text>
                                    </v-card>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-btn outline block color="grey darken-1" class="text-none mt-3">Invite team member</v-btn>

                            <div class="mb-1 mt-4 grey--text">Required Documents</div>
                            <v-expansion-panel expand="true" class="elevation-2">
                                <v-expansion-panel-content>
                                    <template v-slot:actions>
                                        <v-icon color="teal">done</v-icon>
                                    </template>
                                    <template v-slot:header>
                                        <div>Proof of payment</div>
                                    </template>
                                    <v-card>
                                        <v-card-text class="grey lighten-4 pl-4 pr-4">
                                            <div>Status</div>
                                            <div><b>Verified</b> - Your proof of payment is verified!</div>
                                        </v-card-text>
                                    </v-card>
                                </v-expansion-panel-content>
                                <v-expansion-panel-content>
                                    <template v-slot:actions>
                                        <v-icon color="error">error</v-icon>
                                    </template>
                                    <template v-slot:header>
                                        <div>Proof of enrollment</div>
                                    </template>
                                    <v-card>
                                        <v-card-text class="grey lighten-4 pl-4 pr-4">
                                            <p>Proof of enrollment is required to ensure all participants are still students until the end of the competition.</p>
                                            <p>You can upload a letter from your university stating that you are still a student until <b>November 2019</b></p>
                                            <v-btn outline small block color="grey darken-1" class="text-none">Upload</v-btn>
                                        </v-card-text>
                                    </v-card>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                            <v-btn block color="primary" class="text-none mt-4">Save</v-btn>
                        </v-flex>
                        <v-flex xs1 sm1 md1 lg1 order-xs3 order-sm3 order-md2></v-flex>
                        <v-flex xs12 sm12 md6 lg6 order-xs1 order-sm1 order-md3 class="grey--text text--darken-1">
                            <div class="headline font-weight-bold">Welcome aboard!</div>
                            <p class="mt-3">Your journey of participating in BIST League 2019 begins here. Kindly fill in all the information required in the form.</p>
                            <p>If you need to come back later, you can save your data by clicking “Save as Draft” button below.</p>
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

    export default {
        name: "Registration",
        components: {BLStepper, BLToolbar}
    }
</script>

<style scoped>
</style>