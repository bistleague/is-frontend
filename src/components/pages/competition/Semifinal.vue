<template>
    <v-app>
        <BLToolbar />
        <BLStepper step="3" />
        <v-content class="pl-3 pr-3">
            <v-layout>
                <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
                    <SemifinalAwait v-if="await" :qualified="qualified" team-name="My Awesome Team"></SemifinalAwait>
                </v-flex>
            </v-layout>
        </v-content>
    </v-app>
</template>

<script>
    import BLToolbar from "../../partials/BLToolbar";
    import BLStepper from "../../partials/BLStepper";
    import SemifinalAwait from "../../partials/competition/SemifinalAwait";

    export default {
        name: "Semifinal",
        components: {BLToolbar, BLStepper, SemifinalAwait},
        data() {
            return {
                await: true,
                qualified: true
            }
        }
    }
</script>

<style scoped>

</style>