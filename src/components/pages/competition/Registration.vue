<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <BLToolbar />
        <BLSubHeader>
            <BLStepper step="1" />
        </BLSubHeader>
        <v-content class="pl-3 pr-3" v-if="!loading">
            <RegistrationPartial :data="registration"></RegistrationPartial>
        </v-content>

        <v-dialog v-model="loading" hide-overlay persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>
                    We're preparing the form for you
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import BLToolbar from "../../partials/BLToolbar";
    import BLStepper from "../../partials/BLStepper";
    import BLSubHeader from "../../partials/BLSubHeader";
    import RegistrationPartial from "../competition_partials/RegistrationPartial";
    const $ = require("jquery");

    let registrationData = {};

    export default {
        name: "Registration",
        components: {RegistrationPartial, BLSubHeader, BLStepper, BLToolbar},
        mounted: function() {
            this.load();
        },
        data () {
            return {
                dialog: false,
                registration: registrationData,
                loading: true
            }
        },
        methods: {
            load: function() {
                let self = this;
                // TODO change URL
                $.get("/data/competition_reg.json").done(function(data) {
                    self.registration = data;
                    self.loading = false;
                }).fail(function() {
                    alert("error");
                });
            }
        }
    }
</script>

<style scoped>
</style>