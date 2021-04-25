export const guide = [
  {
    classTag: 'infoUsers',
    index: 0,
    children: [
      {
        tabulated: {
          name: 'id',
          align: 'left',
          field: row => row.id,
          sortable: true,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'carrier.document_number',
          align: 'left',
          field: row => row.carrier.document_number,
          sortable: true,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'carrier.name',
          align: 'left',
          field: row => row.carrier.full_name,
          sortable: false,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'vehicle.plate',
          align: 'left',
          field: row => row.vehicle.plate,
          sortable: true,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'vehicle.brand',
          align: 'left',
          field: row => row.vehicle.brand,
          sortable: true,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'destination.name',
          align: 'left',
          field: row => row.destination.name,
          sortable: true,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'number_voucher',
          align: 'left',
          field: row => row.vouchers.length,
          sortable: false,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'action',
          align: 'center'
        }
      }
    ]
  }
]

export const propsPanelEdition = {
  data: {},
  buttons: []
}
