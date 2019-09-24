<template>
    <div>
        <BLToolbar />
        <BLSubHeader>
            <div class="headline font-weight-bold white--text mt-3 mb-3">Complete Your Profile</div>
        </BLSubHeader>
        <v-content class="pl-3 pr-3">
            <BLCenterWrap>
                    <br>
                    <v-toolbar class="search_bar">
                    <v-text-field
                        hide-details
                        prepend-icon="search"
                        single-line
                        label="Type user's name, email address, or phone number"
                        ></v-text-field>
                    </v-toolbar>
                <br>
                <v-data-table
                    :headers="headers"
                    :items="users"
                    hide-actions
                    class="elevation-1"
                    item-key="name"
                >
                    <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.email }}</td>
                        <td class="text-xs-left">{{ props.item.university }}</td>
                        </tr>
                    </template>
                    <template slot="expand" slot-scope="props">
                        <v-card flat>
                            <v-card-text style="background-color: #F0F0F0">  
                                <div class="display-1" style="padding: 0 0 0 10px ; margin: 0"><strong>{{ props.item.name }} </strong></div>
                                <div class="subheading" style="padding: 0 0 0 10px ; margin: 0"> {{ props.item.email }} </div>
                                <!-- email address verified pake switch -->
                                <!-- disini pake grid yang container -->
                                <v-container>
                                    <v-layout>
                                        <v-flex xs-3 md-3>
                                            <div class="memanjang">Email address verified</div>
                                            <div class="memanjang">Team name</div>
                                            <div class="memanjang">Mobile number</div>
                                            <div class="memanjang">University</div>
                                            <div class="memanjang">Major</div>
                                            <div class="memanjang2">Gender</div>
                                            <v-btn outline color="green">Reset password</v-btn>
                                        </v-flex>
                                        <v-flex xs-3 md-3>
                                            <div class="memanjang"><v-switch v-model="props.item.verified"></v-switch></div>
                                            <div class="memanjang">{{ props.item.team_name }}</div>
                                            <div class="memanjang">{{ props.item.phone }}</div>
                                            <div class="memanjang">{{ props.item.university }}</div>
                                            <div class="memanjang">{{ props.item.major }}</div>
                                            <div class="memanjang2">{{ props.item.gender }}</div>
                                        </v-flex>
                                        <v-flex xs-3 md-3>
                                        </v-flex>
                                        <v-flex xs-3 md-3>
                                        </v-flex>
                                <!-- reset pass pake button -->
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </template>
                </v-data-table>
                counter has been clicked {{ counter }} times
            </BLCenterWrap>
        </v-content>
    </div> 
</template>


<script>
    import BLToolbar from "../../partials/BLToolbar";
    import BLSubHeader from "../../partials/BLSubHeader";
    import BLCenterWrap from "../../partials/BLCenterWrap";
    const $ = require("jquery");

    export default {
        name: "ListOfUsers",
        components: {BLCenterWrap, BLSubHeader, BLToolbar},
        data () {
            return {
                editedIndex: -1,
                dialog: false,
                editedItem: {
                    name: '',
                    email: '',
                    university: '',
                },
                defaultItem: {
                    name: '',
                    email: '',
                    university: '',
                },
                headers: [
                { text: 'User Name', align: 'left', sortable: false, value: 'name'},
                { text: 'Email', value: 'email', align: 'left', sortable: false },
                { text: 'University', value: 'university', align: 'left', sortable: false },
                ],
                users: [
                {
                    value: false,
                    name: 'Orang1',
                    email: 'email@gmail.com',
                    university: 'Institut Teknologi Bandung',
                    phone: '+621234567890',
                    major: 'STI',
                    gender: 'Male',
                    verified: false,
                    team_name: 'Team1'
                },
                {
                    value: false,
                    name: 'Orang2',
                    email: 'email@gmail.com',
                    university: 'Institut Teknologi Bandung',
                    phone: '+621234567890',
                    major: 'STI',
                    gender: 'Male',
                    verified: true,
                    team_name: 'Team2'
                },{
                    value: false,
                    name: 'Orang3',
                    email: 'email@gmail.com',
                    university: 'Institut Teknologi Bandung',
                    phone: '+621234567890',
                    major: 'STI',
                    gender: 'Male',
                    verified: false,
                    team_name: 'Team3'
                },{
                    value: false,
                    name: 'Orang4',
                    email: 'email@gmail.com',
                    university: 'Institut Teknologi Bandung',
                    phone: '+621234567890',
                    major: 'STI',
                    gender: 'Male',
                    verified: false,
                    team_name: 'Team4'
                },{
                    value: false,
                    name: 'Orang5',
                    email: 'email@gmail.com',
                    university: 'Institut Teknologi Bandung',
                    phone: '+621234567890',
                    major: 'STI',
                    gender: 'Male',
                    verified: false,
                    team_name: 'Team5'
                },{
                    value: false,
                    name: 'Orang6',
                    email: 'email@gmail.com',
                    university: 'Institut Teknologi Bandung',
                    phone: '+621234567890',
                    major: 'STI',
                    gender: 'Male',
                    verified: false,
                    team_name: 'Team6'
                },
                ]
            }
    }
    }
</script>

<style scoped>
    .radio-group-full-width >>>.v-input__control {
        width: 100%
    }

    .radio-group-full-width >>> .v-input__slot {
        margin-bottom: 0 !important;
    }

    .radio-group-full-width >>> .v-messages {
        display: none !important;
    }

    .search_bar {
        background-color: white;
    }
    .memanjang {
        height: 35px;
        margin: 0 0 5px 0;
        padding: 0px 0 10px 0;
        font-size: 16px;
        border-bottom: 1px solid black;
    }
    .memanjang2 {
        height: 35px;
        margin: 0 0 5px 0;
        padding: 0px 0 10px 0;
        font-size: 16px;
    }
</style>