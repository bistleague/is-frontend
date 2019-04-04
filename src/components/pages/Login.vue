<template>
    <v-app>
        <v-container bg fill-height grid-list-md text-xs-center>
            <v-layout row wrap align-center>
                <v-flex>
                    <div align="center">
                        <v-card id="login-box" elevation="8">
                            <v-img :src="require('../../assets/logo.png')" width="100"></v-img>
                            <div class="headline" style="margin-top: 24px">Welcome!</div>
                            <p>Type in your email and password to sign in</p>

                            <div style="height: 48px"></div>
                            <v-text-field label="Email address"></v-text-field>
                            <v-text-field label="Password" type="password"></v-text-field>
                            <div style="height: 8px"></div>

                            <v-layout pa-0 fill-height>
                                <v-flex xs6>
                                    <v-layout row wrap align-center fill-height>
                                        <v-flex>
                                            <div align="left">
                                                <a>Forgot password?</a>
                                                <br />
                                                <router-link to="register" style="text-decoration: none;">New user? <b>Sign up</b></router-link>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs6 pa-0>
                                    <div align="right">
                                        <v-btn ma-0 depressed style="text-transform: none" color="primary">Sign in</v-btn>
                                    </div>
                                </v-flex>
                            </v-layout>
                        </v-card>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    export default {
        name: "Login"
    }
</script>

<style scoped>
    #app {
        background-color: var(--v-primary-darken1)
    }

    #login-box {
        max-width: 400px;
        padding: 24px;
    }
</style>