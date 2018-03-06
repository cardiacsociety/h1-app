<template>
  
</template>

<script>
  //import Overlay from '../Overlay.vue'
  import api from '~/api/mapp'

  export default {
    name: "auth-index",

    layout: "auth",

    // components: {
    //   appOverlay: Overlay
    // },

    data() {
      return {

        // passed to api for authentication
        auth: {
          login: '',
          password: ''
        },
        maskPassword: true,
        overlay: false,
        message: null,
        token: null,
        errorAlert: false,
        errorMessage: null
      }
    },

    computed: {
      // go here after authentication
      redirect() {
        return this.$route.query.to || "/"
      }
    },

    methods: {
      submit() {

        api.auth(this.auth.login, this.auth.password)
          .then((r) => {
            this.startSession(r.body.data.token)
            this.$router.push({name: this.redirect})
          }, (r) => {
            this.errorAlert = true
            this.errorMessage = this.sensibleErrorMessage(r)
          })
      },

      startSession(token) {
        // access the mutation directly - syncronous
        this.$store.commit("session/setToken", token)
        this.$store.commit("session/validateToken")
        // dispatch an action, asyncronous
        this.$store.dispatch("session/start")
      },

      // Format auth error, handle the 'no response' case nicely
      sensibleErrorMessage(r) {
        // No response from api
        if (r.status === 0) {
          return "No response from authentication service"
          // response
        } else {
          return this.errorMessage = r.status + ' - ' + r.statusText
        }
      },

    },
  }
</script>

<style scoped>

</style>
