<script setup>
import { onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import { useRouter }  from 'vue-router'


//Variable que conté la store del carret
const cartStore = useCartStore();

//Router
const router = useRouter();

//Funció per dur a terme la compra dels productes del carret
async function makeAPurchase(){
  //Fem la compra dels productes
  const purchaseId = await cartStore.purchase();

  if(!purchaseId) return;

  //Canviem la vista 
  router.push(`/purchases/${purchaseId}`);
}


onMounted(() => {
  cartStore.getCartProducts();
});
</script>

<template>
  <!--Vista del carret-->
  <div class="cart-view">
    <!--Titol-->
    <h2 class="title-section">Your Cart</h2>

    <!--Llista de propductes-->
    <div v-if="cartStore.cartLoaded.length" class="cart-list">
      
      <!--Productes-->
      <div class="cart-product"
        v-for="product in cartStore.cartLoaded"
        :key="product.id"
      > 
        <!--Imatge del producte-->
        <RouterLink :to="`/products/${product.id}`">
          <img class="product-image" :src="product.imageUrl" :alt="product.name">
        </RouterLink>
        
        
        <!--Informació del producte-->
        <div class="product-info">
          <p class="product-name line-clamp-1 has-color-grey-dark"> {{ product.name }}</p>

          <p class="product-price has-color-dark has-text-small">${{ product.price }}</p>
        </div>

        <!--Accions sobre el producte-->
        <div class="product-actions">
          <button class="quantity-btn" @click="cartStore.decreaseQuantity(product.id)">-</button>
          <span>{{ product.quantity }}</span>
          <button class="quantity-btn" @click="cartStore.increaseQuantity(product.id)">+</button>
        </div>
      
      </div>

      <!--Resum de la compra-->
      <div class="purchase">
        <p>Total: <strong>${{ cartStore.totalPrice.toFixed(2) }}</strong></p>

        <button class="btn btn--cta purchase-btn" @click="makeAPurchase">Complete Purchase</button>
      </div>

    </div>
    <!--En cas de carret buit-->
    <p v-else class="has-color-grey">Cart is empty</p>
  
  </div>
</template>

<style scoped>
.cart-view {
  padding: 1rem;
  overflow-y: auto;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-product{
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
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

.product-actions{
  display: flex;
  align-items: center;
  gap: .75rem;
}

.product-name, .product-price{
  font-weight: bold;
}

.quantity-btn {
  width: 28px;
  height: 27px;
  border-radius: 50%;
  background-color: var(--secondary-color);
  color: white;
  transition: all 0.3s ease;
}

.quantity-btn:hover{
  background-color: var(--primary-color);;
}

.purchase{
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.purchase-btn{
  width: 100%;
  transition: all 0.3s ease;
}
.purchase-btn:hover{
  background-color: #77aa9d; 
}


</style>
