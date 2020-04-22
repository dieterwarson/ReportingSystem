<template>
  <div v-if="reports">
    <h1>Statistieken</h1>

    <div class="container my-2" v-for="value in reports" :key="value.id">
      <button
        class="btn btn-secondary btn-lg btn-block"
        v-on:click="reportClick(parseInt(value.id))"
      >
        {{
          new Date(value.date).toLocaleString('en-BE') +
            '   -   gemaakt door ' +
            value.user.username
        }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ReportingService from '../services/ReportingService';
export default Vue.extend({
  data() {
    return {
      reports: [],
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData: function() {
      const response = ReportingService.getAllReports('/api/reports/all').then(
        (res) => (this.reports = res)
      );
    },

    reportClick: function(id: string) {
      this.$router.push({ path: 'reportView', query: { reportId: id } });
    },
  },
});
</script>
