export const categoryModules = [
  {

    name: 'home',
    icon: 'home',
    open: true,
    modules: [
      {
        name: 'dashboard',
        route: 'DashboardPage',
        icon: 'dashboards',
        devices: ['mobile', 'desktop']
      }
    ]
  },
  {

    name: 'reception',
    icon: 'account_box',
    open: true,
    modules: [
      {
        name: 'new-shipment',
        route: 'NewShipment',
        icon: 'safety_divider',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'check-shipping',
        route: 'CheckShippingPage',
        icon: 'sell',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'cash-register',
        route: 'CashRegisterPage',
        icon: 'account_balance_wallet',
        devices: ['mobile', 'desktop']
      }
    ]
  },
  {
    name: 'stock',
    icon: 'calendar_view_month',
    open: true,
    modules: [
      {
        name: 'reception-pakages',
        route: 'ReceptionPakagesPage',
        icon: 'north_west',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'dispatch-packages',
        route: 'DispatchPakagesPage',
        icon: 'south_east',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'guides-management',
        route: 'GuidesPakagesPage',
        icon: 'copy_all',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'inventory-management',
        route: 'InventoryPage',
        icon: 'library_books',
        devices: ['mobile', 'desktop']
      }
    ]
  },
  {
    name: 'administration',
    icon: 'app_registration',
    open: true,
    modules: [
      {
        name: 'payment-summary',
        route: 'PaymentSummaryPage',
        icon: 'point_of_sale',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'invoice-summary',
        route: 'InvoiceSummaryPage',
        icon: 'receipt_long',
        devices: ['mobile', 'desktop']
      },
      {
        name: 'shipment summary',
        route: 'ShipmentSummaryPage',
        icon: 'checklist',
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
      },
      {
        name: 'payment-method',
        route: 'PaymentMethodPage',
        icon: 'credit_card',
        devices: ['mobile', 'desktop']
      }

    ]
  }
]
