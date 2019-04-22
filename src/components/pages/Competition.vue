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
                this.$emit("show-loading");
                $.get("/data/competition.json").done(function(data) {
                    self.step = data.step;
                    self.data = data.data;
                    self.loading = false;
                    self.$emit("hide-loading");
                }).fail(function() {
                    alert("error");
                });
            }
        }
    }
</script>

<style scoped>
</style>