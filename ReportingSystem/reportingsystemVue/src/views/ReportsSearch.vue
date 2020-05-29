<template>
<div class="search">
<div id="nav">
    <router-link to="/">Startscherm</router-link>
  </div>
<div v-if="reports.length != 0">
  <h1>Gevonden verslagen</h1>
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
      <span class="badge badge-primary ml-3">{{ getShift(value.nightShift) }}</span>
      <h5 class="card-text"> Zoekresultaat: {{value.description}}</h5>
    </button>
  </h5>
</div>
<div v-else>
  <h1>Geen verslagen gevonden.</h1>
</div>
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
        },
        {
          nightShift: Boolean
        }
      ],
      keyword: "",
      plNumber: "",
      keywordIndex: 0,
      keywordSplit: [] as string[]
    };
  },
  created() {
    this.loadData();
    setInterval(this.loadData, 5000);
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
        this.keywordSplit = this.keyword.split(/[\s,\-,_]+/);
        this.loadKeywordReports(this.keyword);
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
    loadKeywordReports: function (keyword: string) {
      keyword = keyword.replace("/","");
      keyword = keyword.replace(".","");
      keyword = keyword.replace("?","");
      keyword = keyword.replace("!","");
      keyword = keyword.replace("_","");
      keyword = keyword.replace(" ","");
      keyword = keyword.replace("-"," ");

      if (keyword === '') {
        keyword = "invalid_character"
      }
      ReportingService.getSearchReports(
          "/api/reports/search/" + keyword
        )
        .then(res => (this.reports = res))
        .then(() => {
          if (this.reports.length == 0) {
            for (this.keywordIndex; this.keywordIndex < this.keywordSplit.length; this.keywordIndex++) {
              const word = this.keywordSplit[this.keywordIndex];
              this.loadKeywordReports(word);
            }
          }
        })
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
    },

    getShift: function (nightShift: boolean) {
      if (nightShift)
        return "Nachtshift ☾";

      return "Dagshift 🌣";
    },
  }
});
</script>

<style scoped>
.card-text {
  margin-top: 1rem;
}
</style>
