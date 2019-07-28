<template>
    <div>
        <v-layout>
            <v-flex md8 offset-md2>
                <div class="mt-4" align="center">
                    <div class="headline">Get ready!</div>
                    <p class="mt-3 title">Flex your muscles, <b>{{teamName}}</b>, the competition is starting in 5 days!</p>
                    <v-img width="90%" class="my-4" :src="require('../../../assets/ready.svg')"></v-img>
                </div>
            </v-flex>
        </v-layout>
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