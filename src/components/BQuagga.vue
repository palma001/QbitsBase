<template>
  <div id="interactive" class="viewport scanner">
    <video />
    <canvas class="drawingBuffer" />
  </div>
</template>

<script>
import Quagga from 'quagga'

export default {
  name: 'BQuagga',
  props: {
    onDetected: {
      type: Function,
      default (result) {
        console.log('detected: ', result)
      }
    },
    onProcessed: {
      type: Function,
      default (result) {
        const drawingCtx = Quagga.canvas.ctx.overlay

        const drawingCanvas = Quagga.canvas.dom.overlay

        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(
              0,
              0,
              parseInt(drawingCanvas.getAttribute('width')),
              parseInt(drawingCanvas.getAttribute('height'))
            )
            result.boxes
              .filter(function (box) {
                return box !== result.box
              })
              .forEach(function (box) {
                Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                  color: 'green',
                  lineWidth: 2
                })
              })
          }
          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
              color: '#00F',
              lineWidth: 2
            })
          }

          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(
              result.line,
              { x: 'x', y: 'y' },
              drawingCtx,
              { color: 'red', lineWidth: 3 }
            )
          }
        }
      }
    },
    readerTypes: {
      type: Array,
      default: () => ['code_128_reader']
    },
    width: {
      type: Object,
      default: () => ({
        max: 640
      })
    },
    height: {
      type: Object,
      default: () => ({
        max: 400
      })
    },
    aspectRatio: {
      type: Object,
      default: () => ({
        min: 1,
        max: 2
      }),
      validator: o => typeof o.min === 'number' && typeof o.max === 'number'
    }
  },
  data: function () {
    return {
      quaggaState: {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: this.width,
            height: this.height,
            facingMode: 'environment',
            aspectRatio: { min: 1, max: 2 }
          }
        },
        locator: {
          patchSize: 'medium',
          halfSample: true
        },
        numOfWorkers: 2,
        frequency: 10,
        decoder: {
          readers: this.readerTypes
        },
        locate: true
      }
    }
  },
  watch: {
    onDetected: function (oldValue, newValue) {
      if (oldValue) Quagga.offDetected(oldValue)
      if (newValue) Quagga.onDetected(newValue)
    },
    onProcessed: function (oldValue, newValue) {
      if (oldValue) Quagga.offProcessed(oldValue)
      if (newValue) Quagga.onProcessed(newValue)
    }
  },
  mounted: function () {
    Quagga.init(this.quaggaState, function (err) {
      if (err) {
        return console.error(err)
      }
      Quagga.start()
    })
    Quagga.onDetected(this.onDetected)
    Quagga.onProcessed(this.onProcessed)
  },
  destroyed: function () {
    if (this.onDetected) Quagga.offDetected(this.onDetected)
    if (this.onProcessed) Quagga.offProcessed(this.offProcessed)
    Quagga.stop()
  }
}
</script>

<style scoped>
.viewport {
  position: relative;
}

.viewport canvas,
.viewport video {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
