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
          name: 'document',
          align: 'left',
          field: row => row.carrier.document_number,
          sortable: false,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'carrier',
          align: 'left',
          field: row => row.carrier.full_name,
          sortable: false,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'plate',
          align: 'left',
          field: row => row.vehicle.plate,
          sortable: false,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'brand',
          align: 'left',
          field: row => row.vehicle.brand,
          sortable: false,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'destination',
          align: 'left',
          field: row => row.destination.name,
          sortable: false,
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
