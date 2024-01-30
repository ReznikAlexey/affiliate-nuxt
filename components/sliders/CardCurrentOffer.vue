<template>
    <div class="card-content">
        <div class="card-image-wrapper">
            <img :src="image" alt="image">
        </div>
        <div class="card-body">
            <p class="card__red-text">{{ redText }}</p>
            <p class="card__text-l">{{ mainText }}</p>
            <p class="card__text-s">{{ subText }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    image: String,
    redText: String,
    mainText: String,
    subText: String,
})
</script>

<style lang="scss" scoped>
.card-content {
    display: flex;
    flex-direction: column;
    row-gap: size(6px);
}

.card-image-wrapper {
    background-color: $grey;
    width: 100%;
    padding-top: 66%;
    position: relative;
    border-radius: size(6px);
    overflow: hidden;

    img {
        display: block;
        object-fit: cover;
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
}

.card__red-text {
    font-size: size(12px);
    font-weight: 500;
    line-height: 135%;
    color: #c20303;
}

.card__text-l {
    font-size: size(12px);
    font-weight: 500;
    line-height: 135%;
}

.card__text-s {
    font-size: size(12px);
    font-weight: 500;
    line-height: 135%;
    color: $grey;
}
</style>