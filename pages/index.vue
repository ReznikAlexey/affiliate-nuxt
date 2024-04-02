<template>
  <div class="page-content af-home">
    <div class="container">
      <h1 class="main-title">{{ $t("main.title") }}</h1>
      <div class="current-offers">
        <div class="offers">
          <ul class="main-row-2">
            <li
                v-for="offer in offers"
                :key="offer.id"
                class="offers__card-item"
            >
              <a href="#" class="offers__card">
                <img :src="offer.image" alt="offer">
                <div class="offers__card-info">
                  <p class="af-text-m">{{ $t(offer.text) }}</p>
                </div>
              </a>
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

const offers = ref([]);

onMounted(async () => {
  try {
    offers.value = await fetchOffersData()
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>

</style>