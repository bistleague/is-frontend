<template>
    <BLCenterWrap>
        <FinalAwait :qualified="data.qualified" :team-name="data.team_name"></FinalAwait>
    </BLCenterWrap>
</template>

<script>
    import FinalAwait from "../../partials/competition/FinalAwait";
    import BLCenterWrap from "../../partials/BLCenterWrap";
    export default {
        name: "FinalPartial",
        components: {BLCenterWrap, FinalAwait},
        props: ["data"]
    }
</script>

<style scoped>

</style>