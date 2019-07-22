<template>
    <div>
        <BLToolbar />
        <BLSubHeader v-if="!loading">
            <BLStepper :step="step" />
        </BLSubHeader>
        <v-content v-if="!loading">
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
            if(this.check_auth()) this.load();
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
            check_auth: function() {
                if(!this.$store.getters.isLoggedIn) {
                    this.$router.push('/login?continue=' + encodeURIComponent('/competition'));
                    return false;
                }

                return true;
            },
            load: function() {
                let self = this;
                // TODO change URL
                this.$emit("show-loading");

                $.ajax({
                    contentType: 'application/json',
                    headers: {'Authorization': `Bearer ${self.$store.getters.jwt}`},
                    type: 'GET',
                    url: `${process.env.VUE_APP_API_BASE_URL}/v1/competition`
                }).done(function(data) {
                    self.step = data.step;
                    self.data = data.data;
                    self.loading = false;
                    self.$emit("hide-loading");
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