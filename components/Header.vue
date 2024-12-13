<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="header-left">
          <router-link to="/">
            <div class="logo-wrapper">
              <img class="logo-img" src="assets/images/logo.png"
                   alt="logo">
            </div>
          </router-link>
          <nav
              v-if="$device.isDesktop"
              class="header-nav"
          >
            <ul class="nav-list">
              <li class="nav-item">
                <router-link class="nav-link" to="/">{{ $t("main.offer") }}</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/terms-and-conditions">{{ $t("main.info") }}</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="header-right">
          <USelectMenu
              v-if="$device.isDesktop"
              v-model="$i18n.locale"
              :options="languages"
              :placeholder="$t('main.selectLanguage')"
              value-attribute="value"
              option-attribute="name"
              selectClass="lang-select"
              class="lang-select-wrapper"
              selected-icon="none"
          />
          <UButton
              v-if="!$device.isDesktop"
              :padded="false"
              variant="link"
              icon="i-heroicons-bars-3"
              class="burger-btn"
              @click="isBurgerOpen = true"
          />
        </div>
      </div>
    </div>
  </header>

  <USlideover
      v-model="isBurgerOpen"
      :overlay="false"
  >
    <div class="burger-content container">
      <div class="burger-top">
        <div class="header-left">
          <router-link to="/">
            <div class="logo-wrapper">
              <img class="logo-img" src="assets/images/logo.png"
                   alt="logo">
            </div>
          </router-link>
        </div>
        <div class="header-right">
          <UButton
              :padded="false"
              variant="link"
              icon="i-heroicons-x-mark"
              class="burger-btn"
              @click="isBurgerOpen = false"
          />
        </div>
      </div>
      <div class="burger-body">
        <nav class="burger-nav">
          <ul class="nav-list">
            <li class="nav-item" @click.prevent="isBurgerOpen = false">
              <router-link class="nav-link" to="/">{{ $t("main.offer") }}</router-link>
            </li>
            <li class="nav-item" @click.prevent="isBurgerOpen = false">
              <router-link class="nav-link" to="/terms-and-conditions">{{ $t("main.info") }}</router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="burger-footer">
        <USelectMenu
            v-model="$i18n.locale"
            :options="languages"
            :placeholder="$t('main.selectLanguage')"
            value-attribute="value"
            option-attribute="name"
            selectClass="lang-select"
            class="lang-select-wrapper"
            selected-icon="none"
        />
      </div>
    </div>
  </USlideover>
</template>

<script setup>
const isBurgerOpen = ref(false)
const languages = [{
  name: 'Русский',
  value: 'ru'
}, {
  name: 'Қазақ',
  value: 'kz'
}, {
  name: 'English',
  value: 'en'
}]

</script>

<style lang="scss">
.header {
  padding: size(15px) 0;
  border-bottom: 1px solid $lightGrey;
  box-shadow: 0 4px 8px 0 rgba(28, 43, 79, 0.08);
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-list {
  margin: 0 size(12px);
  display: flex;
  align-items: center;
  column-gap: size(24px);
}
.header-left {
  display: flex;
  align-items: center;
}
.header-nav {
  padding: 0 size(35px);
}
.logo-img {
  display: block;
  width: size(178px);
  height: size(32px);
  object-fit: contain;
}
.nav-link {
  padding: 0 size(12px);
  font-size: size(16px);
  color: $darkBlue;
  font-style: normal;
  font-weight: 700;
  transition: color .2s;
  &:hover {
    color: #495a93;
  }
}
.mobile-ver {
  .header {
    padding: size(10px) 0;
  }
  .burger-content {
    padding-top: size(10px);
    padding-bottom: size(10px);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .burger-body {
    flex-grow: 1;
  }
  .burger-top {
    display: flex;
    justify-content: space-between;
  }
  .nav-list {
    margin-top: size(40px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: size(20px);
  }
  .nav-link {
    font-size: size(20px);
  }
}
</style>