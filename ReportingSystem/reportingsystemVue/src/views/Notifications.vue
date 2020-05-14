<template>
  <div class="container pt-5 pb-5">
    <h1>
      Meldingen
    </h1>
    <section>
      <div class="row my-5" v-if="this.monitored != this.emptyMonitored">
        <div class="col">
          <div class="card w-100">
            <h5 class="card-header bg-primary text-white">Administratief</h5>
            <div class="card-body">
              <div v-if="this.monitored.administrative == this.emptyMonitored.administrative">
                <p class="card-text">
                  Er zijn nog geen gebeurtenissen van deze categorie
                </p>
              </div>
              <div v-else class="row row-cols-1">
                <div
                  v-for="event in monitored.administrative.workplaceEvents"
                  :key="event.id"
                >
                  <div class="col">
                    <div class="card h-100 mb-3">
                      <h5 class="card-header bg-secondary">Vervanging</h5>
                      <div class="card-body">
                        <p class="card-text">
                          {{ new Date(event.date).toLocaleString("en-BE") }}
                        </p>
                        <p class="card-text">{{ event.description }}</p>
                        <p class="card-text">
                          {{ event.absentee }} vervangen door
                          {{ event.substitute }}
                        </p>
                        <h5 class="card-text"><span class="card-text badge badge-danger">{{ event.workplaceType.typeName }}</span></h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-for="event in monitored.administrative
                    .secretariatNotifications"
                  :key="event.id"
                >
                  <div class="col">
                    <div class="card h-100 mb-3">
                      <h5 class="card-header bg-secondary">Melding aan het secretariaat</h5>
                      <div class="card-body">
                        <p class="card-text">
                          {{ new Date(event.date).toLocaleString("en-BE") }}
                        </p>
                        <p class="card-text">{{ event.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col">
          <div class="card w-100">
            <h5 class="card-header bg-primary text-white">Defecten</h5>
            <div class="card-body">
              <div v-if="this.monitored.technical == this.emptyMonitored.technical">
                <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
              </div>
              <div v-else class="row row-cols-1">
                <div
                  v-for="event in monitored.technical.defects"
                  :key="event.id"
                >
                  <div class="col">
                    <div class="card h-100 mb-3">
                      <h5 class="card-header bg-secondary">Logistiek</h5>
                      <div class="card-body">
                        <p class="card-text">
                          {{ new Date(event.date).toLocaleString("en-BE") }}
                        </p>
                        <p class="card-text">{{ event.description }}</p>
                        <h5 class="card-text"><span class="card-text badge badge-danger">{{ event.defectType.typeName }}</span></h5>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-for="event in monitored.technical.malfunctions"
                  :key="event.id"
                >
                  <div class="col">
                    <div class="card h-100 mb-3">
                      <h5 class="card-header bg-secondary">Technisch</h5>
                      <div class="card-body">
                        <p class="card-text">
                          {{ new Date(event.date).toLocaleString("en-BE") }}
                        </p>
                        <p class="card-text">{{ event.description }}</p>
                        <p class="card-text">{{ event.duration }}</p>
                        <h5 class="card-text"><span class="card-text badge badge-danger">{{ event.malfunctionType.typeName }}</span></h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      monitored: {"administrative":{ "workplaceEvents":[],"secretariatNotifications":[]},"technical":{"defects":[],"malfunctions":[]}},
      emptyMonitored: {"administrative":{ "workplaceEvents":[],"secretariatNotifications":[]},"technical":{"defects":[],"malfunctions":[]}}
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData: function() {
      const response = ReportingService.getAllReports(
       '/api/reports/monitored'
      ).then((res) => (this.monitored = res));

      // this.monitored = {"administrative":{"replacements":[{"id":1,"authorId":1,"administrativeId":1,"absentee":"Jan Jacobs","substitute":"Geordy Hendricks","monitoring":true,"date":"2020-03-30T15:46:36.000Z","shift":true,"createdAt":"2020-05-09T12:41:05.000Z","updatedAt":"2020-05-09T12:41:05.000Z"}],"workplaceEvents":[],"secretariatNotifications":[{"id":1,"authorId":1,"administrativeId":1,"description":"Jan Janssens Inp ziek","monitoring":true,"date":"2020-03-16T19:19:49.000Z","shift":true,"createdAt":"2020-05-09T12:41:05.000Z","updatedAt":"2020-05-09T12:41:05.000Z"},{"id":2,"authorId":1,"administrativeId":1,"description":"Remans Luc Inp ziek","monitoring":true,"date":"2020-03-16T19:21:46.000Z","shift":true,"createdAt":"2020-05-09T12:41:05.000Z","updatedAt":"2020-05-09T12:41:05.000Z"}]},"technical":{"defects":[],"malfunctions":[{"id":1,"authorId":1,"technicalId":1,"malfunctionTypeId":1,"description":"lekkende kraan in kamer 304","monitoring":true,"date":"2020-04-15T13:03:57.000Z","duration":6,"createdAt":"2020-05-09T12:41:05.000Z","updatedAt":"2020-05-09T12:41:05.000Z"}]}}
      },

    reportClick: function(id: string) {
      this.$router.push({ path: "reportView", query: { reportId: id } });
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
  },
});
</script>
