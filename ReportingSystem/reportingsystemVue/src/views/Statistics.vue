<template>
  <div class="statistics">
    <h1>Statistieken</h1>

    <div class="container">
      <div class="row" v-for="(value, index) in reports" :key="value.id">
        <div v-if="index % 2 == 1">
          <div class="card text-center">
            <h5 class="card-title">{{ getTypeName(value[0]) }}</h5>
            <div class="card-block">
              <p class="card-text">{{ getTypeNumber(value[0]) }}</p>
            </div>
          </div>
        </div>
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
      ReportingService.getAllReports('/api/statistics/types').then(
        (res) => (this.reports = res)
      );
    },
    reportClick: function(id: string) {
      this.$router.push({ path: 'reportView', query: { reportId: id } });
    },
    splitString: function(str: string) {
      return str.split(':');
    },
    getTypeName: function(str: string) {
      const splitted = this.splitString(str);
      return splitted[0];
    },
    getTypeNumber: function(str: string) {
      const splitted = this.splitString(str);
      return splitted[1];
    },
  },
});
</script>
