import { validationSession, validationNotSession } from './validations-router'
const routes = [
  {
    path: '/login',
    name: 'login',
    beforeEnter: validationNotSession,
    component: () => import('pages/Login.vue')
  },
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: validationSession,
    children: [
      {
        path: '',
        component: () => import('pages/EmpaquesEmpleado.vue'),
        name: ''
      },
      {
        path: '/empaques-empleado',
        component: () => import('pages/EmpaquesEmpleado.vue'),
        name: 'EmpaquesEmpleado'
      },
      {
        path: '/empaques-transporte',
        component: () => import('pages/EmpaquesTransporte.vue'),
        name: 'EmpaquesTransporte'
      },
      {
        path: '/geolocation',
        component: () => import('pages/Geolocation.vue'),
        name: 'Geolocation'
      },
      {
        path: '/embalar',
        component: () => import('pages/Embalar.vue'),
        name: 'Embalar'
      },
      {
        path: '/empaques-cliente',
        component: () => import('pages/EmpaquesCliente.vue'),
        name: 'EmpaquesCliente'
      },
      {
        path: '/empaques',
        component: () => import('pages/EmpaquesAdministrador.vue'),
        name: 'EmpaquesAdministrador'
      },
      {
        path: '/lista-reclamo',
        component: () => import('pages/ListaReclamo.vue'),
        name: 'ListaReclamo'
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
