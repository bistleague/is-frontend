<template>
    <v-app>
        <BLToolbar />
        <BLStepper step="4" />
        <v-content class="pl-3 pr-3">
            <v-layout v-if="!loading">
                <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
                    <FinalAwait :qualified="predata.qualified" :team-name="predata.team_name"></FinalAwait>
                </v-flex>
            </v-layout>
        </v-content>
    </v-app>
</template>

<script>
    import BLToolbar from "../../partials/BLToolbar";
    import BLStepper from "../../partials/BLStepper";
    import FinalAwait from "../../partials/competition/FinalAwait";
    const $ = require("jquery");

    export default {
        name: "Final",
        components: {FinalAwait, BLToolbar, BLStepper},
        data() {
            return {
                loading: true,
                predata: {}
            }
        },
        mounted: function() {
            this.load();
        },
        methods: {
            load: function() {
                let self = this;
                // TODO change URL
                $.get("/data/final.json").done(function(data) {
                    self.predata = data;
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