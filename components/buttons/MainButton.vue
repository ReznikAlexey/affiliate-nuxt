<template>
  <a
      v-if="link"
      :href="link"
      class="af-button"
      target="_blank"
  >{{ text }}</a>
  <button
      v-else
      class="af-button"
  >{{ text }}</button>
</template>

<script setup>
defineProps({
  text: String,
  link: String
})
</script>

<style lang="scss" scoped>
.af-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: size(40px);
  background-color: $brown;
  border-radius: size(4px);
  color: #fff;
  border: none;
  outline: none;
  font-size: size(14px);
  transition: opacity .2s ease-in-out;
  &.disabled {
    pointer-events: none;
    opacity: .6;
    cursor: unset;
  }
  &:disabled {
    opacity: .6;
  }
}
.mobile-ver {
  .af-button {
    height: size(34px);
    border-radius: size(4px);
    font-size: size(12px);
  }
}
</style>