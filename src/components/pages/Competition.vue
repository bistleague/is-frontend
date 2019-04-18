<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <BLToolbar />
        <BLSubHeader v-if="!loading">
            <BLStepper :step="step" />
        </BLSubHeader>
        <v-content class="pl-3 pr-3" v-if="!loading">
            <RegistrationPartial :data="data" v-if="step === 1"></RegistrationPartial>
            <PreliminaryPartial :data="data" v-if="step === 2"></PreliminaryPartial>
            <SemifinalPartial :data="data" v-if="step === 3"></SemifinalPartial>
            <FinalPartial :data="data" v-if="step === 4"></FinalPartial>
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
    import BLToolbar from "../partials/BLToolbar";
    import BLStepper from "../partials/BLStepper";
    import BLSubHeader from "../partials/BLSubHeader";
    import RegistrationPartial from "./competition_partials/RegistrationPartial";
    import PreliminaryPartial from "./competition_partials/PreliminaryPartial";
    import SemifinalPartial from "./competition_partials/SemifinalPartial";
    import FinalPartial from "./competition_partials/FinalPartial";
    const $ = require("jquery");


    export default {
        name: "Competition",
        components: {
            FinalPartial,
            SemifinalPartial, PreliminaryPartial, RegistrationPartial, BLSubHeader, BLStepper, BLToolbar},
        mounted: function() {
            this.load();
        },
        data () {
            return {
                dialog: false,
                data: {},
                step: 0,
                loading: true
            }
        },
        methods: {
            load: function() {
                let self = this;
                // TODO change URL
                $.get("/data/competition.json").done(function(data) {
                    self.step = data.step;
                    self.data = data.data;
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