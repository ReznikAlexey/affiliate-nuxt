<template>
  <div class="card-content">
    <div class="card-image-wrapper">
      <template v-if="isLoading">
        <USkeleton class="af-skeleton" />
      </template>
      <template v-else>
        <img :src="image" alt="image">
      </template>
    </div>
    <div class="card-body">
      <template v-if="isLoading">
        <USkeleton class="h-4" />
        <USkeleton class="h-4" />
        <USkeleton class="h-4" />
      </template>
      <template v-else>
        <p class="card__red-text">{{ redText }}</p>
        <p class="card__text-l">{{  $t(mainText) }}</p>
        <p class="card__text-s" v-html="formatText(subText)"></p>
      </template>
    </div>
  </div>
</template>

<script setup>

const formatText = (text) => {
  if (!text) return '';
  return text.replace(/\n/g, '<br/>');
};


defineProps({
  image: String,
  redText: String,
  mainText: String,
  subText: String,
  isLoading: Boolean
})
</script>

<style lang="scss" scoped>
.card-content {
  padding: size(10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: size(6px);
  border-radius: size(8px);
  border: 1px solid $lightGrey;
  cursor: pointer;
  width: 100%;
  height: 100%; /* Ensure consistent height */
  box-sizing: border-box; /* Include padding and border in size calculations */
  overflow: hidden; /* Prevent content overflow */
}

.card-image-wrapper {
  width: 100%;
  padding-top: 66%;
  position: relative;
  border-radius: size(4px);
  overflow: hidden;

  img {
    display: block;
    object-fit: contain; /* Fill the container without distortion */
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}

.card-body {
  display: flex;
  flex-direction: column;
  row-gap: size(10px);
  text-align: center; /* Center-align text for better readability */
  flex-grow: 1; /* Ensure the body takes remaining space */
}

.card__red-text {
  font-size: size(14px);
  font-weight: 500;
  line-height: 1.35;
  color: $redearth;
  margin-bottom: 8px; /* Add spacing below the red text */
}

.card__text-l {
  font-size: size(14px);
  font-weight: 500;
  line-height: 1.35;
  color: $darkBlue;
  margin-bottom: 8px; /* Add spacing below the main text */
}

.card__text-s {
  font-size: size(12px); /* Slightly smaller font for subtext */
  font-weight: 400; /* Lighter font for better hierarchy */
  line-height: 1.35;
  color: $clouds;
}

/* Add responsive design for different screen sizes */
@media (max-width: 768px) {
  .card-content {
    height: auto; /* Adjust dynamically on smaller screens */
  }
}

</style>
