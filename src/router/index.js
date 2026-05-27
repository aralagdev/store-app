import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Cart from "../views/Cart.vue";
import Product from "../views/Product.vue";
import Purchase from "../views/Purchase.vue";
import { useUserStore } from "../stores/user";

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
            component: Profile,
            meta: { requiresAuth: true } 
        },
        {
            path: '/cart',
            name: "cart",
            component: Cart,
            meta: { requiresAuth: true }
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
            component: Purchase,
            meta: { requiresAuth: true }
        }


    ]
})

//Definim que abans d'entrar a les rutes es comprovi si son protegides i si l'usuari esta autenticat
router.beforeEach((to) => {
    const userStore = useUserStore();

    if(to.meta.requiresAuth && !userStore.isUserLogged) {
        const redirectRoute = {
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        }
        return redirectRoute;  
    }
})

export default router;