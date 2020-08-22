<template>
  <div class="userlist">
    <div id="nav">
      <router-link to="/">Startscherm</router-link>
      <b>/</b>

      <router-link to="/admin">Administrator</router-link>
    </div>

    <div v-if="users">
      <h1>Gebruikerslijst</h1>
      <template>
        <div>
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0 mt-4 customTable"
          >
            <b-row>
              <b-col lg="6" class="my-1">
                <b-input-group size="sm">
                  <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="Type om te zoeken"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''">Verwijder</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col lg="6" class="my-1">
                <b-form-group
                  label="Per pagina"
                  label-cols-sm="6"
                  label-cols-md="4"
                  label-cols-lg="3"
                  label-align-sm="right"
                  label-size="sm"
                  label-for="operationalPerPageSelect"
                  class="mb-0"
                >
                  <b-form-select
                    v-model="perPage"
                    id="operationalPerPageSelect"
                    size="sm"
                    :options="pageOptions"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>

          <b-table
            :head-variant="light"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filterIncludedFields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
            id="operational-table"
            class="customTable"
            bordered
            hover
            :table-variant="primary"
            :fields="fields"
            :items="
              this.users
            "
          >
            <template v-slot:cell(id)="data">
              {{
              data.item.id
              }}
            </template>
            <template v-slot:cell(subscription)="data">
              <input
                @change="changeSubscription(data.item)"
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
                v-model="data.item.subscription"
              />
            </template>

            <template v-slot:cell(accessRights)="data">
              <select
                class="form-control"
                @change="doChangeAccess(data.item.username, data.item.accessRights)"
                v-model="data.item.accessRights"
              >
                <option value="0">Administrator</option>
                <option value="1">Supervisor</option>
                <option value="2">Secretariaat</option>-
              </select>
            </template>
            <template v-slot:cell(password)="data">
              <div class="input-group mb-3">
                <input class="form-control" type="password" v-model="newPwd[data.item.id - 1]" />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    @click="changePassword(data.item.username, newPwd[data.item.id - 1], data.item.id - 1)"
                  >Wijzig</button>
                </div>
              </div>
            </template>
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="
              this.users.length
            "
            :per-page="perPage"
            aria-controls="operational-table"
            class="customTable"
          ></b-pagination>
        </div>
      </template>
      <p v-if="pwdChanged">Het wachtwoord is gewijzigd</p>
      <p v-if="pwdNotChanged">Het wachtwoord is niet gewijzigd</p>
      <p v-if="pwdNotReq">Het wachtwoord voldoet niet aan de voorwaarden</p>
    </div>
    <div class="customTable border border-primary rounded newUser">
      <h2>Nieuwe gebruiker maken</h2>

      <div class="input-group-vertical mt-2">
        <label>Gebruikersnaam (3 tot 15 tekens):</label>
        <input
          name="username"
          v-model="newUserData.username"
          type="text"
          placeholder="Gebruikersnaam"
          class="form-control form-control-lg customTable"
          :class="{ 'is-invalid' : !newUserData.usernameCheck, 'is-valid' : newUserData.usernameCheck}"
        />
        <p
          class="redText"
          v-if="!newUserData.usernameCheck && !newUserData.exists"
        >De gebruikersnaam voldoet niet aan de voorwaarden</p>
        <p v-if="newUserData.exists">Deze gebruikersnaam is al in gebruik</p>

        <label>Email:</label>
        <input
          name="email"
          v-model="newUserData.email"
          type="email"
          placeholder="E-mail"
          class="form-control form-control-lg customTable"
        />
        <label>Wachtwoord (6 tot 12 tekens, minstens 1 hoofdletter, minstens 1 cijfer):</label>
        <input
          name="password"
          v-model="newUserData.password"
          type="password"
          placeholder="Wachtwoord"
          class="form-control form-control-lg customTable"
          :class="{ 'is-invalid' : !newUserData.passwordComp, 'is-valid' : newUserData.passwordComp}"
        />
        <input
          name="passwordCheck"
          v-model="newUserData.rptPassword"
          type="password"
          placeholder="Herhaal wachtwoord"
          class="form-control form-control-lg customTable"
          :class="{ 'is-invalid' : !newUserData.passwordComp, 'is-valid' : newUserData.passwordComp}"
        />
        <p
          class="redText"
          v-if="!newUserData.passwordComp"
        >De wachtwoorden voldoen niet aan de voorwaarden</p>
        <label>toegangsrechten:</label>
        <select
          class="form-control form-control-lg customTable"
          id="accessRights"
          v-model="newUserData.accessRights"
        >
          <option value="0">Administrator</option>
          <option value="1">Supervisor</option>
          <option value="2">Secretariaat</option>
        </select>
        <br />
        <label>
          <input name="Subscription" v-model="newUserData.subscription" type="checkbox" />Toevoegen aan maillijst
        </label>

        <button
          type="button"
          class="btn btn-success btn-block"
          @click.prevent="doNewUser"
        >Voeg gebruiker toe</button>
        <p v-if="newUserData.failed">De gebruiker toevoegen is niet gelukt!</p>
        <p v-if="newUserData.completed">De nieuwe gebruiker is toegevoegd!</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
import ReportingService from "../services/ReportingService";
import jwt from "jsonwebtoken";

export default Vue.extend({
  data() {
    return {
      pageOptions: [5, 10, 15],
      newPwd: [] as any[],
      pwdChanged: false,
      pwdNotChanged: false,
      pwdNotReq: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      sortBy: "id",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      users: [],
      newUserData: {
        username: "",
        password: "",
        rptPassword: "",
        email: "",
        accessRights: 0,
        subscription: false,
        passwordCheck: true,
        usernameCheck: true,
        passwordComp: true,
        completed: false,
        failed: false,
        exists: false
      },
      fields: [
        {
          label: "#",
          key: "id",
          sortable: true
        },
        {
          label: "Gebruikersnaam",
          key: "username",
          sortable: true
        },
        {
          label: "Emailadres",
          key: "email",
          sortable: true
        },
        {
          label: "Functie",
          key: "accessRights",
          sortable: true
        },
        {
          label: "Maillijst",
          key: "subscription",
          sortable: true
        },
        {
          label:
            "Wijzig wachtwoord (6 tot 12 tekens, minstens 1 hoofdletter, minstens 1 cijfer)",
          key: "password",
          sortable: false
        }
      ]
    };
  },

  mounted() {
    this.loadUsers();
  },

  methods: {
    loadUsers: function() {
      ReportingService.getAllUsers("/api/users/all").then(
        res => (this.users = res)
      );
      this.users.forEach(user => {
        this.newPwd.push("");
      });
    },
    changeSubscription: function(user: any) {
      ReportingService.changeSubscription({
        id: user.id,
        subscription: user.subscription
      });
    },
    deleteUser: function(user: any) {
      const decodedToken: any = jwt.decode(
        window.localStorage.getItem("token")!
      );

      ReportingService.deleteUser({
        id: decodedToken.id,
        deleteid: user.id
      });
    },
    async doChangeAccess(username: any, newAcces: any) {
      if (this.checkAccessRights(newAcces)) {
        const response = await ReportingService.changeAcces({
          username: username,
          newAcces: newAcces
        });
      }
    },
    checkAccessRights: function(accessRights: number) {
      if (accessRights >= 0 && accessRights < 3) return true;
      else return false;
    },
    checkPassword: function(pwd: any) {
      if (/^(?=.*?[0-9])(?=.*[A-Z]).{6,12}$/.test(pwd)) {
        return true;
      } else {
        return false;
      }
    },
    async changePassword(username: any, newPass: any, id: any) {
      this.pwdNotChanged = false;
      this.pwdChanged = false;
      this.pwdNotReq = false;

      if (this.checkPassword(newPass)) {
        const response = await ReportingService.changePassword({
          username: username,
          password: newPass
        });
        if (response.bool) {
          this.pwdChanged = true;
          this.pwdNotChanged = false;
          this.newPwd[id] = "";
          this.pwdNotReq = false;
        } else {
          this.pwdNotChanged = true;
          this.pwdChanged = false;
          this.pwdNotReq = false
        }
      } else {
        this.pwdNotChanged = false;
        this.pwdChanged = false;
        this.pwdNotReq = true
      }
    },
    async doNewUser() {
      //CHECK IF PASSWORDS ARE THE SAME
      this.newUserData.failed = false;
      this.newUserData.completed = false;
      this.newUserData.usernameCheck = this.checkUsername(
        this.newUserData.username
      );
      
      this.newUserData.passwordComp = this.checkPasswords(
        this.newUserData.password,
        this.newUserData.rptPassword
      );
      if (
        this.newUserData.passwordComp &&
        this.newUserData.usernameCheck &&
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/.test(
          this.newUserData.email
        )
      ) {
        const response = await ReportingService.addUser({
          username: this.newUserData.username,
          password: this.newUserData.password,
          rptPassword: this.newUserData.rptPassword,
          accessRights: this.newUserData.accessRights,
          mail: this.newUserData.email,
          subscription: this.newUserData.subscription
        });
        if (response.check) {
          this.newUserData.completed = true;
          this.newUserData.failed = false;
          this.newUserData.exists = false;
        } else if (response.userExists) {
          this.newUserData.exists = true;
          this.newUserData.failed = true;
          this.newUserData.completed = false;
          this.newUserData.usernameCheck = false;
        } else {
          this.newUserData.failed = true;
          this.newUserData.completed = false;
          this.newUserData.exists = false;
        }
      }
      this.newUserData.password = "";
      this.newUserData.rptPassword = "";
      this.newUserData.username = "";
      this.newUserData.email = "";
      this.newUserData.accessRights = 0;
      this.newUserData.subscription = false;
      this.loadUsers();
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
    }
  }
});
</script>

<style>
.card {
  display: inline-block;
  width: 35%;
  padding: 0px;
}
.customTable {
  width: 80%;
  margin-left: 10%;
}
.newUser {
  width: 45%;
  margin-top: 3%;
  margin-bottom: 3%;
}

.redText {
  color: red;
}
</style>
