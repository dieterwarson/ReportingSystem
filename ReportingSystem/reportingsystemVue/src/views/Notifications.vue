<template>
  <div class="container pt-5 pb-5">
    <h1>
      Meldignen
      {{ new Date(reportContent.report.date).toLocaleString('en-BE') }}
    </h1>
    <div
      class="btn-group d-flex"
      role="group"
      aria-label="Justified button group"
    >
      <button
        type="button"
        class="btn btn-primary"
        @click.prevent="getOperational"
      >
        Operationeel
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click.prevent="getWorkforce"
      >
        Personeel
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click.prevent="getTechnical"
      >
        Technisch
      </button>
    </div>

    <section v-if="step == 'Operational'">
      <div v-if="this.reportContent.operational == {}">
        <p>Er zijn nog geen gebeurtenissen van deze categorie</p>
      </div>
      <div v-else>
        <div
          v-for="event in reportContent.operational.operationalEvents"
          :key="event.id"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                {{ new Date(event.date).toLocaleString('en-BE') }}
              </h5>
              <p class="card-text">{{ event.signaling }}</p>
              <p class="card-text">{{ event.plNumber }}</p>
              <p class="card-text">{{ event.description }}</p>
              <p class="card-text">{{ event.location }}</p>
              <p class="card-text">{{ event.unit }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="step == 'Workforce'">
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

    <section v-if="step == 'Technical'">
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

      this.reportContent = {
        report: {
          id: 1,
          date: '2020-03-16T21:13:48.000Z',
          temporary: false,
          createdAt: '2020-04-23T14:25:02.000Z',
          updatedAt: '2020-04-23T14:25:02.000Z',
        },
        operational: {},
        administrative: {
          id: 1,
          administrativeId: 1,
          authorId: 1,
          absentee: 'Jan Jacobs',
          substitute: 'Geordy Hendricks',
          monitoring: true,
          date: '2020-03-30T15:46:36.000Z',
          shift: true,
          createdAt: '2020-04-23T18:43:57.000Z',
          updatedAt: '2020-04-23T18:43:57.000Z',
        },
        technical: {},
      };
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
