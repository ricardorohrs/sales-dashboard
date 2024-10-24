<template lang="pug">
  div.table-filter
    label Ordenar por:
    select(v-model="sortField")
      option(value="name") Produto
      option(value="sales") Vendas
      option(value="category") Categoria

    label Ordem:
    select(v-model="sortOrder")
      option(value="1") Ascendente
      option(value="-1") Descendente

  div.table-container
    table.table
      thead
        tr
          th Produto
          th Vendas
          th Categoria
      tbody
        tr(v-for="product in paginatedProducts" :key="product.id")
          td {{ product.name }}
          td {{ product.sales }}
          td {{ product.category }}

    div.pagination-controls
      button(@click="prevPage" :disabled="currentPage === 1") Anterior
      span {{ currentPage }} de {{ totalPages }}
      button(@click="nextPage" :disabled="currentPage === totalPages") Próximo
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const products = computed(() => store.state.productsData);
    const filters = computed(() => store.state.filters);

    const sortField = ref('name');
    const sortOrder = ref('1');
    const currentPage = ref(1);
    const itemsPerPage = 9;

    const filteredAndSortedProducts = computed(() => {
      let filteredProducts = products.value;

      if (filters.value.category) {
        filteredProducts = filteredProducts.filter(product => product.category === filters.value.category);
      }

      if (filters.value.startDate && filters.value.endDate) {
        filteredProducts = filteredProducts.filter(product => product.filterDate >= filters.value.startDate && product.filterDate <= filters.value.endDate);
      }

      return filteredProducts.sort((a, b) => {
        if (a[sortField.value] < b[sortField.value]) {
          return -1 * parseInt(sortOrder.value);
        } else if (a[sortField.value] > b[sortField.value]) {
          return parseInt(sortOrder.value);
        } else {
          return 0;
        }
      });
    });

    const totalPages = computed(() => Math.ceil(filteredAndSortedProducts.value.length / itemsPerPage));

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredAndSortedProducts.value.slice(start, end);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
      }
    };

    return {
      sortField,
      sortOrder,
      paginatedProducts,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
    };
  }
};
</script>

<style scoped>
.table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin-left: 27px;
}

.table-filter {
  padding: 0 0 7px 0;
}

.table-filter label {
  margin-right: 10px;
  margin-left: 10px;
}

.filters select {
  margin-right: 10px;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  cursor: pointer;
}

.table-container {
  max-height: 420px;
  overflow-y: auto;
}

.table {
  width: 93%;
}

th, td {
  padding: 7px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

button {
  margin: 0 30px 0 30px;
}
</style>