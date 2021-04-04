<template>
  <div class="q-pa-none">
    <q-carousel
      animated
      height="100vh"
      style="margin-top:-98px"
      infinite
      navigation-position="bottom"
      navigation
      swipeable
      :autoplay="3000"
      :arrows="false"
      v-model="slide"
      id="home"
    >
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn v-if="active" size="lg" icon="home" color="white" flat round dense @click="onClick" />
        <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
      </template>
      <q-carousel-slide class="q-pa-none" v-for="slider in sliders" :name="slider.name" :key="slider.id">
        <q-img :src="`/sliders/${slider.image}`" style="width: 100%; height:100%;">
          <div class="absolute-full flex flex-left">
           <div class="text-h2 text-bold title-car">
            {{ slider.title }}
           </div>
            <div class="subtitle-car" v-html="slider.description"></div>
          </div>
        </q-img>
      </q-carousel-slide>
    </q-carousel>
    <div style="width: 100%; height: 100%; padding: 90px" id="services">
      <div class="row">
        <q-intersection transition="scale"  class="col-6" once>
           <q-img
            src="servicios/pexels-artem-podrez-5025667.jpg"
            style="width: 100%"
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              Calidad de Atención
            </div>
          </q-img>
        </q-intersection>
        <q-intersection transition="scale" style="background:rgba(93,173,226,0.9)" class="col-6 text-white text-h4 flex flex-left flex-center q-pa-xl" once>
          <div class="q-pa-sm">Te ofrecemos siempre la mejor atención</div>
          <div class="q-pa-sm">Recolectamos tu mercancía sin costo adicional</div>
          <div class="q-pa-sm">Los mejores precios para tu encomienda</div>
        </q-intersection>
      </div>
      <div class="row">
        <q-intersection transition="scale" style="background:rgba(93,173,226,0.9)" class="col-6 text-white text-h4 flex flex-left flex-center q-pa-xl" once>
          <div class="q-pa-sm">Salidas interdiarias a todos los destinos del país</div>
          <div class="q-pa-sm">Traslado de tu encomienda entre 12h y 48h. 72h para largas distancias</div>
        </q-intersection>
        <q-intersection transition="scale" class="col-6" once>
          <q-img
            src="servicios/pexels-tima-miroshnichenko-6169126.jpg"
            style="width: 100%"
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              Rapidez de Servicio
            </div>
          </q-img>
        </q-intersection>
      </div>
      <div class="row">
        <q-intersection transition="scale" class="col-6" once>
           <q-img
            src="servicios/pexels-artem-podrez-5025647.jpg"
            style="width: 100%"
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              Seguridad
            </div>
          </q-img>
        </q-intersection>
        <q-intersection transition="scale" style="background:rgba(93,173,226,0.9)" class="col-6 text-white text-h4 flex flex-left flex-center q-pa-xl" once>
          <div class="q-pa-sm">Cada una de tus encomiendas posee su seguro contra cualquier incoveniente</div>
        </q-intersection>
      </div>
      <div class="row">
        <q-intersection transition="scale" style="background:rgba(93,173,226,0.9)" class="col-6 text-white text-h4 flex flex-left flex-center q-pa-xl" once>
          <div class="q-pa-sm">Con la seguridad y compromiso de que tu encomienda llegara a tiempo y en perfecto estado a su destino</div>
        </q-intersection>
        <q-intersection transition="scale" class="col-6 " once>
          <q-img
            src="servicios/pexels-tima-miroshnichenko-6169668.jpg"
            style="width: 100%"
          >
            <div class="absolute-bottom text-subtitle1 text-center">
              Compromiso y Responsabilidad
            </div>
          </q-img>
        </q-intersection>
      </div>
    </div>
    <div style="width: 100%; height: 105vh;" id="contactus">
      <q-img src="/sliders/pexels-tima-miroshnichenko-6169056.jpg" style="width: 100%; height:100%;">
        <div class="absolute-full flex flex-left flex-center">
          <div class="q-pa-md">
            <div class="row justify-around q-gutter-y-xl">
              <q-intersection once transition="scale" class="col-md-4 col-sm-12">
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
                <div  class="text-h6 q-mt-xl text-justify">
                  Contáctanos ahora mismo, y conoce las mejores tarifas del mercado.
                </div>
                <div class="q-mt-md">
                  <q-list :bordered="false">
                    <q-item clickable v-ripple :active="active">
                      <q-item-section avatar>
                        <q-icon name="phone" />
                      </q-item-section>
                      <q-item-section>+58 424.2649.549</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple :active="active">
                      <q-item-section avatar>
                        <q-icon name="phone" />
                      </q-item-section>
                      <q-item-section>+58 412.852.83.11</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple :active="active" active-class="text-orange">
                      <q-item-section avatar>
                        <q-icon name="email" />
                      </q-item-section>
                      <q-item-section>contactus@tranjr.com</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple :active="active" active-class="bg-teal-1 text-grey-8">
                      <q-item-section avatar>
                        <q-icon name="room" />
                      </q-item-section>
                      <q-item-section>Anzoátegui - Veneuela</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-intersection>
              <q-intersection once transition="scale" class="col-md-5 col-sm-12" style="margin-top: 140px;">
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
    </div>
    <div class= "bg-dark text-white"  style="width: 100%; height: 450px; padding: 40px">
      <div class= "row">
        <div class="col-12 text-h3 text-bold text-italic flex flex-left flex-center q-pa-l">
          ¡Somos Calidad de Servicio!
        </div>
        <div class="col-12 text-h4 flex flex-left flex-center q-pa-xl">
          info@tranjr.com
        </div>
        <div class="col-12 text-h5 flex flex-left flex-center q-pa-xl">
          <q-img class="q-ml-lg"
            src="icons/WS.png"
            style="width: 40px; height: 40px">
          </q-img>
          <q-img class="q-ml-lg"
            src="icons/IG.png"
            style="width: 40px; height: 40px">
          </q-img>
        </div>
        <div class="col-12 text-h7 flex flex-left flex-center q-pa-sm">
          Copyright ©2021 All rights reserved | This Web Site is made with by Qbits Dev
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 'one',
      sliders: [],
      active: false,
      name: '',
      message: '',
      subject: '',
      email: ''
    }
  },
  created () {
    this.getSliders()
  },
  methods: {
    async getSliders () {
      const { response } = await this.$mockData.getData('sliders')
      this.sliders = response.data.content
      console.log(this.sliders)
    }
  }
}
</script>
<style>
.custom-caption {
  padding: 12px;
  background-color: rgba(0, 0, 0, .3);
}
.title-car {
  margin-top: 300px;
}
.subtitle-car {
  margin-top: 400px;
  margin-left: -470px;
}
.security {
  margin-left: 10px;
}
@media (max-width: 1000px) {
  .title-car {
    margin-top: 300px;
  }
  .subtitle-car {
    margin-left: 0px;
    margin-top: -150px;
  }
  .security {
    margin-left: 0px;
  }
}
</style>
