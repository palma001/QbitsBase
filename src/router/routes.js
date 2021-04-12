import { validationNotSession, validationSession, validationValidation } from './validations-router'
const routes = [
  {
    path: '/login',
    name: 'login',
    beforeEnter: validationNotSession,
    component: () => import('pages/Login.vue')
  },
  {
    path: '/',
    component: () => import('layouts/LandingLayaout.vue'),
    beforeEnter: validationValidation,
    children: [
      {
        path: '/',
        component: () => import('pages/Index.vue'),
        name: 'LandingPage'
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: validationSession,
    children: [
      {
        path: '/new-shipment',
        component: () => import('pages/NewShipment.vue'),
        name: 'NewShipment'
      },
      {
        path: '/user-management',
        component: () => import('pages/UserPage.vue'),
        name: 'UserPage'
      },
      {
        path: 'pruebas',
        component: () => import('pages/Prueba.vue'),
        name: 'Prueba'
      }
    ]
  },
  // {
  //   path: '/',
  //   beforeEnter: validationSession,
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     {
  //       path: '/business',
  //       name: 'business',
  //       component: () => import('pages/Business.vue')
  //     },
  //     {
  //       path: 'users',
  //       name: 'users',
  //       component: () => import('pages/User.vue')
  //     },
  //     {
  //       path: 'modules',
  //       name: 'modules',
  //       component: () => import('pages/Module.vue')
  //     },
  //     {
  //       path: 'permissions',
  //       name: 'permissions',
  //       component: () => import('pages/Permission.vue')
  //     },
  //     {
  //       path: 'branch-offices',
  //       name: 'branch-offices',
  //       component: () => import('pages/BranchOffice.vue')
  //     },
  //     {
  //       path: 'roles',
  //       name: 'roles',
  //       component: () => import('pages/Role.vue')
  //     },
  //     {
  //       path: 'billing',
  //       name: 'billing',
  //       component: () => import('pages/Billing.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/add',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'add',
  //       component: () => import('pages/AddModule.vue')
  //     }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
