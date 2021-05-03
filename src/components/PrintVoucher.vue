<template>
  <div>
    <div v-for="i in 3" :key="i" style="margin: 10px 0px 0px 0px; height: 33.33%;">
      <div class="row">
        <div class="col-1">
          <div align="center">
            <img width="80%" src="/icons/icon-3.jpeg" align="middle"/>
            <p align="center" style="font-size: 7px;">
              <b>¡Calidad de Servicio!</b><br>
              <b>&nbsp;Servicio de Encomiendas y</b>
              <b>&nbsp;Viajes directos a nivel nacional</b>
            </p>
          </div>
        </div>
        <div class="col-4">
          <div style="margin-left:3px" align="justify">
            <span style="font-size:13px">Unión Corporativa de Transporte</span><br/>
            <span style="font-size:13px"><b>JR&LS, C.A.</b></span><br>
            <span style="font-size:7px">
              <b>Oficina Principal:</b> San Agustín del Norte.
              <b>Teléfono:</b> (0212) 577.30.47 (0424) 199.79.66 (0412) 582.6311
              <b>email:</b> caracas@tranjr.com
            </span>
            <span style="font-size:9px">
              <b>Déposito:</b> Zona Industrial La Yaguara II, Transversal Diagonal, a la Ferretería Industial Joma.&nbsp;
              <b>Teléfono:
              </b> (0412) 582.87.71 - (0424) 152.12.56.
            </span>
          </div>
        </div>
        <div class="col-4">
          <div style="margin-left:10px">
            <div>
              <span style="font-size:12px"><b>Sucursales</b></span><br>
              <span
                style="font-size:9px"
                align="justify"
                v-for="branchOffice in branchOffices"
                :key="branchOffice.id"
              >
                <b>{{branchOffice.name}}. Teléfono:</b> {{branchOffice.phone_number}} <b>email:</b> {{branchOffice.email}}<br/>
              </span>
            </div>
          </div>
        </div>
        <div class="col-3">
          <barcode :value="barCodeNumber" width="1" height="30" fontSize="10">
             {{ barCodeNumber }}
          </barcode>
          <p style="font-size: 13px; text-align: center;">
            <b>&nbsp;RIF J-41162476-4</b>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-4">
          <slot name="left"></slot>
        </div>
        <div class="col-4">
          <slot name="center"></slot>
        </div>
        <div class="col-4">
          <slot name="right"></slot>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <p style="font-size: 9px; margin-top: 20px;">
            <slot name="date"></slot>
          </p>
        </div>
        <div class="col-4" style="font-size: 9px;">
          <span><b>Recibi conforme:</b></span><br>
          <hr>
          <span><b>Firma/Sello: </b></span><br>
          <span><hr></span>
        </div>
      </div>
      <hr style="border-style: dashed;">
      <br>
    </div>
  </div>
</template>

<script>
import VueBarcode from 'vue-barcode'
export default {
  name: 'PrintVoucher',
  components: {
    barcode: VueBarcode
  },
  props: {
    barCodeNumber: {
      type: [String, Number],
      require: false
    },
    branchOffices: {
      type: Array
    }
  },
  data () {
    return {}
  }
}
</script>
