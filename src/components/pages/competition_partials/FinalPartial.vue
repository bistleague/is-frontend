<template>
    <v-layout>
        <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
            <FinalAwait :qualified="data.qualified" :team-name="data.team_name"></FinalAwait>
        </v-flex>
    </v-layout>
</template>

<script>
    import FinalAwait from "../../partials/competition/FinalAwait";
    export default {
        name: "FinalPartial",
        components: {FinalAwait},
        props: ["data"]
    }
</script>

<style scoped>

</style>