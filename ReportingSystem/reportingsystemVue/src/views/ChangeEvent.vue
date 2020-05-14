<template>
<!-- script has to be implemented again to achieve the seperate forms -->
<div class="container pt-5 pb-5">
  <h1>Wijzig gebeurtenis</h1>
  <form id="changeOperationalEvent">
    <!-- Operationeel -->
    <section v-if="this.step == 'Operational'">
      <h3>Operationeel</h3>
      <br />
      <section v-if="this.subcategorie == 'operationalEvents'">
        <h4>Operationele gebeurtenis</h4>
        <br />
        <div class="row">
          <!-- Checkboxes types -->
          <div v-if="this.reportTypes == []">
            <p>Er zijn nog geen types</p>
          </div>
          <div v-else>
            <div v-for="value in reportTypes" :key="value.id">
              <div v-for="value in value" :key="value.id">{{filterTypes(value.typeName)}}</div>
            </div>
            <div class="checkbox-container text-sm-left col-sm-4">
              <div v-for="(value, index) in filteredTypes" :key="value.id">
                <div class="typecontainer text-lg-left">
                  <input type="checkbox" v-model="formType.parentId[index]" true-value="yes" false-value="no" />
                  <label>{{value}}</label>
                </div>
              </div>
            </div>
          </div>
          <!-- Invoervelden -->
          <div class="text-sm-left col-lg">
            <div>
              <!-- PL-nummer -->
              <div>
                <div class="form-control form-control-lg no-edit">
                  <div v-if="this.form.plNumber === String(null)">Geen PL-nummer beschikbaar.</div>
                  <div v-else>PL-nummer: {{this.form.plNumber}}</div>
                </div>
              </div>
              <div class="input-group" style="height: 20%;">
                <div class="formcontainer btn-block">
                  <!-- Locatie -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.form.location === String(null)">Geen adres beschikbaar.</div>
                    <div v-else>Locatie: {{this.form.location}}</div>
                  </div>
                  <!-- Datum -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.reportContent.operational.operationalEvents[this.eventId-1].date === String(null)">Geen datum beschikbaar.</div>
                    <div v-else>
                      Datum: {{ new Date(this.reportContent.operational.operationalEvents[this.eventId-1].date).toLocaleString("en-BE", {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        })
                        }}
                    </div>
                  </div>
                  <!-- Unit -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.form.unit === String(null)">Geen unit beschikbaar.</div>
                    <div v-else>Unit: {{this.form.unit}}</div>
                  </div>

                  <!-- Signaling -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.reportContent.operational.operationalEvents[this.eventId-1].signaling === String(null)">Geen signalering beschikbaar.</div>
                    <div v-else>Signalering: {{this.reportContent.operational.operationalEvents[this.eventId-1].signaling}}</div>
                  </div>
                </div>
              </div>

              <!-- Extra info -->
              <div class="form-control form-control-lg no-edit cropped">Extra info: (aanpasbaar)</div>
              <input type="text" class="form-control form-control-lg" v-model="form.operationalEventMessage" @change="getOperationalEventMessage" />
            </div>

            <!-- Opslaan knop -->
            <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeOperationalEvent">Opslaan</button>
            <small v-if="form.operationalEventFailed">Er is iets misgegaan bij het aanpassen.</small>
            <small v-if="form.operationalEventSucceeded">Het verslag is aangepast.</small>
          </div>
        </div>
      </section>
    </section>
  </form>

  <form id="changeWorkforce">
    <!-- Personeel -->
    <section v-if="this.step == 'Workforce'">
      <h3>Personeel</h3>
      <br />
      <section v-if="this.subcategorie == 'workplaceEvents'">
        <h4>Werkplaatsgebeurtenis</h4>
        <br />
        <div class="row">
          <!-- Checkboxes types -->
          <div class="checkbox-container text-sm-left col-sm-4">
            <div class="text-sm-left">
              <input type="checkbox" name="Signaling Person" class="text-sm-left" v-model="form.signalingPerson" />
              <label>Personeel</label>
            </div>
            <div class="text-sm-left">
              <input type="checkbox" name="Signaling Person" class="text-sm-left" v-model="form.signalingPerson" />
              <label>Ziektemelding</label>
            </div>
            <div class="text-sm-left">
              <input type="checkbox" name="Signaling Vehicle" v-model="form.signalingVehicle" />
              <label>Arbeidsongeval</label>
            </div>
            <div class="text-sm-left">
              <input type="checkbox" name="Signaling Object" class="text-sm-left" v-model="form.signalingObject" />
              <label>Voorval tijdens dienst</label>
            </div>
            <div class="text-sm-left">
              <input type="checkbox" name="Signaling Person" class="text-sm-left" v-model="form.signalingPerson" />
              <label>Melding secretariaat</label>
            </div>
          </div>
          <!-- Invoervelden -->
          <div class="text-sm-left col-lg">
            <div>
              <div class="input-group" style="height: 20%;">
                <div class="formcontainer btn-block">
                  <!-- Afwezige -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.form.absentee === String(null)">Geen afwezige beschikbaar.</div>
                    <div v-else>Afwezige: {{form.absentee}}</div>
                  </div>
                  <!-- Vervanger -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.form.substitute === String(null)">Geen vervanger beschikbaar.</div>
                    <div v-else>Vervanger: {{form.substitute}}</div>
                  </div>
                </div>
              </div>

              <!-- Extra info -->
              <div class="form-control form-control-lg no-edit cropped">Extra info: (aanpasbaar)</div>
              <input type="text" class="form-control form-control-lg" v-model="form.workplaceEventMessage" @change="getWorkplaceEventMessage" />
            </div>

            <!-- Opslaan knop -->
            <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeWorkplaceEvent">Opslaan</button>
            <small v-if="form.workplaceEventFailed">Er is iets misgegaan bij het aanpassen.</small>
            <small v-if="form.workplaceEventSucceeded">Het verslag is aangepast.</small>
          </div>
        </div>
      </section>

      <section v-else-if="this.subcategorie == 'secretariatNotifications'">
        <h4>Secretariaatmeldingen</h4>
        <br />
        <div class="row">
          <!-- Invoervelden -->
          <div class="text-sm-left col-lg">
            <div>
              <!-- Beschrijving gebeurtenis -->
              <div class="form-control form-control-lg no-edit cropped">Beschrijving gebeurtenis: (aanpasbaar)</div>
              <input type="text" class="form-control form-control-lg" v-model="form.secretariatNotificationMessage" @change="getSecretariatNotificationMessage" />
            </div>

            <!-- Opslaan knop -->
            <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeSecretariatNotification">Opslaan</button>
            <small v-if="form.secretariatNotificationFailed">Er is iets misgegaan bij het aanpassen.</small>
            <small v-if="form.secretariatNotificationSucceeded">Het verslag is aangepast.</small>
          </div>
        </div>
      </section>
    </section>
  </form>

  <form id="changeTechnical">
    <!-- Technisch -->
    <section v-if="this.step == 'Technical'">
      <h3>Technisch</h3>
      <br />
      <section v-if="this.subcategorie == 'defects'">
        <h4>Defect</h4>
        <br />
        <div class="row">
          <!-- Checkboxes types -->
          <div class="checkbox-container text-sm-left col-sm-4">
            <div class="text-sm-left">
              <input class="text-sm-left" type="checkbox" name="Technisch WKS" />
              <label>Technisch WKS</label>
            </div>
            <div class="text-sm-left">
              <input class="text-sm-left" type="checkbox" name="Voorwerp" />
              <label>Voorwerp</label>
            </div>
            <div class="text-sm-left">
              <input type="checkbox" name="Signaling Vehicle" v-model="form.signalingVehicle" />
              <label>Arbeidsongeval</label>
            </div>
            <div class="text-sm-left">
              <input type="checkbox" name="Verwittiging ASC" />
              <label>Verwittiging ASC</label>
            </div>
            <div class="text-sm-left">
              <input class="text-sm-left" type="checkbox" name="Verwittiging anderen" />
              <label>Verwittiging anderen</label>
            </div>
            <div class="text-sm-left">
              <input class="text-sm-left" type="checkbox" name="Logistiek" />
              <label>Logistiek</label>
            </div>
            <div class="text-sm-left">
              <input class="text-sm-left" type="checkbox" name="Defect" />
              <label>Defect</label>
            </div>
          </div>
          <!-- Invoervelden -->
          <div class="text-sm-left col-lg">
            <div>
              <!-- Beschrijving -->
              <div class="form-control form-control-lg no-edit cropped">Beschrijving: (aanpasbaar)</div>
              <input type="text" class="form-control form-control-lg" v-model="form.defectMessage" @change="getDefectMessage" />
            </div>

            <!-- Opslaan knop -->
            <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeDefect">Opslaan</button>
            <small v-if="form.defectFailed">Er is iets misgegaan bij het aanpassen.</small>
            <small v-if="form.defectSucceeded">Het verslag is aangepast.</small>
          </div>
        </div>
      </section>

      <section v-else-if="this.subcategorie == 'malfunctions'">
        <h4>Malfunctie</h4>
        <br />
        <div class="row">
          <!-- Checkboxes types -->
          <div class="checkbox-container text-sm-left col-sm-4">
            <div class="text-sm-left">
              <input class="text-sm-left" type="checkbox" name="Technisch WKS" />
              <label>Technisch WKS</label>
            </div>
            <div class="text-sm-left">
              <input class="text-sm-left" type="checkbox" name="Voorwerp" />
              <label>Voorwerp</label>
            </div>
            <div class="text-sm-left">
              <input type="checkbox" name="Signaling Vehicle" v-model="form.signalingVehicle" />
              <label>Arbeidsongeval</label>
            </div>
            <div class="text-sm-left">
              <input type="checkbox" name="Verwittiging ASC" />
              <label>Verwittiging ASC</label>
            </div>
            <div class="text-sm-left">
              <input class="text-sm-left" type="checkbox" name="Verwittiging anderen" />
              <label>Verwittiging anderen</label>
            </div>
            <div class="text-sm-left">
              <input class="text-sm-left" type="checkbox" name="Logistiek" />
              <label>Logistiek</label>
            </div>
            <div class="text-sm-left">
              <input class="text-sm-left" type="checkbox" name="Defect" />
              <label>Defect</label>
            </div>
          </div>
          <!-- Invoervelden -->
          <div class="text-sm-left col-lg">
            <div>
              <!-- Beschrijving -->
              <div class="form-control form-control-lg no-edit cropped">Beschrijving: (aanpasbaar)</div>
              <input type="text" class="form-control form-control-lg" v-model="form.malfunctionMessage" @change="getMalfunctionMessage" />
            </div>
            message: {{form.malfunctionMessage}}

            <!-- Opslaan knop -->
            <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeMalfunction">Opslaan</button>
            <small v-if="form.malfunctionFailed">Er is iets misgegaan bij het aanpassen.</small>
            <small v-if="form.malfunctionSucceded">Het verslag is aangepast.</small>
          </div>
        </div>
      </section>
    </section>
  </form>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
export default Vue.extend({
  data: function () {
    return {
      operationalId: 0,
      administrativeId: 0,
      technicalId: 0,
      filteredTypes: [],
      reportTypes: [],
      step: "Operational",
      reportContent: {
        report: {
          id: 1,
          date: "2020-03-16T21:13:48.000Z",
          temporary: false,
          nightShift: true,
          createdAt: "2020-05-04T07:46:17.000Z",
          updatedAt: "2020-05-04T07:46:17.000Z"
        },
        operational: {
          operationalEvents: [{
              id: 1,
              authorId: 1,
              operationalId: 1,
              signaling: "Verlies inschrijvingsbewijs",
              plNumber: null,
              description: null,
              monitoring: true,
              location: null,
              unit: "KEMPLA",
              date: "2020-03-16T18:13:48.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 2,
              authorId: 1,
              operationalId: 1,
              signaling: null,
              plNumber: "PL03170104",
              description: null,
              monitoring: true,
              location: null,
              unit: "HANO",
              date: "2020-03-16T22:05:18.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 3,
              authorId: 1,
              operationalId: 1,
              signaling: null,
              plNumber: "PL031770168",
              description: null,
              monitoring: true,
              location: null,
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
              plNumber: null,
              description: null,
              monitoring: true,
              location: null,
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
              plNumber: null,
              description: null,
              monitoring: true,
              location: null,
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
              description: null,
              monitoring: true,
              location: null,
              unit: "BIHORI",
              date: "2020-03-16T00:18:57.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 7,
              authorId: 1,
              operationalId: 1,
              signaling: null,
              plNumber: "PL03170104",
              description: null,
              monitoring: true,
              location: null,
              unit: "HANO",
              date: "2020-03-16T00:45:45.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 8,
              authorId: 1,
              operationalId: 1,
              signaling: null,
              plNumber: "PL03170315",
              description: null,
              monitoring: true,
              location: null,
              unit: "LRH",
              date: "2020-03-16T01:21:25.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            },
            {
              id: 9,
              authorId: 1,
              operationalId: 1,
              signaling: null,
              plNumber: "PL03170322",
              description: null,
              monitoring: true,
              location: null,
              unit: "LRH",
              date: "2020-03-16T01:51:47.000Z",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            }
          ]
        },
        administrative: {
          workplaceEvents: [{
            id: 1,
            authorId: 1,
            administrativeId: 1,
            description: "ziek geworden",
            absentee: "Jan Jacobs",
            substitute: "Geordy Hendricks",
            monitoring: true,
            date: "2020-03-30T15:46:36.000Z",
            shift: true,
            createdAt: "2020-05-04T07:47:37.000Z",
            updatedAt: "2020-05-04T07:47:37.000Z"
          }],
          secretariatNotifications: [{
            id: 1,
            authorId: 1,
            administrativeId: 1,
            description: "ongeval",
            monitoring: true,
            date: "2020-03-30T10:46:36.000Z",
            shift: true,
            createdAt: "2020-05-04T07:47:37.000Z",
            updatedAt: "2020-05-04T07:47:37.000Z"
          }]
        },
        technical: {
          defects: [],
          malfunctions: [{
            id: 1,
            authorId: 1,
            technicalId: 1,
            malfunctionTypeId: 1,
            description: "lekkende kraan in kamer 304",
            monitoring: true,
            date: "2020-04-15T13:03:57.000Z",
            duration: 6,
            createdAt: "2020-05-04T07:47:37.000Z",
            updatedAt: "2020-05-04T07:47:37.000Z"
          }]
        }
      },
      eventId: 0,
      subcategorie: "",
      formType: {
        parentId: []
      },
      form: {
        //OPERATIONALEVENT OBJECTS
        plNumber: "",
        location: "",
        unit: "",
        operationalEventMessage: "",
        operationalEventFailed: false,
        operationalEventSucceeded: false,
        //WORKPLACEEVENT OBJECTS
        absentee: "",
        substitute: "",
        workplaceEventMessage: "",
        workplaceEventFailed: false,
        workplaceEventSucceeded: false,
        //SECRETARIATNOTIFICATION OBJECTS
        secretariatNotificationMessage: "",
        secretariatNotificationFailed: false,
        secretariatNotificationSucceeded: false,
        //DEFECT OBJECTS
        defectMessage: "",
        defectFailed: false,
        defectSucceeded: false,
        //MALFUNCTION OBJECTS
        malfunctionMessage: "",
        malfunctionFailed: false,
        malfunctionSucceeded: false
      }
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    setAdministrativeId: function () {
      this.administrativeId = this.reportContent.administrative.operationalEvents[
        this.eventId - 1
      ].id;
    },
    loadData: function () {
      // ReportingService.getAllReports(
      //   "/api/reports/content/" + this.$route.query.reportId
      // ).then(res => (this.reportContent = res));

      // ReportingService.getAllReports("/api/reports/types").then(
      //   res => (this.reportTypes = res)
      // );

      this.step = String(this.$route.query.categorie);
      this.eventId = parseInt(String(this.$route.query.eventId));
      this.subcategorie = String(this.$route.query.subcategorie);

      this.loadOperationalEventData();
      this.loadWorkplaceEventData();
      this.loadSecretariatNotificationData();
      this.loadDefectData();
      this.loadMalfunctionData();
    },
    loadOperationalEventData: function () {
      this.operationalId = this.reportContent.operational.operationalEvents[
        this.eventId - 1
      ].id;
      this.form.plNumber = String(
        this.reportContent.operational.operationalEvents[this.eventId - 1]
        .plNumber
      );
      this.form.location = String(
        this.reportContent.operational.operationalEvents[this.eventId - 1]
        .location
      );
      this.form.unit = String(
        this.reportContent.operational.operationalEvents[this.eventId - 1].unit
      );
      this.form.operationalEventMessage = String(
        this.reportContent.operational.operationalEvents[this.eventId - 1]
        .description
      );
    },
    loadWorkplaceEventData: function () {
      this.administrativeId = this.reportContent.administrative.workplaceEvents[
        this.eventId - 1
      ].id;
      this.form.absentee = String(
        this.reportContent.administrative.workplaceEvents[this.eventId - 1]
        .absentee
      );
      this.form.substitute = String(
        this.reportContent.administrative.workplaceEvents[this.eventId - 1]
        .substitute
      );
      this.form.workplaceEventMessage = String(
        this.reportContent.administrative.workplaceEvents[this.eventId - 1]
        .description
      );
    },
    loadSecretariatNotificationData: function () {
      this.administrativeId = this.reportContent.administrative.secretariatNotifications[
        this.eventId - 1
      ].id;
      this.form.secretariatNotificationMessage = String(
        this.reportContent.administrative.secretariatNotifications[
          this.eventId - 1
        ].description
      );
    },
    loadDefectData: function () {
      this.technicalId = this.reportContent.technical.defects[
        this.eventId - 1
      ].id;
      this.form.defectMessage = String(
        this.reportContent.technical.defects[this.eventId - 1].description
      );
    },
    loadMalfunctionData: function () {
      this.technicalId = this.reportContent.technical.malfunctions[
        this.eventId - 1
      ].id;
      this.form.malfunctionMessage = String(
        this.reportContent.technical.malfunctions[this.eventId - 1].description
      );
    },
    getOperational: function () {
      if (this.step != "Operational") {
        this.step = "Operational";
        const operationalButton = document.getElementById("operationalButton") !;
        const workForceButton = document.getElementById("workForceButton") !;
        const technicalButton = document.getElementById("technicalButton") !;
        operationalButton.classList.replace("btn-primary", "btn-info");
        workForceButton.classList.replace("btn-info", "btn-primary");
        technicalButton.classList.replace("btn-info", "btn-primary");
        this.form.operationalEventSucceeded = false;
        this.form.workForceSucceeded = false;
        this.form.technicalSucceeded = false;
      }
    },
    getWorkforce: function () {
      if (this.step != "Workforce") {
        this.step = "Workforce";
        const operationalButton = document.getElementById("operationalButton") !;
        const workForceButton = document.getElementById("workForceButton") !;
        const technicalButton = document.getElementById("technicalButton") !;
        operationalButton.classList.replace("btn-info", "btn-primary");
        workForceButton.classList.replace("btn-primary", "btn-info");
        technicalButton.classList.replace("btn-info", "btn-primary");
        this.form.operationalEventSucceeded = false;
        this.form.workForceSucceeded = false;
        this.form.technicalSucceeded = false;
      }
    },
    getTechnical: function () {
      if (this.step != "Technical") {
        this.step = "Technical";
        const operationalButton = document.getElementById("operationalButton") !;
        const workForceButton = document.getElementById("workForceButton") !;
        const technicalButton = document.getElementById("technicalButton") !;
        operationalButton.classList.replace("btn-info", "btn-primary");
        workForceButton.classList.replace("btn-info", "btn-primary");
        technicalButton.classList.replace("btn-primary", "btn-info");
        this.form.operationalEventSucceeded = false;
        this.form.workForceSucceeded = false;
        this.form.technicalSucceeded = false;
      }
    },
    async changeOperationalEvent() {
      await ReportingService.changeOperationalEvent({
        reportId: this.$route.query.reportId,
        operationalId: this.operationalId,
        message: this.form.operationalEventMessage
      });
      this.form.operationalEventSucceeded = true;
    },
    async changeWorkplaceEvent() {
      await ReportingService.changeWorkplaceEvent({
        reportId: this.$route.query.reportId,
        administrativeId: this.administrativeId,
        message: this.form.workplaceEventMessage
      });
      this.form.operationalEventSucceeded = true;
    },
    async changeSecretariatNotification() {
      await ReportingService.changeSecretariatNotification({
        reportId: this.$route.query.reportId,
        administrativeId: this.administrativeId,
        message: this.form.secretariatNotificationMessage
      });
      this.form.operationalEventSucceeded = true;
    },
    async changeDefect() {
      await ReportingService.changeDefect({
        reportId: this.$route.query.reportId,
        technicalId: this.technicalId,
        message: this.form.defectMessage
      });
      this.form.operationalEventSucceeded = true;
    },
    async changeMalfunction() {
      await ReportingService.changeMalfunction({
        reportId: this.$route.query.reportId,
        malfunctionId: this.malfunctionId,
        message: this.form.malfunctionMessage
      });
      this.form.operationalEventSucceeded = true;
    },

    filterTypes: function (str: string) {
      for (let i = 0; i < this.filteredTypes.length; i++) {
        if (this.filteredTypes[i] === str) {
          return;
        }
      }
      Array(String(this.filteredTypes)).push(str);
    },
    getOperationalEventMessage: function () {
      this.reportContent.operational.operationalEvents[this.eventId - 1].description = this.form.operationalEventMessage;
    },
    getWorkplaceEventMessage: function () {
      this.reportContent.administrative.workplaceEvents[this.eventId - 1].description = this.form.workplaceEventMessage;
    },
    getSecretariatNotificationMessage: function () {
      this.reportContent.administrative.secretariatNotifications[this.eventId - 1].description = this.form.secretariatNotificationMessage;
    },
    getDefectMessage: function () {
      this.reportContent.technical.defects[this.eventId - 1].description = this.form.defectMessage;
    },
    getMalfunctionMessage: function () {
      this.reportContent.technical.malfunctions[this.eventId - 1].description = this.form.malfunctionMessage;
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
</style>
