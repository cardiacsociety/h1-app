<template>
    <i class="fa fa-heart fa-lg" :style="'color:' + heartBeat.currentClr"></i>
</template>

<script>
  export default {
    name: "HeartBeat",

    data() {
      return {
        heartBeat: {
          intervalId: 0,
          beating: false,
          deadClr: "#F5B7B1",
          sysClr: "#B03A2E",
          diaClr: "#A93226",
          currentClr: "#A93226",
        }
      }
    },

    computed: {

      alive() {
        return this.$store.getters["session/valid"]
      }
    },

    methods: {

      heartBeatOn() {
        this.heartBeat.beating = true
        this.heartBeat.intervalId = setInterval(() => {
          this.heartBeat.currentClr = this.heartBeat.sysClr
          setTimeout(() => {
            this.heartBeat.currentClr = this.heartBeat.diaClr
          }, 300)
        }, 1400)
      },

      heartBeatOff() {
        this.heartBeat.beating = true
        clearInterval(this.heartBeat.intervalId) // stop the beating
        setTimeout(() => { // little delay here to ensure interval has been cleared
          this.heartBeat.currentClr = this.heartBeat.deadClr
        }, 1000)
      },
    },

    mounted() {

      if (this.alive) {
        this.heartBeatOn()
      }

      // check session periodically (every 5 seconds)
      const i = setInterval(() => {
        if (this.alive) {
          // don't start an already beating heart!
          if (!this.heartBeat.beating) {
            this.heartBeatOn()
          }
        } else {
          this.heartBeatOff()
        }
      }, 5000)

    },

  }
</script>

<style scoped>
</style>
