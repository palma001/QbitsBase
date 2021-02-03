<template>
  <div id="app">
    <div>
      <div class="counter">{{ c }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      counter: 0,
      c: 0
    }
  },
  mounted () {
    this.$crontab.addJob({
      name: 'counter',
      interval: {
        seconds: '/1'
      },
      job: this.countUp
    })
  },
  watch: {
    counter (value) {
      console.log(value)
      this.c = value
    }
  },
  methods: {
    countUp (data) {
      console.log(data)
      this.counter += 1
    }
  }
}
</script>
