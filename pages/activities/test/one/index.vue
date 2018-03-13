<template>
  <div>
    <PageHeader
      title="TEST Form"
      subtitle="this is the sub title"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>
      <h1>Activities Test Form</h1>
      <p>
        <!--<ActivityForm :activityData="activityRecord" />-->
        <ActivityForm />
      </p>
    </PageSection>
  </div>

</template>

<script>

  import ActivityForm from "~/components/Activity/ActivityForm"

  export default {

    components: {
      ActivityForm,
    },

    data() {
      return {
        activityRecord: {
          memberActivityId: 12345,
          activityId: 20,
          activityTypeId: 4,
          date: "2017-11-03",
          quantity: 1.5,
          description: "lorem ipsumonia...",
        }
      }
    },

  }
</script>

<style scoped>

</style>
