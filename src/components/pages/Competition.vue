<template>
    <div>
        <BLToolbar />
        <BLSubHeader v-if="!loading">
            <BLStepper :step="step" />
        </BLSubHeader>
        <v-content v-if="!loading">
            <RegClosedPartial v-if="step === -1"></RegClosedPartial>
            <NoTeamPartial :data="data" v-if="step === 0" v-on:competition-refetch="load"></NoTeamPartial>
            <RegistrationPartial :data="data" v-if="step === 1" v-on:competition-refetch="load"></RegistrationPartial>
            <PreliminaryPartial :data="data" v-if="step === 2" v-on:competition-refetch="load"></PreliminaryPartial>
            <SemifinalPartial :data="data" v-if="step === 3" v-on:competition-refetch="load"></SemifinalPartial>
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
    import NoTeamPartial from "./competition_partials/NoTeamPartial";
    import RegClosedPartial from "./competition_partials/RegClosedPartial";
    const axios = require("axios");

    export default {
        name: "Competition",
        components: {
            RegClosedPartial,
            NoTeamPartial,
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
                this.$emit("show-loading");

                axios.get(`${process.env.VUE_APP_API_BASE_URL}/v1/competition`, {
                    headers: {'Authorization': `Bearer ${this.$store.getters.jwt}`},
                }).then((response) => {
                    const data = response.data;

                    if(data.error) {
                        this.handleError(data.error);
                    }

                    this.step = data.step;
                    this.data = data.data;
                    this.loading = false
                }).finally(() => {
                    this.$emit("hide-loading");

                });
            },
            handleError(error) {
                switch(error) {
                    case 'PROFILE_INCOMPLETE':
                        this.$router.push({path: '/profile/complete?continue=%2Fcompetition'});
                }
            }
        }
    }
</script>

<style scoped>
</style>