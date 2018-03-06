<template>
  <div>
    <PageHeader
      title="Auth"
      subtitle="Session check"
    >
    </PageHeader>
    <PageSection>
      <p>If you can see this you are already logged in!</p>
      <p>{{ authenticated }}</p>
    </PageSection>
  </div>
</template>

<script>
  export default {
    name: "auth",

    computed: {
      authenticated() {
        if (this.$store.getters["session/valid"]) {
          return true
        }
        return false
      }
    },
  }
</script>

<style scoped>
</style>
