<template>
  <div class="notifications">
    <div id="nav">
      <router-link to="/">Startscherm</router-link>
    </div>

    <div class="container pt-5 pb-5">
      <h1>
        Meldingen
      </h1>
      <template>
        <div>
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                placeholder="Type to Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
            <b-form-group
              label="Per page"
              label-cols-sm="6"
              label-cols-md="4"
              label-cols-lg="3"
              label-align-sm="right"
              label-size="sm"
              label-for="perPageSelect"
              class="mb-0"
            >
              <b-form-select
                v-model="perPage"
                id="perPageSelect"
                size="sm"
                :options="pageOptions"
              ></b-form-select>
            </b-form-group>
          </b-form-group>
          <b-table
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            :filterIncludedFields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
            id="my-table"
            bordered
            hover
            :table-variant="Primary"
            :fields="fields"
            :items="this.monitored.administrative.workplaceEvents /*.concat(this.monitored.administrative.secretariatNotifications)*/"
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
                              @click="removeClicked(data.item.id, 'WorkplaceEvent')"
                            >
                              🗑</button>
              
            </template>
            <template v-slot:cell(type)="data">
                <span class="card-text badge badge-danger">
                  {{data.item.workplaceType.typeName}}</span>
            </template>


            
          </b-table>
          <b-pagination
            v-model="currentPage"
            :total-rows="this.monitored.administrative.workplaceEvents.length + this.monitored.administrative.secretariatNotifications.length"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </div>
      </template>
      <section>
        <div class="row my-5" v-if="this.monitored != this.emptyMonitored">
          <div class="col">
            <div class="card w-100">
              <h5 class="card-header bg-primary text-white">Administratief</h5>
              <div class="card-body">
                <div
                  v-if="
                    this.monitored.administrative ==
                      this.emptyMonitored.administrative
                  "
                >
                  <p class="card-text">
                    Er zijn nog geen gebeurtenissen van deze categorie
                  </p>
                </div>
                <div v-else class="row row-cols-1">
                  <div
                    v-for="event in pageMonitored.administrative
                      .workplaceEvents"
                    :key="event.id"
                  >
                    <div class="col">
                      <div class="card h-100 mb-3">
                        <h5 class="card-header bg-secondary">Vervanging</h5>
                        <div class="card-body">
                          <p class="card-text">
                            {{
                              new Date(event.date).toLocaleString("nl-BE", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                            }}
                          </p>
                          <p class="card-text">{{ event.description }}</p>
                          <p class="card-text">
                            {{ event.absentee }} vervangen door
                            {{ event.substitute }}
                          </p>
                          <h5 class="card-text">
                            <span class="card-text badge badge-danger mr-3">{{
                              event.workplaceType.typeName
                            }}</span>
                            <button
                              class="btn btn-primary btn-sm"
                              @click="removeClicked(event.id, 'WorkplaceEvent')"
                            >
                              Melding verwijderen 🗑
                            </button>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    v-for="event in pageMonitored.administrative
                      .secretariatNotifications"
                    :key="event.id"
                  >
                    <div class="col">
                      <div class="card h-100 mb-3">
                        <h5 class="card-header bg-secondary">
                          Melding aan het secretariaat
                        </h5>
                        <div class="card-body">
                          <p class="card-text">
                            {{
                              new Date(event.date).toLocaleString("nl-BE", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                            }}
                          </p>
                          <p class="card-text">{{ event.description }}</p>
                          <h5>
                            <button
                              class="btn btn-primary btn-sm"
                              @click="
                                removeClicked(
                                  event.id,
                                  'SecretariatNotification'
                                )
                              "
                            >
                              Melding verwijderen 🗑
                            </button>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <vPagination
                  :classes="bootstrapPaginationClasses"
                  v-model="administrativeCurrentPage"
                  :page-count="administrativePages"
                ></vPagination>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card w-100">
              <h5 class="card-header bg-primary text-white">Defecten</h5>
              <div class="card-body">
                <div
                  v-if="
                    this.pageMonitored.technical ==
                      this.emptyMonitored.technical
                  "
                >
                  <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
                </div>
                <div v-else class="row row-cols-1">
                  <div
                    v-for="event in pageMonitored.technical.defects"
                    :key="event.id"
                  >
                    <div class="col">
                      <div class="card h-100 mb-3">
                        <h5 class="card-header bg-secondary">Logistiek</h5>
                        <div class="card-body">
                          <p class="card-text">
                            {{
                              new Date(event.date).toLocaleString("nl-BE", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                            }}
                          </p>
                          <p class="card-text">{{ event.description }}</p>
                          <h5 class="card-text">
                            <span class="card-text badge badge-danger mr-3">{{
                              event.defectType.typeName
                            }}</span>
                            <button
                              class="btn btn-primary btn-sm"
                              @click="removeClicked(event.id, 'Defect')"
                            >
                              Melding verwijderen 🗑
                            </button>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    v-for="event in pageMonitored.technical.malfunctions"
                    :key="event.id"
                  >
                    <div class="col">
                      <div class="card h-100 mb-3">
                        <h5 class="card-header bg-secondary">Technisch</h5>
                        <div class="card-body">
                          <p class="card-text">
                            {{
                              new Date(event.date).toLocaleString("nl-BE", {
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                            }}
                          </p>
                          <p class="card-text">{{ event.description }}</p>
                          <p class="card-text">{{ event.duration }}</p>
                          <h5 class="card-text">
                            <span class="card-text badge badge-danger mr-3">{{
                              event.malfunctionType.typeName
                            }}</span>
                            <button
                              class="btn btn-primary btn-sm"
                              @click="removeClicked(event.id, 'Malfunction')"
                            >
                              Melding verwijderen 🗑
                            </button>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <vPagination
                  :classes="bootstrapPaginationClasses"
                  v-model="defectCurrentPage"
                  :page-count="defectPages"
                ></vPagination>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import BootstrapVue from "bootstrap-vue";
import vPagination from "vue-plain-pagination";
Vue.use(BootstrapVue);
export default Vue.extend({
  components: {
    vPagination,
  },
  data: function() {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "date",
      sortDesc: true,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      fields: [
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
          sortable: false
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
          label: 'Melding verwijderen ',
          key: "delete"
        }
        
      ],
      administrativeCurrentPage: 1,
      administrativePages: 1,
      defectCurrentPage: 1,
      defectPages: 1,
      bootstrapPaginationClasses: {
        ul: "pagination",
        li: "page-item",
        liActive: "active",
        liDisable: "disabled",
        button: "page-link",
      },
      interval: 0,
      step: "Operational",
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

    getOperational: function() {
      if (this.step != "Operational") this.step = "Operational";
    },
    getWorkforce: function() {
      if (this.step != "Workforce") this.step = "Workforce";
    },
    getTechnical: function() {
      if (this.step != "Technical") this.step = "Technical";
    },
    removeClicked: function(id: number, category: string) {
      ReportingService.removeNotification({
        id,
        category,
      }).then((res) => this.loadData());
    },

    paginate: function() {
      // technical

      this.defectPages = Math.ceil(
        (this.monitored.technical.defects.length +
          this.monitored.technical.malfunctions.length) /
          3
      );
      const dOff = this.defectCurrentPage * 3 - 3;
      this.pageMonitored.technical.defects = [];
      this.pageMonitored.technical.malfunctions = [];

      if (
        this.monitored.technical.defects.length - dOff * (2 / 3) > 2 &&
        this.monitored.technical.malfunctions.length - (1 / 3) * dOff > 1
      ) {
        for (let i = dOff * (2 / 3); i < dOff * (2 / 3) + 2; i++) {
          this.pageMonitored.technical.defects.push(
            this.monitored.technical.defects[i]
          );
        }
        for (let i = dOff * (1 / 3); i < dOff * (1 / 3) + 1; i++) {
          this.pageMonitored.technical.malfunctions.push(
            this.monitored.technical.malfunctions[i]
          );
        }
      } else {
        const defCount =
          this.monitored.technical.defects.length - (2 / 3) * dOff;
        if (defCount > 0)
          for (
            let i = (dOff * defCount) / 3;
            i < (dOff * defCount) / 3 + defCount;
            i++
          ) {
            this.pageMonitored.technical.defects.push(
              this.monitored.technical.defects[i]
            );
          }
        let malCount = 3 - defCount;
        let mal = 0;
        if (defCount < 0) {
          mal =
            this.monitored.technical.malfunctions.length -
            (1 / 3) * dOff +
            defCount;
          malCount = 3;
          // 2
        } else
          mal = this.monitored.technical.malfunctions.length - (1 / 3) * dOff;
        if (mal < malCount) {
          malCount = mal;
        }
        if (malCount > 0)
          if (defCount < 0)
            for (
              let i = (dOff * malCount) / 3;
              i < (dOff * malCount) / 3 + malCount;
              i++
            ) {
              this.pageMonitored.technical.malfunctions.push(
                this.monitored.technical.malfunctions[i - 1]
              );
            }
          else
            for (
              let i = (dOff * malCount) / 3;
              i < (dOff * malCount) / 3 + malCount;
              i++
            ) {
              this.pageMonitored.technical.malfunctions.push(
                this.monitored.technical.malfunctions[i]
              );
            }
      }
      // administrative

      this.administrativePages = Math.ceil(
        (this.monitored.administrative.workplaceEvents.length +
          this.monitored.administrative.secretariatNotifications.length) /
          3
      );
      const aOff = this.administrativeCurrentPage * 3 - 3;
      this.pageMonitored.administrative.workplaceEvents = [];
      this.pageMonitored.administrative.secretariatNotifications = [];

      if (
        this.monitored.administrative.workplaceEvents.length - aOff * (2 / 3) >
          2 &&
        this.monitored.administrative.secretariatNotifications.length -
          (1 / 3) * aOff >
          1
      ) {
        for (let i = aOff * (2 / 3); i < aOff * (2 / 3) + 2; i++) {
          this.pageMonitored.administrative.workplaceEvents.push(
            this.monitored.administrative.workplaceEvents[i]
          );
        }
        for (let i = aOff * (1 / 3); i < aOff * (1 / 3) + 1; i++) {
          this.pageMonitored.administrative.secretariatNotifications.push(
            this.monitored.administrative.secretariatNotifications[i]
          );
        }
      } else {
        const defCount =
          this.monitored.administrative.workplaceEvents.length - (2 / 3) * aOff;
        if (defCount > 0)
          for (
            let i = (aOff * defCount) / 3;
            i < (aOff * defCount) / 3 + defCount;
            i++
          ) {
            this.pageMonitored.administrative.workplaceEvents.push(
              this.monitored.administrative.workplaceEvents[i]
            );
          }
        let malCount = 3 - defCount;
        let mal = 0;
        if (defCount < 0) {
          mal =
            this.monitored.administrative.secretariatNotifications.length -
            (1 / 3) * aOff +
            defCount;
          malCount = 3;
          // 2
        } else
          mal =
            this.monitored.administrative.secretariatNotifications.length -
            (1 / 3) * aOff;
        if (mal < malCount) {
          malCount = mal;
        }
        if (malCount > 0)
          if (defCount < 0)
            for (
              let i = (aOff * malCount) / 3;
              i < (aOff * malCount) / 3 + malCount;
              i++
            ) {
              this.pageMonitored.administrative.secretariatNotifications.push(
                this.monitored.administrative.secretariatNotifications[i - 1]
              );
            }
          else
            for (
              let i = (aOff * malCount) / 3;
              i < (aOff * malCount) / 3 + malCount;
              i++
            ) {
              this.pageMonitored.administrative.secretariatNotifications.push(
                this.monitored.administrative.secretariatNotifications[i]
              );
            }
      }
    },
  },

  watch: {
    monitored: function() {
      this.paginate();
    },
    defectCurrentPage: function() {
      this.paginate();
    },
    administrativeCurrentPage: function() {
      this.paginate();
    },
  },

  beforeDestroy: function() {
    window.clearInterval(this.interval);
  },
});
</script>
