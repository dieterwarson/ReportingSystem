<template>
  <div class="container pt-5 pb-5">
    <h1>
      Meldingen
      {{ new Date(reportContent.report.date).toLocaleString('en-BE') }}
    </h1>

    <section>
      <h2>Administratief</h2>
      <div v-if="this.reportContent.administrative == {}">
        <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
      </div>
      <div v-else>
        <div
          v-for="event in reportContent.administrative.replacements"
          :key="event.id"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Vervanging</h5>
              <p class="card-text">
                {{ new Date(event.date).toLocaleString('en-BE') }}
              </p>
              <p class="card-text">
                {{ event.absentee }} vervangen door {{ event.substitute }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-for="event in reportContent.administrative.workplaceEvents"
          :key="event.id"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Voorval tijdens de dienst</h5>
              <p class="card-text">
                {{ new Date(event.date).toLocaleString('en-BE') }}
              </p>
              <p class="card-text">{{ event.description }}</p>
              <p class="card-text">
                {{ event.absentee }} vervangen door {{ event.substitute }}
              </p>
            </div>
          </div>
        </div>

        <div
          v-for="event in reportContent.administrative.workplaceEvents"
          :key="event.id"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Melding aan het secretariaat</h5>
              <p class="card-text">
                {{ new Date(event.date).toLocaleString('en-BE') }}
              </p>
              <p class="card-text">{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>Technisch</h2>
      <div v-if="this.reportContent.technical == {}">
        <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
      </div>
      <div v-else>
        <div v-for="event in reportContent.technical.defects" :key="event.id">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Logistiek</h5>
              <p class="card-text">
                {{ new Date(event.date).toLocaleString('en-BE') }}
              </p>
              <p class="card-text">{{ event.description }}</p>
            </div>
          </div>
        </div>

        <div
          v-for="event in reportContent.administrative.malfunctions"
          :key="event.id"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Technisch</h5>
              <p class="card-text">
                {{ new Date(event.date).toLocaleString('en-BE') }}
              </p>
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
import Vue from 'vue';
import ReportingService from '../services/ReportingService';
export default Vue.extend({
  data: function() {
    return {
      step: 'Operational',
      reportContent: {},
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData: function() {
      // const response = ReportingService.getAllReports(
      //   '/api/reports/monitored' + this.$route.query.reportId
      // ).then((res) => (this.reportContent = res));

      this.reportContent = {"report":{"id":1,"date":"2020-03-16T21:13:48.000Z","temporary":false,"createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"},"operational":{"operationalEvents":[{"id":1,"operationalId":1,"authorId":1,"operationalTypeId":1,"monitoring":true,"signaling":"Verlies inschrijvingsbewijs","plNumber":null,"description":null,"location":null,"unit":"KEMPLA","date":"2020-03-16T18:13:48.000Z","createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"},{"id":2,"operationalId":1,"authorId":1,"operationalTypeId":2,"monitoring":true,"signaling":null,"plNumber":"PL031770168","description":null,"location":null,"unit":"CARMA","date":"2020-03-16T21:34:37.000Z","createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"},{"id":3,"operationalId":1,"authorId":1,"operationalTypeId":3,"monitoring":true,"signaling":null,"plNumber":"PL03170104","description":null,"location":null,"unit":"HANO","date":"2020-03-16T22:05:18.000Z","createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"},{"id":4,"operationalId":1,"authorId":1,"operationalTypeId":4,"monitoring":true,"signaling":"Seining persoon","plNumber":null,"description":null,"location":null,"unit":"LAMA","date":"2020-03-16T23:34:33.000Z","createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"},{"id":5,"operationalId":1,"authorId":1,"operationalTypeId":5,"monitoring":true,"signaling":"Seining persoon","plNumber":null,"description":null,"location":null,"unit":"LOON","date":"2020-03-16T23:57:10.000Z","createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"},{"id":6,"operationalId":1,"authorId":1,"operationalTypeId":6,"monitoring":true,"signaling":"Seining persoon","plNumber":"PL03170202","description":null,"location":null,"unit":"BIHORI","date":"2020-03-16T00:18:57.000Z","createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"},{"id":7,"operationalId":1,"authorId":1,"operationalTypeId":7,"monitoring":true,"signaling":null,"plNumber":"PL03170104","description":null,"location":null,"unit":"HANO","date":"2020-03-16T00:45:45.000Z","createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"},{"id":8,"operationalId":1,"authorId":1,"operationalTypeId":8,"monitoring":true,"signaling":null,"plNumber":"PL03170315","description":null,"location":null,"unit":"LRH","date":"2020-03-16T01:21:25.000Z","createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"},{"id":9,"operationalId":1,"authorId":1,"operationalTypeId":9,"monitoring":true,"signaling":null,"plNumber":"PL03170322","description":null,"location":null,"unit":"LRH","date":"2020-03-16T01:51:47.000Z","createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"}]},"administrative":{"replacements":[{"id":1,"administrativeId":1,"authorId":1,"absentee":"Jan Jacobs","substitute":"Geordy Hendricks","monitoring":true,"date":"2020-03-30T15:46:36.000Z","shift":true,"createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"}],"workplaceEvents":[{"id":1,"administrativeId":1,"authorId":1,"workplaceTypeId":1,"description":"Jacob sleutelbeen gebroken","absentee":"Jacob Franssen","substitute":"James Brook","monitoring":true,"date":"2020-12-11T09:10:23.000Z","shift":false,"createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"}],"secretariatNotifications":[{"id":1,"administrativeId":1,"authorId":1,"absentee":"Jan Jacobs","substitute":"Geordy Hendricks","monitoring":true,"date":"2020-03-30T15:46:36.000Z","shift":true,"createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"}]},"technical":{"defects":[{"id":1,"technicalId":1,"authorId":1,"defectTypeId":1,"description":"lekkende kraan in kamer 304","monitoring":true,"date":"2020-04-15T13:03:57.000Z","createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"},{"id":2,"technicalId":1,"authorId":1,"defectTypeId":2,"description":"krakende deur in kamer 512","monitoring":true,"date":"2020-04-15T16:58:34.000Z","createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"}],"malfunctions":[{"id":1,"technicalId":1,"authorId":1,"malfunctionTypeId":1,"description":"lekkende kraan in kamer 304","monitoring":true,"date":"2020-04-15T13:03:57.000Z","duration":6,"createdAt":"2020-04-23T20:00:09.000Z","updatedAt":"2020-04-23T20:00:09.000Z"}]}};
    },

    reportClick: function(id: string) {
      this.$router.push({ path: 'reportView', query: { reportId: id } });
    },

    getOperational: function() {
      if (this.step != 'Operational') this.step = 'Operational';
    },
    getWorkforce: function() {
      if (this.step != 'Workforce') this.step = 'Workforce';
    },
    getTechnical: function() {
      if (this.step != 'Technical') this.step = 'Technical';
    },
  },
});
</script>
