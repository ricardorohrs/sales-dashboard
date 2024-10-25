<template lang="pug">
  Navbar
  div.dashboard

  div.filters
    Filters(@update-filters="updateFilters" :filters="filters")

  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <v-container class="chart">
          SalesChart
        </v-container>
      </v-col>
      <v-col cols="12" md="4">
        <v-container class="table">
          ProductTable
        </v-container>
      </v-col>
    </v-row>
  </v-container>

  <v-row>
    <v-col cols="12">
      <v-container>
        SalesHeatMap
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import SalesChart from '../components/SalesChart.vue';
import ProductTable from '../components/ProductTable.vue';
import Filters from '../components/Filters.vue';
import SalesHeatMap from '../components/SalesHeatMap.vue';
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
    SalesChart,
    ProductTable,
    Filters,
    SalesHeatMap
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch('fetchSalesData');
      store.dispatch('fetchProductsData');
    });

    const salesData = computed(() => store.state.salesData);
    const filters = computed(() => store.state.filters);
    const topProducts = computed(() => store.state.productsData);

    const updateFilters = (newFilters) => {
      store.commit('setFilters', newFilters);
    };

    return { salesData, filters, topProducts, updateFilters };
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.v-container {
 max-width: 1500px !important;
}
</style>