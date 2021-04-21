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
        path: '/cash-register',
        component: () => import('pages/CashRegisterPage.vue'),
        name: 'CashRegisterPage'
      },
      {
        path: '/check-shipping',
        component: () => import('pages/CheckShippingPage.vue'),
        name: 'CheckShippingPage'
      },
      {
        path: '/user-management',
        component: () => import('src/pages/UserPage.vue'),
        name: 'UserPage'
      },
      {
        path: '/branchoffices-management',
        component: () => import('src/pages/BranchOfficesPage.vue'),
        name: 'BranchOfficesPage'
      },
      {
        path: '/transportation-management',
        component: () => import('src/pages/TransportationPage.vue'),
        name: 'TransportationPage'
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
        path: '/measures-management',
        component: () => import('src/pages/MeasuresPage.vue'),
        name: 'MeasuresPage'
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
      },
      {
        path: '/reception-pakages',
        component: () => import('src/pages/ReceptionPakagesPage.vue'),
        name: 'ReceptionPakagesPage'
      },
      {
        path: '/dispatch-packages',
        component: () => import('src/pages/DispatchPakagesPage.vue'),
        name: 'DispatchPakagesPage'
      },
      {
        path: '/guides-management',
        component: () => import('src/pages/GuidesPakagesPage.vue'),
        name: 'GuidesPakagesPage'
      },
      {
        path: '/inventory-management',
        component: () => import('src/pages/InventoryPakagesPage.vue'),
        name: 'InventoryPakagesPage'
      },
      {
        path: '/payment-summary',
        component: () => import('src/pages/PaymentSummaryPage.vue'),
        name: 'PaymentSummaryPage'
      },
      {
        path: 'currency-rate',
        component: () => import('src/pages/CurrencyRatePage.vue'),
        name: 'CurrencyRatePage'
      },
      {
        path: '/invoice-summary',
        component: () => import('src/pages/InvoiceSummaryPage.vue'),
        name: 'InvoiceSummaryPage'
      },
      {
        path: '/shipment summary',
        component: () => import('src/pages/ShipmentSummaryPage.vue'),
        name: 'ShipmentSummaryPage'
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
