<template lang="pug">
  div.chart
    canvas(ref="chartCanvas")
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const chartCanvas = ref(null);
    let chartInstance = null;

    const salesData = computed(() => store.state.salesData);
    const filters = computed(() => store.state.filters);

    const createChart = () => {
      if (!Array.isArray(salesData.value) || salesData.value.length === 0) {
        return;
      }

      let filteredSalesData = salesData.value;

      let chartDatasets = [
        {
          label: 'Categoria A',
          data: filteredSalesData
              .filter(item => item.category === 'A')
              .map(data => data.sales),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Categoria B',
          data: filteredSalesData
              .filter(item => item.category === 'B')
              .map(data => data.sales),
          backgroundColor: 'rgba(192, 100, 50, 0.2)',
          borderColor: 'rgba(192, 100, 50, 1)',
          borderWidth: 1,
        },
      ];

      if (filters.value.category) {
        filteredSalesData = filteredSalesData.filter(sale => sale.category === filters.value.category);

        chartDatasets = chartDatasets.filter(dataset =>
            filters.value.category ? dataset.label.includes(filters.value.category) : true
        );
      }

      const ctx = chartCanvas.value.getContext('2d');
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Array.from(new Set(filteredSalesData.map(data => data.month))),
          datasets: chartDatasets
        }
      });
    };

    const updateChart = () => {
      let filteredSalesData = salesData.value;

      if (filters.value.category) {
        filteredSalesData = filteredSalesData.filter(sale => sale.category === filters.value.category);
      }

      const updatedDatasets = [
        {
          label: 'Categoria A',
          data: filteredSalesData
              .filter(item => item.category === 'A')
              .map(data => data.sales),
          backgroundColor: 'rgba(192, 100, 50, 0.2)',
          borderColor: 'rgba(192, 100, 50, 1)',
          borderWidth: 1,
        },
        {
          label: 'Categoria B',
          data: filteredSalesData
              .filter(item => item.category === 'B')
              .map(data => data.sales),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }
      ];

      const filteredDatasets = updatedDatasets.filter(dataset =>
          filters.value.category ? dataset.label.includes(filters.value.category) : true
      );

      if (chartInstance) {
        chartInstance.data.labels = Array.from(new Set(filteredSalesData.map(data => data.month)));
        chartInstance.data.datasets = filteredDatasets;
        chartInstance.update();
      }
    };

    onMounted(() => {
      Chart.register(...registerables);
      createChart();
    });

    watch(store.state.filters, () => {
      updateChart();
    });

    watch(salesData, (newSalesData) => {
      if (newSalesData.length) {
        if (chartInstance) {
          updateChart();
        } else {
          createChart();
        }
      }
    });

    return { chartCanvas };
  },
};
</script>