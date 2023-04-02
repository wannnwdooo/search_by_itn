<template>
  <v-app>
    <v-main class="wrapper">
      <v-card
        class="mx-auto"
        color="grey-darken-2"
        width="40vw"
        title="Поиск организаций по ИНН"
      >
        <SearchInput v-model:modelValue="query" @fetch="fetchItn" />
        <SearchContentCard :result="result" />
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SearchInput from "@/components/UI/SearchInput.vue";
import { ref } from "vue";
import SearchContentCard from "@/components/general/SearchContentCard.vue";
import { getCompanies } from "@/service/companies.service";

const query = ref("");
const result = ref([]);

const fetchItn = async () => {
  result.value = [];
  const res = await getCompanies(query.value);
  return (result.value = res.slice());
};
</script>

<style lang="scss" scoped>
.wrapper {
  background: linear-gradient(to right bottom, #bd7e88, #6759ab);
  display: flex;
  align-items: center;
}
</style>
