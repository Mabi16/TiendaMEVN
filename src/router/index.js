import Vue from "vue";
import VueRouter from "vue-router";

import Pages from "../components/Pages";
import ProductList from "../components/ProductList";
import ShoppingCart from "../components/ShoppingCart";
import Checkout from "../components/Checkout";
import Thanks from "../components/Thanks";
import Login from "../components/admin/Login";

import Admin from "../components/admin/Admin";
import AdminPages from "../components/admin/Pages";
import PageEditor from "../components/admin/PageEditor";
import Products from "../components/admin/Products";
import ProductEditor from "../components/admin/ProductEditor";
import Orders from "../components/admin/Orders";

import dataStore from "../store"

Vue.use(VueRouter);

export default new VueRouter({
      mode: "history",

      routes: [
            // ruteo a paginas normales
            { path: "/cart", component: ShoppingCart },
            { path: "/thanks", component: Thanks },
            { path: "/checkout", component: Checkout },
            { path: "/categorias/:category", component: ProductList },
            { path: "/login", component: Login },

            // ruteo a paginas de admin
            // y los slug dentro de admin Ej: 'localhost:8080/admin/pages'
            {
                  path: "/admin", component: Admin, 
                  beforeEnter (to, from, next) {
                    if (dataStore.state.auth.authenticated) {
                          next();
                    } 
                    else {
                          next("/login");
                    }
                  },
                  children: [
                        { path: "pages", component: AdminPages },
                        { path: "pages/:op(agregar|editar)/:id?", component: PageEditor },
                        { path: "products", component: Products },
                        { path: "products/:op(agregar|editar)/:id?", component: ProductEditor },
                        { path: "orders", component: Orders },
                        { path: "*", redirect: "/admin/products" },

                  ],
            },


            // ruteo a las paginas dependiendo del slug
            { path: "/:slug?", component: Pages },

            // cualquier url que no encuentre, mandará a inicio
            { path: "*", redirect: "/" },
      ],
});