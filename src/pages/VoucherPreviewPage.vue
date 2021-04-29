<template>
    <q-page padding>
      <div id="printMe">
        <div v-for="i in 3" :key="i" style="position: relative; margin: 15px 10px 0px 10px;">
          <p style="font-size: 9px; position: absolute; left: 1px; bottom: 10px;">
            <b>Fecha:</b> 21/04/2021 <b>Hora:</b> 08:23
          </p>
          <div class="row" style="height: 100px;">
              <div class="col-2">
                  <div align="center">
                    <img width="100px" height="55px" src="/icons/icon-3.jpeg" align="middle"/>
                  </div>
                  <p align="center" style="font-size: 7px;">
                    <b>¡Calidad de Servicio!</b>
                    <br/><b>&nbsp;Servicio de Encomiendas y</b>
                    <br/><b>&nbsp;Viajes directos a nivel nacional</b>
                    <br/><b>&nbsp;RIF J-41162476-4</b>
                  </p>
              </div>
              <div class="col-5">
                <div style="margin-left:3px" align="justify">
                  <span style="font-size:13px">Unión Corporativa de Transporte</span><br/>
                  <span style="font-size:13px"><b>JR&LS, C.A.</b></span>
                  <span style="font-size:9.5px">
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
              <div class="col-5">
                <div style="margin-left:10px">
                    <div>
                      <span style="font-size:12px"><b>Sucursales</b></span><br>
                      <span style="font-size:9px" align="justify">
                        <b>Valencia. Teléfono:</b> (0424) 254.95.49 <b>email:</b> valencia@tranjr.com<br/>
                        <b>Puerto La Cruz. Teléfono:</b> (0424) 874.63.13 <b>email:</b> plc@tranjr.com<br/>
                        <b>Tumeremo. Teléfono:</b> (0414) 857.26.67 <b>email:</b> tumeremo@tranjr.com
                      </span>
                    </div>
                </div>
              </div>
          </div>
          <div class="row" style="height: 100px;">
              <div class="col-4" style="margin-top: 8px;">
                <div class="row">
                  <div class="col-12" style="height:30px">
                    <p><span style="font-size: 13px"><b>Remitente</b></span></p>
                  </div>
                  <div class="col-4" style="font-size: 10px">
                    <span><b>Nombre:</b></span><br>
                    <span>Amable Salés</span><br>
                    <span><b>Teléfono:</b></span><br>
                    <span>0424-8675340</span>
                  </div>
                  <div class="col-8" style="font-size: 10px">
                    <span><b>N° de Identificación:</b></span><br>
                    <span>C.I. 14685685</span><br>
                    <span><b>email:</b></span><br>
                    <span>amablesales@gmail.com</span>
                  </div>
                </div>
              </div>
              <div class="col-4" style="margin-top: -17px;">
                <div class="row">
                  <div class="col-12" style="height:30px">
                    <p><span style="font-size: 13px"><b>Origen</b></span></p>
                  </div>
                  <div class="col-7" style="font-size: 10px">
                    <span><b>Sucursal:</b></span><br>
                    <span>Puerto La Cruz</span><br>
                    <span><b>Dirección:</b></span><br>
                    <span>Av. Municipal. C.C. Regina. Piso 1 Local P1-2</span>
                  </div>
                  <div class="col-5" style="font-size: 10px">
                    <span><b>Teléfono:</b></span><br>
                    <span>0424-8746413</span><br>
                    <span><b>email:</b></span><br>
                    <span>plc@tranjr.com</span>
                  </div>
                </div>
              </div>
              <div class="col-4" style="margin-top: -17px;">
                <div class="row">
                  <div class="col-12" style="height:30px">
                    <p><span style="font-size: 13px"><b>Datos del paquete</b></span></p>
                  </div>
                  <div class="col-4" style="font-size: 10px">
                    <span><b>Peso (Kg):</b></span><br>
                    <span>2,50</span><br>
                    <span><b>Largo (cm):</b></span><br>
                    <span>20,00</span>
                  </div>
                  <div class="col-8" style="font-size: 10px">
                    <span><b>Alto (cm):</b></span><br>
                    <span>15,00</span><br>
                    <span><b>Ancho (cm):</b></span><br>
                    <span>15,00</span>
                  </div>
                </div>
              </div>
          </div>
          <div class="row">
              <div class="col-4" style="margin-top: -17px;">
                  <div class="row">
                    <div class="col-12" style="height:30px">
                      <p><span style="font-size: 13px"><b>Costo de envío</b></span></p>
                    </div>
                    <div class="col-4" style="font-size: 10px">
                      <span><b>Flete (Bs):</b></span><br>
                      <span>50.000.00,00</span><br>
                      <span><b>Subtotal (Bs):</b></span><br>
                      <span>56.500.000,00</span>
                    </div>
                    <div class="col-8" style="font-size: 10px">
                      <span><b>Seguro(Bs):</b></span><br>
                      <span>6.500.000,00</span><br>
                      <span><b>Total (Bs):</b></span><br>
                      <span>56.500.000,00</span>
                    </div>
                  </div>
              </div>
              <div class="col-4" style="margin-top: -17px;">
                  <div class="row">
                      <div class="col-12" style="height:30px">
                          <p><span style="font-size: 13px"><b>Destino</b></span></p>
                      </div>
                      <div class="col-7" style="font-size: 10px">
                          <span><b>Retiro en:</b></span><br>
                          <span>Sucursal Caracas</span><br>
                          <span><b>Dirección:</b></span><br>
                          <span>Av. Francisco de Miranda. C.C. Libertador. PB Local PB-7. Chacao</span>
                      </div>
                      <div class="col-5" style="font-size: 10px">
                          <span><b>Teléfono:</b></span><br>
                          <span>0424-8201215</span><br>
                          <span><b>email:</b></span><br>
                          <span>caracas@tranjr.com</span>
                      </div>
                  </div>
              </div>
              <div class="col-4" style="margin-top: -17px;">
                  <div class="row">
                      <div class="col-12" style="height:30px">
                        <p><span style="font-size: 13px"><b>Destinatario</b></span></p>
                      </div>
                      <div class="col-4" style="font-size: 10px">
                          <span><b>Nombre:</b></span><br>
                          <span>Luís Palma</span><br>
                          <span><b>Recibi conforme:</b></span><br>
                          <span><b>Firma/Sello:</b></span>
                      </div>
                      <div class="col-8" style="font-size: 10px">
                          <span><b>Teléfono:</b></span><br>
                          <span>0412-4575340</span><br>
                          <span>_________________________</span><br>
                          <span>_________________________</span>
                      </div>
                  </div>
              </div>
          </div>
          <br>
          <div style="position: absolute; right: 30px; bottom: 10px;">
            <barcode value="PLC-00011-20210421" width="1" height="25" fontSize="10">
              PLC-00011-20210421
            </barcode>
          </div>
          <br>
          <hr style="border-style: dashed;">
        </div>
      </div>
      <button @click="print">Print local range</button>
    </q-page>
</template>
<script>
import VueBarcode from 'vue-barcode'
export default {
  components: {
    barcode: VueBarcode
  },
  data () {
    return {}
  },
  methods: {
    print () {
      // Pass the element id here
      this.$htmlToPaper('printMe', null, () => {
        console.log('print')
      })
    }
  }
}
</script>
