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
        icon: 'store',
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
      }
    ]
  }
]
