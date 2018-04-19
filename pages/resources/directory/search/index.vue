<template>
  <div>
    <PageHeader
      title="Search Member Directory"
      subtitle="...by name, location or interest"
      :subnav="$store.state.nav.resources"
    />
    <PageSection>
      <Search/>
    </PageSection>
  </div>
</template>
<script>

  import Search from "~/components/Directory/Search"

  export default {

    components: {
      Search,
    }
  }
</script>
