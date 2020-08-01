<template>
  <div class="reports">
    <div id="nav">
      <router-link to="/">Startscherm</router-link>
    </div>
    <div v-if="reports.reports" class="container">
      <h1>Verslagen</h1>
      <div class="row">
        <form class="col-md-4">
          <p class="mb-1 text-sm-left">Selecteer hier de datums:</p>
          <VueRangedatePicker
            class="mb-5"
            @selected="onDateSelected"
            i18n="EN"
            :months="months"
            :shortDays="shortDays"
            :captions="captions"
            :presetRanges="presetRanges"
          ></VueRangedatePicker>
          <!-- Selection box for filters -->
          <div class="filter-select">
            <treeselect
              placeholder="Kies filters"
              v-model="value.chosenValues"
              :multiple="true"
              :options="options"
            />
          </div>
        </form>
        <div class="col-md-8">
          <div v-if="filteredReports.reports.length == 0">

            <div class="container my-2" v-for="value in reports.reports" :key="value.id">
              <button class="btn btn-secondary btn-lg btn-block">
                {{
                  new Date(value[0].date).toLocaleString("nl-BE", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })
                }}
                <!--- Only displays nightshift button if it's included in the list --->
                <span class="badge badge-primary ml-3" v-on:click="reportClick(String(value[0].id))">{{ getShift(value[0].nightShift) }} </span>
                <span v-if="value.length == 2" class="badge badge-primary ml-3" v-on:click="reportClick(String(value[1].id))">{{ getShift(value[1].nightShift) }}</span>
              </button>
            </div>
          
          </div>
          <div v-else>
            <div class="container my-2" v-for="value in filteredReports.reports" :key="value.id">
              <button class="btn btn-secondary btn-lg btn-block">
                {{
                  new Date(value.date).toLocaleString("nl-BE", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })
                }}
                <span class="badge badge-primary ml-3" v-on:click="reportClick(String(value.id))">{{ getShift(value.nightShift) }} </span>
              </button>
            </div>

          </div>
        </div>
      </div>
      <vPagination
        :classes="bootstrapPaginationClasses"
        v-model="currentPage"
        :page-count="pages"
      ></vPagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import vPagination from "vue-plain-pagination";
import VueRangedatePicker from "vue-rangedate-picker";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { log } from "util";

interface DateRange {
  start: string;
  end: string;
}

export default Vue.extend({
  components: {
    vPagination,
    VueRangedatePicker,
    Treeselect
  },
  data: function() {
    return {
      typesFound: false,
      length: 0,
      a: [] as any[],
      aa: [] as any[],
      testarray: [] as any[],
      reportTypesArray: [] as any[],
      reportTypes: {},
      reports: {
        reports: [] as any[],
        count: 0
      },
      list: [],
      interval: 0,
      currentPage: 1,
      bootstrapPaginationClasses: {
        ul: "pagination",
        li: "page-item",
        liActive: "active",
        liDisable: "disabled",
        button: "page-link"
      },
      pages: 1,
      selectedDate: {
        start: "",
        end: ""
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
        "December"
      ],
      shortDays: ["ma", "di", "woe", "do", "vrij", "zat", "zo"],
      captions: {
        title: "Kies de datums",
        okButton: "Toepassen"
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
              end: endToday
            }
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
              end: endMonth
            }
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
              end: endMonth
            }
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
              end: end
            }
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
              end: end
            }
          };
        }
      },
      filteredReports: {
        reports: [] as any[],
        count: 0
      },
      types: [] as string[],

      value: { // bevat de gekozen filter(s)
        chosenValues: []
      }, 
      options: [
        // {
        //   id: "signaling",
        //   label: "Signalering",
        //   children: [
        //     {
        //       // names of all signalings
        //       id: "signaling-jan",
        //       label: "Signalering Jan"
        //     }
        //   ]
        // },
        // {
        //   id: "plNumber",
        //   label: "PL-nummer",
        //   children: [
        //     {
        //       // names of all plNumbers
        //       id: "plNumber",
        //       label: "007"
        //     }
        //   ]
        // },
        // {
        //   id: "description",
        //   label: "Beschrijving",
        //   children: [
        //     {
        //       // names of all descriptions
        //       id: "description",
        //       label: "bes"
        //     }
        //   ]
        // },
        // {
        //   id: "location",
        //   label: "Adres",
        //   children: [
        //     {
        //       // names of all locations
        //       id: "location-hasselt",
        //       label: "Hasselt"
        //     }
        //   ]
        // },
        // {
        //   id: "unit",
        //   label: "Unit",
        //   children: [
        //     {
        //       // names of all units
        //       id: "unit-kampla",
        //       label: "KAMPLA"
        //     }
        //   ]
        // },
        // {
        //   id: "absentee",
        //   label: "Afwezige",
        //   children: [
        //     {
        //       // names of all personel
        //       id: "absentee-jan",
        //       label: "Jan"
        //     }
        //   ]
        // },
        // {
        //   id: "substitute",
        //   label: "Vervanger",
        //   children: [
        //     {
        //       // names of all personel
        //       id: "substitute-jan",
        //       label: "Jan"
        //     }
        //   ]
        // },
        {
          id: "types",
          label: "Types",
          children: [
            // all types
            {},
          ]
        }
      ]
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
    loadData: function() {
      if (this.filteredReports.reports.length == 0) {
        ReportingService.getPaginationReports(
          this.currentPage * 10 - 10,
          this.selectedDate
        ).then(res => (this.reports.reports = res));
      } else {
        this.reports.reports = this.filteredReports.reports;
      }
      ReportingService.getAllReports("/api/statistics/types").then(
        res => (this.reportTypes = res, this.reportTypesArray = [res]) 
      )
    },
    onDateSelected: function(daterange: DateRange) {
      this.selectedDate = daterange;
    },

    loadCount: function() {
      if (this.filteredReports.reports.length == 0) {
        ReportingService.getReportCount(this.selectedDate).then(res =>
          this.calculatePages(res.count)
        );      
      } else {
        this.pages = this.filteredReports.count;
      }
    },

    calculatePages: function(count: number) {
      this.pages = Math.ceil(count / 10);
    },

    reportClick: function(id: string) {
      this.$router.push({
        path: "reportView",
        query: {
          reportId: id
        }
      });
    },

    getShift: function(nightShift: boolean) {
      if (nightShift) return "Nachtshift ☾";

      return "Dagshift 🌣";
    },

    fillOptions: function() {
      const types: any = this.reportTypes;

      if (!this.typesFound)
        this.fillOptionsTypes();

      return 1;
    },
    fillOptionsTypes: function() {
      for (let i = 0; i < this.options.length; i++) {
        const option = this.options[i];
        option.children.pop(); // children begint met een lege default waarde
        
        if (option.id == "types") {
          const reportTypes: any = this.reportTypes;

          for (const [key, value] of Object.entries(reportTypes)) {
            const valueArr: any = value;

            // onze hard-coded velden zijn in het Engels, hiermee worden de velden 
            // die getoond worden omgezet naar Nederlands
            let type = key;
            switch (key) {
              case "operationalTypes":
                type = "Operationeel"
                break;
              case "workplaceTypes":
                type = "Voorval tijdens de dienst"
                break
              case "defectTypes":
                type = "Logistiek"
                break;
              case "malfunctionTypes":
                type = "Technisch"
                break;
              default:
                break;
            }

            const children: any[] = [];
            for (const val of valueArr) {
              const child = {
                'id': val.typeName,
                'label': val.typeName,
              }

              this.addToTypes(val.typeName);

              children.push(child);
            }

            const val = {
              'id': key,
              'label': type,
              'children': children
            }
            option.children.push(val);
          }
        }
      }
      this.typesFound = true;
    },

    getFiltered: function() {
      ReportingService.getFiltered({selectedTypes: this.value, selectedDate: this.selectedDate, types: this.types, offset: this.currentPage * 10 - 10, numPages: 10}).then(
        (res) => (this.filteredReports = res)
      )
    },

    addToTypes: function(type: string) {
      this.types.push(type);
    },
  },

  beforeDestroy: function() {
    window.clearInterval(this.interval);
  },

  watch: {
    currentPage: {
      handler() {
        this.loadData();
      },
      deep: true
    },
    
    selectedDate: {
      handler() {
        this.loadData();
      },
      deep: true
    },

    reports: {
      handler() {
        this.loadCount();
      },
      deep: true
    },

    reportTypes: {
      handler() {
        this.fillOptions();
      }
    },

    value: {
      handler() {
        this.getFiltered();
      },
      deep: true,
    },
  },
});
</script>
