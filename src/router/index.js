import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Cart from "../views/Cart.vue";
import Product from "../views/Product.vue";
import Purchase from "../views/Purchase.vue";

//Creem el router per gestionar les rutes de l'aplicació
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: "home",
            component: Home
        },
        {
            path: '/login',
            name: "login",
            component: Login
        },
        {
            path: '/profile',
            name: "profile",
            component: Profile
        },
        {
            path: '/cart',
            name: "cart",
            component: Cart
        },
        {
            path: '/products/:id',
            name: "productsDetail",
            component: Product
        }
        ,
        {
            path: '/purchases/:id',
            name: "purchasesDetail",
            component: Purchase
        }


    ]
})

export default router;