<template>
  <div class="container page-content">
    <h1 class="main-title-m">{{ $t('technogym.title') }}</h1>

    <form @submit.prevent="submitTechnogym" class="af-form">
      <div class="form-group">
        <label class="af-text-m" for="name">{{ $t('technogym.name') }}</label>
        <input id="name" v-model="form.name" required />
      </div>

      <div class="form-group">
        <label class="af-text-m" for="phone">{{ $t('technogym.phone') }}</label>
        <input id="phone" v-model="form.phone" required />
      </div>

      <div class="form-group">
        <label class="af-text-m" for="email">{{ $t('technogym.email') }}</label>
        <input id="email" v-model="form.email" type="email" required />
      </div>

      <div class="button-container">
        <MainButton type="submit" class="half-width-button">{{ $t('technogym.submit') }}</MainButton>
      </div>

      <p v-if="submitted" class="af-text-m" style="color: green; text-align: center; margin-top: 20px;">
        {{ $t('technogym.confirmation') }}
      </p>
    </form>
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