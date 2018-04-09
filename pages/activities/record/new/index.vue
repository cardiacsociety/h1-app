<template>
  <div>
    <PageHeader
      title="TEST Form"
      subtitle="this is the sub title"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>

      <div class="columns">
        <div class="column is-6">
          <div class="message is-success">
            <div class="message-header">
              New Activity
            </div>
            <div class="message-body">
              <ActivityForm/>
            </div>
          </div>
        </div>
      </div>

    </PageSection>
  </div>

</template>

<script>

  import ActivityForm from "~/components/Activity/ActivityForm"

  export default {

    components: {
      ActivityForm,
    },

    props: {
      activityData: {
        type: Object,
      }
    },

    data() {
      return {
        activityRecord: {},
      }
    },

    computed: {

      token() {
        return this.$store.state.session.token.jwt
      },
    },

    methods: {

      setMemberActivityRecord(id) {
        let editRecord = {}
        this.$store.state.activity.memberActivities.forEach((a) => {
          if (a.id === id) {
            editRecord = a
            return
          }
        })
        this.activityRecord = Object.assign({}, editRecord)
      }

    },

    beforeMount() {
      this.$store.dispatch("activity/fetchMemberActivities", this.token)
    },



  }
</script>

<style scoped>

</style>
