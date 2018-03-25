<template>
  <div>
    <PageHeader
      title="History"
      subtitle="View and manage CPD activity records"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>
      <h4 class="title is-4">All Activities</h4>
      <p class="subtitle is-6">From newest to oldest</p>

      <template v-for="a,i in memberActivities">
          <ActivityEditModal :activityData="a">
            <template slot="open">
              <div class="notification activity-row" :key="i">
                <span class="is-size-7 has-text-grey">{{ a.date }}: {{ a.activity }} - {{ a.type }}</span><br>
                {{ a.description }}
              </div>
            </template>
          </ActivityEditModal>
      </template>

      <!--<pre>-->
        <!--<code>-->
          <!--{{ memberActivities }}-->
        <!--</code>-->
      <!--</pre>-->

    </PageSection>
  </div>


</template>

<script>

  import ActivityEditModal from '~/components/Activity/ActivityEditModal'

  export default {

    components: {
      ActivityEditModal,
    },

    computed: {

      token() {
        return this.$store.state.session.token.jwt
      },

      memberActivities() {
        return this.$store.state.activity.memberActivities
      }
    },

    methods: {
      openModal() {
        alert("edit this")
      }
    },

    beforeMount() {
      this.$store.dispatch("activity/fetchMemberActivities", this.token)
    },

  }
</script>

<style scoped>
  .activity-row {
    margin-bottom: 10px;
  }
  .activity-row:hover {
    cursor: pointer;
    background-color: #ccc;
  }

</style>
