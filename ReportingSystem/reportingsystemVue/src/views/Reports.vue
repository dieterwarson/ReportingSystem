<template>
  <div v-if="reports">
    <h1>Verslagen</h1>
    <div class="container my-2" v-for="value in reports" :key="value.id">
      <button
        class="btn btn-secondary btn-lg btn-block"
        v-on:click="reportClick(parseInt(value.id))"
      >
        {{ new Date(value.date).toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit', hour12: false})}}
      </button>
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
