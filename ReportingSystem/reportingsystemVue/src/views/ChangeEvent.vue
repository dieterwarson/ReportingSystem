/* eslint-disable */
<template>
<!-- script has to be implemented again to achieve the seperate forms -->
<div class="container pt-5 pb-5">
  <h1>Wijzig gebeurtenis</h1>
  <form id="changeOperationalEvent">
    <!-- Operationeel -->
    <section v-if="this.step == 'Operational'">
      <h3>Operationeel</h3>
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
        {{setOperationalId(this.reportContent.operational.operationalEvents[this.eventId-1].id)}}
        <!-- Invoervelden -->
        <div class="text-sm-left col-lg">
          <div>
            <!-- PL-nummer -->
            <div>
              <div class="form-control form-control-lg no-edit">
                <div v-if="this.reportContent.operational.operationalEvents[this.eventId-1].plNumber == null">Geen PL-nummer beschikbaar.</div>
                <div v-else>PL-nummer: {{this.reportContent.operational.operationalEvents[this.eventId-1].plNumber}}</div>
              </div>
            </div>
            <div class="input-group" style="height: 20%;">
              <div class="formcontainer btn-block">
                <!-- Locatie -->
                <div class="form-control form-control-lg no-edit">
                  <div v-if="this.reportContent.operational.operationalEvents[this.eventId-1].location == null">Geen adres beschikbaar.</div>
                  <div v-else>Locatie: {{this.reportContent.operational.operationalEvents[this.eventId-1].location}}</div>
                </div>
                <!-- Datum -->
                <div class="form-control form-control-lg no-edit">
                  <div v-if="this.reportContent.operational.operationalEvents[this.eventId-1].date == null">Geen datum beschikbaar.</div>
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
                  <div v-if="this.reportContent.operational.operationalEvents[this.eventId-1].unit == null">Geen unit beschikbaar.</div>
                  <div v-else>Unit: {{this.reportContent.operational.operationalEvents[this.eventId-1].unit}}</div>
                </div>

                <!-- Signaling -->
                <div class="form-control form-control-lg no-edit">
                  <div v-if="this.reportContent.operational.operationalEvents[this.eventId-1].signaling == null">Geen signalering beschikbaar.</div>
                  <div v-else>Signalering: {{this.reportContent.operational.operationalEvents[this.eventId-1].signaling}}</div>
                </div>
              </div>
            </div>

            <!-- Extra info -->
            <div class="form-control form-control-lg no-edit cropped">Extra info: (aanpasbaar)</div>

            <input type="text" class="form-control form-control-lg" v-model="form.operationalMessage" @change="getOperationalMessage" />

            <!-- <input type="text" class="form-control form-control-lg" v-model="operationalDescription" @change="setinlink" />

            <input type="text" class="form-control form-control-lg" v-model="reportContent.operational.operationalEvents[
              this.eventId - 1
              ].description" @change="getOperationalMessage2" /> -->

          </div>
          <div>message: {{form.operationalMessage}}</div>
          <div>description: {{operationalDescription}}</div>
          <div>
            reportContent: {{reportContent.operational.operationalEvents[
              this.eventId - 1
              ].description}}
          </div>

          <!-- Opslaan knop -->
          <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeOperationalEvent">Opslaan</button>
          <small v-if="form.operationalFailed">Er is iets misgegaan bij het aanpassen.</small>
          <small v-if="form.operationalSucceeded">Het verslag is aangepast.</small>
        </div>
      </div>
    </section>
  </form>

  <form id="changeWorkforce">
    <!-- Personeel -->
    <section v-if="this.step == 'Workforce'">
      <h3>Personeel</h3>
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
                  <div v-if="this.reportContent.administrative.replacements[this.eventId-1].absentee == null">Geen afwezige beschikbaar.</div>
                  <div v-else>Afwezige: {{this.reportContent.administrative.replacements[this.eventId-1].absentee}}</div>
                </div>
                <!-- Vervanger -->
                <div class="form-control form-control-lg no-edit">
                  <div v-if="this.reportContent.administrative.replacements[this.eventId-1].substitute == null">Geen vervanger beschikbaar.</div>
                  <div v-else>Vervanger: {{this.reportContent.administrative.replacements[this.eventId-1].substitute}}</div>
                </div>
              </div>
            </div>
            <!-- Extra info -->
            <div class="form-control form-control-lg no-edit cropped">Extra info: (aanpasbaar)</div>
            <input type="text" class="form-control form-control-lg" v-model="form.workforceMessage" />
          </div>
          <!-- Opslaan knop -->
          <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="addWorkForceEvent">Opslaan</button>
          <small v-if="form.workForceFailed">Er is iets misgegaan bij het aanpassen.</small>
          <small v-if="form.workForceSucceeded">Het verslag is aangepast.</small>
        </div>
      </div>
    </section>
  </form>

  <form id="changeTechnical">
    <!-- Technisch -->
    <section v-if="this.step == 'Technical'">
      <h3>Technisch</h3>
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
            <!-- Extra info -->
            <div class="form-control form-control-lg no-edit cropped">Extra info: (aanpasbaar)</div>
            <input type="text" class="form-control form-control-lg" v-model="form.technicalMessage" />
            <div>
              hallo
              {{this.reportContent.operational.operationalEvents[
                this.eventId - 1
                ].description}}
            </div>
          </div>
          <!-- Opslaan knop -->
          <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="addTechnicalEvent">Opslaan</button>
          <small v-if="form.technicalFailed">Er is iets misgegaan bij het aanpassen.</small>
          <small v-if="form.technicalSucceeded">Het verslag is aangepast.</small>
        </div>
      </div>
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
      operationalId: "",
      filteredTypes: [],
      reportTypes: [],
      operationalDescription: "",
      replacementDescription: "",
      workplaceEventDescription: "",
      secretariatNotificationDescription: "",
      defectDescription: "",
      malfunctionDescription: "",
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
              description: "beschrijving",
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
              description: "",
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
              description: "",
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
              description: "",
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
              description: "help",
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
              description: "",
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
              description: "",
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
              description: "",
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
              description: "",
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
          replacements: [{
            id: 1,
            authorId: 1,
            administrativeId: 1,
            absentee: "Jan Jacobs",
            substitute: "Geordy Hendricks",
            monitoring: true,
            date: "2020-03-30T15:46:36.000Z",
            shift: true,
            createdAt: "2020-05-04T07:47:37.000Z",
            updatedAt: "2020-05-04T07:47:37.000Z"
          }],
          workplaceEvents: [],
          secretariatNotifications: [{
            id: 1,
            authorId: 1,
            administrativeId: 1,
            absentee: "Jan Jacobs",
            substitute: "Geordy Hendricks",
            monitoring: true,
            date: "2020-03-30T15:46:36.000Z",
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
      formType: {
        parentId: []
      },
      form: {
        //OPERATIONAL OBJECTS
        plNumber: "",
        location: "",
        operationalDate: "",
        operationalMessage: "",
        operationalFailed: false,
        operationalSucceeded: false,
        unit: "",
        //WORKFORCE OBJECTS
        absent: "",
        replacement: "",
        workforceMessage: "",
        secretNotifications: null,
        workplaceEvent: null,
        workforceDescription: null,
        monitoring: null,
        workforceDate: null,
        shift: null,
        absentee: "",
        substitute: null,
        employee: null,
        workplaceEventType: null,
        workForceFailed: false,
        workForceSucceeded: false,
        //TECHNICAL OBJECTS
        technicalMessage: "",
        technicalProblems: null,
        technicalDescription: null,
        duration: null,
        problemType: null,
        technicalFailed: false,
        technicalSucceeded: false
      }
    };
  },

  mounted() {
    this.loadData();

    this.form.operationalMessage = String(this.reportContent.operational.operationalEvents[
      this.eventId - 1
    ].description);
  },

  methods: {
    setOperationalId: function (id: string) {
      this.operationalId = id;
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

      // this.form.operationalMessage = this.reportContent.operational.operationalEvents[
      //   this.eventId - 1
      // ].description;

      // this.form.operationalMessage = "éhauohpuzeahafeu";

      // this.operationalDescription = this.reportContent.operational.operationalEvents[
      //   this.eventId - 1
      // ].description;

      // this.form.operationalMessage = this.operationalDescription;
      // this.loadDescriptions();
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
        this.form.operationalSucceeded = false;
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
        this.form.operationalSucceeded = false;
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
        this.form.operationalSucceeded = false;
        this.form.workForceSucceeded = false;
        this.form.technicalSucceeded = false;
      }
    },
    saveButton: function () {
      alert("send to db");
    },
    async getFile() {
      const response = await ReportingService.getFile({
        plNumber: this.form.plNumber
      });
      this.form.operationalDate = new Date(response.date)
        .toLocaleString("en-BE")
        .replace(",", "");
      this.form.operationalMessage = response.actions;
      this.form.location = response.location;
      this.form.unit = response.unit;
    },
    async addWorkForceEvent() {
      const response = await ReportingService.addWorkForceEvent({
        absentee: this.form.absentee,
        replacement: this.form.replacement,
        extra: this.form.workforceMessage
      });
      this.form.workForceSucceeded = true;
      if (response.bool) {
        this.form.absentee = "";
        this.form.replacement = "";
        this.form.workforceMessage = "";
      }
    },
    async addTechnicalEvent() {
      const response = await ReportingService.addTechnicalEvent({
        description: this.form.technicalMessage
      });
      this.form.technicalSucceeded = true;
      if (response.bool) {
        this.form.technicalMessage = "";
      }
    },
    async changeOperationalEvent() {
      const response = await ReportingService.changeOperationalEvent({
        reportId: this.$route.query.reportId,
        operationalId: this.operationalId,
        message: this.form.operationalMessage
      });
      this.form.operationalSucceeded = true;
      if (response.bool) {
        console.log(response.bool);
        // this.form.plNumber = "";
        // this.form.location = "";
        // this.form.operationalDate = "";
        // this.form.operationalMessage = "";
        // this.form.crossBorderPursuit = false;
        // this.form.specificEvent = false;
        // this.form.BIN = false;
        // this.form.telecomOperator = false;
        // this.form.signalingPerson = false;
        // this.form.signalingVehicle = false;
        // this.form.signalingObject = false;
        // this.form.collocation = false;
        // this.form.firstSchouwarts = false;
        // this.form.secondSchouwarts = false;
        // this.form.sexualAgression = false;
        // this.form.firstSASchouwarts = false;
        // this.form.secondSASchouwarts = false;
      }
    },
    filterTypes: function (str: string) {
      for (let i = 0; i < this.filteredTypes.length; i++) {
        if (this.filteredTypes[i] === str) {
          return;
        }
      }
      Array(String(this.filteredTypes)).push(str);
    },
    getOperationalMessage: function () {
      // let temp = this.reportContent.operational.operationalEvents[
      //   this.eventId - 1
      // ].description;
      this.operationalDescription = this.form.operationalMessage;

      this.reportContent.operational.operationalEvents[
        this.eventId - 1
      ].description = this.form.operationalMessage;
      // this.reportContent.operational.operationalEvents[
      //   this.eventId - 1
      // ].description = String("hi");
      // this.form.operationalMessage;
      // this.operationalDescription = this.form.operationalMessage;
    },
    // getOperationalMessage2: function () {
    //   this.operationalDescription = String(this.reportContent.operational.operationalEvents[
    //     this.eventId - 1
    //   ].description);
    // },
    // setinlink: function () {
    //   const temp = this.reportContent.operational.operationalEvents[
    //     this.eventId - 1
    //   ].description;

    //   this.reportContent.operational.operationalEvents[
    //     this.eventId - 1
    //   ].description = temp;
    // }
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
