<template>
  <q-page padding>
    <q-splitter
      v-model="splitterModel"
      style="height: 90vh"
    >
      <template v-slot:after>
        <div class="q-pl-md q-pr-md q-pb-md q-pt-none">
            <GmapMap
              ref="mymap"
              map-type-id="roadmap"
              style="width: 100%; height: 86vh"
              :center="{ lat: 10.196248389913245, lng: -64.62544711587066 }"
              :zoom="8"
              >
              <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
              />
            </GmapMap>
        </div>
      </template>
      <template v-slot:before>
        <q-splitter
          v-model="insideModel"
          horizontal
        >
          <template v-slot:before>
            <div class="q-pl-md q-pr-md q-pb-md q-pt-none">
              <div class="text-h6 q-mb-md">Rutas</div>
                <div class="q-px-sm q-pb-md"
                    v-for="route in routes"
                    :key="route.id"
                  >
                  <q-input v-model="route.name" dense :readonly="routeSelected.id !== route.id">
                    <template v-slot:append>
                      <q-btn
                        :color="routeSelected.id !== route.id ? 'orange' : 'green'"
                        text-color="white"
                        size="xs"
                        :icon="routeSelected.id !== route.id ? 'touch_app' : 'edit'"
                        aria-label="map"
                        round
                        class="q-mt-sm"
                        @click="selectdRoute(route)"
                      >
                      </q-btn>
                      <q-btn
                        color="negative"
                        text-color="white"
                        size="xs"
                        icon="delete"
                        aria-label="trash"
                        round
                        class="q-mt-sm"
                         @click="deleteRoute(route)"
                      >
                      </q-btn>
                    </template>
                  </q-input>
                </div>
                <div class="q-px-sm q-pb-md">
                 <q-form
                    @submit="addRoute"
                    class="text-right"
                  >
                    <q-input
                      label="Rutas"
                      dense
                      v-model="nameRoute"
                      :rules="[ val => val && val.length > 0 || 'El nombre de la ruta es requerida.']"
                       @keyup.enter.native="addRoute"
                    />
                    <q-btn
                      color="primary"
                      text-color="white"
                      size="sm"
                      icon="add"
                      aria-label="add"
                      round
                      class="q-mt-sm"
                      type="submit"
                    >
                      <q-tooltip>
                        Guardar ruta
                      </q-tooltip>
                    </q-btn>
                 </q-form>
                </div>
            </div>
          </template>
          <template v-slot:after v-if="routeSelected">
            <div class="q-pa-md q-pr-md q-pb-md q-pt-none row">
              <div class="text-h6 q-mb-md col-11">
                {{ routeSelected.name }} / Ciudades
              </div>
              <div class="col-1">
                <q-btn
                  color="orange"
                  text-color="white"
                  size="sm"
                  icon="save"
                  aria-label="save"
                  round
                  @click="saveRoute"
                >
                  <q-tooltip>
                    Guardar Cambios
                  </q-tooltip>
                </q-btn>
              </div>
              <q-stepper
                color="primary"
                done-color="deep-orange"
                active-color="orange"
                inactive-color="primary"
                class="col-12"
                v-model="step"
                vertical
                animated
                header-nav
              >
                <q-step
                  v-if="routeSelected.destinations && routeSelected.destinations.length <= 0"
                  :name="0"
                  title="Agragr Ciudad"
                  color="primary"
                  icon="location_on"
                >
                  <div class="row">
                    <div class="col-12">
                      <div class="q-px-sm q-pb-md">
                        <q-form
                          @submit="addCity(0)"
                          class="row q-col-gutter-x-sm"
                        >
                          <div class="col-10">
                            <q-select
                              label="Ciudad"
                              dense
                              use-input
                              @filter="filterCity"
                              v-model="city"
                              :options="optionsCities"
                              @keyup.enter.native="addCity(0)"
                            />
                          </div>
                          <div class="col-2 q-mt-md">
                            <q-btn
                              color="primary"
                              text-color="white"
                              size="sm"
                              icon="add_location_alt"
                              aria-label="add_location_alt"
                              round
                              :rules="[ val => val && val.length > 0 || 'Ciudad Requerida']"
                              type="submit"
                              dense
                            />
                          </div>
                        </q-form>
                      </div>
                    </div>
                  </div>
                </q-step>
                <q-step
                  v-else
                  v-for="(destiantion, index) in routeSelected.destinations"
                  :key="destiantion.id"
                  :name="index"
                  :title="destiantion.city"
                  :color="destiantion.branch_office ? 'negative' : ''"
                  :icon="destiantion.branch_office ? 'corporate_fare' : 'location_on'"
                >
                  <div class="row">
                    <div class="col-12">
                      <q-select
                        label="Ciudad"
                        dense
                        use-input
                        @filter="filterCity"
                        v-model="city"
                        :options="optionsCities"
                        @keyup.enter.native="addCity(index)"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-x-sm q-mt-md">
                    <div class="col-1 offset-8">
                      <q-btn
                        color="red"
                        text-color="white"
                        size="xs"
                        icon="wrong_location"
                        aria-label="wrong_location"
                        round
                        @click="deleteCity(index)"
                      >
                        <q-tooltip>
                          Eliminar Ciudad
                        </q-tooltip>
                      </q-btn>
                    </div>
                    <div class="col-1">
                      <q-btn
                        color="green"
                        text-color="white"
                        size="xs"
                        icon="edit_location"
                        aria-label="edit_location"
                        round
                        @click="editCity(index)"
                      >
                        <q-tooltip>
                          Editar Ciudad
                        </q-tooltip>
                      </q-btn>
                    </div>
                    <div class="col-1">
                      <q-btn
                        color="primary"
                        text-color="white"
                        size="sm"
                        icon="add_location_alt"
                        aria-label="add_location_alt"
                        round
                        type="submit"
                        dense
                        @click="addCity(index)"
                      >
                        <q-tooltip>
                          Agregar Ciudad
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </q-step>
              </q-stepper>
            </div>
          </template>
        </q-splitter>
      </template>
      <q-inner-loading :showing="loadingRoute">
        <q-spinner-gears size="150px" color="primary" />
      </q-inner-loading>
    </q-splitter>
  </q-page>
</template>

<script>
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
import { mixins } from '../mixins'
export default {
  mixins: [mixins.containerMixin],
  data () {
    return {
      loadingRoute: false,
      filter: '',
      text: '',
      routes: [],
      cities: [],
      city: null,
      routeSelected: null,
      splitterModel: 30,
      insideModel: 30,
      step: 0,
      nameRoute: null,
      optionsCities: [],
      markers: [
        { position: { lat: 10.196248389913245, lng: -64.62544711587066 } },
        { position: { lat: 8.879893326702739, lng: -64.23543248221198 } }
      ]
    }
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER])
  },
  created () {
    // this.getDirection()
    this.getRoutes()
    this.getCities()
  },
  methods: {
    filterCity (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsCities = this.cities.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    async deleteRoute (route) {
      this.loadingRoute = true
      console.log(route)
      await this.$services.deleteData(['routes', route.id])
      this.getRoutes()
      this.loadingRoute = false
      this.notify(this, 'Ruta eliminada exitosamente', 'primary', 'mood')
    },
    async saveRoute () {
      this.loadingRoute = true
      await this.$services.putData(['routes', this.routeSelected.id], {
        name: this.routeSelected.name,
        user_updated_id: 1,
        destinations: this.destinationModel(this.routeSelected.destinations)
      })
      this.loadingRoute = false
      this.notify(this, 'Ruta guardada exitosamente', 'primary', 'mood')
    },
    destinationModel (data) {
      const destinations = data
      return destinations.map((destination, index) => {
        return {
          destination_id: destination.destination_id ?? destination.id,
          order: index,
          user_created_id: 1
        }
      })
    },
    /**
     * Add Route
    */
    async addRoute () {
      this.loadingRoute = true
      const { res } = await this.$services.postData(['routes'], {
        name: this.nameRoute,
        user_created_id: 1
      })
      if (res.data) {
        this.routes.push(res.data)
        this.routeSelected = res.data
        this.routeSelected.destinations = []
        this.nameRoute = null
        this.loadingRoute = false
        this.notify(this, 'Ruta agregada exitosamente', 'primary', 'mood')
      }
    },
    getDirection () {
      this.$gmapApiPromiseLazy()
        .then(res => {
          var directionsDisplay = new res.maps.DirectionsRenderer()
          var directionsService = new res.maps.DirectionsService()
          directionsDisplay.setMap(res.maps)
          this.calculateAndDisplayRoute(directionsService, directionsDisplay, this.markers[0].position, this.markers[1].position)
        })
    },
    calculateAndDisplayRoute (directionsService, directionsDisplay, start, destination) {
      directionsService.route({
        origin: start,
        destination: destination,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response)
        } else {
          window.alert('Directions request failed due to ' + status)
        }
      })
    },
    /**
     * Delete city
     * @param {Number} index index of city
     */
    deleteCity (index) {
      this.routeSelected.destinations.splice(index, 1)
    },
    /**
     * Add city
    */
    addCity (index) {
      this.routeSelected.destinations.splice(index + 1, 0, {
        destination_id: this.city.value,
        city: this.city.label,
        branch_office: this.city.branch_office
      })
      this.step = index + 1
      this.city = null
    },
    /**
     * Add city
    */
    editCity (index) {
      this.routeSelected.destinations.splice(index, 1, {
        destination_id: this.city.value,
        city: this.city.label,
        branch_office: this.city.branch_office
      })
      this.step = index
      this.city = null
    },
    /**
     * Get Routes
    */
    async getRoutes () {
      const { res } = await this.$services.getData(['routes'], { paginate: false })
      this.routes = res.data
      this.selectdRoute(res.data[0])
    },
    /**
     * Rotate city
     */
    rotateCity (index, position) {
      this.routeSelected.destinations[index] = this.routeSelected.destinations[index - 1]
      this.routeSelected.destinations[index - 1] = this.routeSelected.destinations[index]
    },
    /**
     * Get Cities
    */
    async getCities () {
      const { res } = await this.$services.getData(['destinations'], { paginate: false })
      this.cities = res.data.map(city => {
        return {
          label: `${city.city} (${city.state})`,
          value: city.id,
          branch_office: city.branch_office
        }
      })
    },
    /**
     * Set route selected
     * @param {Obeject} data route selected
    */
    selectdRoute (data) {
      this.step = 0
      this.routeSelected = data
    }
  }
}

</script>
