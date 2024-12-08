<template>
  <div class="page-content af-home">
    <div class="container">
      <h1 class="main-title">{{ $t("main.title") }}</h1>
      <div class="current-offers">
        <div class="offers">
          <ul class="main-row-2">
            <template v-if="bannerOffers.length">
              <li
                  v-for="offer in bannerOffers"
                  :key="offer.id"
                  class="offers__card-item"
                  @click="openDetailPage(offer, 'offer')"
              >
                <div class="offers__card">
                  <img :src="offer.image" alt="offer" :key="offer.text">
                </div>
                <div class="offers__card-text-container">
                  <p class="af-text-m" v-html="offer.detail_text[$i18n.locale]" />
                </div>
              </li>
            </template>
            <template v-else>
              <li class="offers__card-item">
                <div class="offers__card">
                  <USkeleton class="af-skeleton" />
                </div>
              </li>
              <li class="offers__card-item">
                <div class="offers__card">
                  <USkeleton class="af-skeleton" />
                </div>
              </li>
            </template>
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
  } catch (error) {
    console.error(error);
  }
});

const openDetailPage = async (param, pageName) => {
  console.log(param, pageName);
  const path = ref('/' + pageName + '/' + param.id)
  await navigateTo({
    path: path.value
  })
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