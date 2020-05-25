<template>
  <div class="container pt-5 pb-5" v-if="!(Object.keys(reportContent).length === 0)">
    <h1>
      Verslag van
      {{
      new Date(reportContent.report.date).toLocaleString("nl-BE", {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      })
      }}
      <span
        class="badge badge-primary"
      >{{ shift }}</span>
    </h1>
    <div class="row my-5">
      <!-- Operationeel met prioriteit -->
      <div class="col">
        <div class="card w-100">
          <div class="card-header bg-primary text-white">Operationeel met prioriteit</div>
          <div class="card-body">
            <div v-if="Object.keys(priorityContent.operational.operationalEvents).length === 0">
              <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
            </div>
            <div v-else class="row row-cols-1">
              <div v-for="event in priorityContent.operational.operationalEvents" :key="event.id">
                <div class="col card h-100">
                  <div class="card-body">
                    <h3 class="card-title display-5">
                      {{ new Date(event.date).toLocaleString("nl-BE", {
                      hour: '2-digit',
                      minute: '2-digit',
                      }) }}
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
                      >{{ event.plNumber }}</span>
                      <span
                        class="card-text badge badge-danger"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Eenheid"
                      >{{ event.unit }}</span>
                    </h5>
                    
                    <div v-if="(!event.eventTypes === null)">
                      <div v-for="type in event.eventTypes" :key="type.id">
                        <h5 class="card-text">
                            <div v-if="!(type.operationalType === null)">
                              <span class="card-text badge badge-secondary mr-1">{{ type.operationalType.typeName }}</span>
                              <span v-if="!(type.operationalSubtype === null)">
                                <span class="card-text badge badge-secondary">{{ type.operationalSubtype.typeName }}</span>
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
            (Object.keys(notificationContent.administrative.workplaceEvents).length === 0 && Object.keys(notificationContent.administrative.secretariatNotifications).length === 0)
            &&
            (Object.keys(notificationContent.technical.defects).length === 0 && Object.keys(notificationContent.technical.malfunctions).length === 0)
            "
            >
              <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
            </div>
            <div v-else class="row row-cols-1">
              <div v-for="event in notificationContent.administrative.replacements" :key="event.id">
                <div class="col card h-100">
                  <div class="card-body">
                    <h3 class="card-title display-5">
                      {{ new Date(event.date).toLocaleString("nl-BE", {
                      hour: '2-digit',
                      minute: '2-digit',
                      }) }}
                    </h3>
                    <p class="card-text">{{ event.signaling }}</p>
                    <h5>
                      <span
                        class="card-text badge badge-primary"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="PL-nummer"
                      >{{ event.plNumber }}</span>
                      <span
                        class="card-text badge badge-danger"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Eenheid"
                      >{{ event.unit }}</span>
                    </h5>
                    <p class="card-text">{{ event.description }}</p>
                    <p class="card-text">{{ event.location }}</p>
                    <h5></h5>
                  </div>
                </div>
              </div>

              <div
                v-for="event in notificationContent.administrative.workplaceEvents"
                :key="event.id"
              >
                <div class="col card h-100">
                  <div class="card-body">
                    <h3 class="card-title display-5">
                      {{ new Date(event.date).toLocaleString("nl-BE", {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                      }) }}
                    </h3>
                    <p class="card-text">{{ event.signaling }}</p>
                    <h5>
                      <span
                        class="card-text badge badge-primary"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="PL-nummer"
                      >{{ event.plNumber }}</span>
                      <span
                        class="card-text badge badge-danger"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Eenheid"
                      >{{ event.unit }}</span>
                    </h5>
                    <p class="card-text">{{ event.description }}</p>
                    <p class="card-text">{{ event.location }}</p>
                    <!-- <h5 class="card-text"><span class="card-text badge badge-danger">{{ event.workplaceType.typeName }}</span></h5> -->
                  </div>
                </div>
              </div>

              <div
                v-for="event in notificationContent.administrative.secretariatNotifications"
                :key="event.id"
              >
                <div class="col card h-100">
                  <div class="card-body">
                    <h3 class="card-title display-5">
                      {{ new Date(event.date).toLocaleString("nl-BE", {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                      }) }}
                    </h3>
                    <p class="card-text">{{ event.signaling }}</p>
                    <h5>
                      <span
                        class="card-text badge badge-primary"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="PL-nummer"
                      >{{ event.plNumber }}</span>
                      <span
                        class="card-text badge badge-danger"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Eenheid"
                      >{{ event.unit }}</span>
                    </h5>
                    <p class="card-text">{{ event.description }}</p>
                    <p class="card-text">{{ event.location }}</p>
                    <h5></h5>
                  </div>
                </div>
              </div>

              <div v-for="event in notificationContent.technical.defects" :key="event.id">
                <div class="col card h-100">
                  <div class="card-body">
                    <h5 class="card-title">Logistiek</h5>
                    <p class="card-text">{{ new Date(event.date).toLocaleString("nl-BE") }}</p>
                    <p class="card-text">{{ event.description }}</p>
                    <!-- <h5 class="card-text"><span class="card-text badge badge-danger">{{ event.defectType.typeName }}</span></h5> -->
                  </div>
                </div>
              </div>

              <div v-for="event in notificationContent.technical.malfunctions" :key="event.id">
                <div class="col card h-100">
                  <div class="card-body">
                    <h5 class="card-title">Technisch</h5>
                    <p class="card-text">{{ new Date(event.date).toLocaleString("nl-BE") }}</p>
                    <p class="card-text">{{ event.description }}</p>
                    <p class="card-text">{{ event.duration }}</p>
                    <!-- <h5 class="card-text"><span class="card-text badge badge-danger">{{ event.malfunctionType.typeName }}</span></h5> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn-group d-flex" role="group" aria-label="Justified button group">
      <button
        id="operationalButton"
        type="button"
        class="btn btn-info"
        @click.prevent="getOperational"
      >Operationeel</button>
      <button
        id="workForceButton"
        type="button"
        class="btn btn-primary"
        @click.prevent="getWorkforce"
      >Personeel</button>
      <button
        id="technicalButton"
        type="button"
        class="btn btn-primary"
        @click.prevent="getTechnical"
      >Technisch</button>
    </div>
    <!-- Operational -->
    <section v-if="step == 'Operational'" class="container">
      <div v-if="Object.keys(reportContent.operational.operationalEvents).length === 0">
        <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
      </div>
      <div v-else class="row row-cols-1 row-cols-md-2">
        <div v-for="event in reportContent.operational.operationalEvents" :key="event.id">
          <div class="col card h-100">
            <p class="card-text">
              <img
                id="topright"
                src="../assets/edit-logo.png"
                alt="pas aan"
                @click="changeEventClick(String(event.id), 'operationalEvents')"
              />
            </p>
            <div class="card-body">
              <h3 class="card-title display-5">
                {{ new Date(event.date).toLocaleString("nl-BE", {
                hour: '2-digit',
                minute: '2-digit',
                }) }}
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
                >{{ event.plNumber }}</span>
                <span
                  class="card-text badge badge-danger"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Eenheid"
                >{{ event.unit }}</span>
              </h5>
              <div v-if="!(event.eventTypes === null)">
                <div v-for="type in event.eventTypes" :key="type.id">
                  <h5 class="card-text">
                      <div v-if="!(type.operationalType === null)">
                        <span class="card-text badge badge-secondary mr-1">{{ type.operationalType.typeName }}</span>
                        <span v-if="!(type.operationalSubtype === null)">
                          <span class="card-text badge badge-secondary">{{ type.operationalSubtype.typeName }}</span>
                      </span>
                      </div>
                  </h5>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Workforce -->
    <section v-if="step == 'Workforce'" class="container">
      <div
        v-if="(Object.keys(reportContent.administrative.workplaceEvents).length === 0) && (Object.keys(reportContent.administrative.secretariatNotifications).length === 0)"
      >
        <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
      </div>
      <div v-else class="row row-cols-1 row-cols-md-2">
        <div v-for="event in reportContent.administrative.workplaceEvents" :key="event.id">
          <div class="col card h-100">
            <p class="card-text">
              <img
                id="topright"
                src="../assets/edit-logo.png"
                alt="pas aan"
                @click="changeEventClick(String(event.id), 'workplaceEvents')"
              />
            </p>
            <div class="card-body">
              <h5 class="card-title">Voorval tijdens de dienst</h5>
              <h5 class="card-text">
                {{ new Date(event.date).toLocaleString("nl-BE", {
                hour: '2-digit',
                minute: '2-digit',
                }) }}
              </h5>
              <p class="card-text">{{ event.description }}</p>
              <p class="card-text">{{ event.absentee }} vervangen door {{ event.substitute }}</p>
              <!-- <h5 class="card-text"><span class="card-text badge badge-danger">{{ event.workplaceType.typeName }}</span></h5> -->
            </div>
          </div>
        </div>

        <div v-for="event in reportContent.administrative.secretariatNotifications" :key="event.id">
          <div class="col card h-100">
            <p class="card-text">
              <img
                id="topright"
                src="../assets/edit-logo.png"
                alt="pas aan"
                @click="changeEventClick(String(event.id), 'secretariatNotifications')"
              />
            </p>
            <div class="card-body">
              <h5 class="card-title">Melding aan het secretariaat</h5>
              <h5 class="card-text">
                {{ new Date(event.date).toLocaleString("nl-BE", {
                hour: '2-digit',
                minute: '2-digit',
                }) }}
              </h5>
              <p class="card-text">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Technical -->
    <section v-if="step == 'Technical'" class="container">
      <div
        v-if="(Object.keys(reportContent.technical.defects).length === 0) && (Object.keys(reportContent.technical.malfunctions).length === 0)"
      >
        <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
      </div>
      <div v-else class="row row-cols-1 row-cols-md-2">
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
                {{ new Date(event.date).toLocaleString("nl-BE", {
                hour: '2-digit',
                minute: '2-digit',
                }) }}
              </h5>
              <p class="card-text">{{ event.description }}</p>
              <!-- <h5 class="card-text"><span class="card-text badge badge-danger">{{ event.defectType.typeName }}</span></h5> -->
            </div>
          </div>
        </div>

        <div v-for="event in reportContent.technical.malfunctions" :key="event.id">
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
                {{ new Date(event.date).toLocaleString("nl-BE", {
                hour: '2-digit',
                minute: '2-digit',
                }) }}
              </h5>
              <p class="card-text">{{ event.description }}</p>
              <p class="card-text">{{ event.duration }}</p>
              <!-- <h5 class="card-text"><span class="card-text badge badge-danger">{{ event.malfunctionType.typeName }}</span></h5> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else>
    <h2>Dit verslag bestaat niet</h2>
  </div>
</template>

<script lang="ts">
/// BUG TODO veel reports laten events zien waarvan de datum niet overeenkomt met die van het report,
// hier is nochtans rekening mee gehouden in testdata,
// hierdoor tonen reports 7, 8, 13, 15, 18 geen events
import Vue from "vue";
import ReportingService from "../services/ReportingService";
export default Vue.extend({
  data: function() {
    return {
      step: "Operational",
      reportContent: {
        report: {
          id: 1,
          date: "2020-03-16T21:13:48.000Z",
          temporary: false,
          nightShift: true,
          createdAt: "",
          updatedAt: ""
        },
        operational: {
          operationalEvents: {}
        },
        administrative: {
          workplaceEvents: {},
          secretariatNotifications: {}
        },
        technical: {
          defects: {},
          malfunctions: {}
        }
      },
      emptyReport: {
        report: {
          id: 1,
          date: "2020-03-16T21:13:48.000Z",
          temporary: false,
          nightShift: true,
          createdAt: "",
          updatedAt: ""
        },
        operational: {
          operationalEvents: {}
        },
        administrative: {
          workplaceEvents: {},
          secretariatNotifications: {}
        },
        technical: {
          defects: {},
          malfunctions: {}
        }
      },
      priorityContent: {
        operational: {
          operationalEvents: {}
        }
      },
      emptyPriority: {
        operational: {
          operationalEvents: {}
        }
      },
      notificationContent: {
        administrative: {
          workplaceEvents: {},
          secretariatNotifications: {}
        },
        technical: {
          defects: {},
          malfunctions: {}
        }
      },
      emptyNotifications: {
        administrative: {
          workplaceEvents: {},
          secretariatNotifications: {}
        },
        technical: {
          defects: {},
          malfunctions: {}
        }
      },
      shift: ""
    };
  },

  watch: {
    reportContent: function() {
      this.loadPriority();
      this.setShift();
    },
    priorityContent: function() {
      this.loadNotifications();
    },
    
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData: function() {
      ReportingService.getAllReports(
        "/api/reports/content/" + String(this.$route.query.reportId)
      ).then(res => (this.reportContent = res));

      // this.loadReportContent();

    },

    setShift: function() {
      if(this.reportContent.report != null){
        if(this.reportContent.report.nightShift != null){
          if(this.reportContent.report.nightShift)
            this.shift = "Nachtshift ☾";
          else
            this.shift = "Dagshift 🌣";
        }
      }
    },

    loadPriority: function(){
      ReportingService.getAllReports(
        "/api/reports/priority/" + String(this.$route.query.reportId)
      ).then(res => (this.priorityContent = res));
    },
    loadNotifications: function(){
      ReportingService.getAllReports(
        "/api/reports/notifications/" + String(this.$route.query.reportId)
      ).then(res => (this.notificationContent = res));
    },
    loadReportContent: function() {
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
              plNumber: null,
              description: null,
              priority: null,
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
              duration: "1:01",
              createdAt: "2020-05-04T07:47:37.000Z",
              updatedAt: "2020-05-04T07:47:37.000Z"
            }
          ]
        }
      };
      this.priorityContent = {
        operational: {
          operationalEvents: [
            {
              id: 5,
              authorId: 1,
              operationalId: 1,
              signaling: "Seining persoon",
              plNumber: "PL03170202",
              description: null,
              priority: true,
              location: null,
              unit: "BIHORI",
              date: "2020-03-16T00:18:57.000Z",
              createdAt: "2020-05-04T21:58:27.000Z",
              updatedAt: "2020-05-04T21:58:27.000Z"
            }
          ]
        }
      };
      this.notificationContent = {
        administrative: {
          workplaceEvents: [
            {
              id: 1,
              authorId: 1,
              administrativeId: 1,
              absentee: "Jan Jacobs",
              substitute: "Geordy Hendricks",
              monitoring: true,
              date: "2020-03-30T15:46:36.000Z",
              createdAt: "2020-05-04T21:58:27.000Z",
              updatedAt: "2020-05-04T21:58:27.000Z"
            }
          ],
          secretariatNotifications: [
            {
              id: 1,
              authorId: 1,
              administrativeId: 1,
              absentee: "Jan Jacobs",
              substitute: "Geordy Hendricks",
              monitoring: true,
              date: "2020-03-30T15:46:36.000Z",
              createdAt: "2020-05-04T21:58:27.000Z",
              updatedAt: "2020-05-04T21:58:27.000Z"
            }
          ]
        },
        technical: {
          defects: [],
          malfunctions: []
        }
      };
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
          subcategorie: String(subcat)
        }
      });
    }
  },

});
</script>

<style scoped>
.card {
  display: inline-block;
}

#topright {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  height: 30px;
  width: 30px;
  margin-top: 10px;
  margin-right: 10px;
  text-indent: -999em;
  text-decoration: none;
}
</style>
