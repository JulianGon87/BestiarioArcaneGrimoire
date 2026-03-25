import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../layouts/BookLayout.vue'),
            redirect: '/dashboard',
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: () => import('../views/DashboardView.vue')
                },
                {
                    path: 'bestiario',
                    name: 'bestiario',
                    component: () => import('../views/BestiaryView.vue')
                },
                {
                    path: 'bestiario/:id',
                    component: () => import('../views/MonsterDetail.vue'),
                    props: true,
                    children: [
                        {
                            path: '',
                            name: 'monster-stats',
                            component: () => import('../components/MonsterStats.vue')
                        },
                        {
                            path: 'lore',
                            name: 'monster-lore',
                            component: () => import('../components/MonsterLore.vue')
                        }
                    ]
                },
                {
                    path: '/:pathMatch(.*)*',
                    name: 'NotFound',
                    component: () => import('../views/LostInTheDungeon.vue')
                }
            ]
        }
    ]
})

export default router
