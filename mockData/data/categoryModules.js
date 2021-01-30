export const categoryModules = [
  {
    name: 'empleado',
    icon: 'all_inbox',
    modules: [
      {
        name: 'embalar',
        route: 'Factura',
        icon: 'map',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'listaEmpaques',
        route: 'EmpaquesEmpleado',
        icon: 'receipt',
        devices: ['mobile', 'desktop']
      }
      // {
      //   name: 'geolocation',
      //   route: 'geolocation',
      //   icon: 'map',
      //   devices: ['mobile', 'desktop']
      // }
    ]
  },
  // {
  //   name: 'administracion',
  //   icon: 'all_inbox',
  //   modules: []
  // },
  {
    name: 'transporte',
    icon: 'all_inbox',
    modules: [
      {
        name: 'listaEmpaques',
        route: 'EmpaquesTransporte',
        icon: 'receipt',
        devices: ['mobile', 'desktop']
      }
    ]
  },
  {
    name: 'cliente',
    icon: 'users',
    modules: [
      {
        name: 'listaEmpaques',
        route: 'EmpaquesCliente',
        icon: 'receipt',
        devices: ['mobile', 'desktop']
      }
    ]
  }
  // {
  //   name: 'organization',
  //   icon: '',
  //   modules: [
  //     {
  //       name: 'business',
  //       route: 'business',
  //       icon: '',
  //       devices: ['mobile', 'desktop']
  //     },
  //     {
  //       name: 'branch-offices',
  //       route: 'branch-offices',
  //       icon: '',
  //       devices: ['mobile', 'desktop']
  //     }
  //   ]
  // },
  // {
  //   name: 'security',
  //   icon: '',
  //   modules: [
  //     {
  //       name: 'permissions',
  //       route: 'permissions',
  //       icon: '',
  //       devices: ['mobile', 'desktop']
  //     },
  //     {
  //       name: 'modules',
  //       route: 'modules',
  //       icon: '',
  //       devices: ['mobile', 'desktop']
  //     },
  //     {
  //       name: 'users',
  //       route: 'users',
  //       icon: '',
  //       devices: ['mobile', 'desktop']
  //     },
  //     {
  //       name: 'roles',
  //       route: 'roles',
  //       icon: '',
  //       devices: ['mobile', 'desktop']
  //     }
  //   ]
  // }
]
