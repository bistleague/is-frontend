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
                    <v-flex shrink>
                        <v-avatar size="28" color="grey lighten-4" class="mr-2">
                            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
                        </v-avatar>
                        Muhammad
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