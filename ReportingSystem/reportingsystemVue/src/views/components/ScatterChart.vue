<script>
import { Scatter } from "vue-chartjs";

export default {
  extends: Scatter,
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
        /* tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const label = this.chartdata.LineData[tooltipItem.index].label;
              return (
                label +
                ": (" +
                tooltipItem.xLabel +
                ", " +
                tooltipItem.yLabel +
                ")"
              );
            },
          },
        }, */
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
