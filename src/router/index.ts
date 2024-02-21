import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/sub',
            name: 'sub',
            component: () => import('@/views/sub/SubView.vue')
        },
        {
            path: '/moving-cleaning',
            name: 'movingCleaning',
            component: () => import('@/views/sub/MovingCleaningView.vue')
        },
        {
            path: '/move-in-cleaning',
            name: 'moveInCleaning',
            component: () => import('@/views/sub/MoveInCleaningView.vue')
        },
        {
            path: '/interior-cleaning',
            name: 'interiorCleaning',
            component: () => import('@/views/sub/InteriorCleaningView.vue')
        },
        {
            path: '/regular-cleaning',
            name: 'regularCleaning',
            component: () => import('@/views/sub/RegularCleaningView.vue')
        },
        {
            path: '/window-cleaning',
            name: 'windowCleaning',
            component: () => import('@/views/sub/WindowCleaningView.vue')
        },
        {
            path: '/one-room-cleaning',
            name: 'oneRoomCleaning',
            component: () => import('@/views/sub/OneRoomCleaningView.vue')
        },
        {
            path: '/spot-cleaning',
            name: 'spotCleaning',
            component: () => import('@/views/sub/SpotCleaningView.vue')
        },
        {
            path: '/store-cleaning',
            name: 'storeCleaning',
            component: () => import('@/views/sub/StoreCleaningView.vue')
        },
        {
            path: '/office-cleaning',
            name: 'officeCleaning',
            component: () => import('@/views/sub/OfficeCleaningView.vue')
        },
        {
            path: '/residential-cleaning',
            name: 'residentialCleaning',
            component: () => import('@/views/sub/ResidentialCleaningView.vue')
        },
        {
            path: '/fire-cleaning',
            name: 'fireCleaning',
            component: () => import('@/views/sub/FireCleaningView.vue')
        },
        {
            path: '/restaurant-cleaning',
            name: 'restaurantCleaning',
            component: () => import('@/views/sub/RestaurantCleaningView.vue')
        },
        {
            path: '/trauma-scene-cleaning',
            name: 'traumaSceneCleaning',
            component: () => import('@/views/sub/TraumaSceneCleaningView.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue')
        },
        {
            path: '/payment',
            name: 'payment',
            component: () => import('@/views/PaymentView.vue')
        }
    ],
    scrollBehavior(to, from, savePosition) {
        return { top: 0 };
    }
});

export default router;
