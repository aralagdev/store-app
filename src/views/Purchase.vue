<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useProductsStore } from '../stores/products';

//Ruta
const route = useRoute();

//Cart Store
const cartStore = useCartStore();

//Products Store
const productsStore = useProductsStore();

//Compra
const purchase = ref(null);

const purchaseProducts = ref([]);


//Funció per carregar la compra corresponent al id de compra
async function loadPurchase(){
  purchase.value = await cartStore.getPurchaseById(route.params.id);
  console.log(purchase.value)

  purchaseProducts.value = await Promise.all(
    purchase.value.items.map(
        async item => {
            const product =
                await productsStore.getProductsById(
                    item.productId
                );
            return {
                ...product,
                quantity: item.quantity,
                purchasePrice: item.price
            };
        }
    )
);

}

//Funció per donar format a la data de la compra
function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
  });
}


onMounted(() => {
  loadPurchase();
});

</script>

<template>
  <div v-if="purchase" class="purchase-view">
    <h2 class="title-section">Purchase Details</h2>

    <div class="purchase-summary">
      <p class="has-color-grey-dark"><strong>Order ID:</strong> {{ purchase.id }}</p>
      <p class="has-color-grey-dark"><strong>Date: </strong>{{ formatDate(purchase.purchaseDate) }}</p>
    </div>

    <div class="products-summary">
      <h2 class="has-color-grey-dark">Products</h2>

      <div class="purchase-products"
        v-for="product in purchaseProducts"
        :key="product.id"
      >
      <!--Imatge del producte-->
        <RouterLink :to="`/products/${product.id}`">
          <img class="product-image" :src="product.imageUrl" :alt="product.name">
        </RouterLink>
        
        
        <!--Informació del producte-->
        <div class="product-info">
          <p class="product-name line-clamp-1 has-color-grey-dark"> {{ product.name }}</p>

          <p class="product-price has-color-dark has-text-small">${{ product.price}}</p>
        </div>

        <div>
          <p class="quantity has-color-grey-dark">Quantity: {{ product.quantity }}</p>
        </div>
      </div> 

      <div class="purchase-total">
        <p class="has-color-grey-dark"><strong>Total:</strong> ${{ purchase.totalAmount.toFixed(2) }}</p>
      </div>
    </div>
    


  </div>
</template>

<style scoped>
.purchase-summary {
  padding: 0.8rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
  margin-bottom: 20px;
}

.products-summary{
  padding: 0.2rem;
}

.products-summary{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.purchase-products, .purchase-total{
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}

.product-image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 10px;
}

.product-info{
  flex: 1;
}

.quantity{
  font-size: 0.9rem;
}

.product-name, .product-price{
  font-weight: bold;
}

.purchase-total{
  justify-content: end;
  font-size: 1.2rem;
}



</style>
