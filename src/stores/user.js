import { defineStore } from "pinia";
import { computed, ref } from "vue";


//Definim la store que guardarà el token d'autenticació de l'usuari
export const useUserStore = defineStore("user", () => {
    //Definim les variables y funcions que conté la store "user"
    
    //Variables d'usuari
    const userToken = ref(null)
    const user = ref(null)
    const errorMessage = ref('')

    //Comprovació del login
    const isUserLogged = computed(() => {
        if(!userToken.value){
            return false;
        } else {
            return true;
        }
    })

    async function login() {
  
        errorMessage.value="";

        //Petició asíncrona a la API, mètode POST
        try {
            const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                username: username.value,
                password: password.value
                })
            })

        const data = await response.json();

        if (!response.ok) {
            errorMessage.value = data.message
            return
        }; 

        user.value = data.user;
        userToken.value = data.token;

        return true;

        } catch(error) {
            console.log(error);
            errorMessage.value = 'Warning: Login error'; 
            return false;
        }
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
        errorMessage,
        isUserLogged,
        login,
        logout
    }

})