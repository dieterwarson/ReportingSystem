<template>
  <div v-if="reports">
    <p>{{ reportIds }}</p>
    <p>{{ reports }}</p>
    <p>{{ reportIds.length }}</p>
    <p>{{ len }}</p>
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
      len: 0
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData: function() {
      if (this.$route.query.keyword != null) {
        this.keyword = String(this.$route.query.keyword);
      }

      if (
        this.keyword == "" ||
        this.keyword == null ||
        this.keyword == undefined
      ) {
        ReportingService.getAllReports("/api/reports/all").then(
          res => (this.reports = res)
        );
      } else {
        // haalt juist alle reports op die aan de search voldoen
        // reportIds wordt juist gevuld
        var arr: number[] = [];
        ReportingService.getSearchReports(
          "/api/reports/search/" + this.keyword
        ).then(res => (arr = res));

        console.log(arr); // []
        console.log(arr[0]); // undefined
        console.log(arr.length);  // 0
        console.log(typeof arr);  // object
        console.log(typeof arr[0]); //undefined
        console.log(typeof arr.length); // number

        var te = [5, 4];
        console.log(this.reportIds[0]); // undefined
        console.log(this.reportIds);  // [__ob__: Et]
        console.log(te);  // (2) [5, 4]
        console.log(te[0]); //  5
        console.log(typeof this.reportIds[0]);  // undefined
        console.log(typeof this.reportIds); // object
        console.log(typeof te); // object
        console.log(typeof te[0]);  // number

        // de get functie zelf werkt, maar die gaat gwn niet in de loop
        for (const id in this.reportIds) {
          ReportingService.getAllReports("/api/reports/one/" + id).then(res =>
            this.reports.push(res)
          );
        }

        // miss is het iets met de lengte, ik heb hier geprobeerd om met echt een number te werken, maar werkt ook niet
        this.len = this.reportIds.length;
        for (let i = 0; i < this.len; i++) {
          // die geraakt hier niet in
          this.reportIds.push(1);
        }

        this.reportIds.forEach(element => {
          // hier geraakt die ook niet in
          console.log(element);
          this.reportIds.push(element);
        });
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
