<template>
    <div>
        <div class="mt-4" align="center">
            <div class="headline">Get ready!</div>
            <p class="mt-3 title">Flex your muscles, <b>{{teamName}}</b>, the competition is starting in 5 days!</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PreliminaryAwait",
        props: ["teamName"]
    }
</script>

<style scoped>

</style>