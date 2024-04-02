<template>
  <div class="page-content af-home">
    <div class="container">
      <h1 class="main-title">{{ $t("main.title") }}</h1>
      <div class="current-offers">
        <div class="offers">
          <ul class="main-row-2">
            <li
                v-for="offer in bannerOffers"
                :key="offer.id"
                class="offers__card-item"
                @click="openDetailPage(offer, 'offer')"
            >
              <div class="offers__card">
                {{offer.image}}
                <img :src="offer.image" alt="offer">
                <div class="offers__card-info">
                  <p class="af-text-m">{{ offer.detail_text }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <h3 class="main-title-m">{{ $t("main.currentOffer") }}</h3>
        <div class="main-swiper-wrapper">
          <SliderCurrentOffer></SliderCurrentOffer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {fetchOffersData} from "../services/offersService";
import {navigateTo} from "nuxt/app";

const bannerOffers = ref([]);

onMounted(async () => {
  try {
    bannerOffers.value = await fetchOffersData('big')
    console.log('bannerOffers.value', bannerOffers.value)
  } catch (error) {
    console.error(error);
  }
});

const openDetailPage = async (param, pageName) => {
  const path = ref('/' + pageName + '/' + param.id)
  await navigateTo({
    path: path.value
  })
}
</script>

<style scoped>

</style>