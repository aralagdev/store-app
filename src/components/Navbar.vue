<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '../stores/user';  
import { useCartStore } from '../stores/cart';

const userStore = useUserStore();
const cartStore = useCartStore();
</script>

<template>
    <nav class="navbar has-color-white">
        <router-link class="nav-button has-color-grey" to="/">
            <i class="fas fa-house"></i>
        </router-link>

        <router-link class="nav-button has-color-grey cart-link" to="/cart">
            <i class="fas fa-cart-shopping"></i>
            <span
                v-if="cartStore.totalItems > 0"
                class="cart-badge"
            >
                {{ cartStore.totalItems }}
            </span>
        </router-link>

        <router-link class="nav-button has-color-grey" to="/profile">
            <img class="user-image" v-if="userStore.isUserLogged" :src="userStore.user.profileImg" alt="User image" />
            <i v-else class="fas fa-user"></i>
        </router-link>
    </nav>
  
</template>

<style scoped>
.navbar {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -6px 6px -6px rgba(0, 0, 0, 0.2);
}

.nav-button{
    color: var(--grey);
    transition: color 0.2s ease;
}

.nav-button:hover{
    color: var(--primary-color);
}

.router-link-active {
  color: var(--primary-color);
}

.user-image{
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.cart-link {
    position: relative;
}

.cart-badge {
    position: absolute;
    top: -8px;
    right: -10px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    font-size: .7rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>

