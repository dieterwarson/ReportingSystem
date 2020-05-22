<template>
<div class="statistics">
  <h1>Statistieken</h1>

  <div class="container mt-5">
    <div v-if="this.reportTypes === {}">
      <p>Er zijn nog geen types</p>
    </div>
    <form v-else id="typeSelector">
      <div class="text-sm-left">
        <input type="checkbox" id="operationalParent" @change="selectAll('operational')" />
        <label>
          <h5>Operationeel</h5>
        </label>
        <div class="checkbox-container text-sm-left col-sm-4">
          <div v-for="value in this.reportTypes.operationalTypes" :key="value.id">
            <div class="typecontainer text-lg-left" id="operational">
              <input type="checkbox" :id="value.typeName" :value="value.typeName" v-model="selectedTypes" />
              <label>{{ value.typeName }}</label>
            </div>
          </div>
        </div>
        <input type="checkbox" id="workplaceParent" @change="selectAll('workplace')" />
        <label>
          <h5>Voorval tijdens de dienst</h5>
        </label>
        <div class="checkbox-container text-sm-left col-sm-4">
          <div v-for="value in this.reportTypes.workplaceTypes" :key="value.id">
            <div class="typecontainer text-lg-left" id="workplace">
              <input type="checkbox" :id="value.typeName" :value="value.typeName" v-model="selectedTypes" />
              <label>{{ value.typeName }}</label>
            </div>
          </div>
        </div>
        <input type="checkbox" id="defectParent" @change="selectAll('defect')" />
        <label>
          <h5>Logistiek</h5>
        </label>
        <div class="checkbox-container text-sm-left col-sm-4">
          <div v-for="value in this.reportTypes.defectTypes" :key="value.id">
            <div class="typecontainer text-lg-left" id="defect">
              <input type="checkbox" :id="value.typeName" :value="value.typeName" v-model="selectedTypes" />
              <label>{{ value.typeName }}</label>
            </div>
          </div>
        </div>
        <input type="checkbox" id="malfunctionParent" @change="selectAll('malfunction')" />
        <label>
          <h5>Technisch</h5>
        </label>
        <div class="checkbox-container text-sm-left col-sm-4">
          <div v-for="value in this.reportTypes.malfunctionTypes" :key="value.id">
            <div class="typecontainer text-lg-left" id="malfunction">
              <input type="checkbox" :id="value.typeName" :value="value.typeName" v-model="selectedTypes" />
              <label>{{ value.typeName }}</label>
            </div>
          </div>
        </div>
      </div>
    </form>

    <span>Types: {{ selectedTypes }}</span>
    <span>Data: {{ statisticsData }}</span>
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
export default Vue.extend({
  data: function () {
    return {
      reportTypes: {},
      selectedTypes: [],
      statisticsData: {}
    };
  },

  mounted() {
    this.loadData();
  },

  methods: {
    loadData: function () {
      ReportingService.getAllReports("/api/statistics/types").then(
        res => (this.reportTypes = res)
      );

      /*       this.reportTypes = {
        operationalTypes: [
          { id: 1, typeName: "Specifieke gebeurtenis" },
          { id: 2, typeName: "Grensoverschrijdende achtervolging" },
          { id: 3, typeName: "BIN-alarm" },
          { id: 4, typeName: "Signalering" },
          { id: 5, typeName: "Bevraging GSM operatoren" },
          { id: 6, typeName: "Zoeking met helikopter" },
        ],
        workplaceTypes: [
          { id: 1, typeName: "Arbeidsongeval" },
          { id: 2, typeName: "Ziekte" },
        ],
        defectTypes: [{ id: 1, typeName: "Schade aan voertuig" }],
        malfunctionTypes: [
          { id: 3, typeName: "Verwittiging (anderen)" },
          { id: 2, typeName: "Verwittiging ASC" },
          { id: 1, typeName: "Voorwerp" },
        ],
      }; */
    },

    selectAll: function (section: string) {
      const checks = document.querySelectorAll(
        "#" + section + ' input[type="checkbox"]'
      );

      const parent = document.getElementById(
        section + "Parent"
      ) as HTMLInputElement;
      const status = parent.checked;

      for (let i = 0; i < checks.length; i++) {
        const check = checks[i] as HTMLInputElement;
        if (check.checked != status) check.click();
      }
    },

    getStatistics: function () {
      if (this.selectedTypes != []) {
        ReportingService.getStatistics(this.selectedTypes).then(
          res => (this.statisticsData = res)
        );
      }
    }
  },
  watch: {
    selectedTypes: function () {
      // alert("request");
      this.getStatistics();
    }
  }
});
</script>
