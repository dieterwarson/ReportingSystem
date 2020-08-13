<template>
  <div class="reportview">
    <p>reportContent.report: {{ reportContent.report }}</p>
    <div id="nav">
      <router-link to="/">Startscherm</router-link>
      <b>/</b>
      <router-link to="/reports">Verslagen</router-link>
    </div>
    <div
      class="container pt-5 pb-5"
      v-if="!(Object.keys(reportContent).length === 0)"
    >
      <h1>
        Verslag van
        {{
          new Date(reportContent.report.date).toLocaleString("nl-BE", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        }}
        <span class="badge badge-primary">{{ shift }}</span>
      </h1>
      <div
        class="btn-group d-flex"
        role="group"
        aria-label="Justified button group"
      >
        <button
          id="operationalButton"
          type="button"
          class="btn btn-info"
          @click.prevent="getOperational"
        >
          Operationeel
        </button>
        <button
          id="workForceButton"
          type="button"
          class="btn btn-primary"
          @click.prevent="getWorkforce"
        >
          Personeel
        </button>
        <button
          id="technicalButton"
          type="button"
          class="btn btn-primary"
          @click.prevent="getTechnical"
        >
          Technisch
        </button>
      </div>
      <!-- Operational -->
      <section v-if="step == 'Operational'" class="container">
        <!-- Filter types -->
        <div class="filter-select mt-4">
          <treeselect
            placeholder="Kies filters"
            v-model="selectedTypes.operationalEvents"
            :multiple="true"
            :options="operationalOptions"
            valueConsistsOf="ALL"
          />
        </div>
        <div
          v-if="
            Object.keys(reportContent.operational.operationalEvents).length ===
              0
          "
        >
          <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
        </div>
        <div v-else>
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
                        <b-button
                          :disabled="!operationalFilter"
                          @click="operationalFilter = ''"
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
                        v-model="operationalPerPage"
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
                :current-page="operationalCurrentPage"
                :per-page="operationalPerPage"
                :filter="operationalFilter"
                :filterIncludedFields="operationalFilterOn"
                :sort-by.sync="operationalSortBy"
                :sort-desc.sync="operationalSortDesc"
                :sort-direction="operationalSortDirection"
                @filtered="operationalOnFiltered"
                id="operational-table"
                bordered
                hover
                :table-variant="primary"
                :fields="operationalFields"
                :items="this.reportContent.operational.operationalEvents"
              >
                <!-- date -->
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
                <!-- edit -->
                <template v-slot:cell(edit)="data">
    <p>data.item: {{ data.item }}</p>

                  <img
                    id="topright"
                    src="../assets/edit-logo.png"
                    alt="pas aan"
                    @click="
                      changeEventClick(
                        String(data.item.id),
                        data.item.listName,
                        'Operational'
                      )
                    "
                  />
                </template>
                <!-- plNumber -->
                <template v-slot:cell(plNumber)="data">
                  <span
                    class="card-text badge badge-primary mr-1"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="PL-nummer"
                    >{{ data.item.plNumber }}</span
                  >
                </template>
                <!-- unit -->
                <template v-slot:cell(unit)="data">
                  <span
                    class="card-text badge badge-secondary"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Eenheid"
                    >{{ data.item.unit }}</span
                  >
                </template>
                <!-- type -->
                <template v-slot:cell(type)="data">
                  <div v-if="!(data.item.eventTypes == null)">
                    <div v-for="type in data.item.eventTypes" :key="type.id">
                      <h5 class="card-text">
                        <div v-if="!(type.operationalType == null)">
                          <span class="card-text badge badge-danger mr-1">
                            {{ type.operationalType.typeName }}
                          </span>
                          <span v-if="!(type.operationalSubtype == null)">
                            <span class="card-text badge badge-danger">
                              {{ type.operationalSubtype.typeName }}
                            </span>
                          </span>
                        </div>
                      </h5>
                    </div>
                  </div>
                </template>
              </b-table>
              <b-pagination
                v-model="operationalCurrentPage"
                :total-rows="
                  this.reportContent.operational.operationalEvents.length
                "
                :per-page="operationalPerPage"
                aria-controls="operational-table"
              ></b-pagination>
            </div>
          </template>
        </div>
      </section>
      <!-- Workforce -->
      <section v-if="step == 'Workforce'" class="container">
        <!-- Filter types -->
        <div class="filter-select mt-4">
          <treeselect
            placeholder="Kies filters"
            v-model="selectedTypes.workplaceTypes"
            :multiple="true"
            :options="administrativeOptions"
            valueConsistsOf="ALL"
          />
        </div>
        <div
          v-if="
            Object.keys(reportContent.administrative.workplaceEvents).length ===
              0 &&
              Object.keys(reportContent.administrative.secretariatNotifications)
                .length === 0
          "
        >
          <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
        </div>
        <div v-else>
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
                    <b-button
                      :disabled="!administrativeFilter"
                      @click="administrativeFilter = ''"
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

          <b-table
            v-if="loaded"
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
              this.reportContent.administrative.workplaceEvents.concat(
                this.reportContent.administrative.secretariatNotifications
              )
            "
          >
            <!-- date -->
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
            <!-- edit -->
            <template v-slot:cell(edit)="data">
    <p>data.item: {{ data.item }}</p>

              <img
                id="topright"
                src="../assets/edit-logo.png"
                alt="pas aan"
                @click="
                  changeEventClick(
                    String(data.item.id),
                    data.item.listName,
                    'Workforce'
                  )
                "
              />
            </template>
            <!-- type -->
            <template v-slot:cell(type)="data">
              <span class="card-text badge badge-danger">
                {{ getType(data.item.id, data.item.listName) }}</span
              >
            </template>
          </b-table>
          <b-pagination
            v-model="administrativeCurrentPage"
            :total-rows="
              this.reportContent.administrative.workplaceEvents.length +
                this.reportContent.administrative.secretariatNotifications
                  .length
            "
            :per-page="administrativePerPage"
            aria-controls="administrative-table"
          ></b-pagination>
        </div>
      </section>
      <!-- Technical -->
      <section v-if="step == 'Technical'" class="container">
        <!-- Filter types -->
        <div class="filter-select mt-4">
          <treeselect
            placeholder="Kies filters"
            v-model="selectedTypes.defectTypes"
            :multiple="true"
            :options="defectOptions"
            valueConsistsOf="ALL"
          />
        </div>
        <div
          v-if="
            Object.keys(reportContent.technical.defects).length === 0 &&
              Object.keys(reportContent.technical.malfunctions).length === 0
          "
        >
          <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
        </div>
        <div v-else>
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
                      v-model="defectFilter"
                      type="search"
                      id="filterInput"
                      placeholder="Type om te zoeken"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button
                        :disabled="!defectFilter"
                        @click="defectFilter = ''"
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

            <b-table
              v-if="loaded"
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
                this.reportContent.technical.defects.concat(
                  this.reportContent.technical.malfunctions
                )
              "
            >
              <!-- date -->
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
              <!-- delete -->
              <template v-slot:cell(delete)="data">
                <button
                  class="btn btn-primary btn-sm"
                  @click="removeClicked(data.item.id, data.item.listName)"
                >
                  🗑
                </button>
              </template>
              <!-- edit -->
              <template v-slot:cell(edit)="data">
                <img
                  id="topright"
                  src="../assets/edit-logo.png"
                  alt="pas aan"
                  @click="
                    changeEventClick(
                      String(data.item.id),
                      data.item.listName,
                      'Technical'
                    )
                  "
                />
              </template>
              <!-- type -->
              <template v-slot:cell(type)="data">
                <span class="card-text badge badge-danger">
                  {{ getType(data.item.id, data.item.listName) }}</span
                >
              </template>
            </b-table>
            <b-pagination
              v-model="defectCurrentPage"
              :total-rows="
                this.reportContent.technical.defects.length +
                  this.reportContent.technical.malfunctions.length
              "
              :per-page="defectPerPage"
              aria-controls="defect-table"
            ></b-pagination>
          </div>
        </div>
      </section>
    </div>
    <div v-else>
      <h2>Dit verslag bestaat niet</h2>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import BootstrapVue from "bootstrap-vue";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
Vue.use(BootstrapVue);

export default Vue.extend({
  data: function() {
    return {
      loaded: false,
      operationalValues: [],
      operationalOptions: [
        {
          id: "types",
          label: "Types",
          children: [{ id: "", label: "" }],
        },
      ],
      pageOptions: [5, 10, 15],
      operationalTotalRows: 1,
      operationalCurrentPage: 1,
      operationalPerPage: 5,
      operationalSortBy: "date",
      operationalSortDesc: true,
      operationalSortDirection: "asc",
      operationalFilter: null,
      operationalFilterOn: [],
      operationalFields: [
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
          label: "Signalering",
          key: "signaling",
          sortable: false,
        },
        {
          label: "Locatie",
          key: "location",
          sortable: false,
        },
        {
          label: "Type",
          key: "type",
          sortable: true,
        },
        {
          label: "Eenheid",
          key: "unit",
          sortable: true,
        },
        {
          label: "PL-nummer",
          key: "plNumber",
          sortable: false,
        },
        {
          label: "Gebeurtenis aanpassen",
          key: "edit",
          sortable: "false",
        },
      ],
      administrativeValues: [],
      administrativeOptions: [
        {
          id: "types",
          label: "Types",
          children: [
            {
              id: "secretariatNotification",
              label: "Melding aan secretariaat",
            },
          ],
        },
      ],
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
          label: "Gebeurtenis aanpassen",
          key: "edit",
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
          label: "Gebeurtenis aanpassen",
          key: "edit",
        },
      ],

      defectOptions: [
        {
          id: "defect",
          label: "Logistiek",
          children: [{ id: "", label: "" }],
        },
        {
          id: "malfunction",
          label: "Technisch",
          children: [{ id: "", label: "" }],
        },
      ],

      reportTypes: {
        operationalTypes: [{ typeName: "", id: 0 }],
        workplaceTypes: [{ typeName: "", id: 0 }],
        defectTypes: [{ typeName: "", id: 0 }],
        malfunctionTypes: [{ typeName: "", id: 0 }],
      },
      selectedTypes: {
        operationalTypes: [] as any[],
        workplaceTypes: [] as any[],
        defectTypes: [] as any[],
        malfunctionTypes: [] as any[],
      },

      interval: 0,
      step: "Operational",
      reportContent: {
        report: {
          id: 3,
          date: "",
          temporary: false,
          nightShift: true,
          createdAt: "",
          updatedAt: "",
        },
        operational: {
          operationalEvents: [
            {
              id: 5,
              authorId: 1,
              operationalId: 11,
              signaling: "",
              plNumber: "",
              description: "",
              priority: true,
              location: null,
              unit: "",
              date: "",
              createdAt: "",
              updatedAt: "",
              eventTypes: [
                {
                  id: 2,
                  operationalEventId: 5,
                  operationalTypeId: 1,
                  operationalSubtypeId: null,
                  createdAt: "",
                  updatedAt: "",
                  operationalType: {
                    id: 1,
                    typeName: "",
                    createdAt: "",
                    updatedAt: "",
                  },
                  operationalSubtype: null,
                },
              ],
              listName: "",
            },
          ],
        },
        administrative: {
          workplaceEvents: [
            {
              id: 8,
              authorId: 1,
              administrativeId: 2,
              workplaceTypeId: 2,
              workplaceSubtypeId: 0,
              description: "",
              absentee: "",
              substitute: "",
              monitoring: true,
              date: "",
              createdAt: "",
              updatedAt: "",
              workplaceType: {
                id: 2,
                typeName: "",
                createdAt: "",
                updatedAt: "",
              },
              workplaceSubtype: null,
              listName: "",
            },
          ],
          secretariatNotifications: [
            {
              id: 5,
              authorId: 1,
              administrativeId: 2,
              description: "",
              monitoring: true,
              date: "",
              createdAt: "",
              updatedAt: "",
              listName: "",
            },
          ],
        },
        technical: {
          defects: [
            {
              id: 2,
              authorId: 1,
              technicalId: 2,
              defectTypeId: 1,
              defectSubtypeId: 1,
              description: "",
              monitoring: false,
              date: "",
              createdAt: "",
              updatedAt: "",
              defectType: {
                id: 1,
                typeName: "",
                createdAt: "",
                updatedAt: "",
              },
              defectSubtype: {
                id: 1,
                defectTypeId: 1,
                typeName: "",
                description: "",
                createdAt: "",
                updatedAt: "",
              },
              listName: "",
            },
            {
              id: 3,
              authorId: 1,
              technicalId: 2,
              defectTypeId: 1,
              defectSubtypeId: 1,
              description: "",
              monitoring: true,
              date: "",
              createdAt: "",
              updatedAt: "",
              defectType: {
                id: 1,
                typeName: "",
                createdAt: "",
                updatedAt: "",
              },
              defectSubtype: {
                id: 1,
                defectTypeId: 1,
                typeName: "",
                description: "",
                createdAt: "",
                updatedAt: "",
              },
              listName: "",
            },
          ],
          malfunctions: [
            {
              id: 2,
              authorId: 1,
              technicalId: 2,
              malfunctionTypeId: 1,
              malfunctionSubtypeId: 1,
              description: "",
              monitoring: true,
              date: "",
              duration: "",
              createdAt: "",
              updatedAt: "",
              malfunctionType: {
                id: 1,
                typeName: "",
                createdAt: "",
                updatedAt: "",
              },
              malfunctionSubtype: {
                id: 1,
                malfunctionTypeId: 1,
                typeName: "",
                description: "",
                createdAt: "",
                updatedAt: "",
              },
              listName: "",
            },
          ],
        },
      },

      priorityContent: {
        operational: {
          operationalEvents: {},
        },
      },
      notificationContent: {
        administrative: {
          workplaceEvents: {},
          secretariatNotifications: {},
        },
        technical: {
          defects: {},
          malfunctions: {},
        },
      },
      shift: "",
    };
  },

  components: {
    Treeselect,
  },

  watch: {
    reportContent: function() {
      this.loadPriority();
      this.setShift();
      for (let i = 0; i < this.reportContent.operational.operationalEvents.length; i++) {
        if (this.reportContent.operational.operationalEvents[i] != null)
          (this.reportContent.operational.operationalEvents[i] as any).listName = "OperationalEvents";
      }

      for (let i = 0; i < this.reportContent.administrative.secretariatNotifications.length; i++) {
        if (this.reportContent.administrative.secretariatNotifications[i] != null)
          (this.reportContent.administrative.secretariatNotifications[i] as any).listName = "SecretariatNotifications";
      }

      for (let i = 0; i < this.reportContent.administrative.workplaceEvents.length; i++) {
        if (this.reportContent.administrative.workplaceEvents[i] != null)
          (this.reportContent.administrative.workplaceEvents[i] as any).listName = "WorkplaceEvents";
      }

      for (let i = 0; i < this.reportContent.technical.defects.length; i++) {
        if (this.reportContent.technical.defects[i] != null)
          (this.reportContent.technical.defects[i] as any).listName = "Defects";
      }

      for (let i = 0; i < this.reportContent.technical.malfunctions.length; i++) {
        if (this.reportContent.technical.malfunctions[i] != null)
          (this.reportContent.technical.malfunctions[i] as any).listName = "Malfunctions";
      }

      this.loaded = true;
    },
    priorityContent: function() {
      this.loadNotifications();
    },
    reportTypes: function() {
      this.getTypes();
    },
    selectedTypes: {
      handler() {
        const changedTypes = JSON.parse(JSON.stringify(this.selectedTypes));
        for (let i = 0; i < this.reportTypes.malfunctionTypes.length; i++) {
          const index = changedTypes.defect.indexOf(
            this.reportTypes.malfunctionTypes[i].typeName
          );
          if (index !== -1) {
            changedTypes.malfunction.push(this.selectedTypes.defectTypes[index]);
          }
        }
        const changedDefects = changedTypes.defect.filter(
          (x: any) => !changedTypes.malfunction.includes(x)
        );
        changedTypes.defect = changedDefects;
        ReportingService.getFilteredEvents(
          {
            selectedTypes: changedTypes,
          },
          Number(this.$route.query.reportId)
        ).then((res) => (this.reportContent = res));
      },
      deep: true,
    },
  },

  mounted() {
    this.loadData();
    this.selectedTypes = this.reportTypes;
    // this.interval = window.setInterval(this.loadData, 5000);
  },

  methods: {
    getTypes() {
      this.operationalOptions[0].children.pop();
      for (let i = 0; i < this.reportTypes.operationalTypes.length; i++) {
        this.operationalOptions[0].children.push({
          id: this.reportTypes.operationalTypes[i].typeName as string,
          label: this.reportTypes.operationalTypes[i].typeName as string,
        });
      }
      for (let i = 0; i < this.reportTypes.workplaceTypes.length; i++) {
        this.administrativeOptions[0].children.push({
          id: this.reportTypes.workplaceTypes[i].typeName as string,
          label: this.reportTypes.workplaceTypes[i].typeName as string,
        });
      }
      this.defectOptions[0].children.pop();
      for (let i = 0; i < this.reportTypes.defectTypes.length; i++) {
        this.defectOptions[0].children.push({
          id: this.reportTypes.defectTypes[i].typeName as string,
          label: this.reportTypes.defectTypes[i].typeName as string,
        });
      }
      this.defectOptions[1].children.pop();
      for (let i = 0; i < this.reportTypes.malfunctionTypes.length; i++) {
        this.defectOptions[1].children.push({
          id: this.reportTypes.malfunctionTypes[i].typeName as string,
          label: this.reportTypes.malfunctionTypes[i].typeName as string,
        });
      }
    },
    loadData: async function() {
      await ReportingService.getAllReports("/api/statistics/types").then(
        (res) => (this.reportTypes = res)
      );

      await ReportingService.getAllReports(
        "/api/reports/content/" + String(this.$route.query.reportId)
      ).then((res) => (this.reportContent = res));
    },

    selectAll: function(section: string) {
      const checks = document.querySelectorAll(
        "#" + section + ' input[type="checkbox"]'
      );

      const parent = document.getElementById(
        section + "Parent"
      ) as HTMLInputElement;
      const status = parent.checked;

      for (let i = 0; i < checks.length; i++) {
        const check = checks[i] as HTMLInputElement;
        if (check.checked != status) check.click();
      }
    },

    allTrue: function(section: string) {
      const checks = document.querySelectorAll(
        "#" + section + ' input[type="checkbox"]'
      );

      for (let i = 0; i < checks.length; i++) {
        const check = checks[i] as HTMLInputElement;
        check.checked = true;
      }
    },

    selectAllSections: function() {
      this.allTrue("operational");
      this.allTrue("workplace");
      this.allTrue("defect");
      this.allTrue("malfunction");
    },

    setShift: function() {
      if (this.reportContent.report != null) {
        if (this.reportContent.report.nightShift != null) {
          if (this.reportContent.report.nightShift) this.shift = "Nachtshift ☾";
          else this.shift = "Dagshift 🌣";
        }
      }
    },

    loadPriority: function() {
      ReportingService.getAllReports(
        "/api/reports/priority/" + String(this.$route.query.reportId)
      ).then((res) => (this.priorityContent = res));
    },
    loadNotifications: function() {
      ReportingService.getAllReports(
        "/api/reports/notifications/" + String(this.$route.query.reportId)
      ).then((res) => (this.notificationContent = res));
    },

    getOperational: function() {
      if (this.step != "Operational") {
        this.step = "Operational";
        const operationalButton = document.getElementById("operationalButton")!;
        const workForceButton = document.getElementById("workForceButton")!;
        const technicalButton = document.getElementById("technicalButton")!;
        operationalButton.classList.replace("btn-primary", "btn-info");
        workForceButton.classList.replace("btn-info", "btn-primary");
        technicalButton.classList.replace("btn-info", "btn-primary");
      }
    },
    getWorkforce: function() {
      if (this.step != "Workforce") {
        this.step = "Workforce";
        const operationalButton = document.getElementById("operationalButton")!;
        const workForceButton = document.getElementById("workForceButton")!;
        const technicalButton = document.getElementById("technicalButton")!;
        operationalButton.classList.replace("btn-info", "btn-primary");
        workForceButton.classList.replace("btn-primary", "btn-info");
        technicalButton.classList.replace("btn-info", "btn-primary");
      }
    },
    getTechnical: function() {
      if (this.step != "Technical") {
        this.step = "Technical";
        const operationalButton = document.getElementById("operationalButton")!;
        const workForceButton = document.getElementById("workForceButton")!;
        const technicalButton = document.getElementById("technicalButton")!;
        operationalButton.classList.replace("btn-info", "btn-primary");
        workForceButton.classList.replace("btn-info", "btn-primary");
        technicalButton.classList.replace("btn-primary", "btn-info");
      }
    },
    changeEventClick: function(id: string, subcat: string, categorie: string) {
      this.$router.push({
        path: "changeEvent",
        query: {
          reportId: String(0),
          eventId: String(id),
          categorie: categorie,
          subcategorie: String(subcat),
        },
      });
    },
    getType: function(id: number, list: string) {
      if (
        this.reportContent.administrative.workplaceEvents !== [] &&
        list == "WorkplaceEvent"
      ) {
        for (
          let i = 0;
          i < this.reportContent.administrative.workplaceEvents.length;
          i++
        ) {
          if (
            this.reportContent.administrative.workplaceEvents[i] !== null &&
            this.reportContent.administrative.workplaceEvents[i].id == id
          ) {
            return this.reportContent.administrative.workplaceEvents[i]
              .workplaceType.typeName;
          }
        }
      }
      if (
        this.reportContent.administrative.secretariatNotifications !== [] &&
        list == "SecretariatNotification"
      ) {
        for (
          let i = 0;
          i < this.reportContent.administrative.secretariatNotifications.length;
          i++
        ) {
          if (
            this.reportContent.administrative.secretariatNotifications[i] !==
            null
          ) {
            return "Melding aan secretariaat";
          }
        }
      }
      if (this.reportContent.technical.defects !== [] && list == "Defect") {
        for (let i = 0; i < this.reportContent.technical.defects.length; i++) {
          if (
            this.reportContent.technical.defects[i] !== null &&
            this.reportContent.technical.defects[i].id == id
          ) {
            return (
              "Logistiek: " +
              this.reportContent.technical.defects[i].defectType.typeName
            );
          }
        }
      }
      if (
        this.reportContent.technical.malfunctions !== [] &&
        list == "Malfunction"
      ) {
        for (
          let i = 0;
          i < this.reportContent.technical.malfunctions.length;
          i++
        ) {
          if (
            this.reportContent.technical.malfunctions[i] !== null &&
            this.reportContent.technical.malfunctions[i].id == id
          ) {
            return (
              "Technisch: " +
              this.reportContent.technical.malfunctions[i].malfunctionType
                .typeName
            );
          }
        }
      }
    },
  },
  beforeDestroy: function() {
    window.clearInterval(this.interval);
  },
});
</script>

<style scoped>
.card {
  display: inline-block;
}

#topright {
  height: 30px;
  width: 30px;
}
</style>
