<template>
    <div class="page-content">
        <div class="container">
            <p class="main-title-m">{{ $t('termsAndConditions') }}</p>

 
            <div class="points-content" v-html="localTermsAndConditions[$i18n.locale]" />
        </div>
    </div>
</template>

<script setup>
import {localTermsAndConditions} from "~/pages/terms-and-conditions/consts";
</script>

<style></style>
