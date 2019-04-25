<template>
    <div>
        <v-list>
            <v-list-tile avatar>
                <v-list-tile-content>
                    <v-list-tile-title>{{user_name}}</v-list-tile-title>
                    <v-list-tile-sub-title>{{email}}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-tile to="/profile">
                <v-list-tile-title>View profile</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logout">
                <v-list-tile-title>Sign out</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </div>
</template>

<script>
    export default {
        name: "ProfileDropdown",
        computed: {
            user_name() {
                return this.$store.getters.user.full_name;
            },
            email() {
                return this.$store.getters.user.email;
            }
        },
        methods: {
            logout() {
                this.$store.commit('logout');
                this.$router.push('/login');
            }
        }
    }
</script>

<style scoped>

</style>