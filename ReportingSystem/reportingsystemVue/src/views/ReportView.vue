<template>
  <div class="reportview">
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
      <div class="row my-5">
        <!-- Operationeel met prioriteit -->
        <div class="col">
          <div class="card w-100">
            <div class="card-header bg-primary text-white">
              Operationeel met prioriteit
            </div>
            <div class="card-body">
              <div
                v-if="
                  Object.keys(priorityContent.operational.operationalEvents)
                    .length === 0
                "
              >
                <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
              </div>
              <div v-else class="row row-cols-1">
                <div
                  v-for="event in priorityContent.operational.operationalEvents"
                  :key="event.id"
                >
                  <div class="col card h-100">
                    <div class="card-body">
                      <h3 class="card-title display-5">
                        {{
                          new Date(event.date).toLocaleString("nl-BE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        }}
                      </h3>
                      <p class="card-text">{{ event.signaling }}</p>
                      <p class="card-text">{{ event.description }}</p>
                      <p class="card-text">{{ event.location }}</p>
                      <h5>
                        <span
                          class="card-text badge badge-primary mr-1"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="PL-nummer"
                          >{{ event.plNumber }}</span
                        >
                        <span
                          class="card-text badge badge-danger"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Eenheid"
                          >{{ event.unit }}</span
                        >
                      </h5>

                      <div v-if="!event.eventTypes === null">
                        <div v-for="type in event.eventTypes" :key="type.id">
                          <h5 class="card-text">
                            <div v-if="!(type.operationalType === null)">
                              <span
                                class="card-text badge badge-secondary mr-1"
                                >{{ type.operationalType.typeName }}</span
                              >
                              <span v-if="!(type.operationalSubtype === null)">
                                <span class="card-text badge badge-secondary">
                                  {{ type.operationalSubtype.typeName }}
                                </span>
                              </span>
                            </div>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Meldingen -->
        <div class="col">
          <div class="card w-100">
            <div class="card-header bg-primary text-white">Meldingen</div>
            <div class="card-body">
              <div
                v-if="
                  Object.keys(
                    notificationContent.administrative.workplaceEvents
                  ).length === 0 &&
                    Object.keys(
                      notificationContent.administrative
                        .secretariatNotifications
                    ).length === 0 &&
                    Object.keys(notificationContent.technical.defects)
                      .length === 0 &&
                    Object.keys(notificationContent.technical.malfunctions)
                      .length === 0
                "
              >
                <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
              </div>
              <div v-else class="row row-cols-1">
                <div
                  v-for="event in notificationContent.administrative
                    .workplaceEvents"
                  :key="event.id"
                >
                  <div
                    v-if="!(Object.keys(event) === 0)"
                    class="col card h-100"
                  >
                    <div class="card-body">
                      <h5 class="card-title">Voorval tijdens de dienst</h5>
                      <h5 class="card-text">
                        {{
                          new Date(event.date).toLocaleString("nl-BE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        }}
                      </h5>
                      <p class="card-text">{{ event.description }}</p>
                      <p class="card-text">
                        {{ event.absentee }} vervangen door
                        {{ event.substitute }}
                      </p>
                      <div v-if="!(event.workplaceType == null)">
                        <h5 class="card-text">
                          <span class="card-text badge badge-secondary mr-1">{{
                            event.workplaceType.typeName
                          }}</span>
                          <span v-if="!(event.workplaceSubtype == null)">
                            <span class="card-text badge badge-secondary">{{
                              event.workplaceSubtype.typeName
                            }}</span>
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-for="event in notificationContent.administrative
                    .secretariatNotifications"
                  :key="event.id"
                >
                  <div class="col card h-100">
                    <div class="card-body">
                      <h5 class="card-title display-5">
                        {{
                          new Date(event.date).toLocaleString("nl-BE", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })
                        }}
                      </h5>
                      <p class="card-text">{{ event.signaling }}</p>
                      <h5>
                        <span
                          class="card-text badge badge-primary"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="PL-nummer"
                          >{{ event.plNumber }}</span
                        >
                        <span
                          class="card-text badge badge-danger"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Eenheid"
                          >{{ event.unit }}</span
                        >
                      </h5>
                      <p class="card-text">{{ event.description }}</p>
                      <p class="card-text">{{ event.location }}</p>
                      <h5></h5>
                    </div>
                  </div>
                </div>

                <div
                  v-for="event in notificationContent.technical.defects"
                  :key="event.id"
                >
                  <div class="col card h-100">
                    <div class="card-body">
                      <h5 class="card-title">Logistiek</h5>
                      <h5 class="card-text">
                        {{
                          new Date(event.date).toLocaleString("nl-BE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        }}
                      </h5>
                      <p class="card-text">{{ event.description }}</p>
                      <div v-if="!(event.defectType == null)">
                        <h5 class="card-text">
                          <span class="card-text badge badge-secondary mr-1">
                            {{ event.defectType.typeName }}
                          </span>
                          <span v-if="!(event.defectSubtype == null)">
                            <span class="card-text badge badge-secondary">
                              {{ event.defectSubtype.typeName }}
                            </span>
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-for="event in notificationContent.technical.malfunctions"
                  :key="event.id"
                >
                  <div class="col card h-100">
                    <div class="card-body">
                      <h5 class="card-title">Technisch</h5>
                      <h5 class="card-text">
                        {{
                          new Date(event.date).toLocaleString("nl-BE", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        }}
                      </h5>
                      <p class="card-text">{{ event.description }}</p>
                      <p class="card-text">{{ event.duration }}</p>
                      <div v-if="!(event.malfunctionType == null)">
                        <h5 class="card-text">
                          <span class="card-text badge badge-secondary mr-1">
                            {{ event.malfunctionType.typeName }}
                          </span>
                          <span v-if="!(event.malfunctionSubtype == null)">
                            <span class="card-text badge badge-secondary">
                              {{ event.malfunctionSubtype.typeName }}
                            </span>
                          </span>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        <div class="filter-select">
          <treeselect
            placeholder="Kies filters"
            v-model="selectedTypes.operational"
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

                <template v-slot:cell(plNumber)="data">
                  <span
                    class="card-text badge badge-primary mr-1"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="PL-nummer"
                    >{{ data.item.plNumber }}</span
                  >
                </template>
                <template v-slot:cell(unit)="data">
                  <span
                    class="card-text badge badge-danger"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Eenheid"
                    >{{ data.item.unit }}</span
                  >
                </template>
                <template v-slot:cell(edit)="data">
                  <img
                    id="topright"
                    src="../assets/edit-logo.png"
                    alt="pas aan"
                    @click="
                      changeEventClick(
                        String(data.item.id),
                        'operationalEvents'
                      )
                    "
                  />
                </template>
                <template v-slot:cell(type)="data">
                  <div v-if="!(data.item.eventTypes == null)">
                    <div v-for="type in data.item.eventTypes" :key="type.id">
                      <h5 class="card-text">
                        <div v-if="!(type.operationalType == null)">
                          <span class="card-text badge badge-secondary mr-1">
                            {{ type.operationalType.typeName }}
                          </span>
                          <span v-if="!(type.operationalSubtype == null)">
                            <span class="card-text badge badge-secondary">
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
        <div class="filter-select">
          <treeselect
            placeholder="Kies filters"
            v-model="selectedTypes.workplaceevent"
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
                  this.reportContent.administrative.secretariatNotifications.length
              "
              :per-page="administrativePerPage"
              aria-controls="administrative-table"
            ></b-pagination>
          </div>
        
      </section>
      <!-- Technical -->
      <section v-if="step == 'Technical'" class="container">
        <!-- Filter types -->
        <div v-if="Object.keys(reportTypes).length === 0">
          <p>Er zijn nog geen types</p>
        </div>
        <form v-else id="typeSelector" class="col-md-12">
          <div class="text-sm-left">
            <input
              type="checkbox"
              id="defectParent"
              @change="selectAll('defect')"
            />
            <label>
              <h5>Logistiek</h5>
            </label>
            <div class="checkbox-container text-sm-left col-sm-7">
              <div
                v-for="value in this.reportTypes.defectTypes"
                :key="value.id"
              >
                <div class="typecontainer text-lg-left" id="defect">
                  <input
                    type="checkbox"
                    id="defect"
                    :value="value.typeName"
                    v-model="selectedTypes.defect"
                  />
                  <label>{{ value.typeName }}</label>
                </div>
              </div>
            </div>

            <input
              type="checkbox"
              id="malfunctionParent"
              @change="selectAll('malfunction')"
            />
            <label>
              <h5>Technisch</h5>
            </label>
            <div class="checkbox-container text-sm-left col-sm-7">
              <div
                v-for="value in this.reportTypes.malfunctionTypes"
                :key="value.id"
              >
                <div class="typecontainer text-lg-left" id="malfunction">
                  <input
                    type="checkbox"
                    id="malfunction"
                    :value="value.typeName"
                    v-model="selectedTypes.malfunction"
                  />
                  <label>{{ value.typeName }}</label>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div
          v-if="
            Object.keys(reportContent.technical.defects).length === 0 &&
              Object.keys(reportContent.technical.malfunctions).length === 0
          "
        >
          <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
        </div>
        <div v-else class="row row-cols-1 row-cols-md-2">
          <!-- Change form -->
          <div v-for="event in reportContent.technical.defects" :key="event.id">
            <div class="col card h-100">
              <p class="card-text">
                <img
                  id="topright"
                  src="../assets/edit-logo.png"
                  alt="pas aan"
                  @click="changeEventClick(String(event.id), 'defects')"
                />
              </p>
              <div class="card-body">
                <h5 class="card-title">Logistiek</h5>
                <h5 class="card-text">
                  {{
                    new Date(event.date).toLocaleString("nl-BE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </h5>
                <p class="card-text">{{ event.description }}</p>
                <div v-if="!(event.defectType == null)">
                  <h5 class="card-text">
                    <span class="card-text badge badge-secondary mr-1">
                      {{ event.defectType.typeName }}
                    </span>
                    <span v-if="!(event.defectSubtype == null)">
                      <span class="card-text badge badge-secondary">
                        {{ event.defectSubtype.typeName }}
                      </span>
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <!-- Change form -->
          <div
            v-for="event in reportContent.technical.malfunctions"
            :key="event.id"
          >
            <div class="col card h-100">
              <p class="card-text">
                <img
                  id="topright"
                  src="../assets/edit-logo.png"
                  alt="pas aan"
                  @click="changeEventClick(String(event.id), 'malfunctions')"
                />
              </p>
              <div class="card-body">
                <h5 class="card-title">Technisch</h5>
                <h5 class="card-text">
                  {{
                    new Date(event.date).toLocaleString("nl-BE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }}
                </h5>
                <p class="card-text">{{ event.description }}</p>
                <p class="card-text">{{ event.duration }}</p>
                <div v-if="!(event.malfunctionType == null)">
                  <h5 class="card-text">
                    <span class="card-text badge badge-secondary mr-1">
                      {{ event.malfunctionType.typeName }}
                    </span>
                    <span v-if="!(event.malfunctionSubtype == null)">
                      <span class="card-text badge badge-secondary">
                        {{ event.malfunctionSubtype.typeName }}
                      </span>
                    </span>
                  </h5>
                </div>
              </div>
            </div>
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
          children: [],
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
              label: "Melding aan secretariaat"
          }],
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

      reportTypes: {
        operationalTypes: [{ typeName: "", id: 0 }],
        workplaceTypes: [{ typeName: "", id: 0 }],
        defectTypes: [{ typeName: "", id: 0 }],
        malfunctionTypes: [{ typeName: "", id: 0 }],
      },
      selectedTypes: {
        operational: [],
        workplaceevent: [],
        defect: [],
        malfunction: [],
      },

      interval: 0,
      step: "Operational",
      reportContent: {
        report: {
          id: 1,
          date: "2020-03-16T21:13:48.000Z",
          temporary: false,
          nightShift: true,
          createdAt: "",
          updatedAt: "",
        },
        operational: {
          operationalEvents: {},
        },
        administrative: {
          workplaceEvents: {},
          secretariatNotifications: {},
        },
        technical: {
          defects: {},
          malfunctions: {},
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
      for (
          let i = 0;
          i < this.reportContent.administrative.secretariatNotifications.length;
          i++
        ) {
          if(this.reportContent.administrative.secretariatNotifications[i] != null)
            (this.reportContent.administrative.secretariatNotifications[i] as any).listName = "SecretariatNotification";
          
        }
        for (
          let i = 0;
          i < this.reportContent.administrative.workplaceEvents.length;
          i++
        ) {
          if(this.reportContent.administrative.workplaceEvents[i] != null)
            (this.reportContent.administrative.workplaceEvents[i] as any).listName = "WorkplaceEvent";
        }

        for (
          let i = 0;
          i < this.reportContent.technical.defects.length;
          i++
        ) {
          if(this.reportContent.technical.defects[i] != null)
            (this.reportContent.technical.defects[i] as any).listName = "Defect";
        }

        for (
          let i = 0;
          i < this.reportContent.technical.malfunctions.length;
          i++
        ) {
          if(this.reportContent.technical.malfunctions[i] != null)
            (this.reportContent.technical.malfunctions[i] as any).listName = "Malfunction";
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
        ReportingService.getFilteredEvents(
          {
            selectedTypes: this.selectedTypes,
          },
          Number(this.$route.query.reportId)
        ).then((res) => (this.reportContent = res));
      },
      deep: true,
    },
  },

  mounted() {
    this.loadData();
    // this.interval = window.setInterval(this.loadData, 5000);
  },

  methods: {
    getTypes() {
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
    changeEventClick: function(id: string, subcat: string) {
      this.$router.push({
        path: "changeEvent",
        query: {
          reportId: String(this.reportContent.report.id),
          eventId: String(id),
          categorie: String(this.step),
          subcategorie: String(subcat),
        },
      });
      this.selectAllSections();
    },
    getType: function(id:string, list:string){
      if(this.reportContent.administrative.workplaceEvents !== [] && list == "WorkplaceEvent"){
        for (let i = 0; i < this.reportContent.administrative.workplaceEvents.length; i++) {
          if(this.reportContent.administrative.workplaceEvents[i] !== null && this.reportContent.administrative.workplaceEvents[i].id == id){
            return this.reportContent.administrative.workplaceEvents[i].workplaceType.typeName;
          }
          
        }
      }
      if(this.reportContent.administrative.secretariatNotifications !== [] && list == "SecretariatNotification"){
        for (let i = 0; i < this.reportContent.administrative.secretariatNotifications.length; i++) {
          if(this.reportContent.administrative.secretariatNotifications[i] !== null){
            return "Melding aan secretariaat";
          }
          
        }
      }
      if(this.reportContent.technical.defects !== [] && list == "Defect"){
        for (let i = 0; i < this.reportContent.technical.defects.length; i++) {
          if(this.reportContent.technical.defects[i] !== null && this.reportContent.technical.defects[i].id == id){
            return "Logistiek: " + this.reportContent.technical.defects[i].defectType.typeName;
          }
          
        }
      }
      if(this.reportContent.technical.malfunctions !== [] && list == "Malfunction"){
        for (let i = 0; i < this.reportContent.technical.malfunctions.length; i++) {
          if(this.reportContent.technical.malfunctions[i] !== null && this.reportContent.technical.malfunctions[i].id == id){
            return "Technisch: " + this.reportContent.technical.malfunctions[i].malfunctionType.typeName;
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
