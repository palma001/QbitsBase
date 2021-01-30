import Vue from 'vue'
import services from '../../microservices/services'
import mockData from '../../mockData/services'

Vue.use(services, {
  // baseUrl: 'https://ficde.herokuapp.com'
  baseUrl: 'http://localhost:8080/api.rest'
})

Vue.use(mockData, {
  baseUrl: 'http://localhost:8080'
})
