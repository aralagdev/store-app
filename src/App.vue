<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue';
</script>

<template>
  <Header/>
  <main class="main">
    <RouterView />
  </main>
  <footer>
    <Navbar />
  </footer>
</template>

<style scoped>
.main {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

</style>
