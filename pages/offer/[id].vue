<template>
  <div class="page-content af-offer-detail">
    <div class="container">
      <div class="flex-content"></div>
      <h2 class="main-title-m" v-if="currentOffers.title">
        {{ $t(currentOffers.title) }}
      </h2>
      <!-- Localized Bonus Field -->
      <h3 class="bonus-text" v-if="currentOffers.bonus">
        {{ $t(currentOffer.bonus) }}
      </h3>
      <p class="af-text-m af-offer-text" v-if="currentOffers.detail_text" v-html="currentOffers.detail_text[$i18n.locale]">
      </p>
      <div class="points-content">
        <h3 class="main-title-s">{{ $t("main.earnPointsEnterYourCard") }}</h3>
        <ol class="af-ol-list" v-if="currentOffers.bonus_step">
          <li v-for="item in currentOffers.bonus_step" class="af-ol-item">
            {{ $t(item) }}
          </li>
        </ol>
        <div class="points-content__footer">
          <MainButton
            :text="$t('card.cardNumber')"
            style="width: 100%;"
            @click="cardAuthorizationModal = true"
          ></MainButton>
          <UTooltip
            v-if="!isUserCardAuth"
            :text="$t('main.enterYourCardNumber')"
            class="tooltip-wrapper"
          >
            <MainButton
              style="width: 100%;"
              :text="$t('card.goToShop')"
              link=""
              :class="{ disabled: !isUserCardAuth }"
            ></MainButton>
          </UTooltip>
          <MainButton
            v-else
            :text="$t('card.goToShop')"
            link=""
            @click="saveToFirebase()"
            :class="{ disabled: !isUserCardAuth }"
          ></MainButton>
        </div>
      </div>

      <div class="other-offers">
        <h3 class="main-title-s">{{ $t("card.anotherOffer") }}</h3>
        <div class="main-swiper-wrapper">
          <SliderCurrentOffer></SliderCurrentOffer>
        </div>
      </div>
    </div>
  </div>

  <UModal v-model="cardAuthorizationModal" class="card-auth-modal">
    <UCard
      :ui="{
        body: {
          padding: 'px-2 py-2 sm:p-2 sm:px-4 sm:pb-2',
        },
        header: {
          padding: 'px-2 py-2 sm:p-2 sm:px-4 sm:pt-4',
        },
        footer: {
          padding: 'px-2 py-2 sm:p-2 sm:px-4 sm:pb-4',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-end">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="cardAuthorizationModal = false"
          />
        </div>
      </template>
      <div class="card-auth-content">
        <UForm
          :validate="validate"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormGroup name="cardNum">
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
            :loading="loading"
            @click="cardAuthorizationFunc(state.number)"
            :text="$t('card.cardAuth')"
            :disabled="validate().length > 0"
          ></MainButton>
        </UForm>
      </div>
      <template #footer>
        <div class="flex items-center justify-end">
          <UTooltip
            :ui="{ base: 'tooltip-text-reset' }"
            :text="$t('main.findCardNumberText')"
          >
            <p class="af-text-m-grey">{{ $t("main.whereFindCardNumber") }}</p>
          </UTooltip>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
import { ref, onMounted } from "vue";

import CryptoJS from 'crypto-js';
import moment from 'moment'

import MainButton from "../../components/buttons/MainButton.vue";

import { useUserStore } from "../../stores/user";
import { fetchCurrentOfferByIdData } from "../../services/offersDetailService";
import { getDatabase, ref as fireRef, set } from "firebase/database";
import { useI18n } from "vue-i18n";

const toast = useToast();

const config = useRuntimeConfig()

const userStore = useUserStore();
const route = useRoute();

//modals
const cardAuthorizationModal = ref(false);
const loading = ref(false);

const { t } = useI18n()

//form
const state = ref({
  number: "",
});

const validate = () => {
  const errors = [];
  if (String(state.value.number).length < 6) errors.push({ path: "cardNum" });
  return errors;
};

const onSubmit = async (event) => {};
const isUserCardAuth = computed(() => userStore.getIsUserCardAuth);

const saveToFirebase = async () => {
  let memberId = state.value.number
  try {
    const db = getDatabase();
    let encrypted = CryptoJS.AES.encrypt(`${memberId}`, 'affiliate-key').toString()
    console.log(memberId)

    await set(fireRef(db, "memberID/" + route.params.id + "/" + memberId), {
      encrypted,
      timestamp: moment().format(),
      memberId,
      toShopURL: `${currentOffers.value.toShopUrl}?cid=${encrypted}`
    });

    window.open(`${currentOffers.value.toShopUrl}?cid=${encrypted}`, '_blank')
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const cardAuthorizationFunc = async (memberId) => {
  loading.value = true
  const data = {
    username: config.public.apiUsername,
    password: config.public.apiPassword,
  };

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': config.public.apiKey
  }

  try {
    const { token, message } = await $fetch('https://api.gravty.me/v2/login', { method: "POST", body: data, headers })


    if (!token) {
      throw new Error(message)
    }


    console.log(token)
    let searchHeaders = {
      'Content-Type': 'application/json',
      'x-api-key': config.public.apiKey,
      'Authorization': `JWT ${token}`,
    }
    console.log(searchHeaders)


    const memberSearch = await $fetch(`https://api.gravty.me/v1/members/search/?member_id=${memberId}`,  { method: "GET", headers: searchHeaders})



    if (memberSearch.length === 0) {
      throw new Error(t('error.authorize'))
    }


    userStore.isUserCardAuth = true;
    cardAuthorizationModal.value = false;
    toast.add({
      color: 'green',
      title: t('success.authorize')
    })

    console.log(memberSearch)
  } catch (error) {
    console.log(error);
    toast.add({
      color: 'red',
      title: t('error.authorize')
    })
  } finally {
    loading.value = false
  }

};

const currentOffers = ref([]);

onMounted(async () => {
  try {
    currentOffers.value = await fetchCurrentOfferByIdData(+route.params.id);
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped></style>
