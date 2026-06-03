import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useProductsStore = defineStore('products', () => {
    //Array de productes
    const products = ref([]);
    //Característiques de la pàgina
    const limit = ref(10);
    const offset = ref(0);
    //Missatge d'error
    const errorMessage = ref(""); 
   

    //Funció asíncrona per fer una petició a la API per rebre els productes
    async function getProducts() {
        errorMessage.value="";

        try {
            const response = await fetch(`http://localhost:3000/products?limit=${limit.value}&offset=${offset.value}`); 

            const data = await response.json();

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

    //Funció asíncrona per fer a una petició a la API d'un producte concret
    async function getProductsById(id){
        try {
            const response = await fetch(`http://localhost:3000/products/${id}`);

            const data = await response.json();

            if(!response.ok) {
                errorMessage.value = data.message
                return
            }

            return data; 
                        
        } catch(error) {
            console.log(error);
            errorMessage.value = 'Warning: Error finding the item'; 
        }
    }

    //Funció asíncrona per trobar productes relacionats segons categoria
    async function getRelatedProducts(category, detailsProductId){
        try {
            const relatedProducts = [];

            const response = await fetch(`http://localhost:3000/products?category=${encodeURIComponent(category)}`);

            const data = await response.json();

            if(!response.ok) {
                errorMessage.value = data.message
                return
            }

            return data.items.filter(product => product.id !== detailsProductId).slice(0,4); 

            
        } catch(error){
            console.log(error);
            errorMessage.value = 'Warning: Error finding the items';
            return [];  
        }
    }

    return {
        products,
        getProducts, 
        getProductsById,
        getRelatedProducts
    }

    
})




