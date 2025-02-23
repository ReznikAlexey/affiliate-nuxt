<template>
  <div class="page-content af-offer-detail">
    <div class="container">
      <div class="flex-content"></div>
      <h2 class="main-title-m" v-if="currentOffers.title">
        {{ $t(currentOffers.title) }}
      </h2>
      <p class="af-text-m af-offer-text" v-if="currentOffers.detail_text" v-html="currentOffers.detail_text[$i18n.locale]">
      </p>
      <div v-if="currentOffers.showPointsContent" class="points-content">
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

         <!-- Show external button for excluded offers -->
      <div v-else>
        <div class="button-container">
          <MainButton
            type="button"
            :text="$t('main.learnMore')"
            @click="openExternalLink(currentOffers.externalUrl)"
            class="half-width-button"

          />
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
import { getDatabase, ref as fireRef, set, push } from "firebase/database";
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
  let memberId = state.value.number;
  let offerId = route.params.id; //changes23022025
  try {
    const db = getDatabase();
    if (offerId === 6) {
      // Encrypt using SHA-256
      encrypted = CryptoJS.SHA256(`${memberId}`).toString(CryptoJS.enc.Hex);
      toShopURL = `${currentOffers.value.toShopUrl}/pubref:${encrypted}`;
    } else {
      // Encrypt using AES for other offer IDs
      encrypted = CryptoJS.AES.encrypt(`${memberId}`, "affiliate-key").toString();
      toShopURL = `${currentOffers.value.toShopUrl}?cid=${encrypted}`;
    }

    console.log(memberId);

    await push(fireRef(db, "clickLogs/" + offerId), {
      encrypted,
      timestamp: moment().format(),
      memberId,
      toShopURL
    });

    // Handle Safari browser behavior
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      window.location.href = toShopURL;
    } else {
      window.open(toShopURL, "_blank");
    }


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
    const offerId = Number(route.params.id); // Ensure the ID is a valid number
    currentOffers.value = await fetchCurrentOfferByIdData(offerId);

    // Define the IDs of offers to exclude from points-content
    const excludedOfferIds = [3]; // Replace with the actual IDs

    // Determine whether to show points-content or external button
    currentOffers.value.showPointsContent = !excludedOfferIds.includes(offerId);

    // Assign external URL for excluded offers
    if (!currentOffers.value.showPointsContent) {
      currentOffers.value.externalUrl = currentOffers.value.customUrl || 'https://airastana.com/nomad-club/nomad-club-programme';
    }
  } catch (error) {
    console.error("Failed to fetch current offer:", error);
  }
});

const openExternalLink = (url) => {
  if (url) {
    window.open(url, '_blank'); // Open in a new tab
  } else {
    console.error("External URL is not defined.");
  }
};


</script>

<style scoped></style>
