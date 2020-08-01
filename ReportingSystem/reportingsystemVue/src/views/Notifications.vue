<template>
  <div class="notifications">
    <div id="nav">
      <router-link to="/">Startscherm</router-link>
    </div>

    <div class="container pt-5 pb-5">
      <h1>
        Meldingen
      </h1>


      <!--- ADMINISTRATIEF --->
      <template>
        <div>
          <h3>Administratief</h3>
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
                    v-model="administrativeFilter"
                    type="search"
                    id="filterInput"
                    placeholder="Type to Search"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!administrativeFilter" @click="administrativeFilter = ''"
                      >Clear</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col lg="6" class="my-1">
                <b-form-group
                  label="Per page"
                  label-cols-sm="6"
                  label-cols-md="4"
                  label-cols-lg="3"
                  label-align-sm="right"
                  label-size="sm"
                  label-for="administrativePerPageSelect"
                  class="mb-0"
                >
                  <b-form-select
                    v-model="administrativePerPage"
                    id="administrativePerPageSelect"
                    size="sm"
                    :options="pageOptions"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>

          <b-table v-if="loaded"
            :head-variant="light"
            :current-page="administrativeCurrentPage"
            :per-page="administrativePerPage"
            :filter="administrativeFilter"
            :filterIncludedFields="administrativeFilterOn"
            :sort-by.sync="administrativeSortBy"
            :sort-desc.sync="administrativeSortDesc"
            :sort-direction="administrativeSortDirection"
            @filtered="administrativeOnFiltered"
            id="administrative-table"
            bordered
            hover
            :table-variant="primary"
            :fields="administrativeFields"
            :items="
              this.monitored.administrative.workplaceEvents.concat(
                this.monitored.administrative.secretariatNotifications
              )
            "
          >
            <template v-slot:cell(date)="data">
              {{
                new Date(data.item.date).toLocaleString("nl-BE", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              }}
            </template>
            <template v-slot:cell(edit)="data">
              <img id="topright" src="../assets/edit-logo.png" alt="pas aan" @click="changeEventClick(String(data.item.id), data.item.listName, 'Workforce')" />
            </template>
            
            <template v-slot:cell(delete)="data">
              <button
                class="btn btn-primary btn-sm"
                @click="removeClicked(data.item.id, data.item.listName)"
              >
                🗑
              </button>
            </template>
            <template v-slot:cell(type)="data">
              <span class="card-text badge badge-danger">
                {{ getType(data.item.id, data.item.listName) }}</span
              >
            </template>
          </b-table>
          <b-pagination
            v-model="administrativeCurrentPage"
            :total-rows="
              this.monitored.administrative.workplaceEvents.length +
                this.monitored.administrative.secretariatNotifications.length
            "
            :per-page="administrativePerPage"
            aria-controls="administrative-table"
          ></b-pagination>
        </div>
      </template>


      <!--- DEFECTEN --->
      <template>
        <div>
          <h3>Defecten</h3>
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
                    v-model="defectFilter"
                    type="search"
                    id="filterInput"
                    placeholder="Type to Search"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!defectFilter" @click="defectFilter = ''"
                      >Clear</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col lg="6" class="my-1">
                <b-form-group
                  label="Per page"
                  label-cols-sm="6"
                  label-cols-md="4"
                  label-cols-lg="3"
                  label-align-sm="right"
                  label-size="sm"
                  label-for="defectPerPageSelect"
                  class="mb-0"
                >
                  <b-form-select
                    v-model="defectPerPage"
                    id="defectPerPageSelect"
                    size="sm"
                    :options="pageOptions"
                  ></b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>

          <b-table v-if="loaded"
            :head-variant="light"
            :current-page="defectCurrentPage"
            :per-page="defectPerPage"
            :filter="defectFilter"
            :filterIncludedFields="defectFilterOn"
            :sort-by.sync="defectSortBy"
            :sort-desc.sync="defectSortDesc"
            :sort-direction="defectSortDirection"
            @filtered="defectOnFiltered"
            id="defect-table"
            bordered
            hover
            :table-variant="Primary"
            :fields="defectFields"
            :items="
              this.monitored.technical.defects.concat(
                this.monitored.technical.malfunctions
              )
            "
          >
            <template v-slot:cell(date)="data">
              {{
                new Date(data.item.date).toLocaleString("nl-BE", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              }}
            </template>
            <template v-slot:cell(delete)="data">
              <button
                class="btn btn-primary btn-sm"
                @click="removeClicked(data.item.id, data.item.listName)"
              >
                🗑
              </button>
            </template>
            <template v-slot:cell(edit)="data">
              <img id="topright" src="../assets/edit-logo.png" alt="pas aan" @click="changeEventClick(String(data.item.id), data.item.listName, 'Technical')" />
            </template>
            <template v-slot:cell(type)="data">
              <span class="card-text badge badge-danger">
                {{ getType(data.item.id, data.item.listName) }}</span
              >
            </template>
          </b-table>
          <b-pagination
            v-model="defectCurrentPage"
            :total-rows="
              this.monitored.technical.defects.length +
                this.monitored.technical.malfunctions.length
            "
            :per-page="defectPerPage"
            aria-controls="defect-table"
          ></b-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
export default Vue.extend({
  data: function() {
    return {
      pageOptions: [5, 10, 15],
      loaded: false,
      administrativeTotalRows: 1,
      administrativeCurrentPage: 1,
      administrativePerPage: 5,
      administrativeSortBy: "date",
      administrativeSortDesc: true,
      administrativeSortDirection: "asc",
      administrativeFilter: null,
      administrativeFilterOn: [],
      administrativeFields: [
        {
          label: "Datum",
          key: "date",
          sortable: true,
        },
        {
          label: "Omschrijving",
          key: "description",
          sortable: false,
        },
        {
          label: "Type",
          key: "type",
          sortable: true,
        },
        {
          label: "Afwezige",
          key: "absentee",
          sortable: true,
        },
        {
          label: "Vervanger",
          key: "substitute",
          sortable: true,
        },
        {
          label: "Melding aanpassen",
          key: "edit",
        },
        {
          label: "Melding archiveren",
          key: "delete",
        },
      ],

      defectTotalRows: 1,
      defectCurrentPage: 1,
      defectPerPage: 5,
      defectSortBy: "date",
      defectSortDesc: true,
      defectSortDirection: "asc",
      defectFilter: null,
      defectFilterOn: [],
      defectFields: [
        {
          label: "Datum",
          key: "date",
          sortable: true,
        },
        {
          label: "Omschrijving",
          key: "description",
          sortable: false,
        },
        {
          label: "Type",
          key: "type",
          sortable: true,
        },
        {
          label: "Melding aanpassen",
          key: "edit",
        },
        {
          label: "Melding verwijderen ",
          key: "delete",
        },
      ],
      interval: 0,
      monitored: {
        administrative: {
          workplaceEvents: [],
          secretariatNotifications: [],
        },
        technical: {
          defects: [],
          malfunctions: [],
        },
      },
      emptyMonitored: {
        administrative: {
          workplaceEvents: [],
          secretariatNotifications: [],
        },
        technical: {
          defects: [],
          malfunctions: [],
        },
      },
      pageMonitored: {
        administrative: {
          workplaceEvents: [],
          secretariatNotifications: [],
        },
        technical: {
          defects: [],
          malfunctions: [],
        },
      },
    };
  },

  mounted() {
    this.loadData();
    this.interval = window.setInterval(this.loadData, 5000);
  },

  methods: {
    getType: function(id:string, list:string){
      if(this.monitored.administrative.workplaceEvents !== [] && list == "WorkplaceEvent"){
        for (let i = 0; i < this.monitored.administrative.workplaceEvents.length; i++) {
          if(this.monitored.administrative.workplaceEvents[i] !== null && this.monitored.administrative.workplaceEvents[i].id == id){
            return this.monitored.administrative.workplaceEvents[i].workplaceType.typeName;
          }
          
        }
      }
      if(this.monitored.administrative.secretariatNotifications !== [] && list == "SecretariatNotification"){
        for (let i = 0; i < this.monitored.administrative.secretariatNotifications.length; i++) {
          if(this.monitored.administrative.secretariatNotifications[i] !== null){
            return "Melding aan secretariaat";
          }
          
        }
      }
      if(this.monitored.technical.defects !== [] && list == "Defect"){
        for (let i = 0; i < this.monitored.technical.defects.length; i++) {
          if(this.monitored.technical.defects[i] !== null && this.monitored.technical.defects[i].id == id){
            return "Logistiek: " + this.monitored.technical.defects[i].defectType.typeName;
          }
          
        }
      }
      if(this.monitored.technical.malfunctions !== [] && list == "Malfunction"){
        for (let i = 0; i < this.monitored.technical.malfunctions.length; i++) {
          if(this.monitored.technical.malfunctions[i] !== null && this.monitored.technical.malfunctions[i].id == id){
            return "Technisch: " + this.monitored.technical.malfunctions[i].malfunctionType.typeName;
          }
          
        }
      }
    },
    loadData: function() {
      const response = ReportingService.getAllReports(
        "/api/reports/monitored"
      ).then((res) => (this.monitored = res));
    },

    reportClick: function(id: string) {
      this.$router.push({
        path: "reportView",
        query: {
          reportId: id,
        },
      });
    },
    removeClicked: function(id: number, category: string) {
      alert(category);
      ReportingService.removeNotification({
        id,
        category,
      }).then((res) => this.loadData());
    },
    changeEventClick: function (id: string, subcat: string, categorie: string) {
      subcat = subcat[0].toLowerCase() + subcat.substring(1);
      this.$router.push({
        path: "changeEvent",
        query: {
          reportId: String(0),
          eventId: String(id),
          categorie: categorie,
          subcategorie: String(subcat + 's')
        }
      });
    },
  },

  watch: {
    monitored: {
      deep: true,
      handler() {
        for (
          let i = 0;
          i < this.monitored.administrative.secretariatNotifications.length;
          i++
        ) {
          if(this.monitored.administrative.secretariatNotifications[i] != null)
            (this.monitored.administrative.secretariatNotifications[i] as any).listName = "SecretariatNotification";
          
        }
        for (
          let i = 0;
          i < this.monitored.administrative.workplaceEvents.length;
          i++
        ) {
          if(this.monitored.administrative.workplaceEvents[i] != null)
            (this.monitored.administrative.workplaceEvents[i] as any).listName = "WorkplaceEvent";
        }

        for (
          let i = 0;
          i < this.monitored.technical.defects.length;
          i++
        ) {
          if(this.monitored.technical.defects[i] != null)
            (this.monitored.technical.defects[i] as any).listName = "Defect";
        }

        for (
          let i = 0;
          i < this.monitored.technical.malfunctions.length;
          i++
        ) {
          if(this.monitored.technical.malfunctions[i] != null)
            (this.monitored.technical.malfunctions[i] as any).listName = "Malfunction";
        }
      
        this.loaded = true;
      },
    },
    
  },

  beforeDestroy: function() {
    window.clearInterval(this.interval);
  },
});
</script>

<style scoped>

#topright {
  height: 30px;
  width: 30px;
}
</style>