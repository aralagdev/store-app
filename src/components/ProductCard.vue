<script setup>
import { RouterLink } from 'vue-router';
import ProductRating from './ProductRating.vue';

//Rebem el producte com un objecte
const props = defineProps({
    product: Object
})


</script>

<template>
    <RouterLink :to="`/products/${product.id}`" class="product-card">
        <!--Imatge del producte-->
        <img class="product-image" :src="product.imageUrl" :alt="product.title"/>
        
        <!--Informació del producte-->
        <div class="product-data">
            <p class="line-clamp-1 has-color-grey has-text-small"> {{ product.name}}</p>
            <p class="product-price"> ${{ product.price }}</p>
            <ProductRating :rating="product.rating"/>
        </div>

    </RouterLink>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: .5rem;
  color: var(--dark);
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 12px;
  background: #f5f5f5;
}

.product-data {
  display: flex;
  flex-direction: column;
  gap: .25rem;
}

.product-price{
  font-weight: bold;
}

</style>