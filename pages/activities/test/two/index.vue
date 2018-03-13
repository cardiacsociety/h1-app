<template>
  <div>
    <PageHeader
      title="CPD Activities"
      subtitle="this is the sub title"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>
      <h1>Fetch Member Activities</h1>
      <pre>
        <code>
          {{ memberActivities }}
        </code>
      </pre>
    </PageSection>
  </div>

</template>

<script>
  export default {

    computed: {
      memberActivities() {
        return this.$store.state.activity.memberActivities
      }
    },

    beforeMount() {
      this.$store.dispatch("activity/fetchMemberActivities", localStorage.getItem("token"))
    }

  }
</script>

<style scoped>

</style>
