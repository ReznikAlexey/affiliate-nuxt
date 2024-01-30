<template>
  <div>
    <Header
        v-if="$device.isDesktop"
    ></Header>
    <slot/>
    <!--    <Menu></Menu>-->

  </div>
</template>


<style lang="scss">
.default-layout {
  main {
    height: 100%;
  }
  .page-content {
    padding-bottom: calc(env(safe-area-inset-bottom) + 48px);
    min-height: 100%;
  }
}
@media (min-width: 400px) {
  .default-layout {
    .page-content {
      padding-bottom: calc(env(safe-area-inset-bottom) + 60px);
    }
  }
}
.desktop-ver {
  .default-layout {
    main {
      padding-top: size(56px);
      padding-left: 53px;
    }
    .page-content {
      padding: size(22px) size(367px) size(20px) 0;
      display: flex;
    }
    .main-block {
      flex-grow: 1;
    }
  }
}
</style>

<script setup>

</script>