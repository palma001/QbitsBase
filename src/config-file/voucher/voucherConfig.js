export const voucherConfig = [
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
          name: 'addressee.name',
          align: 'left',
          field: row => row.addressee.full_name,
          sortable: false,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'addressee.document_number',
          align: 'left',
          field: row => row.addressee.document_number,
          sortable: false,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'status',
          align: 'left',
          field: row => row.status,
          sortable: true,
          visible: true
        }
      },
      {
        tabulated: {
          name: 'destination',
          align: 'left',
          field: row => row.destinable.city ?? row.destinable.name,
          sortable: false,
          visible: true
        }
      }
    ]
  }
]

export const buttonsTable = [
  {
    color: 'negative',
    icon: 'delete',
    event: 'delete',
    size: 'sm'
  }
]

export const propsPanelEdition = {
  data: {},
  buttons: [
    {
      name: 'cancel',
      action: 'cancel',
      label: false,
      props: {
        icon: 'highlight_off',
        color: 'negative',
        glossy: true,
        size: '12px'
      },
      tooltip: {
        text: 'cancel',
        props: {
          'content-class': 'bg-negative'
        }
      }
    },
    {
      name: 'reset',
      action: 'reset',
      label: false,
      props: {
        icon: 'restore',
        color: 'positive',
        glossy: true,
        size: '12px'
      },
      tooltip: {
        text: 'reset',
        props: {
          'content-class': 'bg-positive'
        }
      }
    },
    {
      name: 'update',
      action: 'update',
      label: false,
      props: {
        color: 'primary',
        glossy: true,
        size: '12px',
        icon: 'edit'
      },
      tooltip: {
        text: 'update',
        props: {
          'content-class': 'bg-primary'
        }
      }
    }
  ]
}

export const relationalDataConfiguration = [
  {
    targetPropTag: 'destination',
    entity: 'destinations',
    services: ['destinations'],
    propData: 'data',
    petitionParams: {
      paginate: false
    }
  },
  {
    targetPropTag: 'in_charge',
    entity: 'users',
    services: ['users'],
    propData: 'data',
    petitionParams: {
      paginate: false
    }
  }
]

// export const branchOfficeServices = {
//   props: propsPanelEdition,
//   config: branchOffice,
//   propData: 'data',
//   relationalData: relationalDataConfiguration
// }
