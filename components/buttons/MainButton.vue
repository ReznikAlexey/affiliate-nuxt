<template>
  <button class="af-button">{{ text }}</button>
</template>

<script setup>
defineProps({
  text: String
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
}
.mobile-ver {
  .af-button {
    height: size(34px);
    border-radius: size(4px);
    font-size: size(12px);
  }
}
</style>