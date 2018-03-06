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
        token: <pre>{{ token }}</pre>
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
  }
</script>

<style scoped>
</style>
