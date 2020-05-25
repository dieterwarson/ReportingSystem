<template>
<div v-if="reports">
  <h1>Verslagen</h1>
  <h5 class="container my-2 card-title" v-for="value in reports" :key="value.reportId">
    <button class="btn btn-secondary btn-lg btn-block" v-on:click="reportClick(String(value.reportId))">
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
      <h5 class="card-text"> Zoekresultaat: {{value.description}}</h5>
    </button>
  </h5>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
export default Vue.extend({
  data: function () {
    return {
      reports: [{
          reportId: Number
        },
        {
          description: String
        },
        {
          date: Date
        }
      ],
      keyword: "",
      plNumber: ""
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    /**
     * Loads the correct reports.
     */
    loadData: function () {
      if (this.$route.query.keyword != null)
        this.keyword = String(this.$route.query.keyword);
      if (this.$route.query.plNumber != null)
        this.plNumber = String(this.$route.query.plNumber);

      if (
        this.keyword == "" ||
        this.keyword == null ||
        this.keyword == undefined
      ) {
        this.loadPlReports();
      } else {
        this.loadKeywordReports();
      }
    },
    /**
     * Finds the reports which contain an event that contains the pl-number partially.
     */
    loadPlReports: function () {
      ReportingService.getSearchReports(
        "/api/reports/pl/" + this.plNumber
      ).then(res => (this.reports = res));
    },
    /**
     * Finds the reports which contain an event that contains the keyword partially.
     */
    loadKeywordReports: function () {
      ReportingService.getSearchReports(
        "/api/reports/search/" + this.keyword
      ).then(res => (this.reports = res));
    },

    /**
     * Handles when a report is pushed. Will show the content of the report.
     */
    reportClick: function (id: string) {
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

<style scoped>
.card-text {
  margin-top: 1rem;
}
</style>
