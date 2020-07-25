<template>
<div class="reports">
  <div id="nav">
    <router-link to="/">Startscherm</router-link>
  </div>

  <div v-if="reports" class="container">
    <h1>Verslagen</h1>
    <div class="row">
      <form class="col-md-4">
        <p class="mb-1 text-sm-left">Selecteer hier de datums:</p>
        <VueRangedatePicker class="mb-5" @selected="onDateSelected" i18n="EN" :months="months" :shortDays="shortDays" :captions="captions" :presetRanges="presetRanges"></VueRangedatePicker>
        <div class="filter-select">
          <treeselect placeholder="Choose filters" v-model="value" :multiple="true" :options="options" />
          <button type="button" class="btn btn-info">Filter</button>
        </div>
      </form>
      <div class="col-md-8">
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
      </div>
    </div>
    <vPagination :classes="bootstrapPaginationClasses" v-model="currentPage" :page-count="pages"></vPagination>
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import ReportingService from "../services/ReportingService";
import vPagination from "vue-plain-pagination";
import VueRangedatePicker from "vue-rangedate-picker";
import Treeselect from "@riophae/vue-treeselect";
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

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
  data: function () {
    return {
      reports: [] as any[],
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
        today: function () {
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
        thisMonth: function () {
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
        lastMonth: function () {
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
        last7days: function () {
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
        last30days: function () {
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
      // define the default value
      value: [],
      options: [{
          id: 'signaling',
          label: 'Seining',
          children: [{ // names of all signalings
            id: 'signaling-jan',
            label: 'Seining Jan',
          }],
        }, {
          id: 'plNumber',
          label: 'PL-nummer',
          children: [{ // names of all plNumbers
            id: 'plNumber',
            label: '007',
          }],
        }, {
          id: 'description',
          label: 'Beschrijving',
          children: [{ // names of all descriptions
            id: 'description',
            label: 'bes',
          }],
        }, {
          id: 'location',
          label: 'Adres',
          children: [{ // names of all locations
            id: 'location-hasselt',
            label: 'Hasselt',
          }],
        }, {
          id: 'unit',
          label: 'Unit',
          children: [{ // names of all units
            id: 'unit-kampla',
            label: 'KAMPLA',
          }],
        }, {
          id: 'absentee',
          label: 'Afwezige',
          children: [{ // names of all personel
            id: 'absentee-jan',
            label: 'Jan',
          }],
        },
        {
          id: 'substitute',
          label: 'Vervanger',
          children: [{ // names of all personel
            id: 'substitute-jan',
            label: 'Jan',
          }],
        },
        {
          id: 'types',
          label: 'Types',
          children: [ // all types
            {
              id: 'operational-types',
              label: 'Operationeel',
              children: [ // all operational types
                {
                  id: 'operational-types-operator',
                  label: 'Bevraging GSM operatoren',
                },
                {
                  id: 'operational-types-bin',
                  label: 'BIN-alarm',
                },
                {
                  id: 'operational-types-pursuit',
                  label: 'Grensoverschrijdende achtervolging',
                },
                {
                  id: 'operational-types-signaling',
                  label: 'Signalering',
                },
                {
                  id: 'operational-types-specific',
                  label: 'Specifieke gebeurtenis',
                },
                {
                  id: 'operational-types-helicopter',
                  label: 'Zoeken met helikopter',
                },
              ],
            },
            {
              id: 'workplaceevent-types',
              label: 'Voorval tijdens de dienst',
              children: [ // all workplaceevent types
                {
                  id: 'workplaceevent-types-accident',
                  label: 'Arbeidsongeval',
                },
                {
                  id: 'workplaceevent-types-sick',
                  label: 'Ziekte',
                },
              ],
            },
            {
              id: 'administrative-types',
              label: 'Logistiek',
              children: [ // all administrative types
                {
                  id: 'administrative-types-vehicle',
                  label: 'Schade aan voertuig',
                },
              ],
            },
            {
              id: 'technical-types',
              label: 'Technisch',
              children: [ // all technical types
                {
                  id: 'technical-types-announcement-others',
                  label: 'Verwittiging (anderen)',
                },
                {
                  id: 'technical-types-announcement-asc',
                  label: 'Verwittiging ASC',
                },
                {
                  id: 'technical-types-object',
                  label: 'Voorwerp',
                },
              ],
            }
          ],
        }
      ],
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
      ReportingService.getPaginationReports(
        this.currentPage * 10 - 10,
        this.selectedDate
      ).then(res => (this.reports = res));
    },
    onDateSelected: function (daterange: DateRange) {
      this.selectedDate = daterange;
    },

    loadCount: function () {
      ReportingService.getReportCount(this.selectedDate).then(res =>
        this.calculatePages(res.count)
      );
    },

    calculatePages: function (count: number) {
      this.pages = Math.ceil(count / 10);
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
      if (nightShift) return "Nachtshift ☾";

      return "Dagshift 🌣";
    }
  },
  beforeDestroy: function () {
    window.clearInterval(this.interval);
  },
  watch: {
    currentPage: {
      handler() {
        // alert("request");
        this.loadData();
        // this.loaded = true;
      },
      deep: true
    },
    selectedDate: {
      handler() {
        // alert("request");
        this.loadData();
        // this.loaded = true;
      },
      deep: true
    },

    reports: {
      handler() {
        this.loadCount();
      },
      deep: true
    }
  }
});
</script>
