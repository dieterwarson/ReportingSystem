<template>
  <div v-if="results">
    <h1>Verslagen</h1>
    <div class="container my-2" v-for="value in results.reports" :key="value.id">
      <button class="btn btn-secondary btn-lg btn-block"> 
        {{ value.date + ", gemaakt door " + value.user.username}}
      </button>
    </div>
  </div> 
</template>


<script lang="ts">
import Vue from 'vue'
import ReportingService from "../services/ReportingService"
export default Vue.extend({
    async data() {
        const response = await ReportingService.getAllReports({});
        alert(response);
      return{
        results: response //  {"reports":[{"id":2,"date":"2020-03-16T21:13:48.000Z","user":{"username":"jan_janssens"}},{"id":3,"date":"2020-03-16T21:13:48.000Z","user":{"username":"jan_janssens"}},{"id":4,"date":"2020-03-15T11:13:48.000Z","user":{"username":"jan_janssens"}}]}
      }
    }


})
</script>