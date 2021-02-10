import { users } from './data/users'
import { products } from './data/products'
import { modules } from './data/modules'
import { permissions } from './data/permissions'
import { facturas } from './data/facturas'
import { branchOffice } from './data/branchOffice'
import { roles } from './data/roles'
import { categoryModules } from './data/categoryModules'
import { authorizations } from './data/authorizations'

const mockData = {
  getData (data, params) {
    switch (data) {
      case 'users': {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              response: {
                data: {
                  content: users,
                  metadata: {
                    totalElements: users.length,
                    number: params, // server data
                    size: 3 // server data
                  }
                }
              }
            })
          }, 1000)
        })
      }
      case 'products': {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              response: {
                data: {
                  content: products,
                  metadata: {
                    totalElements: products.length,
                    number: params, // server data
                    size: 3 // server data
                  }
                }
              }
            })
          }, 1000)
        })
      }
      case 'modules': {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              response: {
                data: {
                  content: modules,
                  metadata: {
                    totalElements: modules.length,
                    number: params, // server data
                    size: 3 // server data
                  }
                }
              }
            })
          }, 1000)
        })
      }
      case 'permissions': {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              response: {
                data: {
                  content: permissions,
                  metadata: {
                    totalElements: permissions.length,
                    number: params, // server data
                    size: 3 // server data
                  }
                }
              }
            })
          }, 1000)
        })
      }
      case 'facturas': {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              response: {
                data: {
                  content: facturas,
                  metadata: {
                    totalElements: facturas.length,
                    number: params, // server data
                    size: 3 // server data
                  }
                }
              }
            })
          }, 1000)
        })
      }
      case 'branch-offices': {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              response: {
                data: {
                  content: branchOffice,
                  metadata: {
                    totalElements: branchOffice.length,
                    number: params, // server data
                    size: 3 // server data
                  }
                }
              }
            })
          }, 1000)
        })
      }
      case 'roles': {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              response: {
                data: {
                  content: roles,
                  metadata: {
                    totalElements: roles.length,
                    number: params, // server data
                    size: 3 // server data
                  }
                }
              }
            })
          }, 1000)
        })
      }
      case 'category-modules': {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              response: {
                data: {
                  content: categoryModules,
                  metadata: {
                    totalElements: categoryModules.length,
                    number: params, // server data
                    size: 3 // server data
                  }
                }
              }
            })
          }, 1000)
        })
      }
      case 'authorizations': {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              response: {
                data: {
                  content: authorizations,
                  metadata: {
                    totalElements: authorizations.length,
                    number: params, // server data
                    size: 3 // server data
                  }
                }
              }
            })
          }, 1000)
        })
      }
    }
  },

  getOneData (data, params) {
    switch (data) {
      case 'facturas': {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              response: {
                data: {
                  content: facturas.filter((element) => Number(element.codigo) === Number(params.codigo))[0],
                  metadata: {
                    totalElements: facturas.length,
                    number: params, // server data
                    size: 3 // server data
                  }
                }
              }
            })
          }, 1000)
        })
      }
      case 'auth': {
        console.log(users, params)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              response: {
                data: {
                  content: users.filter((element) => element.usuario === params.usuario && element.password === params.password)[0]
                }
              }
            })
          }, 1000)
        })
      }
    }
  },
  postData (module, data) {
    switch (module) {
      case 'roles': {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            roles.push(data)
            resolve({
              response: {
                data: {
                  content: data
                }
              }
            })
          }, 1000)
        })
      }
    }
  }
}
const install = function (Vue, options) {
  Vue.prototype.$mockData = mockData
}
export default install
