<template>
  <div class="changePermissions">
    <div id="nav">
      <router-link to="/">Startscherm</router-link>
      <b>/</b>
      <router-link to="/admin">Administrator</router-link>
    </div>
    <div class="rightsTable">
      <div v-if="userRoles">
        <h1>Rechten van gebruikersrollen wijzigen</h1>
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
              this.userRoles
            "
            >
              <template v-slot:cell(id)="data">
                {{
                data.item.id
                }}
              </template>
              <template v-slot:cell(name)="data">
                {{
                data.item.name
                }}
              </template>
              <template v-slot:cell(makeReports)="data">
                <input type="checkbox" class="form-check-input" v-model="data.item.makeReports" />
              </template>
              <template v-slot:cell(seeReports)="data">
                <input type="checkbox" class="form-check-input" v-model="data.item.seeReports" />
              </template>
              <template v-slot:cell(seeNotifications)="data">
                <input type="checkbox" class="form-check-input" v-model="data.item.seeNotifications" />
              </template>
              <template v-slot:cell(seePreviousShift)="data">
                <input type="checkbox" class="form-check-input" v-model="data.item.seePreviousShift" />
              </template>
              <template v-slot:cell(seeStatistics)="data">
                <input type="checkbox" class="form-check-input" v-model="data.item.seeStatistics" />
              </template>
            </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="
              this.userRoles.length
            "
              :per-page="perPage"
              aria-controls="operational-table"
              class="customTable"
            ></b-pagination>
          </div>
        </template>
      </div>
      <button
        type="button"
        class="btn btn-success btn-block"
        @click.prevent="updatePermissions"
      >Wijzigingen opslaan</button>
    </div>
    <p v-if="succeeded">De rollen zijn gewijzigd</p>
    <p v-if="failed">De rollen zijn niet gewijzigd</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
import ReportingService from "../services/ReportingService";
export default Vue.extend({
  data: function() {
    return {
      succeeded: false,
      failed: false,
      userRoles: {},
      pageOptions: [5, 10, 15],
      newPwd: [],
      pwdChanged: false,
      pwdNotChanged: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      sortBy: "id",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      fields: [
        {
          label: "#",
          key: "id",
          sortable: true
        },
        {
          label: "Gebruikersrol",
          key: "name",
          sortable: true
        },
        {
          label: "Verslagen maken",
          key: "makeReports",
          sortable: true
        },
        {
          label: "Verslagen bekijken",
          key: "seeReports",
          sortable: true
        },
        {
          label: "Meldingen bekijken",
          key: "seeNotifications",
          sortable: true
        },
        {
          label: "Vorige shift bekijken",
          key: "seePreviousShift",
          sortable: false
        },
        {
          label: "Statistieken bekijken",
          key: "seeStatistics",
          sortable: false
        }
      ]
    };
  },
  mounted: function() {
    this.getPermissions();
  },
  methods: {
    getPermissions: function() {
      ReportingService.getAccessRoleData().then(res => (this.userRoles = res));
    },
    async updatePermissions() {
      const response =  await ReportingService.updateAccessRoleData({
        roles: this.userRoles
      });
      if (response.check) {
        this.succeeded = true;
        this.failed = false;
      } else {
        this.failed = true;
        this.succeeded = false;
      }
    }
  }
});
</script>
<style>
.rightsTable {
  width: 80%;
  margin-left: 10%;
}
</style>