<template lang="pug">
  br
  div.filters
    label Data de Início
    input(type="month" v-model="filters.startDate" min="2024-01" max="2024-12" @input="updateFilters")
    label Data Final
    input(type="month" v-model="filters.endDate" min="2024-01" max="2024-12" @input="updateFilters")

    label.category Categoria
    select(v-model="filters.category" @change="updateFilters")
      option(value="" disabled selected) Selecione a categoria
      option(value="A") A
      option(value="B") B
      option(value="") Todas
</template>

<script>
export default {
  props: ['filters'],
  methods: {
    updateFilters() {
      setTimeout(() => {
        this.$emit('update-filters', this.filters);
      }, 100);
    },
  },
};
</script>

<style scoped>
.filters label {
  margin-right: 10px;
  margin-left: 15px;
}

.category {
  margin-left: 45px !important;
}
</style>