import { defineStore } from "pinia";
import { computed, ref } from "vue";


//Definim la store que guardarà el token d'autenticació de l'usuari
export const useUserStore = defineStore("user", () => {
    //Definim les variables y funcions que conté la store "user"
    
    //Variables d'usuari, les recuperem del LocalStorage
    const userToken = ref(localStorage.getItem('userToken'));
    const user = ref(JSON.parse(localStorage.getItem('user')));
    const errorMessage = ref('')

    //Comprovació del login
    const isUserLogged = computed(() => {
        if(!userToken.value){
            return false;
        } else {
            return true;
        }
    })

    //Funció que maneja el login de l'usuari contrastant les dades amb la API, que retorna el Token. 
    async function login(username, password) {
  
        errorMessage.value="";

        //Petició asíncrona a la API, mètode POST
        try {
            const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                username,
                password
                })
            })

        const data = await response.json();

        if (!response.ok) {
            errorMessage.value = data.message
            return
        }; 

        //Capturem el nom  d'usuari i el token rebut
        user.value = data.user;
        userToken.value = data.token;

        //Afegim les dades al LocalStorage per a garantir persistència
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userToken', data.token)

        return true;

        } catch(error) {
            console.log(error);
            errorMessage.value = 'Warning: Login error'; 
            return false;
        }
    }

    //Logout de l'usuari. Eliminació de dades 
    function logout(){
        //Eliminem les dades d'usuari del localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('userToken'); 

        //Retornem les dades d'usuari a null
        user.value = null;
        userToken.value = null;
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