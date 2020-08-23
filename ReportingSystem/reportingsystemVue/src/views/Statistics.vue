<template>
  <div class="statistics">
    <div id="nav">
      <router-link to="/">Startscherm</router-link>
    </div>
    <h1>Statistieken</h1>
    <div class="container mt-5">
      <div class="row">
        <div v-if="this.reportTypes === {}">
          <p>Er zijn nog geen types</p>
        </div>
        <form v-else id="typeSelector" class="col-md-6">
          <div
            class="btn-group d-flex mt-4"
            role="group"
            aria-label="Justified button group"
          >
            <button
              id="statisticsButton"
              type="button"
              class="btn btn-primary border-primary"
              @click.prevent="getTypeStatistics"
            >
              Per type
            </button>
            <button
              id="userStatisticsButton"
              type="button"
              class="btn btn-secondary border-primary"
              @click.prevent="getUserStatistics"
            >
              Per gebruiker
            </button>
          </div>
          <p class="mb-1 mt-4 text-sm-left">Selecteer hier de datums:</p>
          <VueRangedatePicker
            class="mb-5"
            @selected="onDateSelected"
            i18n="EN"
            :months="months"
            :shortDays="shortDays"
            :captions="captions"
            :presetRanges="presetRanges"
          >
          </VueRangedatePicker>
          <div class="text-sm-left">
            <input
              type="checkbox"
              id="operationalParent"
              v-on:change="selectAll('operational')"
            />
            <label>
              <h5>Operationeel</h5>
            </label>
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
            <label>
              <h5>Voorval tijdens de dienst</h5>
            </label>
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
            <label>
              <h5>Logistiek</h5>
            </label>
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
            <label>
              <h5>Technisch</h5>
            </label>
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
          <download-csv
            class="btn btn-primary"
            :data="combinedData"
            name="filename.csv"
          >
            Download CSV ⬇
          </download-csv>
          <button @click.prevent="getPDF" class="btn btn-primary ">
            Download PDF ⬇
          </button>
        </form>

        <div class="col-md-6">
          <!-- charts -->
          <PieChart v-if="loaded" :chartdata="PieData" />
          <ScatterChart
            v-if="loaded"
            :chartdata="LineData"
            :options="options"
          />
          <h5 v-else class="mt-10">
            Selecteer de gewenste types om grafieken te zien
          </h5>
          <p>{{ this.statisticsData }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import ScatterChart from "../views/components/ScatterChart.vue";
import PieChart from "../views/components/PieChart.vue";
import VueRangedatePicker from "vue-rangedate-picker";
import JsonCSV from "vue-json-csv";

Vue.component("downloadCsv", JsonCSV);

interface DateRange {
  start: string;
  end: string;
}

export default Vue.extend({
  data: function() {
    return {
      step: "Statistics",
      reportTypes: {},
      selectedTypes: {
        operational: [],
        workplaceevent: [],
        defect: [],
        malfunction: [],
      },
      combinedData: {},
      statisticsData: {
        counts: [
          {
            typeName: "Arbeidsongeval",
            count: 5,
          },
          {
            typeName: "Ziekte",
            count: 3,
          },
          {
            typeName: "Schade aan voertuig",
            count: 4,
          },
          {
            typeName: "Verwittiging (anderen)",
            count: 1,
          },
          {
            typeName: "Verwittiging ASC",
            count: 1,
          },
          {
            typeName: "Voorwerp",
            count: 3,
          },
        ],
        lineContent: [],
      },
      loaded: false,
      PieData: {},
      LineData: {},
      selectedDate: {
        start: "",
        end: "",
      },
      months: [
        "Januari",
        "Februari",
        "Maart",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Augustus",
        "September",
        "October",
        "November",
        "December",
      ],
      shortDays: ["ma", "di", "woe", "do", "vrij", "zat", "zo"],
      captions: {
        "title": "Kies de datums",
        "ok_button": "Toepassen",
      },
      presetRanges: {
        today: function() {
          const n = new Date();
          const startToday = new Date(
            n.getFullYear(),
            n.getMonth(),
            n.getDate() + 1,
            0,
            0
          );
          const endToday = new Date(
            n.getFullYear(),
            n.getMonth(),
            n.getDate() + 1,
            23,
            59
          );
          return {
            label: "Huidige dag",
            active: false,
            dateRange: {
              start: startToday,
              end: endToday,
            },
          };
        },
        thisMonth: function() {
          const n = new Date();
          const startMonth = new Date(
            Date.UTC(n.getFullYear(), n.getMonth(), 1)
          );
          const endMonth = new Date(
            Date.UTC(n.getFullYear(), n.getMonth() + 1, 0)
          );
          return {
            label: "Deze maand",
            active: false,
            dateRange: {
              start: startMonth,
              end: endMonth,
            },
          };
        },
        lastMonth: function() {
          const n = new Date();
          const startMonth = new Date(
            Date.UTC(n.getFullYear(), n.getMonth() - 1, 1)
          );
          const endMonth = new Date(Date.UTC(n.getFullYear(), n.getMonth(), 0));
          return {
            label: "Vorige maand",
            active: false,
            dateRange: {
              start: startMonth,
              end: endMonth,
            },
          };
        },
        last7days: function() {
          const n = new Date();
          const start = new Date(
            Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - 6)
          );
          const end = new Date(
            Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())
          );
          return {
            label: "Vorige 7 dagen",
            active: false,
            dateRange: {
              start: start,
              end: end,
            },
          };
        },
        last30days: function() {
          const n = new Date();
          const start = new Date(
            Date.UTC(n.getFullYear(), n.getMonth(), n.getDate() - 30)
          );
          const end = new Date(
            Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())
          );
          return {
            label: "Vorige 30 dagen",
            active: false,
            dateRange: {
              start: start,
              end: end,
            },
          };
        },
      },
    };
  },

  mounted() {
    this.loadData();
  },

  components: {
    ScatterChart,
    PieChart,
    VueRangedatePicker,
  },

  methods: {
    loadData: function() {
      ReportingService.getAllReports("/api/statistics/types").then(
        (res) => (this.reportTypes = res)
      );
    },

    combineData() {
      this.combinedData = this.statisticsData.counts.concat(
        this.statisticsData.lineContent
      );
    },

    getTypeStatistics: function() {
      if (this.step != "Statistics") {
        this.step = "Statistics";
        const statisticsButton = document.getElementById("statisticsButton")!;
        const userStatisticsButton = document.getElementById("userStatisticsButton")!;
        statisticsButton.classList.replace("btn-secondary", "btn-primary");
        userStatisticsButton.classList.replace("btn-primary", "btn-secondary");
        this.getStatistics();
      }
    },
    getUserStatistics: function() {
      if (this.step != "UserStatistics") {
        this.step = "UserStatistics";
        const statisticsButton = document.getElementById("statisticsButton")!;
        const userStatisticsButton = document.getElementById("userStatisticsButton")!;
        statisticsButton.classList.replace("btn-primary", "btn-secondary");
        userStatisticsButton.classList.replace("btn-secondary", "btn-primary");
        this.getUStatistics();
      }
    },

    onDateSelected: function(daterange: DateRange) {
      this.selectedDate = daterange;
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
      this.PieData = {
        datasets: [
          {
            data,
          },
        ],
        labels,
      };
    },

    getLineData: function() {
      this.LineData = {
        datasets: this.statisticsData.lineContent,
      };
    },

    getStatistics: function() {
      ReportingService.getStatistics({
        selectedTypes: this.selectedTypes,
        selectedDate: this.selectedDate,
      }).then((res) => (this.statisticsData = res));
      this.combineData();
    },
    getUStatistics: function() {
      ReportingService.getUserStatistics({
        selectedTypes: this.selectedTypes,
        selectedDate: this.selectedDate,
      }).then((res) => (this.statisticsData = res));
      this.combineData();
    },
    getPDF: function(){
      ReportingService.getPDF().then((response) => {
      alert(response);
      const newBlob = new Blob([response], {type: "application/pdf"});
      const fileURL = window.URL.createObjectURL(newBlob);
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.download = "page.pdf";
      document.body.appendChild(fileLink);
      fileLink.click();
      setTimeout(function(){
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(fileURL);
        }, 100);
      });
    }
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
    selectedDate: {
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
      this.combineData();
      if(this.statisticsData.counts.length !== 0)
        this.loaded = true;
      else
        this.loaded = false;
    },
  },
});
</script>

<style scoped>
input {
  margin-right: 10px;
}
</style>
