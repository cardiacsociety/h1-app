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

    // computed: {
    //
    //   evaluation() {
    //     return this.$store.state.activity.currentEvaluation
    //   },
    //
    //   progressPercentage() {
    //     let p = this.evaluation.creditObtained / this.evaluation.creditRequired * 100
    //     if (p > 100) {
    //       p = 100
    //     }
    //     return p
    //   },
    // },
    //
    // beforeMount() {
    //   this.$store.dispatch("activity/fetchCurrentEvaluation", this.$store.state.session.token.jwt)
    // }
  }
</script>

<style scoped>

</style>
