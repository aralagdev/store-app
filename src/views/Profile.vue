<script setup>
import { onMounted, ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useUserStore } from '../stores/user';
import { RouterLink, useRouter } from 'vue-router';



const purchases = ref([]); 
const cartStore = useCartStore();
const userStore = useUserStore(); 
const router = useRouter();


//Funció per carregar les compres de l'usuari
async function loadUserPurchases(){
  purchases.value = await cartStore.getUserPurchases(); 
}

//Funció per sortir del compte d'usuari
async function logout() {
  userStore.logout();
  await router.push('/');

}

//Carreguem les compres un cop muntat el component
onMounted(() => {
  loadUserPurchases();
})

</script>

<template>
  <div class="profile-view">
    <!--Header-->
    <div class="profile-header">
       <h2 class="title-section">Hi {{ userStore.user?.name }}</h2>
       <button class="logout btn btn--cta" v-if="userStore.user" @click="logout">Logout</button>
    </div>
   
    <!--Compres-->
    <h3 class="has-color-grey-dark">Your Orders</h3>

    <div class="profile-purchases" v-if="purchases">
      <router-link class="purchase-card" v-for="purchase in purchases"
        :key="purchase.id"
        :to="`/purchases/${purchase.id}`">
        <p class="has-color-grey-dark"><strong>Order #{{ purchase.id }}</strong></p>
        <p class="has-color-grey">{{ purchase.items.length }} items(s)</p> 
      </router-link>
    </div>

     <p v-else class="has-color-grey">Don't have puchases yet</p>

  </div>
</template>

<style scoped>
.profile-purchases{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.purchase-card{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.8rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}

.profile-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logout{
  height: 40%;
  transition: all 0.3s ease;
}

.logout:hover{
  background-color: #77aa9d; 
}
</style>
