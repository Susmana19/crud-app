import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'product.index',
        component: () => import('../views/products/Index.vue')
    },
    {
        path: '/add',
        name: 'product.add',
        component: () => import('../views/products/Add.vue')
    },
    {
        path: '/edit/:id',
        name: 'product.edit',
        component: () => import('../views/products/Edit.vue')
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router;