<template>
    <nav class="navbar is-primary is-fixed-top">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item" href="/">
            <img src="~/assets/images/header.png" alt="HeartOne">
          </a>
          <div class="navbar-burger burger" v-on:click="toggleMenu" :class="{'is-active': menuActive}">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div :class="{'navbar-menu': true, 'is-active': menuActive}" @click="menuActive = false">
          <div class="navbar-start">

          </div>

          <div class="navbar-end">
            <nuxt-link class="navbar-item" v-for="l,i in $store.state.nav.mainMenu"
                       :key="i"
                       :to="l.to"
                       activeClass="is-active"
            >{{ l.name }}
            </nuxt-link>
            <div class="navbar-item">
              <HeartBeat/>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>

<script>

  import HeartBeat from '~/components/Auth/HeartBeat'

  export default {

    components: {
      HeartBeat,
    },

    data() {
      return {
        menuActive: false,
      }
    },

    methods: {
      toggleMenu() {
        console.log(this.menuActive)
        this.menuActive = !this.menuActive
        console.log(this.menuActive)
      }
    }

  }
</script>

<style scoped>

</style>
