<template>
  <div>
    <PageHeader
      title="CPD Activity Overview"
      subtitle="Shows a snapshot of progress"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>

        <ActivityProgressBar/>

        <p>&nbsp;</p>

        <div>
          <ActivityAddModal>
            <template slot="open">
              <button class="button is-success"><i class="fa fa-add"></i>&nbsp;add new</button>&nbsp;
            </template>
          </ActivityAddModal>
        </div>

    </PageSection>
  </div>
</template>

<script>

  import ActivityProgressBar from '~/components/Activity/ActivityProgressBar'
  import ActivityAddModal from '~/components/Activity/ActivityAddModal'

  export default {

    components: {
      ActivityProgressBar,
      ActivityAddModal,
    },
  }
</script>

<style scoped>

</style>
