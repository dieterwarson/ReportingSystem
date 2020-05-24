<template>
  <div class="container pt-5 pb-5">
    <h1>Wijzig gebeurtenis</h1>
    <span>Types: {{ operationalTypeSelected.selectedTypes }}</span>
    <span>Subtypes: {{ operationalTypeSelected.selectedSubtypes }}</span>
    <form id="changeOperationalEvent">
      <!-- Operational -->
      <fieldset v-if="categorie == 'Operational'">
        <h3 id="smalltitle">Operationeel</h3>
        <!-- OperationalEvents -->
        <section v-if="subcategorie == 'operationalEvents'">
          <h4 id="smalltitle">Operationele gebeurtenis</h4>
          <div class="row">
            <!-- Checkboxes types -->
            <div>
              <div v-if="(Object.keys(reportTypes).length === 0)">
                <p>Er zijn nog geen types</p>
              </div>
              <form v-else id="typeSelector">
                <div class="text-sm-left">
                  <input type="checkbox" id="operationalParent" @change="selectAllOperational" />
                  <label>
                    <h5>Operationeel</h5>
                  </label>
                  <div class="checkbox-container text-sm-left col-sm-4">
                    <!-- Types -->
                    <div v-for="type in reportTypes.operationalTypes" :key="type.id">
                      <div class="typecontainer text-lg-left" id="operational">
                        <input
                          type="checkbox"
                          :id="type.typeName"
                          :value="type.typeName"
                          v-model="operationalTypeSelected.selectedTypes"
                          @change="removeSubtypes(type.id)"
                        />
                        <label>{{ type.typeName }}</label>
                      </div>
                      <!-- Subtypes -->
                      <div v-for="subtype in reportTypes.operationalSubtypes" :key="subtype.id">
                        <div v-if="subtype.operationalTypeId == type.id">
                          <div class="subtypecontainer text-lg-left" id="operational">
                            <input
                              type="checkbox"
                              :id="type.typeName"
                              :value="subtype.typeName"
                              v-model="operationalTypeSelected.selectedSubtypes"
                              @change="selectOperationalParent(subtype.operationalTypeId)"
                            />
                            <label>{{ subtype.typeName }}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Deselect all button -->
                  <button
                    @click.prevent="uncheckAllOperational(false)"
                    class="btn btn-danger extraMargin"
                  >Deselecteer alles</button>
                </div>
              </form>
            </div>
            <!-- Input fields -->
            <div class="text-sm-left col-lg">
              <div class="input-group" style="height: 20%;">
                <div class="formcontainer btn-block">
                  <!-- PL number -->
                  <div class="form-control form-control-lg no-edit">
                    <div
                      v-if="currentEvent.plNumber == String(null) || currentEvent.plNumber == null || currentEvent.plNumber == ''"
                    >Geen PL-nummer beschikbaar.</div>
                    <div v-else>PL-nummer: {{currentEvent.plNumber}}</div>
                  </div>
                  <!-- Location -->
                  <div class="form-control form-control-lg no-edit">
                    <div
                      v-if="currentEvent.location == String(null) || currentEvent.location == null || currentEvent.location == ''"
                    >Geen adres beschikbaar.</div>
                    <div v-else>Locatie: {{currentEvent.location}}</div>
                  </div>
                  <!-- Date -->
                  <div class="form-control form-control-lg no-edit">
                    <div
                      v-if="currentEvent.date == String(null) || currentEvent.date == null || currentEvent.date == ''"
                    >Geen datum beschikbaar.</div>
                    <div v-else>
                      Datum: {{ new Date(currentEvent.date).toLocaleString("en-BE", {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      })
                      }}
                    </div>
                  </div>
                  <!-- Unit -->
                  <div class="form-control form-control-lg no-edit">
                    <div
                      v-if="currentEvent.unit == String(null) || currentEvent.unit == null || currentEvent.unit == ''"
                    >Geen unit beschikbaar.</div>
                    <div v-else>Unit: {{currentEvent.unit}}</div>
                  </div>
                  <!-- Signaling -->
                  <div class="form-control form-control-lg no-edit">
                    <div
                      v-if="currentEvent.signaling == String(null) || currentEvent.signaling == null || currentEvent.signaling == ''"
                    >Geen signalering beschikbaar.</div>
                    <div v-else>Signalering: {{currentEvent.signaling}}</div>
                  </div>
                  <!-- Extra info -->
                  <div class="form-control form-control-lg no-edit cropped">Extra info: (aanpasbaar)</div>
                  <textarea
                    type="text"
                    class="form-control form-control-lg"
                    v-model="currentEvent.description"
                  ></textarea>
                  <!-- Change event button -->
                  <button
                    class="btn btn-large btn-block btn-success"
                    type="button"
                    @click.prevent="changeOperationalEvent"
                  >Opslaan</button>
                  <small v-if="operationalEventFailed">Er is iets misgegaan bij het aanpassen.</small>
                  <small v-if="operationalEventSucceeded">Het verslag is aangepast.</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      </fieldset>
    </form>

    <form id="changeWorkforce">
      <!-- Personal -->
      <fieldset v-if="categorie == 'Workforce'">
        <h3 id="smalltitle">Personeel</h3>
        <!-- WorkplaceEvents -->
        <section v-if="subcategorie == 'workplaceEvents'">
          <h4 id="smalltitle">Werkplaatsgebeurtenis</h4>
          <div class="row">
            <!-- Checkboxes types -->
            <div>
              <div v-if="(Object.keys(reportTypes).length === 0)">
                <p>Er zijn nog geen types</p>
              </div>
              <form v-else id="typeSelector">
                <div class="text-sm-left">
                  <label>
                    <h5>Logistiek</h5>
                  </label>
                  <div class="checkbox-container text-sm-left col-sm-4">
                    <!-- Types -->
                    <div v-for="type in reportTypes.workplaceTypes" :key="type.id">
                      <div class="typecontainer text-lg-left" id="workplace">
                        <input
                          type="radio"
                          :id="type.typeName"
                          :value="type.typeName"
                          v-model="typeSelected.typeName"
                          @change="deselectSubtype"
                        />
                        <label>{{ type.typeName }}</label>
                      </div>
                      <!-- Subtypess -->
                      <div v-for="subtype in reportTypes.workplaceSubtypes" :key="subtype.id">
                        <div v-if="subtype.workplaceTypeId == type.id">
                          <div class="subtypecontainer text-lg-left" id="workplace">
                            <input
                              type="radio"
                              :id="type.typeName"
                              :value="subtype.typeName"
                              v-model="typeSelected.subtypeName"
                              @change="selectParent(subtype.workplaceTypeId, 'Workplace')"
                            />
                            <label>{{ subtype.typeName }}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Deselect all button -->
                  <button
                    @click.prevent="uncheckAll"
                    class="btn btn-danger extraMargin"
                  >Deselecteer keuze</button>
                </div>
              </form>
            </div>
            <!-- Input fields -->
            <div class="text-sm-left col-lg">
              <div class="input-group" style="height: 20%;">
                <div class="formcontainer btn-block">
                  <!-- Absentee -->
                  <div class="form-control form-control-lg no-edit">
                    <div
                      v-if="currentEvent.absentee == String(null) || currentEvent.absentee == null || currentEvent.absentee == ''"
                    >Geen afwezige beschikbaar.</div>
                    <div v-else>Afwezige: {{currentEvent.absentee}}</div>
                  </div>
                  <!-- Substitute -->
                  <div class="form-control form-control-lg no-edit">
                    <div
                      v-if="currentEvent.substitute == String(null) || currentEvent.substitute == null || currentEvent.substitute == ''"
                    >Geen vervanger beschikbaar.</div>
                    <div v-else>Vervanger: {{currentEvent.substitute}}</div>
                  </div>
                  <!-- Extra info -->
                  <div class="form-control form-control-lg no-edit cropped">Extra info: (aanpasbaar)</div>
                  <textarea
                    type="text"
                    class="form-control form-control-lg"
                    v-model="currentEvent.description"
                  ></textarea>
                  <!-- Change event button -->
                  <button
                    class="btn btn-large btn-block btn-success"
                    type="button"
                    @click.prevent="changeWorkplaceEvent"
                  >Opslaan</button>
                  <small v-if="workplaceEventFailed">Er is iets misgegaan bij het aanpassen.</small>
                  <small v-if="workplaceEventSucceeded">Het verslag is aangepast.</small>
                </div>
              </div>
            </div>
          </div>
        </section>
        <!-- SecretariatNotifications -->
        <section v-else-if="subcategorie == 'secretariatNotifications'">
          <h4 id="smalltitle">Secretariaatmeldingen</h4>
          <div class="row">
            <!-- Input fields -->
            <div class="text-sm-left col-lg">
              <div class="input-group" style="height: 20%;">
                <div class="formcontainer btn-block">
                  <!-- Description -->
                  <div
                    class="form-control form-control-lg no-edit cropped"
                  >Beschrijving gebeurtenis: (aanpasbaar)</div>
                  <textarea
                    type="text"
                    class="form-control form-control-lg"
                    v-model="currentEvent.description"
                  ></textarea>
                  <!-- Change event button -->
                  <button
                    class="btn btn-large btn-block btn-success"
                    type="button"
                    @click.prevent="changeSecretariatNotification"
                  >Opslaan</button>
                  <small
                    v-if="secretariatNotificationFailed"
                  >Er is iets misgegaan bij het aanpassen.</small>
                  <small v-if="secretariatNotificationSucceeded">Het verslag is aangepast.</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      </fieldset>
    </form>

    <form id="changeTechnical">
      <!-- Technical -->
      <fieldset v-if="categorie == 'Technical'">
        <h3 id="smalltitle">Technisch</h3>
        <!-- Defects -->
        <section v-if="subcategorie == 'defects'">
          <h4 id="smalltitle">Defect</h4>
          <div class="row">
            <!-- Checkboxes types -->
            <div>
              <div v-if="(Object.keys(reportTypes).length === 0)">
                <p>Er zijn nog geen types</p>
              </div>
              <form v-else id="typeSelector">
                <div class="text-sm-left">
                  <label>
                    <h5>Technisch</h5>
                  </label>
                  <div class="checkbox-container text-sm-left col-sm-4">
                    <!-- Types -->
                    <div v-for="type in reportTypes.defectTypes" :key="type.id">
                      <div class="typecontainer text-lg-left" id="defect">
                        <input
                          type="radio"
                          :id="type.typeName"
                          :value="type.typeName"
                          v-model="typeSelected.typeName"
                          @change="deselectSubtype"
                        />
                        <label>{{ type.typeName }}</label>
                      </div>
                      <!-- Subtypes -->
                      <div v-for="subtype in reportTypes.defectSubtypes" :key="subtype.id">
                        <div v-if="subtype.defectTypeId == type.id">
                          <div class="subtypecontainer text-lg-left" id="defect">
                            <input
                              type="radio"
                              :id="type.typeName"
                              :value="subtype.typeName"
                              v-model="typeSelected.subtypeName"
                              @change="selectParent(subtype.defectTypeId, 'Defect')"
                            />
                            <label>{{ subtype.typeName }}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Deselect all button -->
                  <button
                    @click.prevent="uncheckAll"
                    class="btn btn-danger extraMargin"
                  >Deselecteer keuze</button>
                </div>
              </form>
            </div>
            <!-- Input fields -->
            <div class="text-sm-left col-lg">
              <!-- Description -->
              <div class="form-control form-control-lg no-edit cropped">Beschrijving: (aanpasbaar)</div>
              <textarea
                type="text"
                class="form-control form-control-lg"
                v-model="currentEvent.description"
              ></textarea>
              <!-- Change event button -->
              <button
                class="btn btn-large btn-block btn-success"
                type="button"
                @click.prevent="changeDefect"
              >Opslaan</button>
              <small v-if="defectFailed">Er is iets misgegaan bij het aanpassen.</small>
              <small v-if="defectSucceeded">Het verslag is aangepast.</small>
            </div>
          </div>
        </section>
        <!-- Malfunctions -->
        <section v-else-if="subcategorie == 'malfunctions'">
          <h4 id="smalltitle">Malfunctie</h4>
          <div class="row">
            <!-- Checkboxes types -->
            <div>
              <div v-if="(Object.keys(reportTypes).length === 0)">
                <p>Er zijn nog geen types</p>
              </div>
              <form v-else id="typeSelector">
                <div class="text-sm-left">
                  <label>
                    <h5>Technisch</h5>
                  </label>
                  <div class="checkbox-container text-sm-left col-sm-4">
                    <!-- Types -->
                    <div v-for="type in reportTypes.malfunctionTypes" :key="type.id">
                      <div class="typecontainer text-lg-left" id="malfunction">
                        <input
                          type="radio"
                          :id="type.typeName"
                          :value="type.typeName"
                          v-model="typeSelected.typeName"
                          @change="deselectSubtype"
                        />
                        <label>{{ type.typeName }}</label>
                      </div>
                      <!-- Subtypes -->
                      <div v-for="subtype in reportTypes.malfunctionSubtypes" :key="subtype.id">
                        <div v-if="subtype.malfunctionTypeId == type.id">
                          <div class="subtypecontainer text-lg-left" id="malfunction">
                            <input
                              type="radio"
                              :id="type.typeName"
                              :value="subtype.typeName"
                              v-model="typeSelected.subtypeName"
                              @change="selectParent(subtype.malfunctionTypeId, 'Malfunction')"
                            />
                            <label>{{ subtype.typeName }}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Deselect all button -->
                  <button
                    @click.prevent="uncheckAll"
                    class="btn btn-danger extraMargin"
                  >Deselecteer keuze</button>
                </div>
              </form>
            </div>
            <!-- Input fields -->
            <div class="text-sm-left col-lg">
              <!-- Description -->
              <div class="form-control form-control-lg no-edit cropped">Beschrijving: (aanpasbaar)</div>
              <textarea
                type="text"
                class="form-control form-control-lg"
                v-model="currentEvent.description"
              ></textarea>
              <!-- Change event button -->
              <button
                class="btn btn-large btn-block btn-success"
                type="button"
                @click="changeMalfunction"
              >Opslaan</button>
              <small v-if="malfunctionFailed">Er is iets misgegaan bij het aanpassen.</small>
              <small v-if="malfunctionSucceeded">Het verslag is aangepast.</small>
            </div>
          </div>
        </section>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
export default Vue.extend({
  data: function() {
    return {
      reportTypes: {
        operationalTypes: [
          {
            id: 0,
            typeName: ""
          }
        ],
        operationalSubtypes: [
          {
            operationalTypeId: 0,
            typeName: ""
          }
        ],
        workplaceTypes: {},
        workplaceSubtypes: {},
        defectTypes: {},
        defectSubtypes: {},
        malfunctionTypes: {},
        malfunctionSubtypes: {}
      },
      operationalTypeSelected: {
        selectedTypes: [] as string[],
        selectedSubtypes: [] as string[]
      },
      typeSelected: {
        typeName: "",
        subtypeName: ""
      },
      currentEvent: {
        id: 0,
        authorId: 0,
        operationalId: 0,
        administrativeId: 0,
        technicalId: 0,
        defectTypeId: 0,
        date: "",
        temporary: false,
        nightShift: true,
        signaling: "",
        plNumber: "",
        description: "",
        priority: null,
        location: "",
        unit: "",
        absentee: "",
        substitute: "",
        monitoring: true,
        createdAt: "",
        updatedAt: ""
      },
      operationalId: 0,
      administrativeId: 0,
      technicalId: 0,
      step: "Operational",
      reportContent: {
        report: {
          id: 0,
          date: "",
          temporary: false,
          nightShift: true,
          createdAt: "",
          updatedAt: ""
        },
        operational: {
          operationalEvents: [
            {
              id: 0,
              authorId: 0,
              operationalId: 0,
              signaling: "",
              plNumber: "",
              description: "",
              priority: null,
              location: "",
              unit: "",
              date: "",
              createdAt: "",
              updatedAt: ""
            }
          ]
        },
        administrative: {
          workplaceEvents: [
            {
              id: 0,
              authorId: 0,
              administrativeId: 0,
              description: "",
              absentee: "",
              substitute: "",
              monitoring: true,
              date: "",
              createdAt: "",
              updatedAt: ""
            }
          ],
          secretariatNotifications: [
            {
              id: 0,
              authorId: 0,
              administrativeId: 0,
              description: "",
              monitoring: true,
              date: "",
              createdAt: "",
              updatedAt: ""
            }
          ]
        },
        technical: {
          defects: [
            {
              id: 0,
              authorId: 0,
              technicalId: 0,
              defectTypeId: 0,
              description: "",
              monitoring: true,
              date: "",
              createdAt: "",
              updatedAt: ""
            }
          ],
          malfunctions: [
            {
              id: 0,
              authorId: 0,
              technicalId: 0,
              malfunctionTypeId: 0,
              description: "",
              monitoring: true,
              date: "",
              duration: "",
              createdAt: "",
              updatedAt: ""
            }
          ]
        }
      },
      reportId: 0,
      eventId: 0,
      categorie: "",
      subcategorie: "",
      // OperationalEvent status
      operationalEventFailed: false,
      operationalEventSucceeded: false,
      // WorkplaceEvent status
      workplaceEventFailed: false,
      workplaceEventSucceeded: false,
      // SecretariatNotification status
      secretariatNotificationFailed: false,
      secretariatNotificationSucceeded: false,
      // Defect status
      defectFailed: false,
      defectSucceeded: false,
      // Malfunction status
      malfunctionFailed: false,
      malfunctionSucceeded: false
    };
  },
  mounted() {
    this.loadData();
  },

  methods: {
    /**
     * Loads the data of this current event.
     */
    loadData: function() {
      // this.loadReportContent();
      this.categorie = String(this.$route.query.categorie);
      this.subcategorie = String(this.$route.query.subcategorie);
      this.reportId = Number(this.$route.query.reportId);
      this.eventId = Number(this.$route.query.eventId);

      ReportingService.getAllReports(
        "/api/reports/content/" + String(this.reportId)
      ).then(res => (this.reportContent = res));

      if (this.subcategorie == "operationalEvents") {
        this.loadOperationalEvent();
      } else if (this.subcategorie == "workplaceEvents") {
        this.loadWorkplaceEvent();
      } else if (this.subcategorie == "secretariatNotifications") {
        this.loadSecretariatNotification();
      } else if (this.subcategorie == "defects") {
        this.loadDefect();
      } else if (this.subcategorie == "malfunctions") {
        this.loadMalfunction();
      }
    },

    /**
     * Loads the data of this current Operational event.
     */
    loadOperationalEvent: function() {
      ReportingService.getReportEvent(
        "/api/reports/operationalEvent/" + String(this.eventId)
      ).then(res => (this.currentEvent = res));

      // TODO BUG type wordt niet opgeslagen als er een type met subtype selected is
      ReportingService.getEventType(
        "/api/reports/operationalEventTypes/" + String(this.eventId)
      ).then(res => (this.operationalTypeSelected = res));

      ReportingService.getAllReports("/api/reports/operationalTypes").then(
        res => (this.reportTypes = res)
      );
    },

    /**
     * Loads the data of this current Workplace event.
     */
    loadWorkplaceEvent: function() {
      ReportingService.getReportEvent(
        "/api/reports/workplaceEvent/" + String(this.eventId)
      ).then(res => (this.currentEvent = res));

      ReportingService.getEventType(
        "/api/reports/workplaceEventTypes/" + String(this.eventId)
      ).then(res => (this.typeSelected = res));

      ReportingService.getAllReports("/api/reports/workplaceTypes").then(
        res => (this.reportTypes = res)
      );
    },

    /**
     * Loads the data of this current SecretariatNotification event.
     */
    loadSecretariatNotification: function() {
      ReportingService.getReportEvent(
        "/api/reports/secretariatNotification/" + String(this.eventId)
      ).then(res => (this.currentEvent = res));
    },

    /**
     * Loads the data of this current Defect event.
     */
    loadDefect: function() {
      ReportingService.getReportEvent(
        "/api/reports/defectEvent/" + String(this.eventId)
      ).then(res => (this.currentEvent = res));

      ReportingService.getEventType(
        "/api/reports/defectTypes/" + String(this.eventId)
      ).then(res => (this.typeSelected = res));

      ReportingService.getAllReports("/api/reports/defectTypes").then(
        res => (this.reportTypes = res)
      );
    },

    /**
     * Loads the data of this current Malfunction event.
     */
    loadMalfunction: function() {
      ReportingService.getReportEvent(
        "/api/reports/malfunctionEvent/" + String(this.eventId)
      ).then(res => (this.currentEvent = res));

      ReportingService.getEventType(
        "/api/reports/malfunctionTypes/" + String(this.eventId)
      ).then(res => (this.typeSelected = res));

      ReportingService.getAllReports("/api/reports/malfunctionTypes").then(
        res => (this.reportTypes = res)
      );
    },

    /**
     * Loads test data.
     */
    loadReportContent: function() {
      this.reportTypes.operationalTypes = [
        { id: 4, typeName: "Bevraging GSM operatoren" },
        { id: 5, typeName: "BIN-alarm" },
        { id: 2, typeName: "Grensoverschrijdende achtervolging" },
        { id: 6, typeName: "Signalering" },
        { id: 1, typeName: "Specifieke gebeurtenis" },
        { id: 3, typeName: "Zoeking met helikopter" }
      ];
      this.reportTypes.operationalSubtypes = [
        { operationalTypeId: 6, typeName: "Persoon" },
        { operationalTypeId: 6, typeName: "Voertuig" },
        { operationalTypeId: 6, typeName: "Voorwerp" }
      ];

      this.reportContent = {
        report: {
          id: 1,
          date: "2020-03-16T21:13:48.000Z",
          temporary: false,
          nightShift: true,
          createdAt: "2020-05-04T07:46:17.000Z",
          updatedAt: "2020-05-04T07:46:17.000Z"
        },
        operational: {
          operationalEvents: [
            {
              id: 1,
              authorId: 1,
              operationalId: 1,
              signaling: "Verlies inschrijvingsbewijs",
              plNumber: "",
              description: "",
              priority: null,
              location: "",
              unit: "KEMPLA",
              date: "2020-03-16T18:13:48.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 2,
              authorId: 1,
              operationalId: 1,
              signaling: "",
              plNumber: "PL03170104",
              description:
                "Lokalisatie gsmnr via provider, Nav onrustwekkende verdwijning meerderjarige : zelfmoordbericht",
              priority: null,
              location: "",
              unit: "HANO",
              date: "2020-03-16T22:05:18.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 3,
              authorId: 1,
              operationalId: 1,
              signaling: "",
              plNumber: "PL031770168",
              description: "",
              priority: null,
              location: "",
              unit: "CARMA",
              date: "2020-03-16T21:34:37.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 4,
              authorId: 1,
              operationalId: 1,
              signaling: "Seining persoon",
              plNumber: "",
              description: "",
              priority: null,
              location: "",
              unit: "LAMA",
              date: "2020-03-16T23:34:33.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 5,
              authorId: 1,
              operationalId: 1,
              signaling: "Seining persoon",
              plNumber: "",
              description: "",
              priority: null,
              location: "",
              unit: "LOON",
              date: "2020-03-16T23:57:10.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 6,
              authorId: 1,
              operationalId: 1,
              signaling: "Seining persoon",
              plNumber: "PL03170202",
              description: "",
              priority: null,
              location: "",
              unit: "BIHORI",
              date: "2020-03-16T00:18:57.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 7,
              authorId: 1,
              operationalId: 1,
              signaling: "",
              plNumber: "PL03170104",
              description: "",
              priority: null,
              location: "",
              unit: "HANO",
              date: "2020-03-16T00:45:45.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 8,
              authorId: 1,
              operationalId: 1,
              signaling: "",
              plNumber: "PL03170315",
              description: "",
              priority: null,
              location: "",
              unit: "LRH",
              date: "2020-03-16T01:21:25.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 9,
              authorId: 1,
              operationalId: 1,
              signaling: "",
              plNumber: "PL03170322",
              description: "",
              priority: null,
              location: "",
              unit: "LRH",
              date: "2020-03-16T01:51:47.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            }
          ]
        },
        administrative: {
          workplaceEvents: [
            {
              id: 1,
              authorId: 1,
              administrativeId: 1,
              description: "ziek geworden",
              absentee: "Jan Jacobs",
              substitute: "Geordy Hendricks",
              monitoring: true,
              date: "2020-03-30T15:46:36.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            }
          ],
          secretariatNotifications: [
            {
              id: 1,
              authorId: 1,
              administrativeId: 1,
              description: "ongeval",
              monitoring: true,
              date: "2020-03-30T10:46:36.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            }
          ]
        },
        technical: {
          defects: [
            {
              id: 1,
              authorId: 1,
              technicalId: 1,
              defectTypeId: 1,
              description: "krakende deur in kamer 512",
              monitoring: true,
              date: "2020/04/15 13:03:57",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            }
          ],
          malfunctions: [
            {
              id: 1,
              authorId: 1,
              technicalId: 1,
              malfunctionTypeId: 1,
              description: "lekkende kraan in kamer 304",
              monitoring: true,
              date: "2020-04-15T13:03:57.000Z",
              duration: "",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            }
          ]
        }
      };
    },

    /**
     * Change the data of this Operational event in the database with the corresponiding given data.
     */
    async changeOperationalEvent() {
      await ReportingService.changeOperationalEvent({
        reportId: String(this.reportId),
        operationalEventId: this.currentEvent.id,
        message: this.currentEvent.description,
        types: this.operationalTypeSelected.selectedTypes,
        subtypes: this.operationalTypeSelected.selectedSubtypes
      });
      this.operationalEventSucceeded = true;
    },

    /**
     * Change the data of this Workplace event in the database with the corresponiding given data.
     */
    async changeWorkplaceEvent() {
      await ReportingService.changeWorkplaceEvent({
        reportId: String(this.reportId),
        administrativeId: this.currentEvent.id,
        message: this.currentEvent.description,
        type: this.typeSelected.typeName,
        subtype: this.typeSelected.subtypeName
      });
      this.workplaceEventSucceeded = true;
    },

    /**
     * Change the data of this SecretariatNotification event in the database with the corresponiding given data.
     */
    async changeSecretariatNotification() {
      await ReportingService.changeSecretariatNotification({
        reportId: String(this.reportId),
        administrativeId: this.currentEvent.id,
        message: this.currentEvent.description
      });
      this.secretariatNotificationSucceeded = true;
    },

    /**
     * Change the data of this Defect event in the database with the corresponiding given data.
     */
    async changeDefect() {
      await ReportingService.changeDefect({
        reportId: String(this.reportId),
        technicalId: this.currentEvent.id,
        message: this.currentEvent.description,
        type: this.typeSelected.typeName,
        subtype: this.typeSelected.subtypeName
      });
      this.defectSucceeded = true;
    },

    /**
     * Change the data of this event in the database with the corresponiding given data.
     */
    async changeMalfunction() {
      await ReportingService.changeMalfunction({
        reportId: String(this.reportId),
        technicalId: this.currentEvent.id,
        message: this.currentEvent.description,
        type: this.typeSelected.typeName,
        subtype: this.typeSelected.subtypeName
      });
      this.malfunctionSucceeded = true;
    },

    /**
     * Unchecks all types and subtypes of Administrative and Technical.
     */
    uncheckAll: function() {
      this.typeSelected.typeName = "";
      this.deselectSubtype();
    },

    /**
     * Unchecks all subtypes of Administrative and Technical.
     */
    deselectSubtype: function() {
      this.typeSelected.subtypeName = "";
    },

    /**
     * Unchecks all types and subtypes of Operational.
     */
    uncheckAllOperational: function(status: boolean) {
      this.operationalTypeSelected.selectedTypes = [];
      this.operationalTypeSelected.selectedSubtypes = [];

      const cb = document.getElementById(
        "operationalParent"
      ) as HTMLInputElement;
      cb.checked = status;
    },

    /**
     * Handles what happens when the 'Operationeel' checkbox is clicked.
     * If not every box is selected, then select all boxes.
     * If all boxes are selected, then deselect all boxes.
     */
    selectAllOperational: function() {
      if (
        this.reportTypes.operationalTypes.length ==
          this.operationalTypeSelected.selectedTypes.length &&
        this.reportTypes.operationalSubtypes.length ==
          this.operationalTypeSelected.selectedSubtypes.length
      ) {
        this.uncheckAllOperational(false);
      } else {
        this.uncheckAllOperational(true);
        for (let i = 0; i < this.reportTypes.operationalTypes.length; i++) {
          const type = this.reportTypes.operationalTypes[i];
          this.operationalTypeSelected.selectedTypes.push(type.typeName);
        }
        for (let i = 0; i < this.reportTypes.operationalSubtypes.length; i++) {
          const subtype = this.reportTypes.operationalSubtypes[i];
          this.operationalTypeSelected.selectedSubtypes.push(subtype.typeName);
        }
      }
    },

    /**
     * When a checkbox of a subtype is clicked, select its parent type also.
     */
    selectParent: function(parentId: number, parent: string) {
      let parentTypes: any;

      if (parent == "Workplace") {
        parentTypes = this.reportTypes.workplaceTypes;
      } else if (parent == "Defect") {
        parentTypes = this.reportTypes.defectTypes;
      } else if (parent == "Malfunction") {
        parentTypes = this.reportTypes.malfunctionTypes;
      }

      for (let i = 0; i < parentTypes.length; i++) {
        const element = parentTypes[i];
        if (parentId == element.id) {
          this.typeSelected.typeName = element.typeName;
        }
      }
    },

    /**
     * If a subtype is selected, its parent type needs to be selected as well.
     */
    selectOperationalParent: function(parentId: number) {
      const parentTypes: any = this.reportTypes.operationalTypes;

      for (let i = 0; i < parentTypes.length; i++) {
        const parentType = parentTypes[i];
        if (parentType.id == parentId) {
          if (
            !this.operationalTypeSelected.selectedTypes.includes(
              parentType.typeName
            )
          ) {
            this.operationalTypeSelected.selectedTypes.push(
              parentType.typeName
            );
          }
        }
      }
    },

    /**
     * If a type is deselected, its subtypes need to be deselected as well.
     */
    removeSubtypes: function(parentId: number) {
      if (this.operationalTypeSelected.selectedSubtypes.length > 0) {
        const allTypes = this.reportTypes.operationalTypes;
        const allSubtypes = this.reportTypes.operationalSubtypes;

        // Loop over all types
        for (let i = 0; i < allTypes.length; i++) {
          const curType = allTypes[i];

          // If parentType found
          if (curType.id == parentId) {
            const parentType = curType;

            // Loop over all subtypes
            for (let j = 0; j < allSubtypes.length; j++) {
              const curSubtype = allSubtypes[j];

              // If current subtype is inside selectedSubtypes, then delete current subtype from selectedSubtypes
              if (
                this.operationalTypeSelected.selectedSubtypes.includes(
                  curSubtype.typeName
                ) &&
                curSubtype.operationalTypeId == parentId
              ) {
                const index = this.operationalTypeSelected.selectedSubtypes.indexOf(
                  curSubtype.typeName
                );

                if (index > -1) {
                  this.operationalTypeSelected.selectedSubtypes.splice(
                    index,
                    1
                  );
                }
              }
            }

            // After looping over all subtypes, delete its parentType drom selectedTypes
            const index = this.operationalTypeSelected.selectedTypes.indexOf(
              parentType.typeName
            );

            if (index > -1) {
              this.operationalTypeSelected.selectedTypes.splice(index, 1);
            }
          }
        }
      }
    }
  }
});
</script>

<style scoped>
.formcontaier {
  width: 100%;
  height: fit-content;
}

.form-control {
  height: fit-content;
}

.no-edit {
  color: rgba(83, 72, 72, 0.705);
}

.typecontainer {
  width: max-content;
}

.subtypecontainer {
  width: max-content;
  padding-left: 1rem;
}

#smalltitle {
  padding-bottom: 1rem;
}

.extraMargin {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
