<template>
    <v-toolbar flat color="#ffffff">
        <v-layout>
            <v-flex xs12 md10 offset-md1 lg8 offset-lg2 xl6 offset-xl3>
                <v-layout align-center fill-height>
                    <v-flex shrink>
                        <v-img :src="require('../../assets/logo.png')" width="25" class="mr-2"></v-img>
                    </v-flex>
                    <v-flex>
                        <v-toolbar-title><b>BIST League 2019</b></v-toolbar-title>
                    </v-flex>
                    <v-spacer></v-spacer>
                    <v-flex shrink class="mr-3 font-weight-bold">
                        <a>Competition</a>
                    </v-flex>
                    <v-flex shrink class="mr-3 font-weight-bold">
                        <a>Seminar</a>
                    </v-flex>
                    <v-flex shrink>
                        <a><v-icon>account_circle</v-icon></a>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-toolbar>
</template>

<script>
    export default {
        name: "BLToolbar"
    }
</script>

<style scoped>

</style>