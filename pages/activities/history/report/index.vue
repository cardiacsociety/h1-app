<template>
  <div>
    <PageHeader
      title="Report"
      subtitle="Generate a CPD activity report"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>
      <p>Link to generate a pdf report - most likely will launch an async background task and email the report</p>
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
