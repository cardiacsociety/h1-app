<template>
  <div>
    <PageHeader
      title="CPD Activities"
      subtitle="this is the sub title"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>
      <h1>Fetch Member Activities</h1>
      <div v-for="a,i in memberActivities">
        <nuxt-link to="/activities/test/one" :activityData="a" :key="i">{{a.id }}</nuxt-link>
      </div>
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

      token() {
        return this.$store.state.session.token.jwt
      },

      memberActivities() {
        return this.$store.state.activity.memberActivities
      }
    },

    beforeMount() {
      this.$store.dispatch("activity/fetchMemberActivities", this.token)
    }

  }
</script>

<style scoped>

</style>
