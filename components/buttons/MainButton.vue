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
}
</style>