<template>
  <div>
    <PageHeader
      title="CPD Activity Overview"
      subtitle="Shows a snapshot of progress"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>
      <p>This pages will show an on-creen overview of activity to-date and requirements.</p>
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
