<script>
import { Doughnut } from "vue-chartjs";
import 'chartjs-plugin-colorschemes';

export default {
  extends: Doughnut,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
  },

  data: function(){
    return {options: {
        plugins: {
            colorschemes: {
                scheme: 'tableau.Classic20'
            }
        }
    }
    }
  },

  watch: {
    chartdata: {
      handler() {
        this.renderChart(this.chartdata, this.options);
      },
      deep: true,
    },
  },

  mounted () {
    this.renderChart(this.chartdata, this.options);
  }

}
</script>