<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card-text class="grey lighten-4 pl-4 pr-4">
        <v-layout>
            <v-flex>
                <div>Email address</div>
                <div><b>{{email}}</b></div>
            </v-flex>
            <v-flex shrink class="pa-0">
                <v-menu bottom left origin="top right" transition="scale-transition">
                    <template v-slot:activator="{ on }">
                        <v-btn class="ma-0 pa-0" icon small v-on="on"><v-icon small color="grey darken-1">more_vert</v-icon></v-btn>
                    </template>

                    <v-list>
                        <v-list-tile>
                            <v-list-tile-title v-if="isUser">Leave team</v-list-tile-title>
                            <v-list-tile-title v-if="!isUser">Delete member</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-flex>
        </v-layout>
        <div class="mt-3">Student ID</div>
        <v-btn outline small block color="grey darken-1" class="text-none" v-if="!docStdIdStatus">Upload</v-btn>
        <div v-if="docStdIdStatus === 'pending'" :disabled="docStdIdStatus === 'pending'"><b class="orange--text">Pending verification</b></div>
        <div v-if="docStdIdStatus === 'verified'" :disabled="docStdIdStatus === 'verified'"><b class="green--text text--darken-1">We've verified your student ID</b></div>

        <div v-if="docStdIdLink" class="mt-1">
            <v-layout align-center>
                <v-flex shrink>
                    <v-icon small class="mr-1">attachment</v-icon>
                </v-flex>
                <v-flex>
                    <a target="_blank" :href="docStdIdLink">{{docStdIdName}}</a>
                </v-flex>
                <v-flex shrink>
                    <v-btn icon small class="ma-0" v-if="docStdIdStatus === 'pending'"><v-icon small color="red">delete</v-icon></v-btn>
                </v-flex>
            </v-layout>
        </div>

        <div class="mt-3">
            Proof of enrollment
            <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="slide-y-transition"
                    bottom>
                <template v-slot:activator="{ on }">
                    <v-btn small icon v-on="on" class="pa-0 ma-0">
                        <v-icon small>help</v-icon>
                    </v-btn>
                </template>

                <v-card class="pa-3" max-width="350">
                    <p>Proof of enrollment is required to ensure all participants are still active students until the end of the competition.</p>
                    <p class="mb-0">You can upload a letter from your university stating that you are still a student by <b>November 2019</b></p>
                </v-card>
            </v-menu>
        </div>
        <v-btn outline small block color="grey darken-1" class="text-none" v-if="!docPoeStatus">Upload</v-btn>
        <div v-if="docPoeStatus === 'pending'" :disabled="docPoeStatus === 'pending'"><b class="orange--text">Pending verification</b></div>
        <div v-if="docPoeStatus === 'verified'" :disabled="docPoeStatus === 'verified'"><b class="green--text text--darken-1">We've verified your proof of enrollment</b></div>

        <div v-if="docPoeLink" class="mt-1">
            <v-layout align-center>
                <v-flex shrink>
                    <v-icon small class="mr-1">attachment</v-icon>
                </v-flex>
                <v-flex>
                    <a target="_blank" :href="docPoeLink">{{docPoeName}}</a>
                </v-flex>
                <v-flex shrink>
                    <v-btn icon small class="ma-0" v-if="docPoeStatus === 'pending'"><v-icon small color="red">delete</v-icon></v-btn>
                </v-flex>
            </v-layout>
        </div>

    </v-card-text>
</template>

<script>
    export default {
        name: "ParticipantCard",
        props: {
            email: String,
            id: String,
            docStdIdStatus: String,
            docStdIdLink: String,
            docStdIdName: String,
            docPoeStatus: String,
            docPoeLink: String,
            docPoeName: String,
            isUser: Boolean
        }
    }
</script>

<style scoped>

</style>