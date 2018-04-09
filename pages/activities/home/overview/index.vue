<template>
  <div>
    <PageHeader
      title="CPD Activity Overview"
      subtitle="Shows a snapshot of progress"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>

      <div v-if="progressPercentage">
        <progress class="progress is-large is-success"
                  :value="evaluation.creditObtained"
                  :max="evaluation.creditRequired">
          {{ progressPercentage | round0 }}%
        </progress>
        <p>{{ evaluation.name }} <span class="has-text-weight-semibold">{{ progressPercentage | round0 }}%</span> complete
          for the period {{ evaluation.startDate | formatDate }} - {{ evaluation.endDate | formatDate }}.</p>
      </div>
      <div v-else>
        <p>CPD activity report not available at this time.</p>
      </div>

    </PageSection>
  </div>
</template>

<script>
    export default {

      computed: {

        evaluation() {
          return this.$store.state.activity.currentEvaluation
        },

        progressPercentage() {
          let p = this.evaluation.creditObtained / this.evaluation.creditRequired * 100
          if (p > 100) {
            p = 100
          }
          return p
        },
      },

      beforeMount() {
        this.$store.dispatch("activity/fetchCurrentEvaluation", this.$store.state.session.token.jwt)
      }
    }
</script>

<style scoped>

</style>
