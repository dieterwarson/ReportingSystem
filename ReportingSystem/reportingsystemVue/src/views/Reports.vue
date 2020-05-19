<template>
  <div v-if="reports">
    {{reports}}
    <h1>Verslagen</h1>
    <div class="container my-2" v-for="value in reports" :key="value.id">
      <button
        class="btn btn-secondary btn-lg btn-block"
        v-on:click="reportClick(String(value.id))"
      >
        {{
          new Date(value.date).toLocaleString([], {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          })
        }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
export default Vue.extend({
  data: function() {
    return {
      reportIds: [] as number[],
      reports: [] as any[],
      keyword: "",
      plNumber: ""
    };
  },

  mounted() {
    this.loadData();
  },

  watch: {
    reportIds: function() {
      this.reportIds.forEach(id => {
        ReportingService.getAllReports("/api/reports/one/" + id).then(res =>
          this.reports.push(res)
        );
      });
    }
  },

  methods: {
    loadData: function() {
      if (this.$route.query.keyword != null) {
        this.keyword = String(this.$route.query.keyword);
      }
      if (this.$route.query.plNumber != null) {
        this.plNumber = String(this.$route.query.plNumber);
      }

      if (
        (this.keyword == "" ||
          this.keyword == null ||
          this.keyword == undefined) &&
        (this.plNumber == "" ||
          this.plNumber == null ||
          this.plNumber == undefined)
      ) {
        ReportingService.getAllReports("/api/reports/all").then(
          res => (this.reports = res)
        );
      } else if (
        this.keyword == "" ||
        this.keyword == null ||
        this.keyword == undefined
      ) {
        ReportingService.getSearchReports(
          "/api/reports/pl/" + this.plNumber
        ).then(res => (this.reportIds = res));
      } else {
        ReportingService.getSearchReports(
          "/api/reports/search/" + this.keyword
        ).then(res => (this.reportIds = res));
      }
    },

    reportClick: function(id: string) {
      this.$router.push({
        path: "reportView",
        query: {
          reportId: id
        }
      });
    }
  }
});
</script>
