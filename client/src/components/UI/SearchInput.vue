<template>
  <v-card-text>
    <v-text-field
      density="compact"
      variant="solo"
      label="Введите ИНН"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      :value="modelValue"
      @input="(event) => $emit('update:modelValue', event.target.value)"
      @click:append-inner="$emit('fetch')"
    ></v-text-field>
  </v-card-text>
</template>

<script lang="ts" setup>
defineEmits(["update:modelValue", "fetch"]);
defineProps({ modelValue: String });
</script>
