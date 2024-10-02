<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>

<script setup>
const {isDesktop, isMobileOrTablet, isMacOS} = useDevice();
useHead({
  meta: [{
    name: 'viewport',
    content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover'
  }],
  htmlAttrs: {
    class: [
      computed(() => {
        if (isMobileOrTablet) return 'mobile-ver';
        if (isDesktop) return 'desktop-ver';
        return '';
      }),
      computed(() => {
        if (isMacOS) return 'mac-os';
        return '';
      }),
    ],
  },
});
</script>

