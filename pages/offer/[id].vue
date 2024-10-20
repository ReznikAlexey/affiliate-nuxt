<template>
  <div class="page-content af-offer-detail">
    <div class="container">
      <div class="flex-content"></div>
      
      <!-- Display Title -->
      <h2 class="main-title-m" v-if="currentOffers.title">
        {{ $t(currentOffers.title) }}
      </h2>

      <!-- Display Localized Bonus -->
      <h3 class="bonus-text" v-if="currentOffers.bonus">
        {{ currentOffers.bonus[$i18n.locale] }}
      </h3>

      <!-- Display Localized Detail Text -->
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
          
          <UTooltip v-if="!isUserCardAuth" :text="$t('main.enterYourCardNumber')" class="tooltip-wrapper">
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
    <!-- Modal Content -->
    <UCard :ui="uiSettings">
      <template #header>
        <div class="flex items-center justify-end">
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="cardAuthorizationModal = false" />
        </div>
      </template>

      <div class="card-auth-content">
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup name="cardNum">
            <UInput v-model="state.number" label="number" :placeholder="$t('card.cardNumber')" type="number" class="af-input" />
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
          <UTooltip :ui="{ base: 'tooltip-text-reset' }" :text="$t('main.findCardNumberText')">
            <p class="af-text-m-grey">{{ $t("main.whereFindCardNumber") }}</p>
          </UTooltip>
        </div>
      </template>
    </UCard>
  </UModal>
</template>