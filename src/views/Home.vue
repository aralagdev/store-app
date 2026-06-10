<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { useProductsStore } from '../stores/products'

//Store de productes
const productsStore = useProductsStore();

onMounted(() => {

  if(productsStore.products.length === 0){
    productsStore.getProducts();
  }

})


</script>

<template>
  <div class="home">
    <h2 class="title-section">Our products</h2>
    <div class="products">
      <!--Graella de productes-->
      <ProductCard
        v-for="product in productsStore.products"
        :key="product.id"
        :product="product"
      />
    </div>

    <!--Botó per carregar més productes-->
    <button class="btn btn--cta load-more-btn " @click="productsStore.getProducts">Load More</button>

  </div>
</template>


<style scoped>
.home {
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
}

.products{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.load-more-btn {
  margin: 0 auto;
  transition: all 0.3s ease;
}

.load-more-btn:hover{
  background-color: #77aa9d; 
}
</style>