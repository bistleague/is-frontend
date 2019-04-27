<template>
    <v-container bg fill-height grid-list-md text-xs-center flex class="primary darken-3">
        <v-layout row wrap align-center>
            <v-flex>
                <div align="center">
                    <v-card id="login-box" elevation="8">
                        <v-img :src="require('../../assets/logo.png')" width="100"></v-img>
                        <div class="headline" style="margin-top: 24px">Forgot password?</div>
                        <p>Tell us your email address and we'll send the instructions to reset your password.</p>

                        <div style="height: 24px"></div>

                        <v-text-field label="Email address"></v-text-field>
                        <div style="height: 8px"></div>

                        <v-layout pa-0 fill-height>
                            <v-flex xs6>
                                <v-layout row wrap align-center fill-height>
                                    <v-flex>
                                        <div align="left">
                                            <router-link to="login" style="text-decoration: none;">Have an account? <b>Sign in</b></router-link>
                                        </div>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs6 pa-0>
                                <div align="right">
                                    <v-btn ma-0 depressed style="text-transform: none" color="primary">Submit</v-btn>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "SignUp"
    }
</script>

<style scoped>
    #login-box {
        max-width: 400px;
        padding: 24px;
    }
</style>