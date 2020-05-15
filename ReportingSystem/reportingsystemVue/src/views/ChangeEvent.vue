<template>
<!-- niet met reportContent werken om data van een event weer te geven als array met de id als index
dat geeft fouten als een event niet het jusite id heeft, zoals bij technical was, die begon met 2 ipv 1
waardoor [] op de array ging lezen op undefined
  in plaats daarvan, werken met currentEvent, die wordt uit de db gehaald adhv zijn echte id-->
<!-- script has to be implemented again to achieve the seperate forms -->
<div class="container pt-5 pb-5">
  <h1>Wijzig gebeurtenis</h1>
  <form id="changeOperationalEvent">
    <!-- Operationeel -->
    <fieldset v-if="$route.query.categorie == 'Operational'">
      <h3 id="smalltitle">Operationeel</h3>
      <!-- OperationalEvents -->
      <section v-if="$route.query.subcategorie == 'operationalEvents'">
        <h4 id="smalltitle">Operationele gebeurtenis</h4>
        <div class="row">
          <!-- Checkboxes types -->
          <div>
            <div v-if="reportTypes == []">
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
          </div>
          <!-- Invoervelden -->
          <div class="text-sm-left col-lg">
            <div>
              <!-- PL-nummer -->
              <div>
                <div class="form-control form-control-lg no-edit">
                  <div v-if="currentEvent.plNumber == String(null) || currentEvent.plNumber == null || currentEvent.plNumber == ''">Geen PL-nummer beschikbaar.</div>
                  <div v-else>PL-nummer: {{currentEvent.plNumber}}</div>
                </div>
              </div>
              <div class="input-group" style="height: 20%;">
                <div class="formcontainer btn-block">
                  <!-- Locatie -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="currentEvent.location == String(null) || currentEvent.location == null || currentEvent.location == ''">Geen adres beschikbaar.</div>
                    <div v-else>Locatie: {{currentEvent.location}}</div>
                  </div>
                  <!-- Datum -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="currentEvent.date == String(null) || currentEvent.date == null || currentEvent.date == ''">Geen datum beschikbaar.</div>
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
                    <div v-if="currentEvent.unit == String(null) || currentEvent.unit == null || currentEvent.unit == ''">Geen unit beschikbaar.</div>
                    <div v-else>Unit: {{currentEvent.unit}}</div>
                  </div>
                  <!-- Signaling -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="currentEvent.signaling == String(null) || currentEvent.signaling == null || currentEvent.signaling == ''">Geen signalering beschikbaar.</div>
                    <div v-else>Signalering: {{currentEvent.signaling}}</div>
                  </div>
                </div>
              </div>

              <!-- Extra info -->
              <div class="form-control form-control-lg no-edit cropped">Extra info: (aanpasbaar)</div>
              <textarea type="text" class="form-control form-control-lg" v-model="currentEvent.description"></textarea>
            </div>

            <!-- Opslaan knop -->
            <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeOperationalEvent">Opslaan</button>
            <small v-if="form.operationalEventFailed">Er is iets misgegaan bij het aanpassen.</small>
            <small v-if="form.operationalEventSucceeded">Het verslag is aangepast.</small>
          </div>
        </div>
      </section>
    </fieldset>
  </form>

  <form id="changeWorkforce">
    <!-- Personeel -->
    <fieldset v-if="$route.query.categorie == 'Workforce'">
      <h3 id="smalltitle">Personeel</h3>
      <!-- WorkplaceEvents -->
      <section v-if="$route.query.subcategorie == 'workplaceEvents'">
        <h4 id="smalltitle">Werkplaatsgebeurtenis</h4>
        <div class="row">
          <!-- Checkboxes types -->
          <div>
            <div v-if="reportTypes == []">
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
          </div>
          <!-- Invoervelden -->
          <div class="text-sm-left col-lg">
            <div>
              <div class="input-group" style="height: 20%;">
                <div class="formcontainer btn-block">
                  <!-- Afwezige -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="currentEvent.absentee == String(null) || currentEvent.absentee == null || currentEvent.absentee == ''">Geen afwezige beschikbaar.</div>
                    <div v-else>Afwezige: {{currentEvent.absentee}}</div>
                  </div>
                  <!-- Vervanger -->
                  <div class="form-control form-control-lg no-edit">
                    <div v-if="currentEvent.substitute == String(null) || currentEvent.substitute == null || currentEvent.substitute == ''">Geen vervanger beschikbaar.</div>
                    <div v-else>Vervanger: {{currentEvent.substitute}}</div>
                  </div>
                </div>
              </div>

              <!-- Extra info -->
              <div class="form-control form-control-lg no-edit cropped">Extra info: (aanpasbaar)</div>
              <textarea type="text" class="form-control form-control-lg" v-model="currentEvent.description"></textarea>
            </div>

            <!-- Opslaan knop -->
            <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeWorkplaceEvent">Opslaan</button>
            <small v-if="form.workplaceEventFailed">Er is iets misgegaan bij het aanpassen.</small>
            <small v-if="form.workplaceEventSucceeded">Het verslag is aangepast.</small>
          </div>
        </div>
      </section>
      <!-- SecretariatNotifications -->
      <section v-else-if="$route.query.subcategorie == 'secretariatNotifications'">
        <h4 id="smalltitle">Secretariaatmeldingen</h4>
        <div class="row">
          <!-- Invoervelden -->
          <div class="text-sm-left col-lg">
            <div>
              <!-- Beschrijving gebeurtenis -->
              <div class="form-control form-control-lg no-edit cropped">Beschrijving gebeurtenis: (aanpasbaar)</div>
              <textarea type="text" class="form-control form-control-lg" v-model="currentEvent.description"></textarea>
            </div>
            <!-- Opslaan knop -->
            <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeSecretariatNotification">Opslaan</button>
            <small v-if="form.secretariatNotificationFailed">Er is iets misgegaan bij het aanpassen.</small>
            <small v-if="form.secretariatNotificationSucceeded">Het verslag is aangepast.</small>
          </div>
        </div>
      </section>
    </fieldset>
  </form>

  <form id="changeTechnical">
    <!-- Technisch -->
    <fieldset v-if="$route.query.categorie == 'Technical'">
      <h3 id="smalltitle">Technisch</h3>
      <!-- Defects -->
      <section v-if="$route.query.subcategorie == 'defects'">
        <h4 id="smalltitle">Defect</h4>
        <div class="row">
          <!-- Checkboxes types -->
          <div>
            <div v-if="reportTypes == []">
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
          </div>
          <!-- Invoervelden -->
          <div class="text-sm-left col-lg">
            <div>
              <!-- Beschrijving -->
              <div class="form-control form-control-lg no-edit cropped">Beschrijving: (aanpasbaar)</div>
              <textarea type="text" class="form-control form-control-lg" v-model="currentEvent.description"></textarea>
            </div>

            <!-- Opslaan knop -->
            <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeDefect">Opslaan</button>
            <small v-if="form.defectFailed">Er is iets misgegaan bij het aanpassen.</small>
            <small v-if="form.defectSucceeded">Het verslag is aangepast.</small>
          </div>
        </div>
      </section>
      <!-- Malfunctions -->
      <section v-else-if="$route.query.subcategorie == 'malfunctions'">
        <h4 id="smalltitle">Malfunctie</h4>
        <div class="row">
          <!-- Checkboxes types -->
          <div>
            <div v-if="reportTypes == []">
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
          </div>
          <!-- Invoervelden -->
          <div class="text-sm-left col-lg">
            <div>
              <!-- Beschrijving -->
              <div class="form-control form-control-lg no-edit cropped">Beschrijving: (aanpasbaar)</div>
              <textarea type="text" class="form-control form-control-lg" v-model="currentEvent.description"></textarea>
            </div>
            <!-- Opslaan knop -->
            <button class="btn btn-large btn-block btn-success" type="button" @click.prevent="changeMalfunction">Opslaan</button>
            <small v-if="form.malfunctionFailed">Er is iets misgegaan bij het aanpassen.</small>
            <small v-if="form.malfunctionSucceeded">Het verslag is aangepast.</small>
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
  data: function () {
    return {
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
        shift: true,
        createdAt: "",
        updatedAt: ""
      },
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
            description: "",
            monitoring: true,
            date: "",
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
        operationalEventFailed: false,
        operationalEventSucceeded: false,
        //WORKPLACEEVENT OBJECTS
        workplaceEventFailed: false,
        workplaceEventSucceeded: false,
        //SECRETARIATNOTIFICATION OBJECTS
        secretariatNotificationFailed: false,
        secretariatNotificationSucceeded: false,
        //DEFECT OBJECTS
        defectFailed: false,
        defectSucceeded: false,
        //MALFUNCTION OBJECTS
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

      ReportingService.getAllReports(
        "/api/reports/content/" + this.$route.query.reportId
      ).then(res => (this.reportContent = res));

      if (String(this.$route.query.subcategorie) == String("operationalEvents")) {
        ReportingService.getReportEvent(
          "/api/reports/operationalEvent/" + this.$route.query.eventId
        ).then(res => (this.currentEvent = res));
        ReportingService.getAllReports("/api/reports/operationalTypes").then(
          res => (this.reportTypes = res)
        );
      } else if (String(this.$route.query.subcategorie) == String("workplaceEvents")) {
        ReportingService.getReportEvent(
          "/api/reports/workplaceEvent/" + this.$route.query.eventId
        ).then(res => (this.currentEvent = res));
        ReportingService.getAllReports("/api/reports/workplaceTypes").then(
          res => (this.reportTypes = res)
        );
      } else if (String(this.$route.query.subcategorie) == String("secretariatNotifications")) {
        ReportingService.getReportEvent(
          "/api/reports/secretariatNotification/" + this.$route.query.eventId
        ).then(res => (this.currentEvent = res));
      } else if (String(this.$route.query.subcategorie) == String("defects")) {
        ReportingService.getReportEvent(
          "/api/reports/defectEvent/" + this.$route.query.eventId
        ).then(res => (this.currentEvent = res));
        ReportingService.getAllReports("/api/reports/defectTypes").then(
          res => (this.reportTypes = res)
        );
      } else if (String(this.$route.query.subcategorie) == String("malfunctions")) {
        ReportingService.getReportEvent(
          "/api/reports/malfunctionEvent/" + this.$route.query.eventId
        ).then(res => (this.currentEvent = res));
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
              description: "Lokalisatie gsmnr via provider, Nav onrustwekkende verdwijning meerderjarige : zelfmoordbericht",
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
            description: "krakende deur in kamer 512",
            monitoring: true,
            date: "2020/04/15 13:03:57",
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
    async changeOperationalEvent() {
      await ReportingService.changeOperationalEvent({
        reportId: this.$route.query.reportId,
        operationalId: this.currentEvent.id,
        message: this.currentEvent.description
      });
      this.form.operationalEventSucceeded = true;
    },
    async changeWorkplaceEvent() {
      await ReportingService.changeWorkplaceEvent({
        reportId: this.$route.query.reportId,
        administrativeId: this.currentEvent.id,
        message: this.currentEvent.description
      });
      this.form.workplaceEventSucceeded = true;
    },
    async changeSecretariatNotification() {
      await ReportingService.changeSecretariatNotification({
        reportId: this.$route.query.reportId,
        administrativeId: this.currentEvent.id,
        message: this.currentEvent.description
      });
      this.form.secretariatNotificationSucceeded = true;
    },
    async changeDefect() {
      await ReportingService.changeDefect({
        reportId: this.$route.query.reportId,
        technicalId: this.currentEvent.id,
        message: this.currentEvent.description
      });
      this.form.defectSucceeded = true;
    },
    async changeMalfunction() {
      await ReportingService.changeMalfunction({
        reportId: this.$route.query.reportId,
        technicalId: this.currentEvent.id,
        message: this.currentEvent.description
      });
      this.form.malfunctionSucceeded = true;
    },

    filterTypes: function (str: string) {
      for (let i = 0; i < this.filteredTypes.length; i++) {
        if (this.filteredTypes[i] == str) {
          return;
        }
      }
      this.filteredTypes.push(str);
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
