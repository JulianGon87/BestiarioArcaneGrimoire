import { createRouter, createWebHistory } from 'vue-router'
import BookLayout from '../layouts/BookLayout.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: BookLayout,
            redirect: '/dashboard',
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: DashboardView
                },
                {
                    path: 'bestiario',
                    name: 'bestiario',
                    component: () => import('../views/BestiaryView.vue')
                },
                {
                    path: 'bestiario/:id',
                    name: 'monster-detail',
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
                }
            ]
        }
    ]
})

export default router
