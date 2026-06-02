<script setup>
    const props = defineProps({
        rating: Number,
        isDetail: Boolean
    })

    function getStarClass(star){
        const rating = props.rating;

        if (rating >= star) {
            return 'fas fa-star has-color-primary';
        }

        if (rating >= star - 0.5) {
            return 'fas fa-star-half-alt has-color-primary';
        }

        return 'far fa-star has-color-light';
    }
</script>

<template>
    <div class="rating">
        <i
            v-for="star in 5"
            :key="star"
            class="fa-star"
            :class="getStarClass(star)""
        ></i>
        <p v-if=isDetail class="rating-text has-text-small has-color-grey"> {{ rating }} </p>
    </div>
</template>

<style scoped>
.rating{
    display: flex;
}

.rating-text{
    margin-left: 5px;
    
}
</style>