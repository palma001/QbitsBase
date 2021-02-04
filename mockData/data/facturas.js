export const facturas = [
  {
    codigo: 13123213,
    estado: 'en ruta',
    cliente_id: 2,
    empacador_id: 3,
    transporte_id: 4,
    fecha_emision: new Date(),
    fecha_empaque: new Date(),
    fecha_entrega: null,
    tipo_factura: 'delivery',
    detalles: [
      {
        codigo: 131232131,
        nombre_producto: 'harina',
        cantidad: 2,
        precio: 400,
        subtotal: 80013123213
      },
      {
        codigo: 13123212,
        nombre_producto: 'refresco',
        cantidad: 20,
        precio: 400,
        subtotal: 8000
      },
      {
        codigo: 13123214,
        nombre_producto: 'atun',
        cantidad: 3,
        precio: 400,
        subtotal: 1200
      }
    ]
  },
  {
    codigo: 138055651547,
    estado: 'en ruta',
    cliente_id: 1,
    empacador_id: 3,
    transporte_id: 4,
    fecha_emision: new Date(),
    fecha_empaque: new Date(),
    fecha_entrega: null,
    tipo_factura: 'delivery',
    detalles: [
      {
        codigo: 1234567891,
        nombre_producto: 'harina de trigo',
        cantidad: 10,
        precio: 300,
        subtotal: 3000
      },
      {
        codigo: 1234567890,
        nombre_producto: 'cocacola',
        cantidad: 10,
        precio: 500,
        subtotal: 5000
      },
      {
        codigo: 9788492808274,
        nombre_producto: 'harina',
        cantidad: 10,
        precio: 600,
        subtotal: 6000
      }
    ]
  },
  {
    codigo: 7324674,
    estado: 'entregado',
    cliente_id: 1,
    empacador_id: 3,
    transporte_id: 4,
    fecha_emision: new Date(),
    fecha_empaque: new Date(),
    fecha_entrega: '2021-02-01',
    tipo_factura: 'delivery',
    detalles: [
      {
        codigo: 131232110,
        nombre_producto: 'harina',
        cantidad: 3,
        precio: 400,
        subtotal: 1200
      }
    ]
  }
]
