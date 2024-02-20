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
              :text="$t('card.cardNumber')"
              @click="cardAuthorizationModal = true"
          ></MainButton>
          <UTooltip
              v-if="!isUserCardAuth"
              text="Внесите номер карты"
              class="tooltip-wrapper"
          >
            <MainButton
                :text="$t('card.goToShop')"
                link=""
                :class="{disabled: !isUserCardAuth}"
            ></MainButton>
          </UTooltip>
          <MainButton
              v-else
              :text="$t('card.goToShop')"
              link=""
              :class="{disabled: !isUserCardAuth}"
          ></MainButton>
        </div>
      </div>

      <div class="other-offers">
        <h3 class="main-title-s">{{ $t('card.anotherOffer') }}</h3>
        <div class="main-swiper-wrapper">
          <SliderCurrentOffer></SliderCurrentOffer>
        </div>
      </div>
    </div>
  </div>

  <UModal
      v-model="cardAuthorizationModal"
      class="card-auth-modal"
  >
    <UCard :ui="{
      body: {
        padding: 'px-2 py-2 sm:p-2 sm:px-4 sm:pb-2',
      },
      header: {
        padding: 'px-2 py-2 sm:p-2 sm:px-4 sm:pt-4',
      },
      footer: {
        padding: 'px-2 py-2 sm:p-2 sm:px-4 sm:pb-4',
      },
  }">
      <template #header>
        <div class="flex items-center justify-end">
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                   @click="cardAuthorizationModal = false"/>
        </div>
      </template>
      <div class="card-auth-content">
        <UForm
            :validate="validate"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
        >
          <UFormGroup
              name="cardNum"
          >
            <UInput
                v-model="state.number"
                label="number"
                :placeholder="$t('card.cardNumber')"
                type="number"
                class="af-input"
            />
          </UFormGroup>

          <MainButton
              type="submit"
              :text="$t('card.cardAuth')"
              :disabled="validate().length > 0"
          ></MainButton>
        </UForm>
      </div>
      <template #footer>
        <div class="flex items-center justify-end">

          <UTooltip
              :ui="{base: 'tooltip-text-reset'}"
              text="На лицевой стороне вашей кредитной или дебетовой карты. Номер обычно находится в нижней части карты и состоит из 16 цифр"
          >
            <p class="af-text-m-grey">Где найти номер карты?</p>
          </UTooltip>
        </div>
      </template>
    </UCard>

  </UModal>
</template>

<script setup>
import {useUserStore} from "../../stores/user";
const userStore = useUserStore()
import MainButton from "../../components/buttons/MainButton.vue";
import {ref, reactive} from "vue";

const route = useRoute()
console.log(route.params)

//modals
const cardAuthorizationModal = ref(false)

//form
const state = ref({
  number: '',
})

const validate = () => {
  const errors = []
  if (String(state.value.number).length < 6) errors.push({path: 'cardNum'})
  return errors
}

async function onSubmit(event) {
  userStore.isUserCardAuth = true
  cardAuthorizationModal.value = false
}
const isUserCardAuth = computed(()=>userStore.getIsUserCardAuth )

</script>

<style scoped>

</style>