<template>
    <div class="bg-primary pl-3 pr-3">
        <v-layout>
            <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
                <slot></slot>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "BLSubHeader",
    }
</script>

<style scoped>
    .bg-primary {
        background-color: var(--v-primary-base)
    }
</style>