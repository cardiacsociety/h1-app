<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <figure class="image notification is-primary">
            <img src="~/assets/images/header.png">
          </figure>
          <div class="box">
            <h3 class="title has-text-grey">Login</h3>
            <p class="subtitle has-text-danger">{{ error }}&nbsp;</p>
            <form @submit.prevent="onSubmit">
              <div class="field">
                <div class="control">
                  <input class="input is-medium" type="email" placeholder="Your Email" autofocus="" v-model="login">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input class="input is-medium" type="password" placeholder="Your Password" v-model="password">
                </div>
              </div>
              <!--<div class="field">-->
              <!--<label class="checkbox">-->
              <!--<input type="checkbox">-->
              <!--Remember me-->
              <!--</label>-->
              <!--</div>-->
              <button type="submit" class="button is-block is-success is-large is-fullwidth">
                Login
              </button>
            </form>
          </div>
          <p>
            <a href="#">Forgot Password</a> &nbsp;·&nbsp;
            <a href="#">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "login",
    layout: "login",

    data() {
      return {
        login: "",
        password: "",
        error: "",
      }
    },

    methods: {
      onSubmit() {
        this.$store.dispatch("session/auth", {login: this.login, password: this.password})
          .then((res) => {
            this.$store.dispatch("session/start", res.data.token)
              .then(() => {
                this.$router.push(this.$store.state.nav.authRedirect)
              })
              .catch((err) => {
                this.error = "could not start session"
                console.log(err)
              })
          })
          .catch((err) => {
            this.error = "failed"
            console.log("here")
            console.log(err)
          })
      }
    },

    mounted() {
      // test a foced login
      //this.$store.dispatch("session/auth", {login: "member@mappcpd.com", password: "demoMember1"})
    },

  }
</script>

<style scoped>
  figure.image {
    margin: 0 0 10px 0;
    padding: 15px;
  }
</style>
