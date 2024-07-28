import { createWebHistory, createRouter } from 'vue-router'

import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Currency from "../views/Currency.vue";
import Register from "../views/Register.vue";
import Index from "../views/Index.vue";
import PageNotFound from "../views/PageNotFound.vue";
import Transactions from "../views/Transactions.vue";
import Datepicker from "../components/DatePicker.vue";

const routes = [
    { path: '/', name: 'index', component: Index},
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },
    { path: '/currency', name: 'currency', component: Currency },
    { path: '/transactions', name: 'transactions', component: Transactions },
    { path: '/d', name: 't', component: Datepicker },
    { path: '/:pathMatch(.*)*', name:'404', component: PageNotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;