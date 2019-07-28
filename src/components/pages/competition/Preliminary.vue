<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <BLToolbar />
        <BLSubHeader>
            <BLStepper step="2" />
        </BLSubHeader>
        <v-content class="pl-3 pr-3" v-if="!loading">
            <PreliminaryPartial :data="predata"></PreliminaryPartial>
        </v-content>
    </div>
</template>

<script>
    const $ = require("jquery");
    import BLToolbar from "../../partials/BLToolbar";
    import BLStepper from "../../partials/BLStepper";
    import BLSubHeader from "../../partials/BLSubHeader";
    import PreliminaryPartial from "../competition_partials/PreliminaryPartial";
    const timeago = require("timeago.js");

    export default {
        name: "Preliminary",
        components: {PreliminaryPartial, BLSubHeader, BLStepper, BLToolbar},
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
            parse_time: function(time) {
                return timeago.format(time);
            },
            load: function() {
                let self = this;
                // TODO change URL
                $.get("/data/preliminary.json").done(function(data) {
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