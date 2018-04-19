<template>
  <div>
    <PageHeader
      title="Activity Overview"
      subtitle="Shows a snapshot of progress"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>

      <h3>Overall</h3>
      <ActivityProgressBar/>

      <h3>Activity Summary</h3>
      <ActivitySummaryProgress/>

    </PageSection>
  </div>
</template>

<script>

  import ActivityProgressBar from '~/components/Activity/ActivityProgressBar'
  import ActivitySummaryProgress from '~/components/Activity/ActivitySummaryProgress'

  export default {

    components: {
      ActivityProgressBar,
      ActivitySummaryProgress,
    },
  }
</script>

<style scoped>

</style>
