<template>
  <q-dialog v-model="show" persistent>
    <q-card class="row">
      <q-card-section class="row items-center text-white bg-primary col-12">
        <div class="text-h6">Agregar remitente</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup @click="close"/>
      </q-card-section>
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
      <q-card-actions align="right" class="col-12">
        <q-btn label="OK" color="primary" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogAddSender',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      address: null
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
