<template>
    <div>
        <div class="mt-4" v-if="qualified" align="center">
            <div class="headline">Congratulations, <b>{{teamName}}</b>!</div>
            <p class="mt-3 title">Your team is qualified to compete in the semifinals!</p>
        </div>

        <div class="mt-4" v-if="!qualified" align="center">
            <div class="headline">Oh no :(</div>
            <p class="mt-3 title">We’re sorry to tell you that your team cannot compete in the semifinals.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SemifinalAwait",
        props: ["qualified", "teamName"]
    }
</script>

<style scoped>

</style>