<template>
  <Swiper
      class="current-offers-swiper"
      slides-per-view="1"
      space-between="30"
      :modules="[SwiperNavigation, SwiperPagination]"
      :breakpoints="{
          768:{
            slidesPerView: 2
            },
          991:{
            slidesPerView:4,
            }
        }"
      :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
      :pagination="{
        el: '.swiper-pagination'
      }"
  >
    <SwiperSlide
        v-for="slide in currentOffers"
        :key="slide"
    >
      <CardCurrentOffer
          :image=slide.image
          :red-text="isTranslationKey(slide.bonus) ? $t(slide.bonus) : slide.bonus"
          :main-text=slide.title
          :sub-text="isTranslationKey(slide.text) ? $t(slide.text) : slide.text"
          :isLoading="isLoading"
          @click="openDetailPage(slide, 'offer')"
      ></CardCurrentOffer>
    </SwiperSlide>
  </Swiper>
  <div class="swiper-button-prev v1-swiper-button">
    <div class="icon"></div>
  </div>
  <div class="swiper-button-next v1-swiper-button">
    <div class="icon"></div>
  </div>
  <div
      v-if="!$device.isDesktop"
      class="swiper-pagination v1-swiper-pagination"
  ></div>
</template>

<script setup>
import {navigateTo} from "nuxt/app";

import { ref, onMounted } from 'vue';
import {fetchOffersData} from "../../services/offersService";

const currentOffers = ref(['fake','fake','fake','fake']);
const isLoading = ref(true)

const isTranslationKey = (text) => {
  return text && typeof text === 'string' && text.startsWith('bannerText.');
};

onMounted(async () => {
  try {
    currentOffers.value = await fetchOffersData('small');
    isLoading.value = false
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

<style lang="scss" scoped>
.current-offers-swiper {
  padding-bottom: 1px;
  .swiper-slide {
    margin-right: 30px;
    width: calc(100% / 4 - 90px / 4);
  }
}
</style>
