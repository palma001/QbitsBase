<template>
  <div class="q-pa-none">
    <section>
      <q-carousel
        animated
        height="100vh"
        style="margin-top:-105px"
        infinite
        navigation-position="bottom"
        navigation
        swipeable
        :autoplay="5000"
        :arrows="false"
        v-model="slide"
        id="home"
      >
        <template v-slot:navigation-icon="{ active, btnProps, onClick }">
          <q-btn v-if="active" size="lg" icon="home" color="white" flat round dense @click="onClick" />
          <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
        </template>
        <q-carousel-slide class="q-pa-none" v-for="slider in sliders" :name="slider.name" :key="slider.id">
          <q-img
            :src="`/sliders/${slider.image}`" style="width: 100%; height:100%;" basic>
            <div class="absolute-full flex flex-left">
            <div class="text-h2 text-bold title-car">
              {{ slider.title }}
            </div>
              <div class="subtitle-car" v-html="slider.description"></div>
            </div>
          </q-img>
        </q-carousel-slide>
      </q-carousel>
    </section>
    <section style="width: 100%; height: 100%; padding: 3%" id="services">
      <div class="row">
        <q-intersection transition="scale"  class="col-md-6 col-sm-12 col-xs-12" once>
           <q-img
            basic
            src="servicios/pexels-artem-podrez-5025667.jpg"
            style="width: 100%; height: 450px;"
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              Calidad de Atención
            </div>
          </q-img>
        </q-intersection>
        <q-intersection transition="scale" class="bg-primary col-md-6 col-sm-12 col-xs-12 text-white text-h4 flex flex-left flex-center q-pa-xl" once>
          <div class="q-pa-sm">Te ofrecemos siempre la mejor atención</div>
          <div class="q-pa-sm">Recolectamos tu mercancía sin costo adicional</div>
          <div class="q-pa-sm">Los mejores precios para tu encomienda</div>
        </q-intersection>
      </div>
      <div class="row">
        <q-intersection transition="scale" class="bg-primary col-md-6 col-sm-12 col-xs-12 text-white text-h4 flex flex-left flex-center q-pa-xl" once>
          <div class="q-pa-sm">Salidas interdiarias a todos los destinos del país</div>
          <div class="q-pa-sm">Traslado de tu encomienda entre 12h y 48h</div>
          <div class="q-pa-sm">72h para largas distancias</div>
        </q-intersection>
        <q-intersection transition="scale" class="col-md-6 col-sm-12 col-xs-12" once>
          <q-img
            basic
            src="servicios/pexels-tima-miroshnichenko-6169126.jpg"
            style="width: 100%; height: 450px;"
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              Rapidez de Servicio
            </div>
          </q-img>
        </q-intersection>
      </div>
      <div class="row">
        <q-intersection transition="scale" class="col-md-6 col-sm-12 col-xs-12" once>
           <q-img
            basic
            src="servicios/pexels-artem-podrez-5025647.jpg"
            style="width: 100%; height: 450px;"
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              Seguridad
            </div>
          </q-img>
        </q-intersection>
        <q-intersection transition="scale" class="bg-primary col-md-6 col-sm-12 col-xs-12 text-white text-h4 flex flex-left flex-center q-pa-xl" once>
          <div class="q-pa-sm">Cada una de tus encomiendas posee su seguro contra cualquier incoveniente</div>
        </q-intersection>
      </div>
      <div class="row">
        <q-intersection transition="scale" class="bg-primary col-md-6 col-sm-12 col-xs-12 text-white text-h4 flex flex-left flex-center q-pa-xl" once>
          <div class="q-pa-sm">Con la seguridad y compromiso de que tu encomienda llegara a tiempo y en perfecto estado a su destino</div>
        </q-intersection>
        <q-intersection transition="scale" class="col-md-6 col-sm-12 col-xs-12 " once>
          <q-img
            basic
            src="servicios/pexels-tima-miroshnichenko-6169668.jpg"
            style="width: 100%; height: 450px;"
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              Compromiso y Responsabilidad
            </div>
          </q-img>
        </q-intersection>
      </div>
    </section>
    <section id="contactus" class="contactus">
      <q-img
        basic src="/sliders/pexels-tima-miroshnichenko-6169056.jpg" style="width: 100%; height:100%;">
        <div class="absolute-full flex flex-left flex-center">
          <div class="q-pa-md">
            <div class="row justify-around q-gutter-y-xl">
              <q-intersection once transition="scale" class="col-md-4 col-sm-12 col-xs-12">
                <div class="text-h2">
                  ¡Siempre grato poder servirte!
                </div>
                <div  class="text-h6 q-mt-xl text-justify">
                  En Unión Corporativa de Transporte JR & LS, C.A., amamos lo que hacemos,
                  llevar tu encomienda de forma: Rápida, responable y segura es nuestro
                  estandarte. Estamos siempre prestos para servirte y ofrecerte la mejor experiencia
                  en el servicio de envíos y encomiendas. ¿Tamaños Imposibles? Para nosotros ninguno lo es.
                  Más que un cliente, eres parte de nuestra familia JR&LS.
                </div>
              </q-intersection>
              <q-intersection once transition="scale" class="col-md-5 col-sm-12 col-xs-12" style="margin-top: 140px;">
                <q-form
                  class="q-col-gutter-lg row"
                >
                  <q-input
                    v-model="name"
                    label="Tu nombre"
                    label-color="white"
                    color="white"
                    dark
                    class="col-6"
                  />
                  <q-input
                    v-model="email"
                    label="E-mail"
                    label-color="white"
                    color="white"
                    class="col-6"
                    dark
                  />
                  <q-input
                    v-model="subject"
                    label="Asunto"
                    label-color="white"
                    color="white"
                    class="col-12"
                    dark
                  />
                  <q-input
                    v-model="message"
                    label="Mensaje"
                    label-color="white"
                    color="white"
                    class="col-12"
                    dark
                    type="textarea"
                  />
                  <div class="col-12">
                    <q-btn
                      outline
                      rounded
                      label="Enviar"
                      type="submit"
                      color="white"
                      size="lg"
                    />
                  </div>
                </q-form>
              </q-intersection>
            </div>
          </div>
        </div>
      </q-img>
    </section>
    <footer class="bg-dark text-white"  style="width: 100%; height: 100%; padding: 40px">
      <div class="row q-gutter-y-lg">
        <div class="col-12 text-h3 text-bold text-italic flex flex-left flex-center">
          ¡Somos Calidad de Servicio!
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 row text-center">
          <div class="col-12 flex flex-left flex-center row">
            <div
              class="col-lg-6 col-md-2 col-sm-4 col-xs-4 text-bold text-italic"
              v-for="branchOffice in branchOffices" :key="branchOffice.id"
            >
              <q-item>
                <q-item-section>
                  <q-item-label class="q-mt-sm">
                    {{ branchOffice.name }}
                  </q-item-label>
                  <q-item-label class="q-mt-sm">
                    <q-icon name="email"/> {{ branchOffice.email }}
                  </q-item-label>
                  <a class="q-mt-sm" :href="`https://api.whatsapp.com/send/?phone=${branchOffice.phone_number}&text&app_absent=0`" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: white;">
                    <q-item-label>
                      <q-icon name="fab fa-whatsapp"/> {{ branchOffice.phone_number }}
                    </q-item-label>
                  </a>
                  <q-item-label>
                    <q-icon name="room"/> {{ branchOffice.address }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div class="col-12 text-h5 flex flex-left flex-center">
            <a href="https://www.instagram.com/transporte.jrls/?hl=es-la" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: white;">
              <q-icon name="fab fa-instagram" class="" size="xl"/>
            </a>
          </div>
        </div>
        <div class="col-12 text-h7 flex flex-left flex-center">
          Copyright ©2021 All rights reserved | This website is provided by QbitsDev.
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { GETTERS } from '../store/module-login/name.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      show: true,
      slide: 'one',
      sliders: [],
      active: false,
      name: '',
      message: '',
      subject: '',
      email: '',
      branchOffices: []
    }
  },
  created () {
    this.getSliders()
    this.getBranchOffice()
  },
  computed: {
    /**
     * Getters Vuex
     */
    ...mapGetters([GETTERS.GET_USER])
  },
  methods: {
    async getSliders () {
      const { response } = await this.$mockData.getData('sliders')
      this.sliders = response.data.content
    },
    getBranchOffice () {
      this.$services.getData(['branch-offices'])
        .then(({ res }) => {
          console.log(res.data)
          this.branchOffices = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
body {
  font-family: 'Trebuchet ms';
}
.custom-caption {
  padding: 12px;
  background-color: rgba(0, 0, 0, .3);
}
.title-car {
  margin-top: 300px;
}
.subtitle-car {
  margin-top: 370px;
  margin-left: -150px;
}
.security {
  margin-left: 20px;
}
.contactus {
  width: 100%;
  height: 100%;
}
@media (max-width: 1000px) {
  .title-car {
    margin-top: 200px;
  }
  .subtitle-car {
    margin-left: 0px;
    margin-top: -100px;
  }
  .security {
    margin-left: 0px;
  }
}

@media (max-width: 1309px) {
  .contactus {
    height: 1000px;
  }
}
@media (max-width: 1020px) {
  .contactus {
    height: 1800px;
  }
}
</style>
