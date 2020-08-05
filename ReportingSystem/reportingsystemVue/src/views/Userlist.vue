<template>
  <div class="userlist">
    <div id="nav">
      <router-link to="/">Startscherm</router-link>
      <b>/</b>

      <router-link to="/admin">Administrator</router-link>
    </div>

    <div v-if="users">
      {{users}}
      <h1>Gebruikers</h1>
      <template>
        <div>
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0 mt-4"
          >
            <b-row>
              <b-col lg="6" class="my-1">
                <b-input-group size="sm">
                  <b-form-input
                    v-model="Filter"
                    type="search"
                    id="filterInput"
                    placeholder="Type om te zoeken"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''"
                      >Verwijder</b-button
                    >
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
            bordered
            hover
            :table-variant="primary"
            :fields="fields"
            :items="
              this.users
            "
          >   
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="
              this.users.length
            "
            :per-page="perPage"
            aria-controls="operational-table"
          ></b-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import jwt from "jsonwebtoken";

export default Vue.extend({
  data() {
    return {
      pageOptions: [5, 10, 15],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      sortBy: "id",
      sortDesc: true,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      users: [],
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
</style>