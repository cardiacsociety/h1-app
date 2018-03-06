<template>
  <div>
    <PageHeader
      title="Test"
      subtitle="Session and other testing"
    >
    </PageHeader>
    <PageSection>
      <h3>This will be removed</h3>
      <p>
        token: {{ token }}
      </p>
      <p>HeartBeat component monitors session:</p>
      <p>
        <HeartBeat/>
      </p>
    </PageSection>
  </div>
</template>

<script>

  import HeartBeat from '~/components/Auth/HeartBeat'

  export default {

    layout: "test",

    components: {
      HeartBeat,
    },

    computed: {
      elapsed() {
        return this.$store.state.session.elapsed
      },

      token() {
        // getters expose values as an object - in this case as we are using namespaces
        // the getter field name is "session/token" so need to use square bracket notation
        return this.$store.getters["session/token"]
      }
    },

    methods: {
      startSession(token) {
        // access the mutation directly - syncronous
        this.$store.commit("session/setToken", token)
        this.$store.commit("session/validateToken")
        // dispatch an action, asyncronous
        this.$store.dispatch("session/start")
      },
    },

    created() {
      this.startSession("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzQzNywibmFtZSI6Ik1pY2hhZWwgRG9ubmljaSIsInNjb3Bl" +
        "IjpbIm1lbWJlciJdLCJleHAiOjE1MjA0ODI2NzQsImlhdCI6MTUxOTg3Nzg3NCwiaXNzIjoiaHR0cHM6Ly9tYXBwY3BkLWNzYW56LXdlYi1zZX" +
        "J2aWNlcy5oZXJva3VhcHAuY29tIn0.G3ZWjAmSQTJ_u31-W3VcJjF2z7oi4TWiR5wuZAmE-hM")
    },

  }
</script>

<style scoped>
</style>
