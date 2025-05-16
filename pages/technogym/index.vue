<template>
  <div class="container page-content">
    <h1 class="main-title-m">{{ $t('technogym.title') }}</h1>

    <form @submit.prevent="submitTechnogym" class="form-styled">
      <div class="form-group">
        <label class="af-text-m" for="name">{{ $t('technogym.name') }}</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="af-input"
          placeholder="$t('technogym.name')"
          required
        />
      </div>

      <div class="form-group">
        <label class="af-text-m" for="phone">{{ $t('technogym.phone') }}</label>
        <input
          id="phone"
          v-model="form.phone"
          type="text"
          class="af-input"
          placeholder="+7701..."
          required
        />
      </div>

      <div class="form-group">
        <label class="af-text-m" for="email">{{ $t('technogym.email') }}</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="af-input"
          placeholder="you@example.com"
          required
        />
      </div>

      <div class="button-container">
        <button type="submit" class="half-width-button">
          {{ $t('technogym.submit') }}
        </button>
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

<style scoped>
.form-styled {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.af-input {
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
}
</style>