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
            path: '/introduce',
            name: 'introduce',
            component: () => import('@/views/Introduce.vue')
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
            path: '/trash-cleaning',
            name: 'trashCleaning',
            component: () => import('@/views/sub/TrashCleaningView.vue')
        },
        {
            path: '/waste-cleaning',
            name: 'wasteCleaning',
            component: () => import('@/views/sub/WasteCleaningView.vue')
        },
        {
            path: '/completion-cleaning',
            name: 'completionCleaning',
            component: () => import('@/views/sub/CompletionCleaningView.vue')
        },
        {
            path: '/parking-cleaning',
            name: 'parkingCleaning',
            component: () => import('@/views/sub/ParkingCleaningView.vue')
        },
        {
            path: '/wall-cleaning',
            name: 'wallCleaning',
            component: () => import('@/views/sub/WallCleaningView.vue')
        },
        {
            path: '/factory-cleaning',
            name: 'factoryCleaning',
            component: () => import('@/views/sub/FactoryCleaningView.vue')
        },
        {
            path: '/school-cleaning',
            name: 'schoolCleaning',
            component: () => import('@/views/sub/SchoolCleaningView.vue')
        },
        {
            path: '/joint-cleaning',
            name: 'jointCleaning',
            component: () => import('@/views/sub/JointCleaningView.vue')
        },
        {
            path: '/school-cleaning',
            name: 'schoolCleaning',
            component: () => import('@/views/sub/SchoolCleaningView.vue')
        },
        {
            path: '/mold-cleaning',
            name: 'moldCleaning',
            component: () => import('@/views/sub/MoldCleaningView.vue')
        },
        {
            path: '/wax-cleaning',
            name: 'waxCleaning',
            component: () => import('@/views/sub/WaxCleaningView.vue')
        },
        {
            path: '/coating-cleaning',
            name: 'coatingCleaning',
            component: () => import('@/views/sub/CoatingCleaningView.vue')
        },
        {
            path: '/grinding-cleaning',
            name: 'grindingCleaning',
            component: () => import('@/views/sub/GrindingCleaningView.vue')
        },
        {
            path: '/appliances-cleaning',
            name: 'appliancesCleaning',
            component: () => import('@/views/sub/AppliancesCleaningView.vue')
        },
        {
            path: '/promotion',
            name: 'promotion',
            component: () => import('@/views/PromotionView.vue')
        },
        {
            path: '/review',
            name: 'review',
            component: () => import('@/views/ReviewView.vue')
        },
        {
            path: '/review/:id',
            name: 'reviewDetail',
            component: () => import('@/views/ReviewDetailView.vue')
        },
        {
            path: '/payment/result',
            name: 'paymentResult',
            component: () => import('@/views/payment/MobilePaymentResult.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/'
        }
    ],
    scrollBehavior(to, from, savePosition) {
        return { top: 0 };
    }
});

export default router;
