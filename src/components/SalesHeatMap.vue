<template lang="pug">
  div.map(style="height: 500px; width: 100%")
    l-map(ref="map" v-model:zoom="zoom" :center="[-30.0400, -51.2220]")
      l-tile-layer(
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      )
      l-circle-marker(
        v-for="(circle, index) in filteredSalesData"
        :key="index"
        :lat-lng="[circle.lat, circle.lng]"
        :radius="circle.sales / 100"
        :color="circle.category === 'A' ? 'red' : 'blue'"
      )
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LCircleMarker, LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: {
    LCircleMarker,
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 15,
    };
  },
  setup() {
    const store = useStore();
    const salesData = computed(() => store.state.salesData);
    const filters = computed(() => store.state.filters);

    const filteredSalesData = computed(() => {
      return salesData.value.filter(
          sale => !filters.value.category || sale.category === filters.value.category
      );
    });

    return {
      filteredSalesData,
      zoom: 15,
    };
  },
};
</script>

<style>
.map {
  height: 500px;
  width: 100%;
}
</style>
