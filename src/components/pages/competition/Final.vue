<template>
    <div>
        <BLToolbar />
        <BLSubHeader>
            <BLStepper step="4" />
        </BLSubHeader>
        <v-content class="pl-3 pr-3" v-if="!loading">
            <FinalPartial :data="predata"></FinalPartial>
        </v-content>
    </div>
</template>

<script>
    import BLToolbar from "../../partials/BLToolbar";
    import BLStepper from "../../partials/BLStepper";
    import BLSubHeader from "../../partials/BLSubHeader";
    import FinalPartial from "../competition_partials/FinalPartial";
    const $ = require("jquery");

    export default {
        name: "Final",
        components: {FinalPartial, BLSubHeader, BLToolbar, BLStepper},
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