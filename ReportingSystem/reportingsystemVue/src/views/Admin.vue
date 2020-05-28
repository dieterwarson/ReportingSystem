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
        <input name="email" v-model="newUserData.email" type="email" placeholder="E-mail" class="form-control form-control-lg">
        <input name="password" v-model="newUserData.password" type="password" placeholder="Wachtwoord" class="form-control form-control-lg">
        <input name="passwordCheck" v-model="newUserData.rptPassword" type="password" placeholder="Herhaal wachtwoord" class="form-control form-control-lg">
        <select class="form-control form-control-lg" id="accessRights" v-model="newUserData.accessRights">
          <option value="0">Administrator</option>
          <option value="1">Supervisor</option>
          <option value="2">Secretariaat</option>
        </select>
        <br>
        <label><input name="Subscription" v-model="newUserData.subscription" type="checkbox">Toevoegen aan maillijst</label>
        <small v-if="newUserData.failed">Het wachtwoord wijzigen is niet gelukt!</small>
        <small v-if="newUserData.completed">De nieuwe gebruiker is toegevoegd!</small>
        <button type="button" class="btn btn-success btn-block" @click.prevent="doNewUser">Voeg gebruiker toe</button>
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
        <small v-if="changeAccesRights.failed">De toegangsrechten zijn niet gewijzigd!</small>

        <button type="button" class="btn btn-success btn-block" @click.prevent="doChangeAccess">Verander toegangsrechten</button>
      </div>
    </section>
  </div>
  <div class="container mb-2">
    <div class="row">
      <div class="col-sm">
        <button type="button" class="btn btn-primary btn-block" @click.prevent="getChangePassword">Wijzig wachtwoord gebruiker</button>
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
        <small v-if="changePassword.failed">Het wachtwoord is niet gewijzigd!</small>

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

        <label>Optioneel:</label>

        <select v-if="addField.category == 0" class="form-control form-control-lg" id="addField" v-model="addField.operationaltype">
          <option value="-1">Subtype (Optioneel)</option>
          <option v-for="value in this.addField.reportTypes.operationalTypes" :key="value.id" :value="value.id"> {{value.typeName }}</option>
        </select>
        <select v-else-if="addField.category == 1" class="form-control form-control-lg" id="addField" v-model="addField.workplacetype">
          <option value="-1">Subtype (Optioneel)</option>
          <option v-for="value in this.addField.reportTypes.workplaceTypes" :key='value.id' :value="value.id"> {{value.typeName }}</option>
        </select>
        <select v-else-if="addField.category == 2" class="form-control form-control-lg" id="addField" v-model="addField.defecttype">
          <option value="-1">Subtype (Optioneel)</option>
          <option v-for="value in this.addField.reportTypes.defectTypes" :key="value.id" :value="value.id"> {{value.typeName }}</option>
        </select>
        <select v-else-if="addField.category == 3" class="form-control form-control-lg" id="addField" v-model="addField.malfunctiontype">
          <option value="-1">Subtype (Optioneel)</option>
          <option v-for="value in this.addField.reportTypes.malfunctionTypes" :key="value.id" :value="value.id"> {{value.typeName }}</option>
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
        <router-link to="/changePermissions" tag="button" class="btn btn-primary btn-block">Gebruikersrollen wijzigen</router-link>
      </div>
    </div>
  </div>

  <div class="container mb-2">
    <div class="row">
      <div class="col-sm">
        <router-link to="/userlist" tag="button" class="btn btn-primary btn-block">Gebruikerslijst</router-link>
      </div>
    </div>
  </div>

</div>
</template>

<script lang="ts">
import Vue from 'vue'
import ReportingService from "../services/ReportingService"
import {
  stringify
} from 'querystring'
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
        usernameCheck: false,
        passwordComp: false,
        completed: false,
        failed: false
      },
      changeAccesRights: {
        username: "",
        rights: "",
        newRights: 0,
        completed: false,
        failed: false,
      },
      changePassword: {
        username: "",
        newPassword: "",
        rptPassword: "",
        passwordCheck: false,
        passwordComp: false,
        completed: false,
        failed: false,
      },
      addField: {
        newField: "",
        category: 0,
        operationaltype: -1,
        workplacetype: -1,
        malfunctiontype: -1,
        defecttype: -1,
        reportTypes: {},
        completed: false
      },

    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    getNewUser: function () {
      if (this.option == 'newUser') {
        this.option = "no_option"
      } else if (this.option != 'newUser') {
        this.option = 'newUser'
      }
      this.emptyAllFields();
    },
    getChangeAccesRights: function () {
      if (this.option == 'changeAccess') {
        this.option = 'no_option'
      } else if (this.option != 'changeAccess') {
        this.option = 'changeAccess'
      }
      this.emptyAllFields();
    },
    getChangePassword: function () {
      if (this.option == 'chgPassword') {
        this.option = 'no_option'
      } else if (this.option != 'chgPassword') {
        this.option = 'chgPassword'
      }
      this.emptyAllFields();
    },
    getAddField: function () {
      if (this.option == 'addField') {
        this.option = 'no_option'
      } else if (this.option != 'addField') {
        this.option = 'addField'
      }
      this.emptyAllFields();
    },
    async doNewUser() {
      //CHECK IF PASSWORDS ARE THE SAME
      this.newUserData.usernameCheck = this.checkUsername(this.newUserData.username);
      this.newUserData.passwordComp = this.checkPasswords(this.newUserData.password, this.newUserData.rptPassword);
      if (this.newUserData.passwordComp && this.newUserData.usernameCheck) {
        const response = await ReportingService.addUser({
          username: this.newUserData.username,
          password: this.newUserData.password,
          rptPassword: this.newUserData.rptPassword,
          accessRights: this.newUserData.accessRights,
          mail: this.newUserData.email,
          subscription: this.newUserData.subscription
        });
        this.newUserData.completed = true;
       
      } else {
        this.newUserData.failed = true;
      }
      this.newUserData.password = "";
      this.newUserData.rptPassword = "";
      this.newUserData.username = ""
      this.newUserData.email = "";
      this.newUserData.accessRights = 0;
      this.newUserData.subscription = false;
    },
    async doChangePassword() {
      //CHECK IF PASSWORDS ARE THE SAME
      this.changePassword.passwordComp = this.checkPasswords(this.changePassword.newPassword, this.changePassword.rptPassword);
      if (this.changePassword.passwordComp) {
        const response = await ReportingService.changePassword({
          username: this.changePassword.username,
          Password: this.changePassword.newPassword,
          rptPassword: this.changePassword.rptPassword
        });
        this.changePassword.completed = true;
      } else {
        this.changePassword.failed = true;
      }
      this.changePassword.newPassword = "";
      this.changePassword.rptPassword = "";
      
    },
    async doChangeAccess() {
      if (this.checkAccessRights(this.changeAccesRights.newRights)) {
        const response = await ReportingService.changeAcces({
        username: this.changeAccesRights.username,
        newAcces: this.changeAccesRights.newRights
      });
      this.changeAccesRights.username = "";
      this.changeAccesRights.newRights = 0;
      this.changeAccesRights.completed = true;

      } else {
        this.changeAccesRights.failed = true;
      }
      
    },
    async doAddField() {
      const response = await ReportingService.addTypes({
        type: this.addField.category,
        operationaltype: this.addField.operationaltype,
        workplacetype: this.addField.workplacetype,
        defectTypes: this.addField.defecttype,
        malfunctionTypes: this.addField.malfunctiontype,
        field: this.addField.newField,
      });
      this.addField.newField = "";
      this.addField.category = 0,
        this.addField.operationaltype = -1,
        this.addField.workplacetype = -1,
        this.addField.defecttype = -1,
        this.addField.malfunctiontype = -1,

        this.addField.completed = true;

    },
    checkUsername: function (username: string) {
      if (/^[a-z0-9_-]{5,15}$/.test(username)) {
        return true;
      } else {
        return false;
      }
    },
    checkPasswords: function (password1: string, password2: string) {
      if (/^(?=.*?[0-9])(?=.*[A-Z]).{6,12}$/.test(password1)) { //Check if password is at least 6 long and at least one uppercase
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
    checkAccessRights: function (accessRights: number) {
      if (accessRights >= 0 && accessRights < 3)
        return true;
      else
        return false;
    },
    emptyAllFields: function () {
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
      this.addField.category = 0,
        this.addField.operationaltype = -1,
        this.addField.workplacetype = -1,
        this.addField.defecttype = -1,
        this.addField.malfunctiontype = -1,
        this.addField.completed = false;

    },
    loadData: function () {
      ReportingService.getAllReports("/api/statistics/types").then(
        res => (this.addField.reportTypes = res)
      );
    }
  }
})
</script>
