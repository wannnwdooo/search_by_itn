<template>
  <transition
    name="fade"
    @enter="start"
    @after-enter="end"
    @before-leave="start"
    @after-leave="end"
  >
    <div v-show="result.length" class="search-container-card">
      <p
        class="search-container-card__item"
        v-for="item in result"
        :key="item.id"
      >
        {{ item.name }}
      </p>
    </div>
  </transition>
</template>

<script lang="ts" setup>
defineProps({ result: Array });

const start = (el: Element) => {
  const elem = el as HTMLElement;
  elem.style.height = elem.scrollHeight + "px";
};
const end = (el: Element) => {
  const elem = el as HTMLElement;
  elem.style.height = "";
};
</script>

<style lang="scss" scoped>
.search-container-card {
  height: 100%;
  padding: 20px;
  &__item {
    &:not(:first-child) {
      margin-top: 0.5rem;
    }
    &:not(:last-child) {
      border-bottom: 1px solid gray;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  will-change: height, opacity;
  transition: height 0.45s ease, opacity 0.45s ease;
  overflow: hidden;
}

.fade-enter-from,
.fade-leave-to {
  height: 0;
  opacity: 0;
}
</style>
