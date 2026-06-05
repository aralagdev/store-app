<script setup>
import { useUserStore } from '../stores/user';
const userStore = useUserStore();

</script>

<template>
    <button class="app-title" @click="userStore.logout">
        <h2 class=" has-color-primary">My store</h2>
    </button>
    
</template>

<style>
.app-title{
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>