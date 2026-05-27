import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useProductsStore = defineStore('products', () => {
    const products = ref([]);
    const limit = ref(10);
    const offset = ref(0);
    const errorMessage = ref(""); 

    //Funció asíncrona per fer una petició a la API per rebre els productes
    async function getProducts() {
        errorMessage.value="";

        try {
            const response = await fetch(`http://localhost:3000/products?limit=${limit.value}&offset=${offset.value}`); 

            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                errorMessage.value = data.message
                return
            }; 

            products.value.push(...data.items);

            offset.value += limit.value; 
        } catch(error) {
            console.log(error);
            errorMessage.value = 'Warning: Loading error'; 
        }
    }

    return {
        products,
        getProducts
    }

    
})




