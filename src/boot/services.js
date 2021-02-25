import Vue from 'vue'
import services from '../../microservices/services'
import mockData from '../../mockData/services'

Vue.use(services, {
  baseUrl: 'http://127.0.0.1/:8080/api.rest/api'
  // baseUrl: 'http://192.168.10.45:8080/api.rest/api'
})

Vue.use(mockData, {
  baseUrl: 'http://localhost:8080'
})
