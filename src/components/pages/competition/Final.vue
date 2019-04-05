<template>
    <v-app>
        <BLToolbar />
        <BLStepper step="4" />
        <v-content class="pl-3 pr-3">
            <v-layout>
                <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
                    <FinalAwait v-if="await" :qualified="qualified" team-name="My Awesome Team"></FinalAwait>
                </v-flex>
            </v-layout>
        </v-content>
    </v-app>
</template>

<script>
    import BLToolbar from "../../partials/BLToolbar";
    import BLStepper from "../../partials/BLStepper";
    import FinalAwait from "../../partials/competition/FinalAwait";

    export default {
        name: "Final",
        components: {FinalAwait, BLToolbar, BLStepper},
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