export const bill = {
  id: 3,
  sender_id: 5,
  receptionist_id: 1,
  branch_office_id: 1,
  user_created_id: 1,
  user_updated_id: null,
  created_at: '2021-04-16T20:17:33.000000Z',
  updated_at: '2021-04-16T20:17:33.000000Z',
  deleted_at: null,
  sender: {
    id: 5,
    name: 'luis',
    last_name: 'palma',
    full_name: 'Luis Palma'
  },
  receptionist: {
    id: 1,
    name: 'Jillian Paucek',
    last_name: 'Gaylord',
    full_name: 'Jillian Paucek Gaylord'
  },
  branch_office: {
    id: 1,
    name: 'Puerto la Cruz'
  },
  bill_payments: [
    {
      id: 3,
      payment_type_id: 1,
      payment_destination_id: 1,
      bill_id: 3,
      amount: 10,
      payment_type: {
        id: 1,
        name: 'Zelle'
      },
      payment_destination: {
        id: 1,
        name: 'Banco de venezuela'
      }
    }
  ],
  vouchers: [
    {
      id: 4,
      addressee_id: 5,
      destinable_type: 'App\\Models\\BranchOffice',
      destinable_id: 1,
      bill_id: 3,
      address: null,
      reference_point: null,
      amount: 10,
      tax: 12,
      exchange: 10000,
      coin_id: 1,
      user_created_id: 1,
      user_updated_id: null,
      created_at: '2021-04-16T20:17:33.000000Z',
      updated_at: '2021-04-16T20:17:33.000000Z',
      deleted_at: null,
      addressee: {
        id: 5,
        name: 'luis',
        last_name: 'palma',
        document_type: 'CI',
        document_number: 123456,
        full_name: 'Luis Palma'
      },
      coin: {
        id: 1,
        name: 'Dólares'
      },
      rates: [
        {
          id: 1,
          name: 'Peso',
          pivot: {
            voucher_id: 4,
            rate_id: 1,
            description: 10
          }
        },
        {
          id: 2,
          name: 'Largo',
          pivot: {
            voucher_id: 4,
            rate_id: 2,
            description: 10
          }
        },
        {
          id: 3,
          name: 'Ancho',
          pivot: {
            voucher_id: 4,
            rate_id: 3,
            description: 10
          }
        }
      ],
      destinable: {
        id: 1,
        name: 'Puerto la Cruz',
        description: null,
        city: 'Puerto la Cruz',
        state: 'Anzoategui',
        address: 'Anzoategui, Puerto la Cruz',
        phone_number: +584249502755,
        phone_number_two: null,
        in_charge: 1,
        user_created_id: 1,
        user_updated_id: null,
        remember_token: null,
        created_at: null,
        updated_at: null,
        deleted_at: null
      }
    }
  ]
}
