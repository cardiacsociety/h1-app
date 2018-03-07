<template>
  <div>
    <PageHeader
      title="Resources Search"
      subtitle="Search the resources index for anything of interest"
      :subnav="$store.state.nav.resources"
    />
    <PageSection>
      <Search/>
    </PageSection>
  </div>
</template>
<script>

  import Search from "~/components/Resources/Search"

  export default {

    components: {
      Search,
    }
  }
</script>
