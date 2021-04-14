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
                 <div class="q-px-sm q-pb-md">
                  <q-input value="Oriente-1" dense>
                    <template v-slot:append>
                      <q-btn
                        color="orange"
                        text-color="white"
                        size="xs"
                        icon="map"
                        aria-label="map"
                        round
                        class="q-mt-sm"
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
                      >
                      </q-btn>
                    </template>
                  </q-input>
                </div>
                <div class="q-px-sm q-pb-md">
                  <q-input label="Rutas" dense>
                  </q-input>
                  <q-btn
                    color="primary"
                    text-color="white"
                    size="xs"
                    icon="add"
                    aria-label="add"
                    round
                    class="q-mt-sm"
                  >
                  </q-btn>
                </div>
            </div>
          </template>

          <template v-slot:after>
            <div class="q-pa-md q-pr-md q-pb-md q-pt-none">
              <div class="text-h6 q-mb-md">Ruta Oriente-1 / Ciudades</div>
                <div>
                <q-stepper
                  v-model="step"
                  vertical
                  color="primary"
                  done-color="deep-orange"
                  active-color="orange"
                  inactive-color="primary"
                  animated
                  header-nav
                >
                  <q-step
                    :name="1"
                    title="Caracas"
                    icon="corporate_fare"
                    color="negative"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 2"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                      </div>
                    </div>

                    <!-- <q-stepper-navigation>
                      <q-btn @click="step = 2" color="primary" label="Continue" />
                    </q-stepper-navigation> -->
                  </q-step>

                  <q-step
                    :name="2"
                    title="Puerto Píritu"
                    icon="location_on"
                   >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 3"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=1"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                      <!-- <q-btn @click="step = 3" color="primary" label="Continue" />
                      <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" /> -->
                      <!-- <q-btn flat @click="step = 1" color="primary" icon="expand_less" align="center" class="q-ml-sm" /> -->
                    </q-stepper-navigation>
                  </q-step>

                  <q-step
                    :name="3"
                    title="Puerto La Cruz"
                    icon="maps_home_work"
                    color="negative"
                  >
                   <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 4"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=2"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                      <!-- <q-btn @click="step = 4" color="primary" label="Continue" />
                      <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" /> -->
                      <!-- <q-btn flat @click="step = 2" color="primary" icon="expand_less" align="center" class="q-ml-sm" /> -->
                    </q-stepper-navigation>
                  </q-step>

                  <q-step
                    :name="4"
                    title="El Tigre"
                    icon="location_on"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 5"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=3"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                    </q-stepper-navigation>
                  </q-step>
                  <q-step
                    :name="5"
                    title="Ciudad Bolívar"
                    icon="location_on"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 6"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=4"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                    </q-stepper-navigation>
                  </q-step>
                  <q-step
                    :name="6"
                    title="Puerto Ordaz"
                    icon="location_on"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 7"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=5"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                    </q-stepper-navigation>
                  </q-step>
                  <q-step
                    :name="7"
                    title="San Felix"
                    icon="location_on"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 8"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=6"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                    </q-stepper-navigation>
                  </q-step>
                  <q-step
                    :name="8"
                    title="Upata"
                    icon="location_on"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 9"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=7"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                    </q-stepper-navigation>
                  </q-step>
                  <q-step
                    :name="9"
                    title="Guasipati"
                    icon="location_on"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 10"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=8"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                    </q-stepper-navigation>
                  </q-step>
                  <q-step
                    :name="10"
                    title="El Callao"
                    icon="location_on"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 11"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=9"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                    </q-stepper-navigation>
                  </q-step>
                  <q-step
                    :name="11"
                    title="Tumeremo"
                    icon="corporate_fare"
                    color="negative"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 12"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=10"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                    </q-stepper-navigation>
                  </q-step>
                  <q-step
                    :name="12"
                    title="El Dorado"
                    icon="location_on"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 13"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=11"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                    </q-stepper-navigation>
                  </q-step>
                  <q-step
                    :name="13"
                    title="Las Claritas"
                    icon="location_on"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                                @click="step = 14"
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=12"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                    </q-stepper-navigation>
                  </q-step>
                  <q-step
                    :name="14"
                    title="Santa Elena de Uairen"
                    icon="location_on"
                  >
                    <div class = "row">
                      <div class ="col-12">
                        <div class ="q-px-sm q-pb-md">
                          <q-input label ="Ciudad" dense>
                            <template v-slot:append>
                              <!-- <q-btn color="orange" icon="save" align="center" size="xs" round/> -->
                              <q-btn
                                color="primary"
                                text-color="white"
                                size="xs"
                                icon="add_location_alt"
                                aria-label="add_location_alt"
                                round
                              >
                              </q-btn>
                            </template>
                          </q-input>
                        </div>
                      </div>

                    </div>
                    <div class="row">
                      <div class="col-3">
                        <q-btn
                          color="red"
                          text-color="white"
                          size="xs"
                          icon="wrong_location"
                          aria-label="wrong_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="green"
                          text-color="white"
                          size="xs"
                          icon="edit_location"
                          aria-label="edit_location"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="orange"
                          text-color="white"
                          size="xs"
                          icon="save"
                          aria-label="save"
                          round
                        >
                        </q-btn>
                      </div>
                      <div class="col-3">
                        <q-btn
                          color="primary"
                          text-color="white"
                          size="xs"
                          icon="expand_less"
                          aria-label="expand_less"
                          round
                          @click="step=13"
                        >
                        </q-btn>
                      </div>
                    </div>

                    <q-stepper-navigation>
                    </q-stepper-navigation>
                  </q-step>
                </q-stepper>
                </div>
            </div>
          </template>
        </q-splitter>
      </template>

    </q-splitter>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      filter: '',
      text: '',
      splitterModel: 21,
      insideModel: 30,
      step: 1,
      markers: [
        { position: { lat: 10.196248389913245, lng: -64.62544711587066 } },
        { position: { lat: 8.879893326702739, lng: -64.23543248221198 } }
      ]
    }
  },
  created () {
    // this.getDirection()
  },
  methods: {
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
    agregarCiudad (data) {
      console.log(data)
    }
  }
}
</script>
