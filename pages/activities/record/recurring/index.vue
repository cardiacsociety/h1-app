<template>
  <div>
    <PageHeader
      title="Recurring Activity"
      subtitle="One-click recording"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>
      <p>Shows a list of recurring activity for each pouint in time at which it may have occured.</p>
      <p>A simple yes/no button will record or skip the activity for that date.</p>
    </PageSection>
  </div>

</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>

</style>
