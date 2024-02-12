<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="header-left">
          <router-link to="/">
            <div class="logo-wrapper">
              <img class="logo-img" src="https://upload.wikimedia.org/wikipedia/commons/9/9f/B%C3%94N_Logo_PNG.png"
                   alt="logo">
            </div>
          </router-link>
          <nav class="header-nav">
            <ul class="nav-list">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Предложение</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/">Информация</router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="header-right">
          <USelectMenu
              v-model="$i18n.locale"
              :options="languages"
              placeholder="Выберите язык"
              value-attribute="value"
              option-attribute="name"
          />

<!--          <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">{{-->
<!--              locale.name-->
<!--            }}</NuxtLink>-->
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const languages = [{
  name: 'Рус',
  value: 'ru'
}, {
  name: 'Каз',
  value: 'kz'
}, {
  name: 'Англ',
  value: 'en'
}]

</script>

<style lang="scss">
.header {
  padding: size(15px) 0;
  border-bottom: 1px solid $grey;
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav-list {
  display: flex;
  align-items: center;
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
  width: size(100px);
  height: size(40px);
  object-fit: contain;
}
.nav-link {
  padding: 0 size(10px);
  font-size: size(14px);
  color: $darkGrey;
}
</style>