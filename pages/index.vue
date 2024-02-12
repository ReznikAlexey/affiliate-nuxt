<template>
  <div class="page-content af-home">
    <div class="container">
      <h1 class="main-title">Маркетплейс {{ $t('hello') }}</h1>
      <div class="current-offers">
        <h3 class="main-title-m">Текущие предложения</h3>
        <div class="main-swiper-wrapper">
          <SliderCurrentOffer></SliderCurrentOffer>
        </div>
        <div class="offers">
          <h3 class="main-title-m">Текущие предложения</h3>
          <ul class="main-row-2">
            <li
                v-for="offer in offers"
                class="offers__card-item"
            >
              <a
                  href="#"
                  class="offers__card"
              >
                <img
                    :src="offer.image"
                    alt="offer"
                >
                <div class="offers__card-info">
                  <p class="af-text-m">{{ offer.text }}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const offers = [
  {
    image: 'https://www.cnet.com/a/img/resize/0302d07e10ba8dc211f7b4e25891ad46dda31976/hub/2023/02/05/f52fdc98-dafc-4d05-b20e-8bd936b49a53/oneplus-11-review-cnet-lanxon-promo-8.jpg?auto=webp&fit=crop&height=675&width=1200',
    text: 'Руслан Закиров переработал и обновил меню Del Papa. Многие блюда обрели совершенно иной вкус и теперь наши гости могут познакомиться с итальянской кухней по-новому'
  },
  {
    image: 'https://www.gizchina.com/wp-content/uploads/images/2023/09/Samusung-EcoSystem.jpg',
    text: 'Многие блюда обрели совершенно иной вкус и теперь наши гости могут познакомиться с итальянской кухней по-новому'
  }
]

</script>

<style scoped>

</style>