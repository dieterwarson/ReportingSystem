<template>
  <div class="statistics">
    <h1>Statistieken</h1>

    <div class="container mt-5">
      <div class="row">
        <div v-if="this.reportTypes === {}">
          <p>Er zijn nog geen types</p>
        </div>
        <form v-else id="typeSelector" class="col-md-6">
          <div class="text-sm-left">
            <input
              type="checkbox"
              id="operationalParent"
              v-on:change="selectAll('operational')"
            />
            <label><h5>Operationeel</h5></label>
            <div class="checkbox-container text-sm-left col-sm-7">
              <div
                v-for="value in this.reportTypes.operationalTypes"
                :key="value.id"
              >
                <div class="typecontainer text-lg-left" id="operational">
                  <input
                    type="checkbox"
                    :id="value.typeName"
                    :value="value.typeName"
                    v-model="selectedTypes.operational"
                  />
                  <label>{{ value.typeName }}</label>
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              id="workplaceParent"
              v-on:change="selectAll('workplace')"
            />
            <label><h5>Voorval tijdens de dienst</h5></label>
            <div class="checkbox-container text-sm-left col-sm-7">
              <div
                v-for="value in this.reportTypes.workplaceTypes"
                :key="value.id"
              >
                <div class="typecontainer text-lg-left" id="workplace">
                  <input
                    type="checkbox"
                    :id="value.typeName"
                    :value="value.typeName"
                    v-model="selectedTypes.workplaceevent"
                  />
                  <label>{{ value.typeName }}</label>
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              id="defectParent"
              v-on:change="selectAll('defect')"
            />
            <label><h5>Logistiek</h5></label>
            <div class="checkbox-container text-sm-left col-sm-7">
              <div
                v-for="value in this.reportTypes.defectTypes"
                :key="value.id"
              >
                <div class="typecontainer text-lg-left" id="defect">
                  <input
                    type="checkbox"
                    :id="value.typeName"
                    :value="value.typeName"
                    v-model="selectedTypes.defect"
                  />
                  <label>{{ value.typeName }}</label>
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              id="malfunctionParent"
              v-on:change="selectAll('malfunction')"
            />
            <label><h5>Technisch</h5></label>
            <div class="checkbox-container text-sm-left col-sm-7">
              <div
                v-for="value in this.reportTypes.malfunctionTypes"
                :key="value.id"
              >
                <div class="typecontainer text-lg-left" id="malfunction">
                  <input
                    type="checkbox"
                    :id="value.typeName"
                    :value="value.typeName"
                    v-model="selectedTypes.malfunction"
                  />
                  <label>{{ value.typeName }}</label>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div class="col-md-6">
          <!-- charts -->
          <PieChart v-if="loaded" :chartdata="PieData" />
          <LineChart v-if="loaded" :chartdata="LineData" :options="options" />
        </div>
      </div>
    </div>
    <span>Types: {{ selectedTypes }}</span>
    <span>Data: {{ LineData }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import LineChart from "../views/components/LineChart.vue";
import PieChart from "../views/components/PieChart.vue";
export default Vue.extend({
  data: function() {
    return {
      reportTypes: {},
      selectedTypes: {
        operational: [],
        workplaceevent: [],
        defect: [],
        malfunction: [],
      },
      statisticsData: {
        counts: [
          { typeName: "Arbeidsongeval", count: 5 },
          { typeName: "Ziekte", count: 3 },
          { typeName: "Schade aan voertuig", count: 4 },
          { typeName: "Verwittiging (anderen)", count: 1 },
          { typeName: "Verwittiging ASC", count: 1 },
          { typeName: "Voorwerp", count: 3 },
        ],
        lineContent: []
      },
      loaded: false,
      PieData: {},
      LineData: {},
    };
  },

  mounted() {
    this.loadData();
  },

  components: {
    LineChart,
    PieChart,
  },

  methods: {
    loadData: function() {
      ReportingService.getAllReports("/api/statistics/types").then(
        (res) => (this.reportTypes = res)
      );

      /* this.reportTypes = {
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

    selectAll: function(section: string) {
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

    getPieData: function() {
      const count = this.statisticsData.counts;
      const labels: string[] = [];
      const data: number[] = [];
      for (let i = 0; i < count.length; i++) {
        labels.push(count[i].typeName);
        data.push(count[i].count);
      }
      this.PieData = { datasets: [{ data }], labels };
    },

    getLineData: function() {
      this.LineData = {
        datasets: this.statisticsData.lineContent
      };

      /*       {datasets: [
          {
            label: "Demo",
            data: [
              {
                t: new Date("2015-3-15 13:3"),
                y: 12,
              },
              {
                t: new Date("2015-3-25 13:2"),
                y: 21,
              },
              {
                t: new Date("2015-4-25 14:12"),
                y: 32,
              },
            ],
          },
        ]} */
    },

    getStatistics: function() {
      ReportingService.getStatistics(this.selectedTypes).then(
        (res) => (this.statisticsData = res)
      );
    },
  },
  watch: {
    selectedTypes: {
      handler() {
        // alert("request");
        this.getStatistics();
        // this.loaded = true;
      },
      deep: true,
    },
    statisticsData: function() {
      this.getPieData();
      this.getLineData();
      this.loaded = true;
    },
  },
});
</script>
