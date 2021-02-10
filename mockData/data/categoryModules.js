export const categoryModules = [
  {
    name: 'organization',
    icon: 'all_inbox',
    open: true,
    modules: [
      {
        name: 'geolocation',
        route: 'Geolocation',
        icon: 'map',
        access: ['UA'],
        devices: ['mobile', 'desktop']
      },
      {
        name: 'embalar',
        route: 'Embalar',
        icon: 'map',
        access: ['EE'],
        devices: ['mobile', 'desktop']
      },
      {
        name: 'listaEmpaques',
        route: 'EmpaquesEmpleado',
        icon: 'receipt',
        access: ['EE'],
        devices: ['mobile', 'desktop']
      },
      {
        name: 'listaEmpaques',
        route: 'EmpaquesCliente',
        icon: 'receipt',
        access: ['UC', 'UA'],
        devices: ['mobile', 'desktop']
      },
      {
        name: 'transporte',
        route: 'EmpaquesTransporte',
        icon: 'car',
        access: ['ET'],
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
