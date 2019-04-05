<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app>
        <BLToolbar />
        <BLStepper step="2" />
        <v-content class="pl-3 pr-3">
            <v-layout>
                <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
                    <v-layout wrap mt-5>
                        <v-flex xs12 sm12 md5 lg5 order-xs2 order-sm2 order-md1>
                            <div class="headline font-weight-bold grey--text text--darken-1">Preliminary Round</div>
                            <p class="mt-3 grey--text text--darken-1">Welcome to Preliminary Round! You are given a case, which you can download by clicking the button below, and you'll need to make a presentation with an audio narration talking about the case.</p>

                            <v-btn outline block class="text-none"><v-icon class="mr-2">save_alt</v-icon>Download preliminary case</v-btn>

                            <v-card>
                                <div class="green pa-3 mt-4 white--text" v-if="submitted">
                                    <v-layout align-center>
                                        <v-flex>
                                            Submitted
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-icon small dark class="ma-0">check_circle</v-icon>
                                        </v-flex>
                                    </v-layout>
                                </div>
                                <div class="red pa-3 mt-4 white--text" v-if="!submitted">
                                    <v-layout align-center>
                                        <v-flex>
                                            Not submitted
                                        </v-flex>
                                        <v-flex shrink>
                                            <v-icon small dark class="ma-0">report</v-icon>
                                        </v-flex>
                                    </v-layout>
                                </div>
                                <v-card-text class="pa-3" v-if="submitted">
                                    Last uploaded 3 hours ago by <b>{{last_submitted_by}}</b>.
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
                                <v-card-text class="pa-3" v-if="!submitted">
                                    Your team hasn't submitted anything.
                                    <v-btn outline color="primary" class="text-none mt-3" block>Upload submission</v-btn>
                                </v-card-text>
                                <div class="pa-3 grey lighten-4">
                                    <p class="ma-0">No worries! You can edit the submission until the deadline is up.</p>
                                </div>
                            </v-card>
                        </v-flex>
                        <v-flex xs1 sm1 md1 lg1 order-xs3 order-sm3 order-md2></v-flex>
                        <v-flex xs12 sm12 md6 lg6 order-xs1 order-sm1 order-md3 class="grey--text text--darken-1">

                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-content>
    </v-app>

</template>

<script>
    import BLToolbar from "../../partials/BLToolbar";
    import BLStepper from "../../partials/BLStepper";
    export default {
        name: "Preliminary",
        components: {BLStepper, BLToolbar},
        data() {
            return {
                submitted: true,
                last_submitted_by: "Muhammad Aditya Hilmy",
                last_submitted_at: 187635816
            }
        }
    }
</script>

<style scoped>

</style>