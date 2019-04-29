<template>
    <div>
        <BLToolbar />
        <BLSubHeader>
            <div class="headline font-weight-bold white--text mt-3 mb-3">Competition</div>
        </BLSubHeader>
        <v-content>
            <NoTeamPartial></NoTeamPartial>
        </v-content>
    </div>
</template>

<script>
    import BLToolbar from "../../partials/BLToolbar";
    import BLStepper from "../../partials/BLStepper";
    import BLSubHeader from "../../partials/BLSubHeader";
    import NoTeamPartial from "../competition_partials/NoTeamPartial";
    const $ = require("jquery");

    export default {
        name: "Final",
        components: {NoTeamPartial, BLSubHeader, BLToolbar, BLStepper},
    }
</script>

<style scoped>

</style>