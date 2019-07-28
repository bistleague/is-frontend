<template>
    <div>
        <BLToolbar />
        <BLSubHeader>
            <BLStepper step="3" />
        </BLSubHeader>
        <v-content class="pl-3 pr-3" v-if="!loading">
            <SemifinalPartial :data="predata"></SemifinalPartial>
        </v-content>
    </div>
</template>

<script>
    import BLToolbar from "../../partials/BLToolbar";
    import BLStepper from "../../partials/BLStepper";
    import BLSubHeader from "../../partials/BLSubHeader";
    import SemifinalPartial from "../competition_partials/SemifinalPartial";
    const timeago = require("timeago.js");
    const $ = require("jquery");

    export default {
        name: "Semifinal",
        components: {SemifinalPartial, BLSubHeader, BLToolbar, BLStepper},
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
                $.get("/data/semifinal.json").done(function(data) {
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