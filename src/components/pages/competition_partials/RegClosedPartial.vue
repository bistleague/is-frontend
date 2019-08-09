<template>
    <BLCenterWrap>
        <v-layout wrap mt-4>
            <v-flex xs12 sm6 offset-sm3>
                <div class="headline font-weight-bold grey--text text--darken-1">Registration closed.</div>
                <p class="mt-3 grey--text text--darken-1">
                    Sorry, but the registration for Business-IT case competition is closed :(
                </p>
            </v-flex>
        </v-layout>
    </BLCenterWrap>
</template>

<script>
    import BLCenterWrap from "../../partials/BLCenterWrap";

    export default {
        name: "RegClosedPartial",
        components: {BLCenterWrap},
    }
</script>

<style scoped>

</style>