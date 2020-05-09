<template>
  <div class="container pt-5 pb-5">
    <h2 v-if="this.reportContent.report == null">Error</h2>
    <h1 v-else>
      Verslag van
      {{
      new Date(reportContent.report.date).toLocaleString("en-BE", {
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
      <div class="col">
        <div class="card w-100">
          <div class="card-header bg-primary text-white">Operationeel met prioriteit</div>
          <div class="card-body">
            <div v-if="this.priorityContent.operational == {}">
              <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
            </div>
            <div v-else class="row row-cols-1">
              <div v-for="event in priorityContent.operational.operationalEvents" :key="event.id">
                <div class="col card h-100">
                  <div class="card-body">
                    <h3 class="card-title display-5">
                      {{ new Date(event.date).toLocaleString("en-BE", {
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
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="card w-100">
          <div class="card-header bg-primary text-white">Meldingen</div>
          <div class="card-body">
            <div v-if="this.notificationContent.administrative == {}">
              <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
            </div>
            <div v-else class="row row-cols-1">
              <div v-for="event in notificationContent.administrative.replacements" :key="event.id">
                <div class="col card h-100">
                  <div class="card-body">
                    <h3 class="card-title display-5">
                      {{ new Date(event.date).toLocaleString("en-BE", {
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
                <div class="col mx-5 px-0 card h-100">
                  <div class="card-body">
                    <h3 class="card-title display-5">
                      {{ new Date(event.date).toLocaleString("en-BE", {
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
              <div
                v-for="event in notificationContent.administrative.secretariatNotifications"
                :key="event.id"
              >
                <div class="col card h-100">
                  <div class="card-body">
                    <h3 class="card-title display-5">
                      {{ new Date(event.date).toLocaleString("en-BE", {
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="btn-group d-flex" role="group" aria-label="Justified button group">
      <button type="button" class="btn btn-primary" @click.prevent="getOperational">Operationeel</button>
      <button type="button" class="btn btn-primary" @click.prevent="getWorkforce">Personeel</button>
      <button type="button" class="btn btn-primary" @click.prevent="getTechnical">Technisch</button>
    </div>

    <section v-if="step == 'Operational'" class="container">
      <div v-if="this.reportContent.operational == {}">
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
                @click="changeEventClick(parseInt(event.id))"
              />
            </p>
            <div class="card-body">
              <h3 class="card-title display-5">
                {{ new Date(event.date).toLocaleString("en-BE", {
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
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="step == 'Workforce'" class="container">
      <div v-if="this.reportContent.administrative == {}">
        <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
      </div>
      <div v-else class="row row-cols-1 row-cols-md-2">
        <div v-for="event in reportContent.administrative.replacements" :key="event.id">
          <div class="col card h-100">
            <div class="card-body">
              <h5 class="card-title">Vervanging</h5>
              <h5 class="card-text">
                <img
                  id="topright"
                  src="../assets/edit-logo.png"
                  alt="pas aan"
                  @click="changeEventClick(parseInt(event.id))"
                />
                {{ new Date(event.date).toLocaleString("en-BE", {
                hour: '2-digit',
                minute: '2-digit',
                }) }}
              </h5>
              <p class="card-text">{{ event.absentee }} vervangen door {{ event.substitute }}</p>
            </div>
          </div>
        </div>

        <div v-for="event in reportContent.administrative.workplaceEvents" :key="event.id">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Voorval tijdens de dienst</h5>
              <h5 class="card-text">
                {{ new Date(event.date).toLocaleString("en-BE", {
                hour: '2-digit',
                minute: '2-digit',
                }) }}
              </h5>
              <p class="card-text">{{ event.description }}</p>
              <p class="card-text">{{ event.absentee }} vervangen door {{ event.substitute }}</p>
            </div>
          </div>
        </div>

        <div v-for="event in reportContent.administrative.workplaceEvents" :key="event.id">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Melding aan het secretariaat</h5>
              <h5 class="card-text">
                {{ new Date(event.date).toLocaleString("en-BE", {
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

    <section v-if="step == 'Technical'">
      <div v-if="this.reportContent.technical == {}">
        <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
      </div>
      <div v-else>
        <div v-for="event in reportContent.technical.defects" :key="event.id">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Logistiek</h5>
              <h5 class="card-text">
                <img
                  id="topright"
                  src="../assets/edit-logo.png"
                  alt="pas aan"
                  @click="changeEventClick(parseInt(event.id))"
                />
                {{ new Date(event.date).toLocaleString("en-BE", {
                hour: '2-digit',
                minute: '2-digit',
                }) }}
              </h5>
              <p class="card-text">{{ event.description }}</p>
            </div>
          </div>
        </div>

        <div v-for="event in reportContent.administrative.malfunctions" :key="event.id">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Technisch</h5>
              <h5 class="card-text">
                {{ new Date(event.date).toLocaleString("en-BE", {
                hour: '2-digit',
                minute: '2-digit',
                }) }}
              </h5>
              <p class="card-text">{{ event.description }}</p>
              <p class="card-text">{{ event.duration }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
export default Vue.extend({
  data: function() {
    return {
      step: "Operational",
      reportContent: {},
      priorityContent: {},
      notificationContent: {},
      shift: ""
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData: function() {
      // ReportingService.getAllReports(
      //   "/api/reports/content/" + this.$route.query.reportId
      // ).then(res => (this.reportContent = res));
      // ReportingService.getAllReports(
      //   "/api/reports/priority/" + this.$route.query.reportId
      // ).then(res => (this.priorityContent = res));
      // ReportingService.getAllReports(
      //   "/api/reports/notifications/" + this.$route.query.reportId
      // ).then(res => (this.notificationContent = res));

      this.reportContent = {
        report: {
          id: 1,
          date: "2020-03-16T21:13:48.000Z",
          temporary: false,
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
          replacements: [
            {
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
            }
          ],
          workplaceEvents: [],
          secretariatNotifications: [
            {
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
            }
          ]
        },
        technical: {
          defects: [],
          malfunctions: [
            {
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
          replacements: [
            {
              id: 1,
              authorId: 1,
              administrativeId: 1,
              absentee: "Jan Jacobs",
              substitute: "Geordy Hendricks",
              monitoring: true,
              date: "2020-03-30T15:46:36.000Z",
              shift: true,
              createdAt: "2020-05-04T21:58:27.000Z",
              updatedAt: "2020-05-04T21:58:27.000Z"
            }
          ],
          workplaceEvents: [],
          secretariatNotifications: [
            {
              id: 1,
              authorId: 1,
              administrativeId: 1,
              absentee: "Jan Jacobs",
              substitute: "Geordy Hendricks",
              monitoring: true,
              date: "2020-03-30T15:46:36.000Z",
              shift: true,
              createdAt: "2020-05-04T21:58:27.000Z",
              updatedAt: "2020-05-04T21:58:27.000Z"
            }
          ]
        },
        technical: { defects: [], malfunctions: [] }
      };

      /* if(this.reportContent.report != null){
        if(this.reportContent.report.nightShift != null){
          if(this.reportContent.report.nightShift)
            this.shift = "Nachtshift ☾";
          else
            this.shift = "Dagshift 🌣";
        }
      } */
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
    changeEventClick: function(id: string) {
      this.$router.push({
        path: "changeevent",
        query: {
          reportId: this.reportContent.report.id,
          eventId: id,
          categorie: this.step
        }
      });
    }
  }
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
