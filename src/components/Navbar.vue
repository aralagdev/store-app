<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="navbar has-color-white">
        <router-link class="nav-button has-color-grey" to="/">
            <i class="fas fa-house"></i>
        </router-link>

        <router-link class="nav-button has-color-grey" to="/cart">
            <i class="fas fa-cart-shopping"></i>
        </router-link>

        <router-link class="nav-button has-color-grey" to="/profile">
            <i class="fas fa-user"></i>
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

</style>

