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
                <input name="password" v-model="newUserData.password" type="password" placeholder="Wachtwoord" class="form-control form-control-lg">
                <input name="passwordCheck" v-model="newUserData.rptPassword" type="password" placeholder="Herhaal wachtwoord" class="form-control form-control-lg">
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
                <input name="rights" v-model="changeAccesRights.rights" type="text" placeholder="Huidige toegangsrechten" class="form-control form-control-lg">
                <input name="newRights" v-model="changeAccesRights.newRights" type="text" placeholder="Nieuwe toegangsrechten" class="form-control form-control-lg">
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
                <small v-if="changePassword.completed">Het wachtwoord moet minstens 8 tekens lang zijn, een hoofdletter en een cijfer bevatten!</small>
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
                <input name="addField" v-model="addField.newField" type="text" placeholder="Nieuw veld" class="form-control form-control-lg">
                <button type="button" class="btn btn-success btn-block" @click.prevent="doAddField">Voeg veld toe</button>
                <small v-if="addField.completed">Het veld is toegevoegd!</small>
            </div>
        </section>
    </div>


</div>

        
</template>

<script lang="ts">
import Vue from 'vue'
import ReportingService from "../services/ReportingService"
export default Vue.extend({
    data() {
        return {
            option: "no-option",
            newUserData: {
                username: "",
                password: "",
                rptPassword: "",
                passwordCheck: false,
                passwordComp: false,
                completed: false
            },
            changeAccesRights: {
                username: "",
                rights: "",
                newRights: "",
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
                completed: false
            }
        }
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
        async doNewUser() {
            //CHECK IF PASSWORDS ARE THE SAME
            this.newUserData.passwordComp = this.checkPasswords(this.newUserData.password, this.newUserData.rptPassword);
            if (!this.newUserData.passwordComp /*&& !this.newUserData.passwordCheck*/){
                const response = await ReportingService.addUser({
                    username: this.newUserData.username,
                    password: this.newUserData.password,
                    accessRights: 1
                });
            }
            this.newUserData.username = ""
            this.newUserData.password = "";
            this.newUserData.rptPassword = "";
            this.newUserData.completed = true;
        },
        async doChangePassword() {
            //CHECK IF PASSWORDS ARE THE SAME
            this.changePassword.passwordComp = this.checkPasswords(this.changePassword.newPassword, this.changePassword.rptPassword);
            if (!this.changePassword.passwordComp /*&& !this.changePassword.passwordCheck*/){
                const response = await ReportingService.changePassword({
                    username: this.changePassword.username,
                    newPassword: this.changePassword.newPassword,
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
            this.changeAccesRights.rights = "";
            this.changeAccesRights.newRights = "";
            this.changeAccesRights.completed = true;
        },
        async doAddField() {
            const response = await ReportingService.addField({
                newField: this.addField.newField
            })

            this.addField.completed = true;
            this.addField.newField = "";
        },
        checkPasswords: function(password1 : string, password2 : string){
            const test = new String(password1)
            if (test.localeCompare(password2) == 0) {
                return false
            } else {
                return true
            }
        },
        emptyAllFields: function() {
            this.newUserData.username = "";
            this.newUserData.password = "";
            this.newUserData.rptPassword = "";
            this.newUserData.passwordCheck = false;
            this.newUserData.passwordComp = false;
            this.newUserData.completed = false;

            this.changeAccesRights.username = "";
            this.changeAccesRights.rights = "";
            this.changeAccesRights.newRights = "";
            this.changeAccesRights.completed = false;

            this.changePassword.username = "";
            this.changePassword.newPassword = "";
            this.changePassword.rptPassword = "";
            this.changePassword.passwordCheck = false;
            this.changePassword.passwordComp = false;
            this.changePassword.completed = false;

            this.addField.newField = "";
            this.addField.completed = false;

        }
    }
})
</script>
