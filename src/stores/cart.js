import { defineStore } from "pinia";
import { ref, computed } from "vue";
import Product from "../views/Product.vue";

export const useCartStore = defineStore('cart', () => {
    //Array del carret
    const cart = ref([]);

    //Array amb els productes del carret carregats desde la API
    const cartLoaded = ref([]);
    
    //Missatge d'error
    const errorMessage = ref(''); 

    //Propietat computada per calcular el preu total del carret
    const totalPrice = computed(() => {
        return cartLoaded.value.reduce((total, product) => {
            return total + (product.price * product.quantity);
        },0);
    });

    //Propietat computada per a calcular els items totals al carrer
    const totalItems = computed(() => {
        return cart.value.reduce((total, item) => total + item.quantity,0);
    });

    //Funció per afegir productes al carret
    function addProduct(productId){
        const productInCart = cart.value.find(product => product.productId === productId);

        if(productInCart){
            productInCart.quantity++;
            return;
        }

        cart.value.push({productId, quantity: 1}); 
    }

    //Funció per augmentar la quantitat del producte
    async function increaseQuantity(productId){
        const product = cart.value.find(product => product.productId === productId);

        if(product){
            product.quantity++;
        }

        await getCartProducts();

    }

    //Funció per disminuir la quantitat del producte
    async function decreaseQuantity(productId){
        const product = cart.value.find(product => product.productId === productId);

        if(!product) return; 
        
        product.quantity--;
        
        //Si no eliminem totes les còpies del producte s'elimina del carret
        if(product.quantity <= 0){
            removeFromCart(productId); 
        }

        await getCartProducts();

    }

    //Funció per eliminar el producte del carret
    async function removeFromCart(productId){
        cart.value = cart.value.filter(product => product.productId !== productId);
        await getCartProducts();
    }

    //Funció per buidar el carret
    function emptyCart(){
        cart.value = [];   
    }

    //Funció per obtenir la informació dels productes del carret
    async function getCartProducts() {
        errorMessage.value = '';

        //Controlem el cas del carret buit
        if(cart.value.length === 0) {
            cartLoaded.value = [];
            return;
        }

        try {
            const products = JSON.stringify(cart.value);

            const response = await fetch(`http://localhost:3000/cart?items=${encodeURIComponent(products)}`);

            const data = await response.json();

            if(!response.ok) {
                errorMessage.value = data.message;
                return;
            }

            cartLoaded.value = data.map(product => {
                
                //Busquem el producte al carret
                const cartProduct = cart.value.find(item => item.productId === product.id);

                //Retornem l'objecte amb la informació del producte i la quantitat
                return { ...product, quantity: cartProduct.quantity }; 

            });
        } catch(error) {
            console.log(error);

            errorMessage.value = "Warning: Error loading cart";  
        }
    }

    return {
        cart,
        addProduct,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        emptyCart,
        cartLoaded,
        errorMessage,
        getCartProducts,
        totalPrice,
        totalItems
    }
})