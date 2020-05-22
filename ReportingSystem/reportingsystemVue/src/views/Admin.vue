<template>

<div class="container pt-5 pb-5">
    <h1>Admin functies</h1>
    <div class="container mb-2">
        <div class="row">
            <div class="col-sm">
                <button type="button" class="btn btn-primary btn-block" @click.prevent="getNewUser">Maak nieuwe gebruiker</button>
            </div>
        </div>
        <section v-if="option == 'newUser'">
            <div class="input-group-vertical mt-2">
                <input name="username" v-model="newUserData.username" type="text" placeholder="Gebruikersnaam" class="form-control form-control-lg">
                <input name="email" v-model="newUserData.email" type="email" placeholder="email" class="form-control form-control-lg">
                <input name="password" v-model="newUserData.password" type="password" placeholder="Wachtwoord" class="form-control form-control-lg">
                <input name="passwordCheck" v-model="newUserData.rptPassword" type="password" placeholder="Herhaal wachtwoord" class="form-control form-control-lg">
                <select class="form-control form-control-lg" id="accessRights" v-model="newUserData.accessRights">
                    <option value="0">Administrator</option>
                    <option value="1">Supervisor</option>
                    <option value="2">Secretariaat</option>
                </select>
                <br>
                <label><input name="Subscription" v-model="newUserData.subscription" type="checkbox">Toevoegen aan maillijst</label>
                <small v-if="newUserData.passwordComp">De wachtwoorden komen niet overeen!</small>
                <small v-if="newUserData.passwordCheck">Het wachtwoord moet minstens 8 tekens lang zijn, een hoofdletter en een cijfer bevatten!</small>
                <small v-if="changePassword.completed">Het wachtwoord moet minstens 8 tekens lang zijn, een hoofdletter en een cijfer bevatten!</small>
                <small v-if="changeAccesRights.completed">De nieuwe gebruiker is toegevoegd!</small>
                <button type="button" class="btn btn-success btn-block" @click.prevent="doNewUser" >Voeg gebruiker toe</button>
            </div>
        </section>
    </div>
    <div class="container mb-2">
        <div class="row ">
            <div class="col-sm">
                <button type="button" class="btn btn-primary btn-block" @click.prevent="getChangeAccesRights">Wijzig toegangsrechten gebruiker</button>
            </div>
        </div>
        <section v-if="option == 'changeAccess'">
            <div class="input-group-vertical mt-2">
                <input name="username" v-model="changeAccesRights.username" type="text" placeholder="Gebruikersnaam" class="form-control form-control-lg">
                <select class="form-control form-control-lg" id="accessRights" v-model="changeAccesRights.newRights">
                    <option value="0">Administrator</option>
                    <option value="1">Supervisor</option>
                    <option value="2">Secretariaat</option>
                </select>
                <br>
                <small v-if="changeAccesRights.completed">De toegangsrechten zijn gewijzigd!</small>
                <button type="button" class="btn btn-success btn-block" @click.prevent="doChangeAccess" >Verander toegangsrechten</button>
            </div>
        </section>
    </div>
    <div class="container mb-2">
        <div class="row">
            <div class="col-sm">
                <button type="button" class="btn btn-primary btn-block" @click.prevent="getChangePassword" >Wijzig wachtwoord gebruiker</button>
            </div>
        </div>
        <section v-if="option == 'chgPassword'">
            <div class="input-group-vertical mt-2">
                <input name="username" v-model="changePassword.username" type="text" placeholder="Gebruikersnaam" class="form-control form-control-lg">
                <input name="newPassword" v-model="changePassword.newPassword" type="password" placeholder="Nieuw wachtwoord" class="form-control form-control-lg">
                <input name="newPasswordCheck" v-model="changePassword.rptPassword" type="password" placeholder="Herhaal nieuw wachtwoord" class="form-control form-control-lg">
                <small v-if="changePassword.passwordComp">De wachtwoorden komen niet overeen!</small>
                <small v-if="changePassword.passwordCheck">Het wachtwoord moet minstens 8 tekens lang zijn, een hoofdletter en een cijfer bevatten!</small>
                <small v-if="changePassword.completed">Het wachtwoord is gewijzigd</small>
                <button type="button" class="btn btn-success btn-block" @click.prevent="doChangePassword">Verander wachtwoord</button>
            </div>
        </section>
    </div>
    <div class="container mb-2">
        <div class="row">
            <div class="col-sm">
                <button type="button" class="btn btn-primary btn-block" @click.prevent="getAddField">Nieuw veld toevoegen</button>
            </div>
        </div>
        <section v-if="option == 'addField'">
            <div class="input-group-vertical" mt-2>
                <select class="form-control form-control-lg" id="addField" v-model="addField.category">
                    <option value="0">Administratief</option>
                    <option value="1">Personeel</option>
                    <option value="2">Logistiek</option>
                    <option value="3">Technisch</option>
                </select>
                
                    <label >Optioneel:</label>
                
                <select   v-if="addField.category == 0" class="form-control form-control-lg" id="addField" v-model="addField.type">
                    <option value="-1">Subtype (Optioneel)</option>
                    <option  v-for="value in this.addField.reportTypes.operationalTypes" :key="value" :value="value.id" > {{value.typeName }}</option>
                </select>
                <select  v-else-if="addField.category == 1" class="form-control form-control-lg" id="addField" v-model="addField.type">
                    <option value="-1">Subtype (Optioneel)</option>
                    <option  v-for="value in this.addField.reportTypes.workplaceTypes" :key='value' :value="value.id"> {{value.typeName }}</option>
                </select>
                <select v-else-if="addField.category == 2" class="form-control form-control-lg" id="addField" v-model="addField.type">
                    <option value="-1">Subtype (Optioneel)</option>
                    <option  v-for="value in this.addField.reportTypes.defectTypes" :key="value" :value="value.id"> {{value.typeName }}</option>
                </select>
                <select  v-else-if="addField.category == 3" class="form-control form-control-lg" id="addField" v-model="addField.type">
                    <option value="-1">Subtype (Optioneel)</option>
                    <option  v-for="value in this.addField.reportTypes.malfunctionTypes" :key="value" :value="value.id"> {{value.typeName }}</option>
                </select>
                </div>
                <input name="addField" v-model="addField.newField" type="text" placeholder="Nieuw veld" class="form-control form-control-lg">
                <button type="button" class="btn btn-success btn-block" @click.prevent="doAddField">Voeg veld toe</button>
                <small v-if="addField.completed">Het veld is toegevoegd!</small>
            
        </section>
    </div>

    <div class="container mb-2">
        <div class="row">
            <div class="col-sm">
                <button type="button" class="btn btn-primary btn-block" @click.prevent="getChangeRoles">Toegangsrechten gebruikersrollen wijzigen</button>
            </div>
        </div>
        <section v-if="option == 'changeRoles'">
            <div class="input-group-vertical" mt-2>
                <table class="table">
                    <thead>
                        <th scope="col">Mogelijkheden</th>
                        <th scope="col">Supervisor</th>
                        <th scope="col">Secretariaat</th>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Toevoegen gebeurtenis</th>
                            <td><input type="checkbox" id="checkbox"></td>
                            <td><input type="checkbox" id="checkbox"></td>
                        </tr>

                        <tr>
                            <th scope="row">Verslagen bekijken</th>
                            <td><input type="checkbox" id="checkbox"></td>
                            <td><input type="checkbox" id="checkbox"></td>
                        </tr>

                        <tr>
                            <th scope="row">Meldingen bekijken</th>
                            <td><input type="checkbox" id="checkbox"></td>
                            <td><input type="checkbox" id="checkbox"></td>
                        </tr>

                        <tr>
                            <th scope="row">Vorige shift bekijken</th>
                            <td><input type="checkbox" id="checkbox"></td>
                            <td><input type="checkbox" id="checkbox"></td>
                        </tr>

                        <tr>
                            <th scope="row">Statistieken bekijken</th>
                            <td><input type="checkbox" id="checkbox"></td>
                            <td><input type="checkbox" id="checkbox"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button type="button" class="btn btn-success btn-block" @click.prevent="changePermissions">Wijzigingen opslaan</button>
        </section>
    </div>

    <div class="container mb-2">
        <div class="row">
            <div class="col-sm">
                <router-link
              to="/userlist"
              tag="button"
              class="btn btn-primary btn-block"
              >Gebruikerslijst</router-link
            >
            </div>
        </div>
    </div>


</div>

        
</template>

<script lang="ts">
import Vue from 'vue'
import ReportingService from "../services/ReportingService"
import { stringify } from 'querystring'
export default Vue.extend({
    data() {
        return {
            option: "no-option",
            newUserData: {
                username: "",
                password: "",
                rptPassword: "",
                email: "",
                accessRights: 0,
                subscription: false,
                passwordCheck: false,
                passwordComp: false,
                completed: false
            },
            changeAccesRights: {
                username: "",
                rights: "",
                newRights: 0,
                completed: false
            },
            changePassword: {
                username: "",
                newPassword: "",
                rptPassword:"",
                passwordCheck: false,
                passwordComp: false, 
                completed: false
            },
            addField: {
                newField: "",
                category: 0,
                type: -1,
                reportTypes: {},
                completed: false
            },
            
            
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        getNewUser: function() {
            if (this.option == 'newUser'){
                this.option = "no_option"
            } else if (this.option != 'newUser') {
                this.option = 'newUser'
            }
            this.emptyAllFields();
        },
        getChangeAccesRights: function() {
            if (this.option == 'changeAccess'){
                this.option = 'no_option'
            } else if (this.option != 'changeAccess') {
                this.option = 'changeAccess'
            }
            this.emptyAllFields();
        },
        getChangePassword: function() {
            if (this.option == 'chgPassword'){
                this.option = 'no_option'
            } else if (this.option != 'chgPassword') {
                this.option = 'chgPassword'
            }
            this.emptyAllFields();
        },
        getAddField: function() {
            if (this.option == 'addField'){
                this.option = 'no_option'
            } else if (this.option != 'addField') {
                this.option = 'addField'
            }
            this.emptyAllFields();
        },
        getChangeRoles: function() {
            if (this.option == 'changeRoles') {
                this.option = 'no_option'
            } else if (this.option != 'changeRoles') {
                this.option = 'changeRoles'
            }
        },
        async doNewUser() {
            //CHECK IF PASSWORDS ARE THE SAME
            this.newUserData.passwordComp = this.checkPasswords(this.newUserData.password, this.newUserData.rptPassword);
            if (!this.newUserData.passwordComp /*&& !this.newUserData.passwordCheck*/){
                const response = await ReportingService.addUser({
                    username: this.newUserData.username,
                    password: this.newUserData.password,
                    rptPassword: this.newUserData.rptPassword,
                    accessRights: this.newUserData.accessRights,
                    mail: this.newUserData.email,
                    subscription : this.newUserData.subscription
                });
            }
            this.newUserData.username = ""
            this.newUserData.password = "";
            this.newUserData.rptPassword = "";
            this.newUserData.email = "";
            this.newUserData.accessRights = 0;
            this.newUserData.subscription = false;
            this.newUserData.completed = true;
        },
        async doChangePassword() {
            //CHECK IF PASSWORDS ARE THE SAME
            this.changePassword.passwordComp = this.checkPasswords(this.changePassword.newPassword, this.changePassword.rptPassword);
            if (!this.changePassword.passwordComp /*&& !this.changePassword.passwordCheck*/){
                const response = await ReportingService.changePassword({
                    username: this.changePassword.username,
                    Password: this.changePassword.newPassword,
                    rptPassword: this.changePassword.rptPassword
                });
            }
            this.changePassword.newPassword = "";
            this.changePassword.rptPassword = "";
            this.changePassword.completed = true;
        },
        async doChangeAccess() {
            const response = await ReportingService.changeAcces({
                username: this.changeAccesRights.username,
                newAcces: this.changeAccesRights.newRights
            });
            this.changeAccesRights.username = "";
            this.changeAccesRights.newRights = 0;
            this.changeAccesRights.completed = true;
        },
        async doAddField() {
            const response = await ReportingService.addTypes({
                type: this.addField.category,
                subtype: this.addField.type,
                field: this.addField.newField,
            });
            this.addField.newField = "";
            this.addField.category =  0,
            this.addField.type = -1,
            this.addField.completed = true;
            

        },
        changePermissions() {
            alert(JSON.stringify(ReportingService.getAccessRoleData()));
        },
        checkUsername: function(username: string) {
            if (/^[a-z0-9_-]{3,15}$/.test(username)) {
                return true;
            } else {
                return false;
            }
        },
        checkPasswords: function(password1 : string, password2 : string){
            if (/^(?=.*?[0-9])(?=.*[A-Z]).{6,12}$/.test(password1)){    //Check if password is at least 6 long and at least one uppercase
                const test = new String(password1)
                if (test.localeCompare(password2) == 0) {
                    return false
                } else {
                    return true
                }
            } else {
                return false;
            }
           
        },
        checkAccessRights: function(accessRights : number){
            if (accessRights >= 0 && accessRights < 3)
                return true;
            else
                return false;
        },
        emptyAllFields: function() {
            this.newUserData.username = "";
            this.newUserData.password = "";
            this.newUserData.rptPassword = "";
            this.newUserData.email = "";
            this.newUserData.accessRights = 0;
            this.newUserData.subscription = false;

            this.newUserData.passwordCheck = false;
            this.newUserData.passwordComp = false;
            this.newUserData.completed = false;

            this.changeAccesRights.username = "";
            this.changeAccesRights.newRights = 0;
            this.changeAccesRights.completed = false;

            this.changePassword.username = "";
            this.changePassword.newPassword = "";
            this.changePassword.rptPassword = "";
            this.changePassword.passwordCheck = false;
            this.changePassword.passwordComp = false;
            this.changePassword.completed = false;

            this.addField.newField = "";
            this.addField.category =  0,
            this.addField.type = -1,
            this.addField.completed = false;

        },
        loadData: function() {
            ReportingService.getAllReports("/api/statistics/types").then( 
                res => (this.addField.reportTypes = res) 
        );
      }
    }
})
</script>
