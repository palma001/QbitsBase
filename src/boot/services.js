import Vue from 'vue'
import services from '../../microservices/services'
import mockData from '../../mockData/services'

Vue.use(services, {
  // baseUrl: 'http://127.0.0.1:8000/api/'
  baseUrl: 'https://api-transporte.herokuapp.com/api/'
})

Vue.use(mockData, {
  baseUrl: 'http://localhost:8080'
})
