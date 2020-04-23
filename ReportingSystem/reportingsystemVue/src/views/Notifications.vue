<template>
  <div v-if="reports">
    <h1>Meldingen</h1>
    <!-- die moet loopen door een dubbele array, 
    reports is een array met daarin de table arrays -->
    <div class="container my-2" v-for="table in reports" :key="table.id">
      <div class="container my-2" v-for="report in table" :key="report.id">
        <button
          class="btn btn-secondary btn-lg btn-block"
          v-on:click="reportClick(parseInt(report.id))"
        >
          {{ new Date(report.date).toLocaleString('en-BE') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ReportingService from '../services/ReportingService';
export default Vue.extend({
  data: function() {
    return {
      reports: [],
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData: function() {
      const response = ReportingService.getAllReports(
        '/api/reports/monitored'
      ).then((res) => (this.reports = res));
    },

    reportClick: function(id: string) {
      this.$router.push({ path: 'reportView', query: { reportId: id } });
    },
  },
});
</script>
