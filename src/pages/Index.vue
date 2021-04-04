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
        <q-btn v-if="active" size="lg" icon="home" color="yellow" flat round dense @click="onClick" />
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
    <div style="width: 100%; height: 700px;">
      <h1>
        Footer
      </h1>
    </div>
    <div style="width: 100%; height: 105vh;" id="contactus">
      <q-img src="/sliders/pexels-tima-miroshnichenko-6169056.jpg" style="width: 100%; height:100%;">
        <div class="absolute-full flex flex-left flex-center">
          <div class="q-pa-md">
            <div class="row justify-around q-gutter-y-xl">
              <q-intersection transition="scale" class="col-md-4 col-sm-12">
                <div class="text-h2">
                  Titulo
                </div>
                <div  class="text-h6 q-mt-xl">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo sed nobis dolores architecto
                  ex porro minus omnis tenetur inventore?
                  Placeat quo iure obcaecati esse mollitia, illo quam officiis quos sunt?
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
                      <q-item-section>contactus@transtjr.com</q-item-section>
                    </q-item>

                    <q-item clickable v-ripple :active="active" active-class="bg-teal-1 text-grey-8">
                      <q-item-section avatar>
                        <q-icon name="room" />
                      </q-item-section>
                      <q-item-section>Anzoatgui</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-intersection>
              <q-intersection transition="scale" class="col-md-5 col-sm-12" style="margin-top: 140px;">
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
    <div style="width: 100%; height: 700px;">
      <h1>
        Footer
      </h1>
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
