<template>
  <div>
    <PageHeader
      title="Welcome to HeartOne"
      subtitle="CPD by CSANZ"
    />
    <PageSection>


      <p>
        <ActivityAddButton buttonStyle="width: 16rem;">Record New CPD Activity</ActivityAddButton>
      </p>

      <p>
        <nuxt-link to="/activity/list" class="button is-warning">View Activity List</nuxt-link>
      </p>

      <p>
        <nuxt-link to="/activity/report/current" class="button is-warning">View Current Summary</nuxt-link>
      </p>

      <p>
        <nuxt-link to="/activity/report/all" class="button is-warning">Email Report PDF</nuxt-link>
      </p>

      <p>
        <nuxt-link to="/resources/library/search" class="button is-info">Search Resource Library</nuxt-link>
      </p>

      <p>
        <nuxt-link to="/resources/directory/search" class="button is-info">Search Member Directory</nuxt-link>
      </p>

      <p>
        <nuxt-link to="/resources/tools/calculators" class="button is-dark">Access Calculators</nuxt-link>
      </p>

      <p>On this page we could show:</p>

      <ul>
        <li>Recent/random resource, filtered by user-defined parameters</li>
        <li>Last few activities recorded - for quick copy or edit</li>
        <li>Important notifications</li>
        <li>Quick buttons / links for most common actions - new activity, recurring activity</li>
      </ul>

    </PageSection>
  </div>
</template>

<script>

  import ActivityAddButton from "~/components/Activity/ActivityAddButton"

  export default {

    components: {
      ActivityAddButton,
    }

  }
</script>

<style scoped>
  .button {
    width: 16rem;
  }
</style>
