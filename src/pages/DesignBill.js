export const bill = [
  {
    id: 11,
    number: 11,
    addressee_id: 12,
    sender_id: 11,
    cargo_insurance_amount: 1,
    destinable_type: 'App\\Models\\BranchOffice',
    destinable_id: 2,
    bill_id: null,
    source_id: 1,
    address: null,
    reference_point: null,
    status_paid: 0,
    type_of_charge: 1,
    amount: 18,
    tax: 12,
    exchange: 20000000,
    status: 'received',
    coin_id: 1,
    user_created_id: 1,
    user_updated_id: null,
    created_at: '2021-05-02T15:41:21.000000Z',
    updated_at: '2021-05-02T15:41:21.000000Z',
    deleted_at: null,
    rates: [
      {
        id: 1,
        name: 'Peso',
        cost: 0.5,
        unit_of_measurement_id: 1,
        user_created_id: 1,
        user_updated_id: null,
        created_at: null,
        updated_at: null,
        deleted_at: null,
        pivot: {
          voucher_id: 11,
          rate_id: 1,
          description: '19'
        }
      },
      {
        id: 2,
        name: 'Largo',
        cost: 0.5,
        unit_of_measurement_id: 3,
        user_created_id: 1,
        user_updated_id: null,
        created_at: null,
        updated_at: null,
        deleted_at: null,
        pivot: {
          voucher_id: 11,
          rate_id: 2,
          description: '19'
        }
      },
      {
        id: 3,
        name: 'Ancho',
        cost: 0.5,
        unit_of_measurement_id: 3,
        user_created_id: 1,
        user_updated_id: null,
        created_at: null,
        updated_at: null,
        deleted_at: null,
        pivot: {
          voucher_id: 11,
          rate_id: 3,
          description: '28'
        }
      }
    ],
    destinable: {
      id: 2,
      name: 'Tumeremo',
      prefix: 'TUM',
      description: null,
      destination_id: 1,
      address: 'Tumeremo',
      phone_number: '+584249502766',
      email: 'tum@gmail.com',
      phone_number_two: null,
      in_charge_id: 1,
      user_created_id: 1,
      user_updated_id: null,
      remember_token: null,
      created_at: null,
      updated_at: null,
      deleted_at: null
    },
    sender: {
      id: 11,
      name: null,
      email: null,
      phone_number: '0424950244',
      business_name: 'Luis palma',
      full_name: 'Luis Palma'
    },
    source: {
      id: 1,
      name: 'Puerto la Cruz',
      phone_number: '+584249502755',
      email: 'plc@gmail.com',
      address: 'Anzoategui, Puerto la Cruz'
    },
    addressee: {
      id: 12,
      name: 'alexis',
      email: null,
      phone_number: '04249502755',
      business_name: null,
      full_name: 'Alexis'
    }
  }
]
