<template>
  <Swiper
      class="current-offers-swiper"
      :slides-per-view="4"
      :space-between="30"
  >
    <SwiperSlide
        v-for="slide in currentOffers"
        :key="slide"
        :modules="[SwiperNavigation]"
        :navigation= "{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
    >
    <CardCurrentOffer
        :image=slide.img
        :red-text=slide.bonus
        :main-text=slide.type
        :sub-text=slide.text
    ></CardCurrentOffer>
    </SwiperSlide>
  </Swiper>
  <div class="swiper-button-prev v1-swiper-button">
    <div class="icon"></div>
  </div>
  <div class="swiper-button-next v1-swiper-button">
    <div class="icon"></div>
  </div>
</template>

<script setup>

const currentOffers = [
  {
    img: 'https://s.tmimgcdn.com/scr/1200x750/341300/logo-mockup--a-white-circle-in-luxury-restaurant--sing-logo-mockup_341356-original.jpg',
    bonus: '+800 баллов',
    type: 'Доставка продуктов',
    text: 'Скидка 40% на первый заказ',
  },
  {
    img: 'https://elements-cover-images-0.imgix.net/67f3d50e-2dcf-4018-a63c-1cd12a99e872?auto=compress%2Cformat&w=900&fit=max&s=6565d4f81410bb70a52a6d512ba8b6da',
    bonus: 'До 400 баллов за заказ',
    type: 'Маркетплейс',
    text: 'Получайте мили за покупки',
  },
  {
    img: 'https://i0.wp.com/creative-sofa.com/wp-content/uploads/2019/09/restaurant-menu-free-mockup.jpg?fit=856%2C573&ssl=1',
    bonus: '500 баллов',
    type: 'Маркетплейс',
    text: 'Мили за покупки',
  },
  {
    img: 'https://imockups.com/storage/product/2274/8GzJyYuogtfZUaqBqyLj.png',
    bonus: '500 баллов',
    type: 'Доставка продуктов',
    text: 'Скидка 30% на первый заказ и 500 МИЛЬ',
  },
  {
    img: 'https://elements-cover-images-0.imgix.net/bd758d84-a283-4caf-a54a-ccca3c327899?auto=compress%2Cformat&w=900&fit=max&s=ed61b067919b969fb204058929581f45',
    bonus: '+800 баллов',
    type: 'Доставка продуктов',
    text: 'Скидка 40% на первый заказ',
  },
]
</script>
