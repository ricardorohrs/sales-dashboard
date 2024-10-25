import { createStore } from "vuex";

export default createStore({
  state: {
    salesData: [],
    productsData: [],
    filters: {
      startDate: null,
      endDate: null,
      category: "",
    },
  },
  mutations: {
    setSalesData(state, data) {
      state.salesData = data;
    },
    setProductsData(state, data) {
      state.productsData = data;
    },
    setFilters(state, filters) {
      state.filters = filters;
    },
  },
  actions: {
    async fetchSalesData({ commit }) {
      const response = await fetch("http://localhost:3000/sales");
      const data = await response.json();
      commit("setSalesData", data);
    },
    async fetchProductsData({ commit }) {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      commit("setProductsData", data);
    },
  },
});
