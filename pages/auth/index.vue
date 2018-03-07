<template>
  <div>
    <PageHeader
      title="Auth"
      subtitle="Session check"
    >
    </PageHeader>
    <PageSection>
      <p>You are currently logged in.</p>
      <p>
        <button class="button is-info" @click="sessionModal = true">Session info</button>&nbsp;
        <button class="button is-danger" @click="logout">Log out</button>
      </p>
    </PageSection>

    <div class="modal" :class="{'is-active': sessionModal}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <pre>{{ token }}</pre>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="sessionModal = false"></button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "auth",

    data() {
      return {
        sessionModal: false,
      }
    },

    computed: {
      token() {
        let t = Object.assign({}, this.$store.getters["session/token"])
        t.jwt = t.jwt.substr(0, 50) + "..."
        return t
      }
    },

    methods: {

      logout() {
        this.$store.dispatch("session/destroy")
          .then(() => {
            this.$router.push("/auth/login")
          })
      }
    }

  }
</script>

<style scoped>
</style>
