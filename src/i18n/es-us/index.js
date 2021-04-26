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
    'customer-support': 'atención al cliente',
    stock: 'almacén',
    search: 'buscar',
    actions: 'detalles',
    noResults: 'sin resultados',
    error: 'Algo a salido mal, pongase en contacto con el administrador'
  },
  user: {
    add: 'agregar usuario',
    sender_type: 'tipo de remitente',
    name: 'nombre o razón social',
    last_name: 'apellido',
    document_number: 'número de identificación',
    document_type: 'tipo de documento',
    phone_number: 'número de teléfono',
    email: 'correo',
    reset: 'Limpiar',
    cancel: 'Cancelar',
    saveSuccess: 'usuario agregado exitosamente',
    password: 'clave',
    list: 'lista de usuarios',
    roles: 'roles',
    branch_offices: 'sucursales',
    update: 'Editar usuario'
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
    'currency-rate': 'tasa cambiaria',
    'reception-pakages': 'recepción',
    'dispatch-packages': 'despacho',
    'guides-management': 'guías',
    'inventory-management': 'inventario',
    'payment-summary': 'resumen de ventas',
    'invoice-summary': 'resumen de facturas',
    'shipment-summary': 'resumen de operaciones',
    'email-administration': 'email',
    'email-branchoffice': 'sucursal',
    'email-contactus': 'contáctanos',
    'inbox-form': 'buzón de mensajes',
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
    document_number: 'número de identificación',
    document_type: 'tipo de documento',
    phone_number: 'número de teléfono',
    email: 'correo',
    reset: 'Limpiar',
    cancel: 'Cancelar',
    saveSuccess: 'Remitente agregado exitosamente'
  },
  branchOffice: {
    name: 'nombre',
    description: 'descripción',
    phone_number: 'teléfono (1)',
    destination: 'ciudad',
    destination_id: 'ciudad',
    phone_number_two: 'teléfono (2)',
    in_charge: 'encargado',
    in_charge_id: 'encargado',
    list: 'lista de sucursales',
    add: 'agregar sucursal',
    update: 'editar sucursal',
    cancel: 'cancelar',
    reset: 'limpiar',
    address: 'dirección',
    deleteSuccessfull: 'sucursal eliminada exitosamente'
  },
  rate: {
    name: 'nombre',
    cost: 'costo',
    unit_of_measurement_id: 'medida',
    unit_of_measurement: 'medida',
    list: 'lista de medidas',
    add: 'agregar medida',
    update: 'editar medida',
    cancel: 'cancelar',
    reset: 'limpiar',
    deleteSuccessfull: 'medida eliminada exitosamente',
    addSuccessfull: 'medida agregada exitosamente',
    editSuccessfull: 'medida editada exitosamente'
  },
  voucher: {
    status: 'estado del paquete',
    id: 'Número',
    deliveredSuccessfull: 'paquete entregado exitosamente!',
    addressee: {
      name: 'destinatario',
      document_number: 'Numero de identificación'
    },
    'branch-offices': 'sucursales',
    destination: 'destino',
    destinations: 'destinos',
    list: 'lista de comprobantes',
    received: 'recibido',
    in_transit: 'en tránsito',
    delivered: 'entregado',
    delivery: 'entregar',
    type_of_charge: 'tipo de cobro',
    status_paid: 'estatus del pago',
    paidDestination: 'Pago por destino',
    paidOrigin: 'Pago por origen',
    paid: 'pagado',
    toPaid: 'por pagar'
  },
  vehicle: {
    deleteSuccessfull: 'transporte eliminado exitosamente',
    list: 'lista de transportes',
    add: 'agregar transporte',
    update: 'editar transporte',
    cancel: 'cancelar',
    reset: 'limpiar',
    unit_number: 'número de unidad',
    models: 'modelo',
    colour: 'color',
    type: 'tipo',
    loading_capacity: 'capacidad de carga',
    serial_body: 'serial',
    brand: 'marca',
    plate: 'placa',
    number_of_axles: 'número de ejes',
    year: 'año',
    addSuccefull: 'agregado exitosamente',
    editSuccefull: 'el transporte se editó exitosamente'
  },
  guide: {
    voucherReceptSuccessfull: 'comprobantes guardados exitosamente',
    voucherEmty: 'Debe seleccionar al menos un comprobante',
    notFound: 'Guía no encontrada',
    id: 'número de guia',
    number_voucher: 'cantidad de paquetes',
    list: 'Lista de guias',
    carrier: {
      document_number: 'identificación del transportista',
      name: 'nombre del transportista'
    },
    vehicle: {
      plate: 'placa del transporte',
      brand: 'marca del transporte'
    },
    destination: {
      name: 'destino'
    }
  },
  paymentMethod: {
    list: 'lista de métodos de pago',
    add: 'agregar método de pago',
    update: 'editar método de pago',
    cancel: 'cancelar',
    reset: 'limpiar',
    name: 'nombre',
    symbol: 'símbolo',
    coin: 'moneda',
    coin_id: 'moneda',
    payment_destination_id: 'destino del pago',
    payment_destination: 'destino del pago',
    deleteSuccessfull: 'metodo de pago eliminada exitosamente',
    addSuccessfull: 'metodo de pago agregado exitosamente',
    editSuccessfull: 'metodo de pago editado exitosamente'
  },
  currencyRate: {
    amount: 'monto',
    created_at: 'fecha',
    source: 'fuente',
    add: 'Agregar tasa',
    reset: 'limpiar',
    cancel: 'cancelar',
    hours: 'hora',
    list: 'Lista de cambio',
    deleteSuccessfull: 'tasa de cambio eliminada exitosamente',
    addSuccessfull: 'tasa de cambio agregada exitosamente',
    editSuccessfull: 'tasa de cambio editada exitosamente',
    user: {
      name: 'responsable'
    }
  }
}
