<template>
    <div>
        <v-list>
            <v-list-tile avatar>
                <v-list-tile-content>
                    <v-list-tile-title>Muhammad Aditya Hilmy</v-list-tile-title>
                    <v-list-tile-sub-title>mail@example.com</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-tile to="/profile">
                <v-list-tile-title>View profile</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="">
                <v-list-tile-title>Sign out</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
    export default {
        name: "ProfileDropdown"
    }
</script>

<style scoped>

</style>