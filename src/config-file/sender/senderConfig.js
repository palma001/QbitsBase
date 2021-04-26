export const senderConfig = [
  {
    classTag: 'infoUsers',
    index: 0,
    children: [
      {
        actionable: {
          propTag: 'sender_type',
          addible: true,
          type: 'String',
          visibleLabel: true,
          component: {
            name: 'b-search-select',
            props: {
              data: [
                {
                  label: 'Natural',
                  value: 'NAT'
                },
                {
                  label: 'Juridica',
                  value: 'JUR'
                }
              ],
              dataValue: 'value',
              dataLabel: 'label',
              behavior: 'menu',
              dense: true,
              clearable: true
            },
            class: {
              'col-xs-12': true,
              'col-sm-12': true,
              'col-md-12': true
            },
            directives: [
              {
                name: 'validate',
                value: {
                  required: false
                }
              }
            ]
          }
        }
      },
      {
        actionable: {
          propTag: 'document_type',
          addible: true,
          type: 'String',
          dependentName: 'sender_type',
          dependeFilterField: 'person_type',
          dependentData: true,
          visibleLabel: true,
          component: {
            name: 'b-search-select',
            props: {
              data: [],
              dataValue: 'id',
              dataLabel: 'name',
              behavior: 'menu',
              dense: true,
              clearable: true
            },
            class: {
              'col-xs-12': true,
              'col-sm-12': true,
              'col-md-12': true
            },
            directives: [
              {
                name: 'validate',
                value: {
                  required: false
                }
              }
            ]
          }
        }
      },
      {
        tabulated: {
          name: 'document_number',
          align: 'left',
          field: row => row.document_number,
          sortable: true,
          visible: true
        },
        actionable: {
          propTag: 'document_number',
          addible: true,
          editable: true,
          type: 'text',
          visibleLabel: true,
          component: {
            name: 'b-input',
            props: {
              type: 'text',
              dense: true
            },
            class: {
              'col-xs-12': true,
              'col-sm-12': true,
              'col-md-12': true
            },
            directives: [
              {
                name: 'validate',
                value: {
                  required: true
                }
              }
            ]
          }
        }
      },
      {
        tabulated: {
          name: 'name',
          align: 'left',
          field: row => row.name,
          sortable: true,
          visible: true
        },
        actionable: {
          propTag: 'name',
          addible: true,
          editable: true,
          type: 'text',
          visibleLabel: true,
          component: {
            name: 'b-input',
            props: {
              type: 'text',
              dense: true
            },
            class: {
              'col-xs-12': true,
              'col-sm-12': true,
              'col-md-12': true
            },
            directives: [
              {
                name: 'validate',
                value: {
                  required: true
                }
              }
            ]
          }
        }
      },
      {
        tabulated: {
          name: 'phone_number',
          align: 'left',
          field: row => row.phone_number,
          sortable: true,
          visible: true
        },
        actionable: {
          propTag: 'phone_number',
          addible: true,
          editable: true,
          type: 'text',
          visibleLabel: true,
          component: {
            name: 'b-input',
            props: {
              type: 'text',
              dense: true
            },
            class: {
              'col-xs-12': true,
              'col-sm-12': true,
              'col-md-12': true
            },
            directives: [
              {
                name: 'validate',
                value: {
                  required: true
                }
              }
            ]
          }
        }
      },
      {
        tabulated: {
          name: 'email',
          align: 'left',
          field: row => row.email,
          sortable: true,
          visible: true
        },
        actionable: {
          propTag: 'email',
          addible: true,
          editable: true,
          type: 'text',
          visibleLabel: true,
          component: {
            name: 'b-input',
            props: {
              type: 'text',
              dense: true
            },
            class: {
              'col-xs-12': true,
              'col-sm-12': true,
              'col-md-12': true
            },
            directives: [
              {
                name: 'validate',
                value: {
                  required: false
                }
              }
            ]
          }
        }
      }
    ]
  }
]
export const buttonsSender = [
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
    name: 'add',
    action: 'add',
    label: false,
    props: {
      color: 'primary',
      glossy: true,
      size: '12px',
      icon: 'add_circle'
    },
    tooltip: {
      text: 'add',
      props: {
        'content-class': 'bg-primary'
      }
    }
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
    targetPropTag: 'document_type',
    entity: 'document_type',
    services: ['document-types'],
    propData: 'data',
    petitionParams: {
      paginate: false
    }
  }
]
export const userServices = {
  props: propsPanelEdition,
  config: senderConfig,
  propData: 'data',
  relationalData: relationalDataConfiguration
}

// {
//   tabulated: {
//     name: 'last_name',
//     align: 'left',
//     field: row => row.last_name,
//     sortable: true,
//     visible: true
//   },
//   actionable: {
//     propTag: 'last_name',
//     dependentName: 'sender_type',
//     dependentValue: 'NAT',
//     dependentVisible: true,
//     addible: true,
//     editable: true,
//     type: 'text',
//     visibleLabel: true,
//     component: {
//       name: 'b-input',
//       props: {
//         type: 'text',
//         dense: true
//       },
//       class: {
//         'col-xs-12': true,
//         'col-sm-12': true,
//         'col-md-12': true
//       },
//       directives: [
//         {
//           name: 'validate',
//           value: {
//             required: false
//           }
//         }
//       ]
//     }
//   }
// }
