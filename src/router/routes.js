import { validationNotSession /* validationSession */ } from './validations-router'
const routes = [
  {
    path: '/login',
    name: 'login',
    beforeEnter: validationNotSession,
    component: () => import('pages/Login.vue')
  },
  {
    path: '/',
    component: () => import('pages/DashboardPage.vue'),
    children: []
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    // beforeEnter: validationSession,
    children: [
      {
        path: '/user-management',
        component: () => import('src/pages/UserPage.vue'),
        name: 'UserPage'
      },
      {
        path: '/roles-management',
        component: () => import('src/pages/RolesPage.vue'),
        name: 'RolesPage'
      },
      {
        path: '/routes-management',
        component: () => import('src/pages/RoutesPage.vue'),
        name: 'RoutesPage'
      },
      {
        path: '/dashboard',
        component: () => import('src/pages/DashboardPage.vue'),
        name: 'DashboardPage'
      },
      {
        path: '/payment-method',
        component: () => import('src/pages/PaymentMethodPage.vue'),
        name: 'PaymentMethodPage'
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
