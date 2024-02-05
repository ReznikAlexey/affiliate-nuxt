<template>
  <h1>{{$route.params.id}}</h1>
</template>

<script setup>
const route = useRoute()
console.log(route.params)
</script>

<style scoped>

</style>