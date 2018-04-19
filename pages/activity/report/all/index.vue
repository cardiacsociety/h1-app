<template>
  <div>
    <PageHeader
      title="Report"
      subtitle="Generate a CPD activity report"
      :subnav="$store.state.nav.activities"
    />
    <PageSection>

      <h3 class="title">Activity Reports</h3>
      <p class="subtitle is-6 has-text-grey">Request reports for a specific period.</p>

      <div class="box">

        <div class="columns">
          <div class="column is-narrow">
            <div>
              <span class="has-text-weight-semibold">{{ currentEvaluation.name }}
                {{ currentEvaluation.startDate | formatDate }} - {{ currentEvaluation.endDate | formatDate }}</span>
              <br>
              Credit: {{ currentEvaluation.creditObtained }} / {{ currentEvaluation.creditRequired }}
            </div>
          </div>
          <div class="column">
            <div v-if="state === 'ready'">
              <button class="button is-warning" @click="emailReport">Email Report</button>
              &nbsp;
              <button class="button" disabled>Download Report</button>
            </div>
            <div v-if="state === 'request'">
              <button class="button is-warning is-loading">Requesting</button>
            </div>
            <div v-if="state === 'success'">
              <button class="button is-success">Email sent!</button>
            </div>
            <div v-if="state === 'error'">
              There was an error. Try again shortly or contact support.
            </div>
          </div>
        </div>

      </div>

    </PageSection>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        // states: ["ready", "request", "success", "error"],
        state: "ready",
      }
    },

    computed: {
      currentEvaluation() {
        return this.$store.state.activity.currentEvaluation
      }
    },

    methods: {
      emailReport() {
        this.state = "request"
        this.$store.dispatch("activity/currentActivityReportEmail")
          .then(r => {
            this.state = "success"
            this.reset()
            console.log(r)
          })
          .catch(r => {
            this.state = "error"
            this.reset()
            console.log(r)
          })
      },

      reset() {
        setTimeout(() => {
          this.state = "ready"
        }, 3000)
      }
    },

    beforeMount() {
      this.$store.dispatch("activity/fetchCurrentEvaluation")
    }


  }

</script>

<style scoped>

</style>
