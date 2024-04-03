<template>
  <div class="page-content af-offer-detail">
    <div class="container">
      <div class="flex-content"></div>
      <h2 class="main-title-m" v-if="currentOffers.title"> {{ $t(currentOffers.title) }}</h2>
      <p class="af-text-m af-offer-text" v-if="currentOffers.detail_text">{{ $t(currentOffers.detail_text) }}</p>
      <div class="points-content">
        <h3 class="main-title-s"> {{$t('main.earnPointsEnterYourCard')}}</h3>
        <ol class="af-ol-list" v-if="currentOffers.bonus_step">
          <li
              v-for="item in currentOffers.bonus_step"
              class="af-ol-item"
          >
            {{$t(item)}}
          </li>
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
              :text="$t('main.findCardNumberText')"
          >
            <p class="af-text-m-grey"> {{ $t('main.whereFindCardNumber')}} </p>
          </UTooltip>
        </div>
      </template>
    </UCard>

  </UModal>
</template>

<script setup>
import {useUserStore} from "../../stores/user";
import MainButton from "../../components/buttons/MainButton.vue";
import {ref, onMounted} from "vue";
import {fetchCurrentOfferByIdData} from "../../services/offersDetailService";

const userStore = useUserStore()
const route = useRoute()

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

//
const currentOffers = ref([]);
onMounted(async () => {
  try {
    currentOffers.value = await fetchCurrentOfferByIdData(+route.params.id);
  } catch (error) {
    console.error(error);
  }
});

</script>

<style scoped>

</style>