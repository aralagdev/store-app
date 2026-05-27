<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <header>
    <h1>Header</h1>
  </header>
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
