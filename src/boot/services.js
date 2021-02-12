import Vue from 'vue'
import services from '../../microservices/services'
import mockData from '../../mockData/services'

Vue.use(services, {
  // baseUrl: 'https://ficde.herokuapp.com'
  baseUrl: 'http://192.168.1.13:8080/api.rest/api'
})

Vue.use(mockData, {
  baseUrl: 'http://localhost:8080'
})
