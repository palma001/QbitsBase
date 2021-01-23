<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 q-pa-sm">
        <div class="text-h5">
          Lista de producto
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 q-mt-md q-pa-sm" v-for="product in allProducts" :key="product.id">
        <q-card class="my-card">
          <q-card-section horizontal>
            <q-img
              class="col-5"
              src="https://cdn.quasar.dev/img/parallax1.jpg"
            />
            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="shopping_cart"
                class="absolute"
                style="top: 15px; right: 12px; transform: translateY(-50%);"
              />
                <div class="text-h6">
                  {{ product.name }}
                </div>
              <div class="row no-wrap items-center">
                <div class=" col text-subtitle2 ellipsis">
                  {{ product.brand }} - {{ product.sub_category }}
                </div>
                <div class="col-auto text-caption q-pt-md row no-wrap items-center">
                  $ {{ product.price }}
                </div>
              </div>
              <div class="text-caption text-grey">
                {{ product.description }}
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="q-pa-md q-gutter-sm">
      <q-dialog v-model="persistent" transition-show="scale" transition-hide="scale">
        <q-card style="width: 385px; height: 320px;">
          <q-card-section>
            <v-quagga :onDetected="logIt" :readerSize="readerSize" :readerTypes="['ean_reader']"></v-quagga>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <q-dialog v-model="card">
      <q-card class="my-card" v-if="productScaner">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="shopping_cart"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              {{ productScaner.name }}
            </div>
            <div class="col-auto text-caption q-pt-md row no-wrap items-center">
              $
              {{ productScaner.price }}
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">
            {{ productScaner.sub_category }} - {{ productScaner.brand }}
          </div>
          <div class="text-caption text-grey">
            {{ productScaner.description }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Cerrar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="purple" icon="keyboard_arrow_up" direction="up" label="Opciones" label-position="left" external-label>
        <q-fab-action color="amber"  @click="captureImage" icon="qr_code" glossy label="Scanner" label-position="left" external-label/>
      </q-fab>
    </q-page-sticky>
  </div>
</template>

<script>

export default {
  data () {
    return {
      persistent: false,
      /**
       * all products
       * @type {Array} all products
       */
      allProducts: [],

      /**
       * One products
       * @type {Object} one product
       */
      productScaner: null,

      /**
       * Status Card product
       * @type {Boolean} status card
       */
      card: false,
      readerSize: {
        width: 640,
        height: 480
      },
      detecteds: []
    }
  },
  created () {
    this.getAllProducts()
  },
  methods: {
    /**
     * Get all products
     *
     */
    getAllProducts () {
      this.$mockData.getData('products')
        .then(({ response }) => {
          this.allProducts = response.data.content
        })
    },

    /**
     * Get products scanner
     *
     * @param {Object} data scanner
     *
     */

    getOneProduct (data) {
      if (data) {
        this.productScaner = this.allProducts.filter(element => {
          return Number(element.code) === Number(data)
        })[0]

        if (!this.productScaner) {
          alert('Producto no encontrado')
        } else {
          this.card = true
          this.persistent = false
        }
      }
    },

    /**
     * Call scanner
     *
     */

    captureImage () {
      if (this.validateDivice('mobile')) {
        cordova.plugins.barcodeScanner.scan(
          (result) => { this.getOneProduct(result.text) },
          (error) => { alert('No se pudo escanear: ' + error) }
        )
      } else {
        this.persistent = true
      }
    },
    logIt (data) {
      this.getOneProduct(data.codeResult.code)
      console.log('detected', data.codeResult.code)
    },
    /**
     * Validate divice
     * @param  {String} validate divice
     */
    validateDivice (divice) {
      return this.$q.platform.is[divice]
    }
  }
}
</script>
