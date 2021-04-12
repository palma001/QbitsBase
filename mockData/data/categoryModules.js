export const categoryModules = [
  {
    name: 'reception',
    icon: 'all_inbox',
    open: true,
    modules: [
      {
        name: 'new-shipment',
        route: 'NewShipment',
        icon: 'inventory_2',
        devices: ['mobile', 'desktop']
      }
    ]
  },
  {
    name: 'configuration',
    icon: 'settings',
    open: true,
    modules: [
      {
        name: 'users-management',
        route: 'UserPage',
        icon: 'account_circle',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'branchoffices-management',
        route: 'BranchOfficesPage',
        icon: 'maps_home_work',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'transportation-management',
        route: 'TransportationPage',
        icon: 'local_shipping',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'roles-management',
        route: 'RolesPage',
        icon: 'people_alt',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'routes-management',
        route: 'RoutesPage',
        icon: 'moving',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'measures-management',
        route: 'MeasuresPage',
        icon: 'straighten',
        devices: ['mobile', 'desktop']
      }
    ]
  }
]
