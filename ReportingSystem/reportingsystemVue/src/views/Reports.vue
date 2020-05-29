<template>
<div v-if="reports" class="container">
  <h1>Verslagen</h1>
  <div class="container my-2" v-for="value in reports" :key="value.id">
    <button class="btn btn-secondary btn-lg btn-block" v-on:click="reportClick(String(value.id))">
      {{
        new Date(value.date).toLocaleString("nl-BE", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false
        })
      }}
      <span class="badge badge-primary ml-3">{{ getShift(value.nightShift) }}</span>
    </button>
  </div>
  <vPagination :classes="bootstrapPaginationClasses" v-model="currentPage" :page-count="pages"></vPagination>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import vPagination from 'vue-plain-pagination';
export default Vue.extend({
  components: {
    vPagination
  },
  data: function () {
    return {
      reports: [] as any[],
      list: [],
      interval: 0,
      currentPage: 1,
      bootstrapPaginationClasses: {
        ul: 'pagination',
        li: 'page-item',
        liActive: 'active',
        liDisable: 'disabled',
        button: 'page-link'  
      },
      pages: 1,
    };
  },
  created() {
    this.loadData();
    this.interval = window.setInterval(this.loadData, 5000);
  },
  mounted() {
    this.loadData();
    this.loadCount();
  },

  methods: {
    loadData: function () {
      ReportingService.getPaginationReports(this.currentPage*10 - 10).then(
        res => (this.reports = res)
      );
    },

    loadCount: function(){
      ReportingService.getAllReports("api/reports/count").then(
        res => (this.calculatePages(res.count))
      );
    },

    calculatePages: function(count: number) {
      this.pages = Math.ceil(count/10);
    },

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

    
  },
  beforeDestroy: function() {
      window.clearInterval(this.interval);
  },
  watch: {
    currentPage: {
      handler() {
        // alert("request");
        this.loadData();
        // this.loaded = true;
      },
      deep: true,
    },
  }
});
</script>
