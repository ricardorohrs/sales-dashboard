<template lang="pug">
  br
  div.filters
    label Data de Início
    input(type="date" v-model="filters.startDate" @input="updateFilters")
    label Data Final
    input(type="date" v-model="filters.endDate" @input="updateFilters")

    label Categoria
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
  margin-left: 10px;
}

.filters select {
  margin-right: 10px;
}
</style>