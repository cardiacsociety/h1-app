<template>
    <i class="fa fa-heart fa-lg" :style="'color:' + currentClr"></i>
</template>

<script>
  export default {
    name: "HeartBeat",

    data() {
      return {
          intervalId: 0,
          beating: false,
          deadClr: "#F5B7B1",
          sysClr: "#B03A2E",
          diaClr: "#A93226",
          currentClr: "#A93226",
        }
    },

    computed: {

      alive() {
        return this.$store.getters["session/valid"]
      },

      // currentClr() {
      //   if (this.alive) {
      //     return this.diaClr
      //   }
      //   return this.deadClr
      // }
    },

    methods: {

      heartBeatOn() {
        this.beating = true
        this.intervalId = setInterval(() => {
          this.currentClr = this.sysClr
          setTimeout(() => {
            this.currentClr = this.diaClr
          }, 300)
        }, 1400)
      },

      heartBeatOff() {
        this.beating = false
        clearInterval(this.intervalId) // stop the beating
        setTimeout(() => { // little delay here to ensure interval has been cleared
          this.currentClr = this.deadClr
        }, 1000)
      },
    },

    mounted() {

      if (this.alive) {
        this.currentClr = this.diaClr
        this.heartBeatOn()
      } else {
        this.currentClr = this.deadClr
      }

      // check session periodically (every 5 seconds)
      const i = setInterval(() => {
        if (this.alive) {
          // don't start an already beating heart!
          if (!this.beating) {
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
