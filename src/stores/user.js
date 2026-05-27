import { defineStore } from "pinia";
import { computed, ref } from "vue";


//Definim la store que guardarà el token d'autenticació de l'usuari
export const useUserStore = defineStore("user", () => {
    //Definim les variables y funcions que conté la store "user"
    
    //Variables d'usuari
    const userToken = ref(null)
    const user = ref(null)

    //Comprovació del login
    const isUserLogged = computed(() => {
        if(!userToken.value){
            return false;
        } else {
            return true;
        }
    })

    //Login
    function login(userInfo,  token){
        user.value = userInfo
        userToken.value = token
    }

    //Logout
    function logout(){
        user.value = null
        userToken.value = null
    }

    //Retornem les variables i funcions
    return {
        userToken,
        user,
        isUserLogged,
        login,
        logout
    }

})