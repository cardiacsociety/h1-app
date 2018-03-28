<template>
  <div>
    <PageHeader
      title="Search Members"
      subtitle="...who have consented to being listed."
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
