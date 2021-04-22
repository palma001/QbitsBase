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
        access: [],
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
        access: ['super_admin'],
        devices: ['mobile', 'desktop']
      },
      {
        name: 'check-shipping',
        route: 'CheckShippingPage',
        icon: 'sell',
        access: ['super_admin'],
        devices: ['mobile', 'desktop']
      },
      {
        name: 'cash-register',
        route: 'CashRegisterPage',
        icon: 'account_balance_wallet',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
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
        icon: 'south_east',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'dispatch-packages',
        route: 'DispatchPakagesPage',
        icon: 'north_west',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'guides-management',
        route: 'GuidesPakagesPage',
        icon: 'copy_all',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'inventory-management',
        route: 'InventoryPakagesPage',
        icon: 'library_books',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
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
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'invoice-summary',
        route: 'InvoiceSummaryPage',
        icon: 'receipt_long',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'shipment-summary',
        route: 'ShipmentSummaryPage',
        icon: 'checklist',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
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
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'branchoffices-management',
        route: 'BranchOfficesPage',
        icon: 'maps_home_work',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'transportation-management',
        route: 'TransportationPage',
        icon: 'local_shipping',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'roles-management',
        route: 'RolesPage',
        icon: 'people_alt',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'routes-management',
        route: 'RoutesPage',
        icon: 'moving',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'measures-management',
        route: 'MeasuresPage',
        icon: 'straighten',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'payment-method',
        route: 'PaymentMethodPage',
        icon: 'credit_card',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      },
      {
        name: 'currency-rate',
        route: 'CurrencyRatePage',
        icon: 'paid',
        devices: ['mobile', 'desktop'],
        access: ['super_admin']
      }
    ]
  }
]
