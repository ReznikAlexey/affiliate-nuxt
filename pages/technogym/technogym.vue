<template>
  <div class="form-container">
    <h1>{{ $t('technogym.title') }}</h1>

    <form @submit.prevent="submitTechnogym">
      <label>{{ $t('technogym.name') }}</label>
      <input v-model="form.name" required />

      <label>{{ $t('technogym.phone') }}</label>
      <input v-model="form.phone" required />

      <label>{{ $t('technogym.email') }}</label>
      <input type="email" v-model="form.email" required />

      <button type="submit">{{ $t('technogym.submit') }}</button>
    </form>

    <p v-if="submitted">{{ $t('technogym.confirmation') }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const form = ref({ name: '', phone: '', email: '' })
const submitted = ref(false)

const submitTechnogym = async () => {
  try {
    await $fetch('/api/send-technogym', {
      method: 'POST',
      body: form.value
    })
    submitted.value = true
    form.value = { name: '', phone: '', email: '' }
  } catch (e) {
    alert('Submission failed. Please try again.')
    console.error(e)
  }
}
</script>

<style lang="scss" scoped>
.offers__card-item {
  display: flex;
  flex-direction: column;
}

.offers__card {
  padding-top: 55%;
  position: relative;
  display: block;
  background-color: transparent;
  width: 100%;
  border-radius: size(10px);
  overflow: hidden;
  
  img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.offers__card-text-container {
  padding: size(20px);
  background: #fff;
  
  .af-text-m {
    font-size: size(18px);
    line-height: 135%;
    color: #333;
  }
}

</style>