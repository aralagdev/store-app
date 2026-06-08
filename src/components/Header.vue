<script setup>
import { useUserStore } from '../stores/user';
const userStore = useUserStore();

</script>

<template>

    <h2 class="app-title has-color-primary">My store</h2>

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