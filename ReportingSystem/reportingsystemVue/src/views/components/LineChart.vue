<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
  },

  data: function() {
    return {
      options: {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                displayFormats: {
                  quarter: "MMM D",
                },
              },
              distribution: "linear",
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },

  watch: {
    chartdata: {
      handler() {
        this.renderChart(this.chartdata, this.options);
      },
      deep: true,
    },
  },

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
