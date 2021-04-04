<template>
  <q-dialog v-model="show" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section class="row items-center text-white bg-primary">
        <div class="text-h6">Agregar paquete</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup @click="close"/>
      </q-card-section>
      <q-stepper
          v-model="step"
          ref="stepper"
          alternative-labels
          color="primary"
          animated
          header-nav
        >
          <q-step
            :name="1"
            title="Datos del paquete"
            icon="settings"
            :done="step > 1"
          >

            <q-card style="" class="row">
              <q-card-section class="col-12">
                <q-input
                  autofocus
                  dense
                  v-model="address"
                  label="Peso"
                />
              </q-card-section>
              <q-card-section class="col-12">
                <q-input
                  autofocus
                  dense
                  v-model="address"
                  label="Largo"
                />
              </q-card-section>
              <q-card-section class="col-12">
                <q-input
                  autofocus
                  dense
                  v-model="address"
                  label="Ancho"
                />
              </q-card-section>
            </q-card>
          </q-step>

          <q-step
            :name="2"
            title="Dirección de envio"
            icon="create_new_folder"
            :done="step > 2"
          >
            <q-card class="row">
              <q-card-section class="col-12">
                <q-select v-model="deliveryType" :options="options" label="Tipo de entrega" dense/>
                </q-card-section>
                <q-card-section class="col-12" v-if="deliveryType === 'Sucursal'">
                <q-select v-model="sucursal" :options="sucursales" label="Sucursales" dense/>
                </q-card-section>
                <q-card-section class="col-12 q-pt-none" v-else>
                  <q-select v-model="destino" :options="destinos" label="Destino" dense/>
                  <q-input
                    autofocus
                    dense
                    v-model="address"
                    label="Dirección"
                    type="textarea"
                    class="q-mt-lg"
                  />
                  <q-input
                    autofocus
                    dense
                    v-model="address"
                    label="Referencia"
                    class="q-mt-lg"
                  />
                </q-card-section>
            </q-card>
          </q-step>

          <q-step
            :name="3"
            title="Datos del destinatario"
            icon="add_comment"
          >
            <q-card class="row">
              <q-card-section class="col-12">
                <q-input
                  autofocus
                  dense
                  v-model="address"
                  label="Nombre"
                />
              </q-card-section>
              <q-card-section class="col-12">
                <q-input
                  autofocus
                  dense
                  v-model="address"
                  label="Apellido"
                />
              </q-card-section>
              <q-card-section class="col-12">
                <q-input
                  autofocus
                  dense
                  v-model="address"
                  label="Identificación"
                />
              </q-card-section>
              <q-card-section class="col-12">
                <q-input
                  autofocus
                  dense
                  v-model="address"
                  label="Telefono"
                />
              </q-card-section>
              <q-card-section class="col-12">
                <q-input
                  autofocus
                  dense
                  v-model="address"
                  label="Email"
                />
              </q-card-section>
            </q-card>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
              <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 3 ? 'Finish' : 'Continue'" />
            </q-stepper-navigation>
          </template>
      </q-stepper>
    </q-card>
</q-dialog>
</template>

<script>
export default {
  name: 'DialogPackageDeital',
  data () {
    return {
      address: '',
      deliveryType: 'Sucursal',
      sucursal: null,
      options: ['Sucursal', 'Destino'],
      destinos: ['Zulia', 'Anzoategui'],
      sucursales: ['Maturin', 'Caracas'],
      destino: null,
      step: 1
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
