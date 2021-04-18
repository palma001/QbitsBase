export default {
  template: {
    empleado: 'empleado',
    administracion: 'administración',
    transporte: 'transporte',
    darkMode: 'modo oscuro',
    active: 'habilitado',
    desactive: 'deshabilitado',
    cliente: 'cliente',
    organization: 'organización',
    home: 'inicio',
    reception: 'recepción',
    administration: 'administración',
    configuration: 'configuración',
    stock: 'almacén'
    home: 'inicio',
    search: 'buscar',
    actions: 'detalles',
    noResults: 'sin resultados'
  },
  // modules
  modules: {
    'new-shipment': 'enviar / entregar',
    'cash-register': 'cerrar caja',
    'check-shipping': 'consultar envío',
    'users-management': 'usuarios',
    'branchoffices-management': 'sucursales',
    'transportation-management': 'transportes',
    'roles-management': 'roles',
    'routes-management': 'rutas',
    'measures-management': 'medidas',
    'payment-method': 'métodos de pagos',
    'reception-pakages': 'recepción',
    'dispatch-packages': 'despacho',
    'guides-management': 'guías',
    'inventory-management': 'inventario',
    'payment-summary': 'resumen de ventas',
    'invoice-summary': 'resumen de facturación',
    'shipment summary': 'resumen de envíos',
    dashboard: 'tablero',
    geolocation: 'geolocalización',
    transporte: 'transporte',
    listaReclamo: 'Lista Reclamo'
  },
  newShipment: {
    sender: 'remitente',
    packages: 'paquetes',
    addSender: 'agregar remitente',
    addPackages: 'agregar paquete'
  },
  sender: {
    add: 'Agregar Remitente',
    sender_type: 'tipo de remitente',
    name: 'nombre o razón social',
    last_name: 'apellido',
    document_number: 'número de documento',
    document_type: 'tipo de documento',
    phone_number: 'número de telefono',
    email: 'correo',
    reset: 'Limpiar',
    cancel: 'Cancelar',
    saveSuccess: 'Remitente agregado exitosamente'
  },
  branchOffice: {
    name: 'nombre',
    description: 'descripción',
    phone_number: 'telefono (1)',
    destination: 'ciudad',
    destination_id: 'ciudad',
    phone_number_two: 'telefono (2)',
    in_charge: 'encaragado',
    in_charge_id: 'encaragado',
    list: 'lista de sucursales',
    add: 'agregar sucursal',
    update: 'editar sucursal',
    cancel: 'cancelar',
    reset: 'limpiar',
    address: 'dirección'
  },
  rate: {
    name: 'nombre',
    cost: 'costo',
    unit_of_measurement_id: 'médida',
    unit_of_measurement: 'médida',
    list: 'lista de médidas',
    add: 'agregar médida',
    update: 'editar médida',
    cancel: 'cancelar',
    reset: 'limpiar'
  }
}
