<template>
  <div>
    <div v-for="i in 3" :key="i" style="position: relative; margin: 15px 10px 0px 10px;">
      <p style="font-size: 9px; position: absolute; left: 1px; bottom: 10px;">
        <b>Fecha:</b> 21/04/2021 <b>Hora:</b> 08:23
      </p>
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
        <div class="col-2">
          <barcode value="PLC-00011-20210421" width="1" height="30" fontSize="10">
            PLC-00011-20210421
          </barcode>
          <p style="font-size: 15px; text-align: center;">
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
      <br>
      <hr style="border-style: dashed;">
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
  data () {
    return {
      branchOffices: []
    }
  },
  created () {
    this.getBranchOffice()
  },
  methods: {
    getBranchOffice () {
      this.$services.getData(['branch-offices'])
        .then(({ res }) => {
          this.branchOffices = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
