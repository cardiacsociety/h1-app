<template>
  <div>
    <div v-if="calcPercentage(evaluation.creditObtained, evaluation.creditRequired)">
      <div>
      {{ evaluation.name }}
        <span class="has-text-weight-semibold">
          {{ calcPercentage(evaluation.creditObtained, evaluation.creditRequired) }}%
        </span> complete for period {{ evaluation.startDate | formatDate }} - {{ evaluation.endDate | formatDate }}.
      </div>
      <progress class="progress is-large is-success"
                :value="evaluation.creditObtained"
                :max="evaluation.creditRequired">
        {{ calcPercentage(evaluation.creditObtained, evaluation.creditRequired) }}%
      </progress>
    </div>
    <div v-else>
      <p>CPD activity report not available at this time.</p>
    </div>
  </div>
</template>

<script>

  import {percentage} from '~/assets/js/calc.js'

  export default {
    name: "ActivityProgressBar",

    computed: {

      // return imported function
      calcPercentage() {
        return percentage
      },

      evaluation() {
        return this.$store.state.activity.currentEvaluation
      },
    },

    methods: {
      updateProgress() {
        this.$store.dispatch("activity/fetchCurrentEvaluation")
          .then(r => {
            console.log(r)
          })
          .catch(r => {
            console.log("Error", r)
          })
      }
    },

    beforeMount() {
      this.updateProgress()
    },

    mounted() {
      this.$root.$on("activityUpdated", () => this.updateProgress())
      this.$root.$on("activityDeleted", () => this.updateProgress())
    },
  }
</script>

<style scoped>

</style>
