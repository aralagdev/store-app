<script setup>
import { ref } from "vue";
import { errorMessages } from "vue/compiler-sfc";
import { useUserStore } from '../stores/user'; 
import { useRouter, useRoute} from 'vue-router'; 

const username = ref(""); 
const password = ref("");
const userStore = useUserStore(); 
const router = useRouter();
const route = useRoute(); 

//Maneig del login amb una funció asíncrona 
async function manageLogin() {
  const userLogin = await userStore.login(
    username.value,
    password.value
  )

  if(!userLogin) return;

  //Redirigim la pàgina de manera intel·ligent
  //Guardem el paràmetre redirect
  const redirectPath = route.query.redirect || '/';
  //Naveguem  cap al paràmetre redirect
  router.push(redirectPath); 

}
</script>

<template>
  <div class="login">
    <h2 class="title-section ">Login</h2>

    <form class="login-form" @submit.prevent="manageLogin">
      <div class="input-group ">

        <label for="username">Username</label>
        <input id="username" v-model="username" type="text" placeholder="Username.."/>

        <label for="password">Password</label>
        <input id="password" v-model="password" type="text" placeholder="Password.."/>
      </div>

      <button class="btn btn--cta">Login</button>

      <p v-if="userStore.errorMessage" class="error"> {{ userStore.errorMessage }}</p>
    </form>
  </div>
</template>

<style scoped>
.login {
  padding: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  background-color:#e6f2ff;;
}

button{
  max-width: 50%;
  margin: 0 auto;
}

button:hover{
  background-color: #77aa9d; 
}
</style>
