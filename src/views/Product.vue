<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '../stores/products';
import ProductRating from '../components/ProductRating.vue';
import ProductCard from '../components/ProductCard.vue';
import { useCartStore } from '../stores/cart.js';

//Retorna la ruta actual, conté l'id del producte
const route = useRoute();

//Variable que conté la store de productes
const productsStore = useProductsStore();

//Variable per mostrar la puntuació de l'item
const showRating = true;

//Producte
const product = ref(null);

//Array de productes relacionats
const relatedProducts = ref([]); 

//Store del carret
const cartStore = useCartStore();


//Obtenim l'id del producte i els productes relacionat de la store
async function loadProduct() {
  product.value = await productsStore.getProductsById(route.params.id);

  relatedProducts.value = await productsStore.getRelatedProducts(product.value.category,
    product.value.id
  );

}
  
onMounted(() => {
  loadProduct();
})

//Watcher per observar quan canviem d'id i així recarregar el producte
watch(
  () => route.params.id,
  () => {
    loadProduct()
  }
)

</script>

<template>
  <div v-if="product" class="details-product">
    <img class="product-image-detail" :src="product.imageUrl" :alt="product.name">

    <div class="product-content">
      <p class="has-text-small has-color-grey">{{ product.category }} · {{ product.brand }}</p>

      <h2 class="detailsproduct-name has-color-grey-dark"> {{ product.name }}</h2>

      <ProductRating :isDetail=showRating :rating = product.rating />

      <p class="product-price has-color-dark">${{ product.price }}</p>

      <p class="product-description has-color-grey">{{ product.description }}</p>

      <button class="addCart btn btn--cta" @click="cartStore.addProduct(product.id)">
        Add to cart
      </button>

      <p>You might also be interested</p>
      <div v-if="relatedProducts.length" class="related-products">
        <ProductCard 
          v-for="product in relatedProducts"
          :key="product.id"
          :product="product"
          />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .details-product{
    height: 100%;
    overflow-y: auto;
  }

  .product-image-detail{
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 5px;
  }

  .detailsproduct-name{
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .product-price{
    margin-top:10px;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .product-description{
    margin-top: 10px;
    font-size: 0.9rem;
  }

  .addCart{
    margin: 0 auto;
    margin-top: 10px;
    width: 100%;
    margin-bottom: 20px;

  }

  .related-products {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
  }

  button{
    transition: all 0.3s ease;
  }

  button:hover{
    background-color: #77aa9d; 
  }
</style>>
