<template>
    <div>
        <slot v-if="allowed"></slot>
    </div>
</template>

<script>
    export default {
        name: "Protected",
        props: ["continue", "admin"],
        data() {
            return {
                allowed: false
            }
        },
        mounted() {
            this.check_auth();
        },
        methods: {
            check_auth: function () {
                if (!this.$store.getters.isLoggedIn) {
                    this.$router.push('/login?continue=' + encodeURIComponent('/competition'));
                    return;
                }

                if(this.admin) {
                    this.allowed = this.$store.getters.user.is_admin === true;
                } else {
                    this.allowed = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>