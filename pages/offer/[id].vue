<template>
  <div class="page-content af-offer-detail">
    <div class="container">
      <div class="flex-content"></div>
      <h2 class="main-title-m">Уникальное предложение от Технодома!</h2>
      <p class="af-text-m af-offer-text">Заберите свою скидку 40% на первую покупку в онлайн-магазине техники 'Технодом"
        и получите
        800 баллов в подарок! Введите наш промокод при оформлении заказа, чтобы начать собирать баллы, которые можно
        обменять на различные бонусы и привилегии. Делайте покупки выгодно и собирайте баллы, которые сделают каждую
        вашу покупку еще приятнее</p>
      <div class="points-content">
        <h3 class="main-title-s">Для начисления баллов за покупку укажите ваш номер карты</h3>
        <ol class="af-ol-list">
          <li class="af-ol-item">Внесите номер карты</li>
          <li class="af-ol-item">Перейдите в магазин партнера</li>
          <li class="af-ol-item">Совершите покупку на сайте партнера</li>
          <li class="af-ol-item">Включите cookies!</li>
          <li class="af-ol-item">Ожидайте получение</li>
        </ol>
        <div class="points-content__footer">
          <MainButton
              text="ВНЕСТИ НОМЕР КАРТЫ"
              @click="cardAuthorizationModal = true"
          ></MainButton>
          <MainButton
              text="ПЕРЕЙТЕ В МАГАЗИН ПАРТНЕРА"
          ></MainButton>
        </div>
      </div>

      <div class="other-offers">
        <h3 class="main-title-s">Другие предложения</h3>
        <div class="main-swiper-wrapper">
          <SliderCurrentOffer></SliderCurrentOffer>
        </div>
      </div>
    </div>
  </div>

  <UModal
      v-model="cardAuthorizationModal"
      class="card-auth"
  >
    <div class="card-auth-content">
      <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
      >
        <UFormGroup
            name="email"
        >
          <UInput
              v-model="state.number"
              placeholder="Введите номер карты"
              type="number"
          />
        </UFormGroup>

        <MainButton
            type="submit"
            text="авторизовать карту"
        ></MainButton>
      </UForm>
    </div>
  </UModal>
</template>

<script setup>
import MainButton from "../../components/buttons/MainButton.vue";
import {ref, reactive} from "vue";
// import { FormError, FormSubmitEvent } from '#ui/types'

const route = useRoute()
console.log(route.params)

//modals
const cardAuthorizationModal = ref(false)

//form
const state = reactive({
  number: undefined,
})

const validate = () => {
  const errors = []
  if (!state.number) errors.push({path: 'email', message: 'Required'})
  return errors
}

async function onSubmit(event) {
  // Do something with data
  console.log(event.data)
}

</script>

<style scoped>

</style>