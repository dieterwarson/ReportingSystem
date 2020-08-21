<template>
  <div class="admin">
    <div id="nav">
      <router-link to="/">Startscherm</router-link>
    </div>
    <div class="adminPage">
      <h1>Admin functies</h1>
      <div>
        <div class="row">
          <div class="col-sm">
            <button
              type="button"
              class="btn btn-primary btn-block customBtn"
              @click.prevent="getAddField"
            >Nieuw (sub)type toevoegen</button>
          </div>
        </div>
        <section v-if="option == 'addField'">
          <div class="input-group-vertical" mt-2>
            <select class="form-control form-control-lg" id="addField" v-model="addField.category">
              <option value="0">Operationeel</option>
              <option value="1">Personeel</option>
              <option value="2">Logistiek</option>
              <option value="3">Technisch</option>
            </select>

            <label>Optioneel (subtype):</label>

            <select
              v-if="addField.category == 0"
              class="form-control form-control-lg"
              id="addField"
              v-model="addField.operationaltype"
            >
              <option value="-1">Subtype (Optioneel)</option>
              <option
                v-for="value in this.addField.reportTypes.operationalTypes"
                :key="value.id"
                :value="value.id"
              >{{ value.typeName }}</option>
            </select>
            <select
              v-else-if="addField.category == 1"
              class="form-control form-control-lg"
              id="addField"
              v-model="addField.workplacetype"
            >
              <option value="-1">Subtype (Optioneel)</option>
              <option
                v-for="value in this.addField.reportTypes.workplaceTypes"
                :key="value.id"
                :value="value.id"
              >{{ value.typeName }}</option>
            </select>
            <select
              v-else-if="addField.category == 2"
              class="form-control form-control-lg"
              id="addField"
              v-model="addField.defecttype"
            >
              <option value="-1">Subtype (Optioneel)</option>
              <option
                v-for="value in this.addField.reportTypes.defectTypes"
                :key="value.id"
                :value="value.id"
              >{{ value.typeName }}</option>
            </select>
            <select
              v-else-if="addField.category == 3"
              class="form-control form-control-lg"
              id="addField"
              v-model="addField.malfunctiontype"
            >
              <option value="-1">Subtype (Optioneel)</option>
              <option
                v-for="value in this.addField.reportTypes.malfunctionTypes"
                :key="value.id"
                :value="value.id"
              >{{ value.typeName }}</option>
            </select>
          </div>
          <label>De naam van het type moet minstens 3 tekens lang zijn</label>
          <input
            name="addField"
            v-model="addField.newField"
            type="text"
            placeholder="Nieuw veld"
            class="form-control form-control-lg"
            :class="{ 'is-invalid' : !addField.valid, 'is-valid' : addField.valid}"
          />
          <button
            type="button"
            class="btn btn-info btn-block subBtn"
            @click.prevent="doAddField"
          >Voeg (sub)type toe</button>
          <small v-if="addField.completed">Het (sub)type is toegevoegd!</small>
        </section>
      </div>

      <div class="buttons">
        <div class="row">
          <div class="col-sm">
            <button
              type="button"
              class="btn btn-primary btn-block customBtn"
              @click.prevent="getCustomFiche"
            >Maak nieuwe gepersonaliseerde fiche</button>
          </div>
        </div>
        <section v-if="option == 'customFiche'">
          <div class="input-group-vertical mt-2">
            <label>Naam fiche</label>
            <input
              class="form-control form-control-lg"
              v-model="customTitle"
              name="titel"
              type="text"
              placeholder="Naam fiche"
            />
            <div class="input-group">
              <div v-for="(inputfield, index) in customFiche" :key="index" class="customFicheInput">
                <label>Veld {{index + 1 }} (Minstens 3 tekens lang)</label>

                <input
                  class="form-control form-control-lg"
                  v-model="customFiche[index].title"
                  :class="{ 'is-invalid' : !customFiche[index].valid, 'is-valid' : customFiche[index].valid}"
                  type="text"
                  placeholder="Naam veld"
                />
              </div>
            </div>
            <div>
              <div class="btn-group d-flex">
                <button
                  v-if="customFiche.length <= 9 && customFiche.length > 0"
                  @click="addInputField"
                  type="button"
                  class="btn btn-success subBtn"
                >+ invoerveld</button>
                <button
                  v-if="customFiche.length <= 10 && customFiche.length > 1"
                  @click="delInputField"
                  type="button"
                  class="btn btn-danger subBtn"
                >- invoerveld</button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-info btn-block subBtn"
              @click.prevent="addNewCustom"
            >Voeg gepersonaliseerde fiche toe</button>
            <small v-if="newCustom.failed">Het toevoegen is mislukt!</small>
            <small v-if="newCustom.completed">De gepersonaliseerde fiche is toegevoegd!</small>
          </div>
        </section>
      </div>

      <div class="buttons">
        <div class="row">
          <div class="col-sm">
            <router-link
              to="/changePermissions"
              tag="button"
              class="btn btn-primary btn-block customBtn"
            >Gebruikersrollen wijzigen</router-link>
          </div>
        </div>
      </div>

      <div class="buttons">
        <div class="row">
          <div class="col-sm">
            <router-link
              to="/userlist"
              tag="button"
              class="btn btn-primary btn-block customBtn"
            >Gebruikerslijst</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import { stringify } from "querystring";
export default Vue.extend({
  data() {
    return {
      option: "no-option",
      customTitle: "",

      changeAccesRights: {
        username: "",
        rights: "",
        newRights: 0,
        completed: false,
        failed: false
      },
      changePassword: {
        username: "",
        newPassword: "",
        rptPassword: "",
        passwordCheck: false,
        passwordComp: false,
        completed: false,
        failed: false
      },
      addField: {
        newField: "",
        category: 0,
        operationaltype: -1,
        workplacetype: -1,
        malfunctiontype: -1,
        defecttype: -1,
        reportTypes: {},
        completed: false,
        valid: true,
      },
      customFiche: [
        {
          title: "",
          valid: true
        }
      ],
      newCustom: {
        failed: false,
        completed: false
      }
    };
  },
  mounted() {
    this.loadData();
    this.getCustomFiche();
  },
  methods: {
    addInputField: function() {
      if (this.customFiche.length < 10)
        this.customFiche.push({
          title: "",
          valid: true
        });
    },
    delInputField: function() {
      if (this.customFiche.length > 0) this.customFiche.pop();
    },
    getNewUser: function() {
      if (this.option == "newUser") {
        this.option = "no_option";
      } else if (this.option != "newUser") {
        this.option = "newUser";
      }
      this.emptyAllFields();
    },
    getCustomFiche: function() {
      if (this.option == "customFiche") {
        this.option = "no_option";
      } else if (this.option != "customFiche") {
        this.option = "customFiche";
      }
    },

    getChangeAccesRights: function() {
      if (this.option == "changeAccess") {
        this.option = "no_option";
      } else if (this.option != "changeAccess") {
        this.option = "changeAccess";
      }
      this.emptyAllFields();
    },
    getChangePassword: function() {
      if (this.option == "chgPassword") {
        this.option = "no_option";
      } else if (this.option != "chgPassword") {
        this.option = "chgPassword";
      }
      this.emptyAllFields();
    },
    getAddField: function() {
      if (this.option == "addField") {
        this.option = "no_option";
      } else if (this.option != "addField") {
        this.option = "addField";
      }
      this.emptyAllFields();
    },
    async doChangePassword() {
      const response = await ReportingService.changePassword({
        username: this.changePassword.username,
        password: this.changePassword.newPassword
      });
    },
    async doChangeAccess() {
      this.changeAccesRights.failed = false;
      this.changeAccesRights.completed = false;

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
      if (this.addField.newField.length < 3) {
        this.addField.valid = false;
        return;
      } 
      if (this.checkUsername(this.addField.newField)) {
        const response = await ReportingService.addTypes({
          type: this.addField.category,
          operationaltype: this.addField.operationaltype,
          workplacetype: this.addField.workplacetype,
          defectTypes: this.addField.defecttype,
          malfunctionTypes: this.addField.malfunctiontype,
          field: this.addField.newField
        });
        this.addField.valid = true;
        this.addField.newField = "";
        (this.addField.category = 0),
          (this.addField.operationaltype = -1),
          (this.addField.workplacetype = -1),
          (this.addField.defecttype = -1),
          (this.addField.malfunctiontype = -1),
          (this.addField.completed = true);
      }
    },
    checkUsername: function(username: string) {
      if (/^[a-zA-Z0-9_-]{3,15}$/.test(username)) {
        return true;
      } else {
        return false;
      }
    },
    checkPasswords: function(password1: string, password2: string) {
      if (/^(?=.*?[0-9])(?=.*[A-Z]).{6,12}$/.test(password1)) {
        //Check if password is at least 6 long and at least one uppercase
        const test = new String(password1);
        if (test.localeCompare(password2) == 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    checkAccessRights: function(accessRights: number) {
      if (accessRights >= 0 && accessRights < 3) return true;
      else return false;
    },
    emptyAllFields: function() {
      this.changeAccesRights.username = "";
      this.changeAccesRights.newRights = 0;
      this.changeAccesRights.completed = false;

      this.changePassword.username = "";
      this.changePassword.newPassword = "";
      this.changePassword.rptPassword = "";
      this.changePassword.passwordCheck = true;
      this.changePassword.passwordComp = true;
      this.changePassword.completed = false;

      this.addField.newField = "";
      (this.addField.category = 0),
        (this.addField.operationaltype = -1),
        (this.addField.workplacetype = -1),
        (this.addField.defecttype = -1),
        (this.addField.malfunctiontype = -1),
        (this.addField.completed = false);
    },
    loadData: function() {
      ReportingService.getAllReports("/api/statistics/types").then(
        res => (this.addField.reportTypes = res)
      );
    },
    async addNewCustom() {
      //customFiche[index].title
      let check = false;
      this.customFiche.forEach(element => {
        if (element.title.length < 3) {
          element.valid = false;
          this.newCustom.failed = true;
          this.newCustom.completed = false;
          check = true;
        }
      });
      if (check) return; //if a field is empty return

      const response = await ReportingService.addCustomFiche({
        fields: this.customFiche,
        title: this.customTitle
      });
      if (response.check) {
        this.customFiche.forEach(element => {
          element.title = "";
          element.valid = true;
        });
        this.customTitle = "";
        this.newCustom.failed = false;
        this.newCustom.completed = true;
      } else {
        this.newCustom.failed = true;
        this.newCustom.completed = false;
      }
    }
  }
});
</script>
<style>
.adminPage {
  width: 80%;
  margin-left: 10%;
}
.buttons {
  margin-top: 0.25%;
  margin-bottom: 0.25%;
}
.customBtn {
  padding-top: 1%;
  padding-bottom: 1%;
}

.subBtn {
  margin-top: 0.3%;
}

.customFicheInput {
  width: 47%;
  margin-left: 1.5%;
  margin-right: 1.5%;
}
</style>
