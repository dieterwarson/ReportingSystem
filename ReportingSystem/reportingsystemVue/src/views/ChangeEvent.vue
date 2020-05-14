<template>
<!-- script has to be implemented again to achieve the seperate forms -->
<div class="container pt-5 pb-5">
  <h1>Wijzig gebeurtenis</h1>
{{this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1]}}
  <form id="changeOperationalEvent">
    <!-- Operationeel -->
    <section v-if="this.$route.query.categorie == 'Operational'">
      <h3 id="smalltitle">Operationeel</h3>
      <section v-if="this.$route.query.subcategorie == 'operationalEvents'">
        <h4 id="smalltitle">Operationele gebeurtenis</h4>
        <div class="row">
          <!-- Checkboxes types -->
          <div v-if="this.reportTypes === []">
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
                  <div v-if="this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].plNumber === String(null) || this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].plNumber === null">Geen PL-nummer beschikbaar.</div>
                  <div v-else>PL-nummer: {{this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].plNumber}}</div>
                </div>
              </div>
              <div class="input-group" style="height: 20%;">
                <div class="formcontainer btn-block">
                  <!-- Locatie -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].location === String(null) || this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].location == null">Geen adres beschikbaar.</div>
                    <div v-else>Locatie: {{this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].location}}</div>
                  </div>
                  <!-- Datum -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].date === String(null) || this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].date == null">Geen datum beschikbaar.</div>
                    <div v-else>
                      Datum: {{ new Date(this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].date).toLocaleString("en-BE", {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        })
                        }}
                    </div>
                  </div>
                  <!-- Unit -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].unit === String(null) || this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].unit">Geen unit beschikbaar.</div>
                    <div v-else>Unit: {{this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].unit}}</div>
                  </div>
                  <!-- Signaling -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].signaling === String(null) || this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].signaling == null">Geen signalering beschikbaar.</div>
                    <div v-else>Signalering: {{this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].signaling}}</div>
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
    <section v-if="this.$route.query.categorie == 'Workforce'">
      <h3 id="smalltitle">Personeel</h3>
      <section v-if="this.$route.query.subcategorie == 'workplaceEvents'">
        <h4 id="smalltitle">Werkplaatsgebeurtenis</h4>
        <div class="row">
          <!-- Checkboxes types -->
          <div v-if="this.reportTypes === []">
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
              <div class="input-group" style="height: 20%;">
                <div class="formcontainer btn-block">
                  <!-- Afwezige -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.reportContent.administrative.workplaceEvents[Number(this.$route.query.eventId) - 1].absentee === String(null) || this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].absentee == null">Geen afwezige beschikbaar.</div>
                    <div v-else>Afwezige: {{this.reportContent.administrative.workplaceEvents[Number(this.$route.query.eventId) - 1].absentee}}</div>
                  </div>
                  <!-- Vervanger -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="this.reportContent.administrative.workplaceEvents[Number(this.$route.query.eventId) - 1].substitute === String(null) || this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1].substitute == null">Geen vervanger beschikbaar.</div>
                    <div v-else>Vervanger: {{this.reportContent.administrative.workplaceEvents[Number(this.$route.query.eventId) - 1].substitute}}</div>
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

      <section v-else-if="this.$route.query.subcategorie == 'secretariatNotifications'">
        <h4 id="smalltitle">Secretariaatmeldingen</h4>
        <div class="row">
          <!-- Invoervelden -->
          <div class="text-sm-left col-lg">
            <div>
              <!-- Beschrijving gebeurtenis -->
              <div class="form-control form-control-lg no-edit cropped">Beschrijving gebeurtenis: (aanpasbaar)</div>
              <input type="text" class="form-control form-control-lg" v-model="form.secretariatNotificationMessage" @change="getSecretariatNotificationMessage" />
            </div>
            <p>message: {{form.secretariatNotificationMessage}}</p>
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
    <section v-if="this.$route.query.categorie == 'Technical'">
      <h3 id="smalltitle">Technisch</h3>
      <section v-if="this.$route.query.subcategorie == 'defects'">
        <h4 id="smalltitle">Defect</h4>
        <div class="row">
          <!-- Checkboxes types -->
          <div v-if="this.reportTypes === []">
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

      <section v-else-if="this.$route.query.subcategorie == 'malfunctions'">
        <h4 id="smalltitle">Malfunctie</h4>
        <div class="row">
          <!-- Checkboxes types -->
          <div v-if="this.reportTypes === []">
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
              <!-- Beschrijving -->
              <div class="form-control form-control-lg no-edit cropped">Beschrijving: (aanpasbaar)</div>
              <input type="text" class="form-control form-control-lg" v-model="form.malfunctionMessage" @change="getMalfunctionMessage" />
            </div>
            <!-- Opslaan knop -->
            <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeMalfunction">Opslaan</button>
            <small v-if="form.malfunctionFailed">Er is iets misgegaan bij het aanpassen.</small>
            <small v-if="form.malfunctionSucceeded">Het verslag is aangepast.</small>
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
          id: 0,
          date: "",
          temporary: false,
          nightShift: true,
          createdAt: "",
          updatedAt: ""
        },
        operational: {
          operationalEvents: [{
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
          }]
        },
        administrative: {
          workplaceEvents: [{
            id: 0,
            authorId: 0,
            administrativeId: 0,
            description: "",
            absentee: "",
            substitute: "",
            monitoring: true,
            date: "",
            shift: true,
            createdAt: "",
            updatedAt: ""
          }],
          secretariatNotifications: [{
            id: 0,
            authorId: 0,
            administrativeId: 0,
            description: "",
            monitoring: true,
            date: "",
            shift: true,
            createdAt: "",
            updatedAt: ""
          }]
        },
        technical: {
          defects: [{
            id: 0,
            authorId: 0,
            technicalId: 0,
            defectTypeId: 0,
            description: '',
            monitoring: true,
            date: '',
            createdAt: "",
            updatedAt: ""
          }],
          malfunctions: [{
            id: 0,
            authorId: 0,
            technicalId: 0,
            malfunctionTypeId: 0,
            description: "",
            monitoring: true,
            date: "",
            duration: 0,
            createdAt: "",
            updatedAt: ""
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
        operationalEventMessage: "",
        operationalEventFailed: false,
        operationalEventSucceeded: false,
        //WORKPLACEEVENT OBJECTS
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
    loadData: function () {

      // this.loadReportContent();

      this.step = String(this.$route.query.categorie);
      this.eventId = parseInt(String(this.$route.query.eventId));
      this.subcategorie = String(this.$route.query.subcategorie);
      ReportingService.getAllReports(
        "/api/reports/content/" + this.$route.query.reportId
      ).then(res => (this.reportContent = res));

      if (String(this.$route.query.subcategorie) == String("operationalEvents")) {
        this.loadOperationalEventData();
        ReportingService.getAllReports("/api/reports/operationalTypes").then(
          res => (this.reportTypes = res)
        );
      } else if (String(this.$route.query.subcategorie) == String("workplaceEvents")) {
        this.loadWorkplaceEventData();
        ReportingService.getAllReports("/api/reports/workplaceTypes").then(
          res => (this.reportTypes = res)
        );
      } else if (String(this.$route.query.subcategorie) == String("secretariatNotifications")) {
        this.loadSecretariatNotificationData();
      } else if (String(this.$route.query.subcategorie) == String("defects")) {
        this.loadDefectData();
        ReportingService.getAllReports("/api/reports/defectTypes").then(
          res => (this.reportTypes = res)
        );
      } else if (String(this.$route.query.subcategorie) == String("malfunctions")) {
        this.loadMalfunctionData();
        ReportingService.getAllReports("/api/reports/malfunctionTypes").then(
          res => (this.reportTypes = res)
        );
      }
    },
    loadReportContent: function () {
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
          operationalEvents: [{
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
              description: "",
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
          defects: [{
            id: 1,
            authorId: 1,
            technicalId: 1,
            defectTypeId: 1,
            description: 'krakende deur in kamer 512',
            monitoring: true,
            date: '2020/04/15 13:03:57',
            createdAt: "2020-05-04T07:47:37.000Z",
            updatedAt: "2020-05-04T07:47:37.000Z"
          }],
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
      };
    },

    loadOperationalEventData: function () {
      console.log("in functie");
      this.operationalId = Number(this.reportContent.operational.operationalEvents[
        Number(this.$route.query.eventId) - 1
      ].id);
      console.log(this.operationalId);

      this.form.operationalEventMessage =
        String(
          this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1]
          .description
        ) === String(null) ?
        "" :
        String(this.reportContent.operational.operationalEvents[Number(this.$route.query.eventId) - 1]
          .description);
      console.log(this.form.operationalEventMessage);
    },
    loadWorkplaceEventData: function () {
      this.administrativeId = Number(this.reportContent.administrative.workplaceEvents[
        Number(this.$route.query.eventId) - 1
      ].id);
      this.form.workplaceEventMessage =
        String(
          this.reportContent.administrative.workplaceEvents[Number(this.$route.query.eventId) - 1]
          .description
        ) === String(null) ?
        "" :
        String(this.reportContent.administrative.workplaceEvents[Number(this.$route.query.eventId) - 1]
          .description);
    },
    loadSecretariatNotificationData: function () {
      this.administrativeId = Number(this.reportContent.administrative.secretariatNotifications[
        Number(this.$route.query.eventId) - 1
      ].id);
      this.form.secretariatNotificationMessage =
        String(
          this.reportContent.administrative.secretariatNotifications[
            Number(this.$route.query.eventId) - 1
          ].description
        ) === String(null) ?
        "" :
        String(this.reportContent.administrative.secretariatNotifications[
          Number(this.$route.query.eventId) - 1
        ].description);
    },
    loadDefectData: function () {
      this.technicalId = Number(this.reportContent.technical.defects[
        Number(this.$route.query.eventId) - 1
      ].id);
      this.form.defectMessage =
        String(
          this.reportContent.technical.defects[Number(this.$route.query.eventId) - 1].description
        ) === String(null) ?
        "" :
        String(this.reportContent.technical.defects[Number(this.$route.query.eventId) - 1].description);
    },
    loadMalfunctionData: function () {
      this.technicalId = Number(this.reportContent.technical.malfunctions[
        Number(this.$route.query.eventId) - 1
      ].id);
      this.form.malfunctionMessage =
        String(
          this.reportContent.technical.malfunctions[Number(this.$route.query.eventId) - 1]
          .description
        ) === String(null) ?
        "" :
        String(this.reportContent.technical.malfunctions[Number(this.$route.query.eventId) - 1]
          .description);
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
      this.form.workplaceEventSucceeded = true;
    },
    async changeSecretariatNotification() {
      await ReportingService.changeSecretariatNotification({
        reportId: this.$route.query.reportId,
        administrativeId: this.administrativeId,
        message: this.form.secretariatNotificationMessage
      });
      this.form.secretariatNotificationSucceeded = true;
    },
    async changeDefect() {
      await ReportingService.changeDefect({
        reportId: this.$route.query.reportId,
        technicalId: this.technicalId,
        message: this.form.defectMessage
      });
      this.form.defectSucceeded = true;
    },
    async changeMalfunction() {
      await ReportingService.changeMalfunction({
        reportId: this.$route.query.reportId,
        technicalId: this.technicalId,
        message: this.form.malfunctionMessage
      });
      this.form.malfunctionSucceeded = true;
    },

    filterTypes: function (str: string) {
      for (let i = 0; i < this.filteredTypes.length; i++) {
        if (this.filteredTypes[i] === str) {
          return;
        }
      }
      this.filteredTypes.push(str);
      // Array(String(this.filteredTypes)).push(str);
    },

    getOperationalEventMessage: function () {
      this.reportContent.operational.operationalEvents[
        Number(this.$route.query.eventId) - 1
      ].description = this.form.operationalEventMessage;
    },
    getWorkplaceEventMessage: function () {
      this.reportContent.administrative.workplaceEvents[
        Number(this.$route.query.eventId) - 1
      ].description = this.form.workplaceEventMessage;
    },
    getSecretariatNotificationMessage: function () {
      this.reportContent.administrative.secretariatNotifications[
        Number(this.$route.query.eventId) - 1
      ].description = this.form.secretariatNotificationMessage;
    },
    getDefectMessage: function () {
      this.reportContent.technical.defects[
        Number(this.$route.query.eventId) - 1
      ].description = this.form.defectMessage;
    },
    getMalfunctionMessage: function () {
      this.reportContent.technical.malfunctions[
        Number(this.$route.query.eventId) - 1
      ].description = this.form.malfunctionMessage;
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

#smalltitle {
  padding-bottom: 1rem;
}
</style>
