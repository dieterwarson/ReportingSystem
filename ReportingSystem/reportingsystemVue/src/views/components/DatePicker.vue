<script>
export default {
  DatePicker: {
    i18n: "EN",
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
      /* month: function() {
        const n = new Date();
        const startToday = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 0, 0);
        const endToday = new Date(n.getFullYear(), n.getMonth(), n.getDate() + 1, 23, 59);
        return {
          label: "Huidige dag",
          active: false,
          dateRange: {
            start: startToday,
            end: endToday,
          },
        };
      }, */
    },
  },
};
</script>
